"use client";

import { AppSidebarInset } from "@/components/dashboard-providers/app-sidebar-inset";
import { InputBox } from "@/components/dashboard/InputBox";
import { AppSidebar } from "@/components/dashboard/Sidebar";
import ThreadPreview from "@/components/dashboard/ThreadPreview";
import ThreadPreview2 from "@/components/dashboard/ThreadPreview2";
import TweetCard from "@/components/dashboard/TweetCard";
import AiChat from "@/components/ui/kokonutui/ai-chat";
import { SidebarProvider } from "@workspace/ui/components/sidebar";
import { useState } from "react";

export default function GenerateThreadForm({ userId }: { userId: string }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [thread, setThread] = useState<{
    title: string;
    posts: string[];
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/generate-thread", {
        method: "POST",
        body: JSON.stringify({ url, userId }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      setThread({ title: data.videoTitle, posts: data.thread });
      setSuccess(true);
      setUrl("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex w-full ">
        {/* Remove the pl-[280px] padding */}
        <div className="flex-1 overflow-auto p-6">
          <div className="flex justify-center">
            <AiChat />
          </div>
          <div className="mt-6 space-y-1 flex flex-col items-center">
            <ThreadPreview2
              posts={thread?.posts || []}
              title={thread?.title || ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
