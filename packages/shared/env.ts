// packages/shared/env.ts
import dotenv from "dotenv";
import path from "path";

// Load from root .env (optional safety net)
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export const env = {
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
};

if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) {
  throw new Error("Missing Supabase environment variables");
}

console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("Supabase Anon Key:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
console.log(
  "Supabase Service Role Key:",
  process.env.SUPABASE_SERVICE_ROLE_KEY
);
console.log("OpenAI API Key:", process.env.OPENAI_API_KEY);
console.log("Google API Key:", process.env.GOOGLE_API_KEY);
