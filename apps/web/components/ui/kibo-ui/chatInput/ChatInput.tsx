"use client";

import {
  AIInput,
  AIInputButton,
  AIInputModelSelect,
  AIInputModelSelectContent,
  AIInputModelSelectItem,
  AIInputModelSelectTrigger,
  AIInputModelSelectValue,
  AIInputSubmit,
  AIInputTextarea,
  AIInputToolbar,
  AIInputTools,
} from "@/components/ui/kibo-ui/ai/input";

import { GlobeIcon, MicIcon, PlusIcon, SendIcon } from "lucide-react";
import { useState, type FormEventHandler } from "react";
import ComboBoxButton from "../combobox/ComboBox";
import { CategorySelector } from "./CategorySelector";

const tones = [
  { id: "professional", name: "Professional" },
  { id: "casual", name: "Casual" },
  { id: "funny", name: "Funny" },
  { id: "witty", name: "Witty" },
  { id: "inspirational", name: "Inspirational" },
  { id: "analytical", name: "Analytical" },
  { id: "bold and direct", name: "Bold and Direct" },
  { id: "motivational", name: "Motivational" },
  { id: "chill", name: "Chill" },
  { id: "smart and insightful", name: "Smart and Insightful" },
  { id: "thoughtful", name: "Thoughtful" },
  { id: "gen-z", name: "Gen-z" },
];

const ThreadLength = [
  {
    value: 1,
    label: "1 Tweet",
  },
  {
    value: 2,
    label: "2 Posts Tweet(Short Tweet)",
  },
  {
    value: 3,
    label: "3 Posts Thread (A little Longer tweet)",
  },
  {
    value: 4,
    label: "4 Posts Thread(A Long tweet)",
  },
  {
    value: 5,
    label: "5 Posts Thread(Long Ass tweet)",
  },
];

type ChatInputProps = {
  onSubmit: (thread: { title: string; posts: string[] }) => void;
};

const ChatInput = ({ onSubmit }: ChatInputProps) => {
  const [tone, setTone] = useState<string>(tones[0]?.id ?? "");
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [threadLength, setThreadLength] = useState<number>(
    ThreadLength[0]?.value ?? 1
  );
  const [category, setCategory] = useState<string>("Select a category");

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Validate that category is selected
    if (!category || category === "Select Category") {
      alert("Please select a category before submitting");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/generate-thread", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: inputValue,
          tone,
          threadCount: threadLength,
          category: category,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      onSubmit({
        title: data.videoTitle,
        posts: data.thread,
      });

      setInputValue("");
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="pb-3">
        <CategorySelector value={category} onValueChange={setCategory} />
      </div>
      <AIInput onSubmit={handleSubmit}>
        <AIInputTextarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Paste YouTube link here"
          disabled={loading}
        />
        <AIInputToolbar>
          <AIInputTools>
            <AIInputButton>
              <PlusIcon size={16} />
            </AIInputButton>

            <ComboBoxButton
              value={threadLength}
              onValueChange={setThreadLength}
            />
            <AIInputModelSelect value={tone} onValueChange={setTone}>
              <AIInputModelSelectTrigger>
                <AIInputModelSelectValue />
              </AIInputModelSelectTrigger>
              <AIInputModelSelectContent>
                {tones.map((tone) => (
                  <AIInputModelSelectItem key={tone.id} value={tone.id}>
                    {tone.name}
                  </AIInputModelSelectItem>
                ))}
              </AIInputModelSelectContent>
            </AIInputModelSelect>
          </AIInputTools>
          <AIInputSubmit>
            <SendIcon size={16} />
          </AIInputSubmit>
        </AIInputToolbar>
      </AIInput>
    </div>
  );
};

export default ChatInput;
