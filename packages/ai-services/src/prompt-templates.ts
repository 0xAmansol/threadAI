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

  const toneInstructions: Record<string, string> = {
    professional:
      "Use a clear, authoritative, and concise tone suitable for professionals and domain experts. Avoid slang and maintain a polished style.",
    casual:
      "Use a relaxed, friendly, and slightly witty tone. Make the content feel approachable and conversational, like you're talking to a friend.",
    witty:
      "Use humor, clever wordplay, and punchy lines. Keep it entertaining while still delivering value.",
    inspirational:
      "Use a motivational and uplifting tone. Your goal is to energize and inspire the reader.",
    analytical:
      "Use a logical, data-driven tone. Break down concepts clearly and avoid emotional language.",
  };

  const toneStyle = toneInstructions[tone];

  const joinedContent = content.join("\n\n");

  return `
You are an expert Twitter thread writer with the voice and clarity of top thinkers like Dan Koe, Naval Ravikant, and other influential minds in tech, AI, and modern philosophy.

Your task is to write a ${threadCount}-tweet thread based on the following YouTube video content.

VIDEO TITLE: ${videoTitle}

TRANSCRIPT:
${joinedContent}

WRITING STYLE:
${toneStyle}

ADDITIONAL GUIDELINES:
- Start with a hook that grabs attention in the first tweet.
- Each tweet should deliver standalone value but also build toward a cohesive narrative.
- Avoid fluff. Be clear, sharp, and human.
- Do not use a robotic tone.
- Conclude the thread with a powerful insight or call to action.
${includeHashtags ? "- Include relevant hashtags." : "- Do NOT include any hashtags."}
- Do not number the tweets (e.g., '1/10', '2/10').

Output only the individual tweets as plain text, one after the other, separated by newlines.
`;
}
