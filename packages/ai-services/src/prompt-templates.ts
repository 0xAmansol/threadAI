// packages/ai-services/src/prompt-templates.ts
export function buildPrompt(
  videoTitle: string,
  content: string[],
  options: {
    tone?: string;
    threadCount?: number;
    includeHashtags?: boolean;
  } = {}
): string {
  const { tone = "casual", threadCount = 5, includeHashtags = false } = options;

  // Join all content pieces together
  const joinedContent = content.join("\n\n");

  return `
  You are an expert at creating engaging social media threads about YouTube videos.
  Create a ${threadCount}-post thread about the following YouTube video content in a ${tone} style.
  Each post should be concise yet informative and engaging.
  ${includeHashtags ? "Include 2-3 relevant hashtags at the end of the thread." : ""}
  
  VIDEO TITLE: ${videoTitle}
  
  TRANSCRIPT CONTENT:
  ${joinedContent}
  
  Create a thread that:
  1. Starts with an engaging hook that captures attention
  2. Provides the most valuable insights or takeaways from the video
  3. Maintains a natural flow between posts
  4. Ends with a compelling conclusion or call to action
  5. Sounds like it was written by a human, not AI
  
  Return the thread as numbered posts:
  1. First post
  2. Second post
  ... and so on
  
  Make sure each post can stand alone but also connects to the overall narrative.
  `;
}
