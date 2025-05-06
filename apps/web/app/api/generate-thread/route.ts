// apps/web/app/api/generate-thread/route.ts
import { NextRequest, NextResponse } from "next/server";

import {
  generateThread,
  saveThread,
} from "@workspace/ai-services/thread-generator";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { url, tone, threadCount, includeHashtags, category } = body;

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const username =
      session.user.user_metadata?.username ||
      session.user.email?.split("@")[0] ||
      "anonymous";

    const thread = await generateThread(url, {
      tone,
      threadCount,
      includeHashtags,
      userId: session.user.id,
      username: username,
      supabaseUrl: process.env.SUPABASE_URL!,
      supabaseKey: process.env.SUPABASE_ANON_KEY!,
    });

    const profilePicture = session.user.user_metadata?.avatar_url || null;

    console.log(username);

    const threadId = await saveThread(
      session.user.id,
      username,
      url,
      profilePicture,
      thread,
      {
        tone,
        threadCount,
        includeHashtags,
        category,
        supabaseUrl: process.env.SUPABASE_URL!, // Ensure this is set correctly
        supabaseKey: process.env.SUPABASE_ANON_KEY!,
      }
    );
    console.log(thread.posts);
    console.log("Saving thread with category:", category);

    return NextResponse.json({
      thread: thread.posts,
      videoTitle: thread.videoTitle,
      videoId: thread.videoId,
      threadId,
    });
  } catch (error: any) {
    console.error("Thread generation error:", error);

    return NextResponse.json(
      { error: error.message || "Failed to generate thread" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const supabase = await createClient();

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    // Fetch all threads for the user
    const { data: threads, error } = await supabase
      .from("threads")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }
    console.log(threads);
    return NextResponse.json({ threads });
  } catch (error: any) {
    console.error("Error fetching threads:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch threads" },
      { status: 500 }
    );
  }
}
