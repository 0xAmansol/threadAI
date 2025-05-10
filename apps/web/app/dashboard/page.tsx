"use client";
import { DashboardMain } from "@/components/dashboard/MainContentText";
import ThreadPreview2 from "@/components/dashboard/ThreadPreview2";
import ChatInput from "@/components/ui/kibo-ui/chatInput/ChatInput";
import { useState } from "react";

export default function GenerateThreadForm() {
  const [thread, setThread] = useState<{
    title: string;
    posts: string[];
  } | null>(null);

  const handleThreadGenerate = (newThread: {
    title: string;
    posts: string[];
  }) => {
    setThread(newThread);
  };

  return (
    <div className="flex flex-col h-screen w-full">
      {/* Scrollable content */}
      <div className="flex-1 pb-40 overflow-auto">
        <div className="px-4 pt-6 w-full max-w-2xl mx-auto">
          {thread ? (
            <ThreadPreview2 posts={thread.posts} title={thread.title} />
          ) : (
            <DashboardMain />
          )}
        </div>
      </div>

      {/* Fixed Chat Input */}
      <div className="fixed bottom-0 left-0 right-0 z-10 py-4 px-4 md:ml-60">
        <div className="max-w-2xl mx-auto">
          <ChatInput onSubmit={handleThreadGenerate} />
        </div>
      </div>
    </div>
  );
}
