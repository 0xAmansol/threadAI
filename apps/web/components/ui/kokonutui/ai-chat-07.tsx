"use client";

import { CornerRightUp } from "lucide-react";
import { useState, useEffect } from "react";
import { Textarea } from "@workspace/ui/components/textarea";
import { cn } from "@workspace/ui/lib/utils";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";

interface AIInput07Props {
  onThreadGenerate?: (thread: { title: string; posts: string[] }) => void;
}

export default function AIInput_07({ onThreadGenerate }: AIInput07Props) {
  const [url, setUrl] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 56,
    maxHeight: 200,
  });

  const handleSubmit = async () => {
    if (!url.trim()) return;

    setSubmitted(true);
    try {
      const res = await fetch("/api/generate-thread", {
        method: "POST",
        body: JSON.stringify({ url }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      if (onThreadGenerate) {
        onThreadGenerate({
          title: data.videoTitle,
          posts: data.thread,
        });
      }

      setUrl("");
      adjustHeight();
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setSubmitted(false);
    }
  };

  //   useEffect(() => {
  //     let timeoutId: NodeJS.Timeout;

  //     const runAnimation = () => {
  //       if (!isAnimating) return;
  //       setSubmitted(true);
  //       timeoutId = setTimeout(() => {
  //         setSubmitted(false);
  //         timeoutId = setTimeout(runAnimation, 1000);
  //       }, 3000);
  //     };

  //     if (isAnimating) {
  //       runAnimation();
  //     }

  //     return () => clearTimeout(timeoutId);
  //   }, [isAnimating]);

  return (
    <div className="w-full py-2">
      <div className="relative max-w-xl w-full mx-auto flex items-start flex-col gap-2">
        <div className="relative max-w-xl w-full mx-auto">
          <Textarea
            id="ai-input-07"
            placeholder="Paste youtube video link here"
            className={cn(
              "max-w-xl bg-black/5 dark:bg-white/5 w-full rounded-3xl pl-6 pr-10 py-5 placeholder:text-black/70 dark:placeholder:text-white/70 border-none ring-black/30 dark:ring-white/30 text-black dark:text-white resize-none text-wrap leading-[1.2] h-auto min-h-[40px] overflow-hidden",
              "scrollbar-none"
            )}
            ref={textareaRef}
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              adjustHeight();
            }}
            disabled={submitted}
          />
          <button
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2 rounded-xl py-1 px-1",
              submitted ? "bg-none" : "bg-black/5 dark:bg-white/5"
            )}
            type="button"
            onClick={handleSubmit}
          >
            {submitted ? (
              <div
                className="w-4 h-4 bg-black dark:bg-white rounded-sm animate-spin transition duration-700"
                style={{ animationDuration: "3s" }}
              />
            ) : (
              <CornerRightUp
                className={cn(
                  "w-4 h-4 transition-opacity dark:text-white",
                  url ? "opacity-100" : "opacity-30"
                )}
              />
            )}
          </button>
        </div>
        <p className="pl-4  text-xs mx-auto text-black/70 dark:text-white/70">
          {submitted ? "Cooking tweets" : "Ready to submit!"}
        </p>
      </div>
    </div>
  );
}
