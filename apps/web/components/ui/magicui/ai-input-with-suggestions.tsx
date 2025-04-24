import { AIInputWithSuggestions } from "@workspace/ui/components/ai-input-with-suggestions";
import { Text, CheckCheck, ArrowDownWideNarrow } from "lucide-react";

const CUSTOM_ACTIONS = [
  {
    text: "Summarize",
    icon: Text,
    colors: {
      icon: "text-blue-600",
      border: "border-blue-500",
      bg: "bg-blue-100",
    },
  },
  {
    text: "Proofread",
    icon: CheckCheck,
    colors: {
      icon: "text-green-600",
      border: "border-green-500",
      bg: "bg-green-100",
    },
  },
  {
    text: "Condense",
    icon: ArrowDownWideNarrow,
    colors: {
      icon: "text-purple-600",
      border: "border-purple-500",
      bg: "bg-purple-100",
    },
  },
];

export function AIInputWithSuggestionsDemo() {
  return (
    <div className="space-y-8 min-w-[350px]">
      <div>
        <AIInputWithSuggestions
          actions={CUSTOM_ACTIONS}
          defaultSelected="Proofread"
          placeholder="Enter text to process..."
        />
      </div>
    </div>
  );
}
