"use client";

import { motion } from "motion/react";
import { cn } from "@workspace/ui/lib/utils";

import { useEffect, useState } from "react";
import AIInput_07 from "./ai-chat-07";
import { supabase } from "@/utils/supabase/client";
import ThreadPreview2 from "../../dashboard/ThreadPreview2";

interface InputProps {
  userName: string;
}

export default function AiChat() {
  const [userName, setUserName] = useState<string>();
  const [thread, setThread] = useState<{
    title: string;
    posts: string[];
  } | null>(null);

  useEffect(() => {
    const fetchuUserData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserName(user?.user_metadata.name);
      if (!user) {
        throw new Error("no user found");
      }
    };
    fetchuUserData();
  }, []);

  const handleThreadGenerate = (newThread: {
    title: string;
    posts: string[];
  }) => {
    setThread(newThread);
  };

  return (
    <div className="w-full flex flex-col items-center bg-gradient-to-br from-white via-white-900 to-white dark:from-black dark:via-zinc-800/40 dark:to-black px-4">
      <div className="w-full max-w-4xl p-4 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className={cn("text-center mb-6", "opacity-100 scale-100")}
        >
          <h1 className="text-5xl md:text-6xl font-medium mb-4 tracking-tighter bg-clip-text bg-gradient-to-b from-gray-800 to-gray-500 text-gray-800 dark:text-white">
            Welcome, {userName} 👋
          </h1>
          <p className="text-xl text-zinc-400">
            What do you want to curate today?
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className={cn(
            "w-full rounded-2xl relative overflow-hidden",
            "h-0 overflow-hidden"
          )}
        >
          <div className="relative p-6">
            <div className="flex flex-col gap-4">{/* Put messages here */}</div>
            <div className="shrink-0 min-w-[24px] min-h-[24px]" />
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-3xl px-4 md:px-0 mt-6"
        >
          <div className="relative backdrop-blur-xl rounded-xl">
            <AIInput_07 onThreadGenerate={handleThreadGenerate} />
          </div>
        </motion.form>

        {thread && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="w-full max-w-3xl mt-8"
          >
            <ThreadPreview2 posts={thread.posts} title={thread.title} />
          </motion.div>
        )}
      </div>
    </div>
  );
}
