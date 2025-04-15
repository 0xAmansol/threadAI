// packages/ai-services/src/gemini-service.ts
import {
  GoogleGenerativeAI,
  GenerativeModel,
  Content,
  GenerationConfig,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { env } from "@workspace/shared/env";

// Types for the service
export interface GenerationOptions {
  temperature?: number;
  topK?: number;
  topP?: number;
  maxOutputTokens?: number;
  stopSequences?: string[];
  safetySettings?: {
    category: HarmCategory;
    threshold: HarmBlockThreshold;
  }[];
}

export interface ChatMessage {
  role: "user" | "model";
  content: string;
}

let geminiModel: GenerativeModel | null = null;

/**
 * Returns a singleton instance of the Gemini model
 */
export function getGeminiModel(): GenerativeModel {
  if (!geminiModel) {
    const apiKey = env.GOOGLE_API_KEY;

    if (!apiKey) {
      throw new Error("Google API key is not configured");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    geminiModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  }

  return geminiModel;
}

/**
 * Generates content using Gemini model
 * @param prompt The prompt text
 * @param options Generation options
 * @returns Generated text content
 */
export async function generateContent(
  prompt: string,
  options: GenerationOptions = {}
): Promise<string> {
  try {
    const model = getGeminiModel();

    const generationConfig: GenerationConfig = {
      temperature: options.temperature ?? 0.7,
      topK: options.topK,
      topP: options.topP,
      maxOutputTokens: options.maxOutputTokens,
      stopSequences: options.stopSequences,
    };

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
      safetySettings: options.safetySettings,
    });

    return result.response.text();
  } catch (error) {
    console.error("Error generating content:", error);
    throw new Error(`Failed to generate content: ${(error as Error).message}`);
  }
}

/**
 * Conducts a chat conversation using Gemini model
 * @param messages Array of chat messages
 * @param options Generation options
 * @returns Generated response text
 */
export async function chat(
  messages: ChatMessage[],
  options: GenerationOptions = {}
): Promise<string> {
  try {
    const model = getGeminiModel();

    const generationConfig: GenerationConfig = {
      temperature: options.temperature ?? 0.7,
      topK: options.topK,
      topP: options.topP,
      maxOutputTokens: options.maxOutputTokens,
      stopSequences: options.stopSequences,
    };

    // Convert messages to Gemini format
    const contents: Content[] = messages.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    const result = await model.generateContent({
      contents,
      generationConfig,
      safetySettings: options.safetySettings,
    });

    return result.response.text();
  } catch (error) {
    console.error("Error in chat generation:", error);
    throw new Error(`Failed in chat generation: ${(error as Error).message}`);
  }
}

/**
 * Streams content generation from Gemini model
 * @param prompt The prompt text
 * @param options Generation options
 * @returns An async generator that yields chunks of generated text
 */
export async function* streamContent(
  prompt: string,
  options: GenerationOptions = {}
) {
  try {
    const model = getGeminiModel();

    const generationConfig: GenerationConfig = {
      temperature: options.temperature ?? 0.7,
      topK: options.topK,
      topP: options.topP,
      maxOutputTokens: options.maxOutputTokens,
      stopSequences: options.stopSequences,
    };

    const result = await model.generateContentStream({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
      safetySettings: options.safetySettings,
    });

    for await (const chunk of result.stream) {
      const text = chunk.text();
      if (text) yield text;
    }
  } catch (error) {
    console.error("Error streaming content:", error);
    throw new Error(`Failed to stream content: ${(error as Error).message}`);
  }
}
