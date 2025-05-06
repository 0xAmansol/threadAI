// packages/ai-services/src/thread-generator.ts
import {
  extractYoutubeTranscript,
  getYoutubeMetadata,
  isYoutubeUrl,
  extractVideoId,
} from "@workspace/content-extractors/youtube-extractor";
import { processTextIntoChuncks } from "@workspace/content-extractors/content-processor";

import { storeEmbeddings, searchRelevantChunks } from "./vector-store";
import { buildPrompt } from "./prompt-templates";
import { createClient } from "@supabase/supabase-js";
import { env } from "@workspace/shared/env";
import { generateContent } from "./gemini-service";

interface ThreadOptions {
  tone?: string;
  threadCount?: number;
  category?: string;
  username?: string;
  includeHashtags?: boolean;
  userId?: string;
  supabaseKey: string;
  supabaseUrl: string;
}

interface GeneratedThread {
  posts: string[];
  videoTitle: string;
  videoId: string;
  thumbnailUrl?: string;
  username?: string;
}

export async function generateThread(
  url: string,
  options: ThreadOptions
): Promise<GeneratedThread> {
  console.log(options);
  // Validate URL
  if (!isYoutubeUrl(url)) {
    throw new Error("Provided URL is not a valid YouTube URL");
  }

  try {
    const videoId = extractVideoId(url);

    // 1. Extract transcript and metadata
    const [transcript, metadata] = await Promise.all([
      extractYoutubeTranscript(url),
      getYoutubeMetadata(url),
    ]);

    if (!transcript) {
      throw new Error("Could not extract transcript from video");
    }

    // 2. Process transcript into chunks
    const chunks = processTextIntoChuncks(transcript);

    // 3. Store chunks with embeddings
    await storeEmbeddings(chunks, {
      videoId,
      userId: options.userId,
      videoTitle: metadata.title,
    });

    // 4. Retrieve relevant chunks for thread generation
    const relevantContent = await searchRelevantChunks(videoId);

    // 5. Generate thread using Gemini
    const prompt = buildPrompt(metadata.title, [relevantContent], {
      tone: options.tone,

      threadCount: options.threadCount,
      includeHashtags: options.includeHashtags,
    });

    // Using the new Gemini service instead of OpenAI
    const response = await generateContent(prompt, {
      temperature: 0.7,
      maxOutputTokens: 1024,
    });

    // 6. Parse response into individual posts
    const posts = parseThreadPosts(response, options.threadCount || 5);

    // Get thumbnail URL from metadata
    const thumbnailUrl =
      metadata.thumbnailUrl || getThumbnailUrlFromVideoId(videoId);

    return {
      posts,
      videoTitle: metadata.title,
      videoId,
      thumbnailUrl, // Include the thumbnail URL
    };
  } catch (error) {
    console.error("Thread generation error:", error);
    throw error;
  }
}

// Utility function to get thumbnail URL directly from video ID if metadata doesn't have it
function getThumbnailUrlFromVideoId(videoId: string): string {
  // YouTube provides several thumbnail options
  // maxresdefault (1280x720)
  // hqdefault (480x360)
  // mqdefault (320x180)
  // sddefault (640x480)
  // default (120x90)
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

function parseThreadPosts(content: string, expectedCount: number): string[] {
  // Try to parse numbered posts (e.g., "1. This is a tweet")
  const postRegex = /(\d+)[\.|\)]\s+(.*?)(?=\n\d+[\.|\)]|\n*$)/gs;
  const matches = [...content.matchAll(postRegex)];

  if (matches?.length > 0) {
    return matches
      .map((match) => match[2]?.trim())
      .filter((post): post is string => Boolean(post)); // <-- filter out undefined
  }

  // Fallback: split by double newlines
  const posts = content
    .split(/\n\n+/)
    .filter((line) => line.trim().length > 0)
    .slice(0, expectedCount);

  return posts;
}

export async function saveThread(
  userId: string,
  username: string,
  url: string,
  userProfile: string,
  thread: GeneratedThread,
  options: ThreadOptions
): Promise<string> {
  const supabase = getSupabaseClient();

  try {
    const { data, error } = await supabase
      .from("threads")
      .insert({
        user_id: userId,
        username: username,
        user_profile_picture: userProfile,
        video_id: thread.videoId,
        video_title: thread.videoTitle,
        video_url: url,
        thumbnail_url: thread.thumbnailUrl,
        category: options.category,
        posts: thread.posts,
        options: options,
      })
      .select("id");

    if (error) throw error;

    if (data && data.length > 0 && data[0]) {
      return data[0].id;
    } else {
      throw new Error("No thread data returned from Supabase");
    }
  } catch (error) {
    console.error("Failed to save thread:", error);
    throw new Error("Failed to save thread");
  }
}

function getSupabaseClient() {
  const supabaseUrl = env.SUPABASE_URL;
  const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase credentials are not configured");
  }

  return createClient(supabaseUrl, supabaseKey);
}
