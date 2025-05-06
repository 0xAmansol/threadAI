import { YoutubeTranscript } from "youtube-transcript";
import axios from "axios";
import { Innertube } from "youtubei.js/web";
import { env } from "@workspace/shared/env";

export interface VideoMetadata {
  title: string;
  channelName: string;
  thumbnailUrl: string;
  videoId: string;
}

export const fetchTranscript = async (video_id: string) => {
  const youtube = await Innertube.create({
    lang: "en",
    location: "US",
    retrieve_player: false,
  });

  try {
    const info = await youtube.getInfo(video_id);
    const title = info.primary_info?.title.text;
    const transcriptData = await info.getTranscript();
    const transcript =
      transcriptData?.transcript?.content?.body?.initial_segments.map(
        (segment) => segment.snippet.text
      );

    return { title, transcript };
  } catch (error) {
    console.error("Error fetching transcript:", error);
    throw error;
  }
};

export function isYoutubeUrl(url: string): boolean {
  return url.includes("youtube.com/watch") || url.includes("youtu.be/");
}

export function extractVideoId(url: string): string {
  let videoId = "";

  if (url.includes("youtube.com/watch")) {
    const urlParams = new URL(url).searchParams;
    videoId = urlParams.get("v") || "";
  } else if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1]?.split("?")[0] || "";
  }

  return videoId;
}

export async function extractYoutubeTranscript(url: string): Promise<string> {
  const videoId = extractVideoId(url);

  if (!videoId) {
    throw new Error("Invalid video URL or missing video ID");
  }

  const { title, transcript } = await fetchTranscript(videoId);

  return transcript?.join(" ") || "Transcript not available";
}

export async function getYoutubeMetadata(url: string): Promise<VideoMetadata> {
  const videoId = extractVideoId(url);

  if (!videoId) {
    throw new Error("Cound not extract video ID from URL");
  }

  const apiKey = env.YOUTUBE_API_KEY;

  if (!apiKey) {
    throw new Error("youtube api key is not configured");
  }

  const response = await axios.get(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`
  );

  const snippet = response.data.items[0].snippet;

  return {
    title: snippet.title,
    channelName: snippet.channelTitle,
    thumbnailUrl: snippet.thumbnails.high?.url || "",
    videoId,
  };
}
