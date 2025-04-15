// apps/web/app/api/generate-thread/route.ts
import { NextRequest, NextResponse } from "next/server";

import { cookies } from "next/headers";
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
    const { url, tone, threadCount, includeHashtags } = body;

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const thread = await generateThread(url, {
      tone,
      threadCount,
      includeHashtags,
      userId: session.user.id,
      supabaseUrl: process.env.SUPABASE_URL!,
      supabaseKey: process.env.SUPABASE_ANON_KEY!,
    });

    const threadId = await saveThread(session.user.id, thread, {
      tone,
      threadCount,
      includeHashtags,
      supabaseUrl: process.env.SUPABASE_URL!, // Ensure this is set correctly
      supabaseKey: process.env.SUPABASE_ANON_KEY!,
    });
    console.log(thread.posts);

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
