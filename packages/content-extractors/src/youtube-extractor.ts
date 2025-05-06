import { YoutubeTranscript } from "youtube-transcript";
import axios from "axios";
import { env } from "@workspace/shared/env";

export interface VideoMetadata {
  title: string;
  channelName: string;
  thumbnailUrl: string;
  videoId: string;
}

export function isYoutubeUrl(url: string): boolean {
  return url.includes("youtube.com/watch") || url.includes("youtu.be/");
}

export function extractVideoId(url: string): string {
  let videoId = "";

  if (url.includes("youtube.com/watch")) {
    const urlParams = new URL(url).searchParams;
    videoId = urlParams.get("v") || "";
  } else if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1]?.split("?")[0] || "";
  }

  return videoId;
}

export async function extractYoutubeTranscript(url: string): Promise<string> {
  const videoId = extractVideoId(url);

  if (!videoId) {
    throw new Error("could not extract videoId from URL");
  }

  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    console.log(transcript);
    return transcript.map((t) => t.text).join("");
  } catch (error) {
    console.log(error);
    throw new Error("🎙️ Captions not available or failed to fetch.");
  }
}

export async function getYoutubeMetadata(url: string): Promise<VideoMetadata> {
  const videoId = extractVideoId(url);

  if (!videoId) {
    throw new Error("Cound not extract video ID from URL");
  }

  const apiKey = env.YOUTUBE_API_KEY;

  if (!apiKey) {
    throw new Error("youtube api key is not configured");
  }

  const response = await axios.get(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`
  );

  const snippet = response.data.items[0].snippet;

  return {
    title: snippet.title,
    channelName: snippet.channelTitle,
    thumbnailUrl: snippet.thumbnails.high?.url || "",
    videoId,
  };
}
