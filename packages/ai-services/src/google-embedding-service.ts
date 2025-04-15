// packages/ai-services/src/google-embedding-service.ts
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { env } from "@workspace/shared/env";

let embeddingsModel: GoogleGenerativeAIEmbeddings | null = null;

/**
 * Returns a singleton instance of the Google Generative AI embeddings model
 */
export function getEmbeddingsModel(): GoogleGenerativeAIEmbeddings {
  if (!embeddingsModel) {
    const apiKey = env.GOOGLE_API_KEY;

    if (!apiKey) {
      throw new Error("Google API key is not configured");
    }

    embeddingsModel = new GoogleGenerativeAIEmbeddings({
      apiKey,
      model: "embedding-001", // Google's text embedding model
    });
  }

  return embeddingsModel;
}

/**
 * Ensures text is within size limits for the embedding API
 * @param text Text to check and potentially truncate
 * @param maxBytes Maximum allowed size in bytes
 * @returns Text that is within the size limit
 */
function ensureSizeLimit(text: string, maxBytes: number = 30000): string {
  // A rough estimate: 1 character ≈ 1-4 bytes in UTF-8
  // We'll use a conservative estimate of 4 bytes per character
  const estimatedBytes = text.length * 4;

  if (estimatedBytes <= maxBytes) {
    return text;
  }

  // If too large, truncate the text
  const safeCharLimit = Math.floor(maxBytes / 4);
  return text.substring(0, safeCharLimit);
}

/**
 * Generates embeddings for input text using Google's Generative AI
 * @param text The input text to generate embeddings for
 * @returns A Promise resolving to an array of numbers representing the embedding
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const embeddings = getEmbeddingsModel();

    // Ensure text is within size limits
    const safeText = ensureSizeLimit(text);

    // Generate the embedding
    const result = await embeddings.embedQuery(safeText);

    // Return the embedding vector
    return result;
  } catch (error) {
    console.error("Error generating embedding:", error);
    throw new Error(
      `Failed to generate embedding: ${(error as Error).message}`
    );
  }
}

/**
 * Generates embeddings for multiple texts using Google's Generative AI
 * @param texts Array of texts to generate embeddings for
 * @returns A Promise resolving to an array of embedding arrays
 */
export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  try {
    // Process texts in batches to avoid rate limits
    const batchSize = 5;
    const results: number[][] = [];

    for (let i = 0; i < texts.length; i += batchSize) {
      const batch = texts.slice(i, i + batchSize);
      const batchResults = await Promise.all(
        batch.map((text) => generateEmbedding(text))
      );
      results.push(...batchResults);
    }

    return results;
  } catch (error) {
    console.error("Error generating embeddings:", error);
    throw new Error(
      `Failed to generate embeddings: ${(error as Error).message}`
    );
  }
}
