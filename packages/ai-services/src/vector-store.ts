// packages/ai-services/src/vector-store.ts
import { createClient } from "@supabase/supabase-js";
import { env } from "@workspace/shared/env";
import { generateEmbedding } from "./google-embedding-service";

interface ChunkMetadata {
  videoId: string;
  userId?: string;
  videoTitle?: string;
}

// Modified part of your vector-store.ts file
export async function storeEmbeddings(
  chunks: string[],
  metadata: ChunkMetadata
): Promise<void> {
  const supabase = getSupabaseClient();

  // Process each chunk individually to avoid payload size issues
  for (let i = 0; i < chunks.length; i++) {
    try {
      // Generate embedding for this chunk
      const embedding = await generateEmbedding(chunks[i]);

      // Insert into vector store
      const { error } = await supabase.from("content_embeddings").insert({
        user_id: metadata.userId || null,
        content_id: `youtube_${metadata.videoId}`,
        content_type: "youtube",
        chunk_index: i,
        chunk_text: chunks[i],
        embedding: embedding,
        title: metadata.videoTitle || null,
        video_id: metadata.videoId,
      });

      if (error) {
        console.error(`Error storing embedding for chunk ${i}:`, error);
        // Continue with other chunks even if one fails
      }
    } catch (error) {
      console.error(`Failed to process chunk ${i}:`, error);
      // Continue with other chunks even if one fails
    }
  }
}

export async function searchRelevantChunks(
  videoId: string,
  limit: number = 10
): Promise<string> {
  const supabase = getSupabaseClient();

  // Get all chunks for this video
  const { data, error } = await supabase
    .from("content_embeddings")
    .select("embedding")
    .eq("video_id", videoId)
    .limit(limit);

  if (error) {
    console.error("Error retrieving chunks:", error);
    throw error;
  }

  // Join chunks into a single text
  return data.map((item) => item.embedding).join("\n\n");
}

// For more advanced vector similarity search:
export async function searchSimilarContent(
  query: string,
  limit: number = 5
): Promise<string[]> {
  const supabase = getSupabaseClient();

  // Generate embedding for query
  const queryEmbedding = await generateEmbedding(query);

  // Perform similarity search
  const { data, error } = await supabase.rpc("match_documents", {
    query_embedding: queryEmbedding,
    match_threshold: 0.5,
    match_count: limit,
  });

  if (error) {
    console.error("Error in similarity search:", error);
    throw error;
  }

  return data.map((item: any) => item.content);
}

function getSupabaseClient() {
  const supabaseUrl = env.SUPABASE_URL;
  const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase credentials are not configured");
  }

  return createClient(supabaseUrl, supabaseKey);
}
