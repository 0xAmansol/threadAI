// apps/web/components/YouTubeThreadGenerator.tsx
import React, { useState } from "react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

type ThreadTone = "professional" | "casual" | "creative";

interface ThreadGeneratorProps {
  onThreadGenerated?: (
    thread: string[],
    threadId: string,
    title: string
  ) => void;
}

export default function YouTubeThreadGenerator({
  onThreadGenerated,
}: ThreadGeneratorProps) {
  const [url, setUrl] = useState("");
  const [tone, setTone] = useState<ThreadTone>("professional");
  const [threadCount, setThreadCount] = useState(5);
  const [includeHashtags, setIncludeHashtags] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const user = useUser();

  const handleGenerateThread = async () => {
    if (!url) {
      setError("Please enter a YouTube URL");
      return;
    }

    if (!url.includes("youtube.com") && !url.includes("youtu.be")) {
      setError("Please enter a valid YouTube URL");
      return;
    }

    if (!user) {
      setError("You must be logged in to generate threads");
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch("/api/generate-thread", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
          tone,
          threadCount,
          includeHashtags,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate thread");
      }

      const data = await response.json();

      if (onThreadGenerated) {
        onThreadGenerated(data.thread, data.threadId, data.videoTitle);
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Generate Thread from YouTube</h2>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="youtube-url">
          YouTube Video URL
        </label>
        <input
          id="youtube-url"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="tone">
            Thread Tone
          </label>
          <select
            id="tone"
            value={tone}
            onChange={(e) => setTone(e.target.value as ThreadTone)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="professional">Professional</option>
            <option value="casual">Casual</option>
            <option value="creative">Creative</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-2" htmlFor="thread-count">
            Number of Posts
          </label>
          <input
            id="thread-count"
            type="number"
            min="1"
            max="10"
            value={threadCount}
            onChange={(e) => setThreadCount(parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center">
          <input
            id="hashtags"
            type="checkbox"
            checked={includeHashtags}
            onChange={(e) => setIncludeHashtags(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="hashtags" className="ml-2 block text-gray-700">
            Include Hashtags
          </label>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <button
        onClick={handleGenerateThread}
        disabled={isGenerating}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
      >
        {isGenerating ? "Generating Thread..." : "Generate Thread"}
      </button>
    </div>
  );
}
