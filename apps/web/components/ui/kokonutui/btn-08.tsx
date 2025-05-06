import { useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { Link } from "lucide-react";
import { cn } from "@workspace/ui/lib/utils";

export default function Btn08({
  className,
  thread,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { thread: string[] }) {
  const [showThread, setShowThread] = useState(false);

  const handleClick = () => {
    if (!thread || thread.length === 0) return;

    const tweetText = encodeURIComponent(thread[0]!);
    const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
    window.open(tweetUrl, "_blank");

    setShowThread(true);
  };

  return (
    <div className="w-full flex flex-col items-center space-y-2">
      <Button
        onClick={handleClick}
        className={cn(
          "bg-white dark:bg-black text-black dark:text-white border border-black/10 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-gray-950",
          className
        )}
        {...props}
      >
        <span className="flex items-center gap-2">
          <Link className="w-4 h-4" />
          Share on X
        </span>
      </Button>

      {showThread && (
        <div className="w-full mt-4 bg-gray-50 dark:bg-gray-900 p-4 rounded-md shadow">
          <p className="text-sm mb-2 text-gray-500 dark:text-gray-400">
            Copy and post the rest of the thread manually:
          </p>
          {thread.slice(1).map((post, index) => (
            <div
              key={index}
              className="mb-2 p-2 border rounded bg-white dark:bg-black text-sm whitespace-pre-wrap"
            >
              {post}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
