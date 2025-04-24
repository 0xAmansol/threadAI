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
  You are an expert thread writer with the voice and clarity of top Twitter thinkers like Dan Koe, Naval Ravikant, and other influential minds in tech, AI, and modern philosophy.

Write a ${threadCount}-tweet thread based on the following YouTube video content.

VIDEO TITLE: ${videoTitle}
TRANSCRIPT:
${joinedContent}

Guidelines:

Start with a hook that grabs attention immediately.

Each tweet should be insightful, human, and worth reading on its own.

Avoid fluff. Prioritize clarity, brevity, and resonance.

No robotic tone. It should feel like it's coming from someone who deeply understands the ideas.

Maintain a natural narrative flow from beginning to end.

End with a thought-provoking insight or a subtle call to action.

Do not include hashtags or tweet labels (like "First tweet", "Second tweet", etc.)

Just return the thread as clean, individual tweets, one after the other.


  `;
}
