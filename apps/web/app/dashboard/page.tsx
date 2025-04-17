"use client";

import { InputBox } from "@/components/dashboard/InputBox";
import { SidebarDemo } from "@/components/dashboard/Sidebar";
import ThreadPreview from "@/components/dashboard/ThreadPreview";
import ThreadPreview2 from "@/components/dashboard/ThreadPreview2";
import TweetCard from "@/components/dashboard/TweetCard";
import AiChat from "@/components/kokonutui/ai-chat";
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
    <div className="flex min-h-screen">
      <div className="w-64 flex-shrink-0">
        <SidebarDemo />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex justify-center pt-10">
          <AiChat />
        </div>
        <div className="mt-6 space-y-1 flex flex-col items-center">
          <ThreadPreview2
            posts={thread?.posts || []}
            title={thread?.title || ""}
          />
        </div>
      </div>
      {/* <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          type="url"
          placeholder="Paste YouTube URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-md"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Generating..." : "Generate Thread"}
        </button>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">Thread generated!</p>}
      </form>
      {thread && <ThreadPreview title={thread.title} posts={thread.posts} />}
      <InputBox /> */}
    </div>
  );
}
