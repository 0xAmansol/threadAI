"use client";

import { useEffect, useState } from "react";
import { cn } from "@workspace/ui/lib/utils";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Twitter,
  Edit2,
  Check,
} from "lucide-react";
import { supabase } from "@/utils/supabase/client";
import { User, UserMetadata } from "@supabase/supabase-js";

interface TweetCardProps {
  author?: {
    name?: string;
    username?: string;
    avatar?: string;
    timeAgo?: string;
  };
  content?: {
    text?: string;
  };
  engagement?: {
    likes?: number;
    comments?: number;
    shares?: number;
    isLiked?: boolean;
    isBookmarked?: boolean;
  };
  isEditable?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onBookmark?: () => void;
  onContentChange?: (text: string) => void;
}

const defaultProps: TweetCardProps = {
  author: {
    name: "Aman",
    username: "0xAmansol",
    avatar: "/placeholder.svg?height=100&width=100",
    timeAgo: "Apr 15",
  },
  content: {
    text: "In a world where ChatGPT can answer anything in seconds, Intelligence is no longer a competitive edge. But agency? That's the X-factor. Here's why getting things done is now more valuable than being smart 🧵",
  },
  engagement: {
    likes: 128,
    comments: 32,
    shares: 24,
    isLiked: false,
    isBookmarked: false,
  },
  isEditable: true,
  isFirst: false,
  isLast: false,
};

interface ThreadPreviewProps {
  title: string;
  posts: string[];
  onEdit?: (index: number, newText: string) => void;
}

export default function TweetCard({
  author = defaultProps.author,
  content = defaultProps.content,
  engagement = defaultProps.engagement,
  isEditable = defaultProps.isEditable,
  isFirst = defaultProps.isFirst,
  isLast = defaultProps.isLast,
  onLike,
  onComment,
  onShare,
  onBookmark,
  onContentChange,
}: TweetCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(content?.text || "");
  const [user, setUser] = useState<UserMetadata | null>(null);

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      if (onContentChange) {
        onContentChange(editedText);
      }
    }
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user?.user_metadata || null);
      if (!user) {
        throw new Error("No user found");
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="relative w-full max-w-2xl">
      {/* Thread connector line */}
      {!isFirst && (
        <div className="absolute left-8 -top-2 h-8 w-0.5 bg-gray-300 dark:bg-zinc-700" />
      )}
      {!isLast && (
        <div className="absolute left-8 top-[2.75rem] h-full w-0.5 bg-gray-300 dark:bg-zinc-700" />
      )}

      <div
        className={cn(
          "w-full mb-3",
          "bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl",
          "border border-zinc-200/50 dark:border-zinc-800/50",
          "rounded-xl shadow",
          "transition-all duration-300 ease-in-out",
          "hover:shadow-md hover:shadow-zinc-200/20 dark:hover:shadow-zinc-900/20",
          "hover:border-zinc-300/50 dark:hover:border-zinc-700/50"
        )}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={user?.avatar_url || "/placeholder.svg"}
                  alt={user?.name || author?.name}
                  className={cn(
                    "w-9 h-9 rounded-full",
                    "ring-2 ring-white dark:ring-zinc-800",
                    "object-cover"
                  )}
                />
                <div className="absolute -bottom-1 -right-1 bg-white dark:bg-zinc-800 rounded-full p-0.5">
                  <Twitter className="w-3.5 h-3.5 text-sky-500" />
                </div>
              </div>
              <div>
                <h3 className="text-[14px] font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
                  {author?.name}
                </h3>
                <p className="text-[12px] text-zinc-500 dark:text-zinc-400 tracking-tight">
                  @{user?.username || author?.username} ·{" "}
                  {user?.created_at || author?.timeAgo}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {isEditable && (
                <button
                  type="button"
                  onClick={handleEditToggle}
                  className={cn(
                    "p-1.5 rounded-full",
                    "transition-all duration-200",
                    "hover:bg-zinc-100/80 dark:hover:bg-zinc-800/80",
                    "active:bg-zinc-200 dark:active:bg-zinc-700",
                    "focus:outline-hidden focus:ring-2 focus:ring-zinc-500/20"
                  )}
                >
                  {isEditing ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Edit2 className="w-4 h-4 text-zinc-400" />
                  )}
                </button>
              )}
              <button
                type="button"
                className={cn(
                  "p-1.5 rounded-full",
                  "transition-all duration-200",
                  "hover:bg-zinc-100/80 dark:hover:bg-zinc-800/80",
                  "active:bg-zinc-200 dark:active:bg-zinc-700",
                  "focus:outline-hidden focus:ring-2 focus:ring-zinc-500/20"
                )}
              >
                <MoreHorizontal className="w-4 h-4 text-zinc-400" />
              </button>
            </div>
          </div>

          {isEditing ? (
            <textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className={cn(
                "w-full min-h-[80px] text-[14px] leading-relaxed",
                "text-zinc-600 dark:text-zinc-300 mb-3",
                "bg-zinc-50 dark:bg-zinc-800/50",
                "border border-zinc-200 dark:border-zinc-700",
                "rounded-lg p-2",
                "focus:outline-none focus:ring-2 focus:ring-zinc-500/20"
              )}
            />
          ) : (
            <p className="text-[14px] leading-relaxed text-zinc-600 dark:text-zinc-300 mb-3">
              {content?.text}
            </p>
          )}

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={onLike}
                className={cn(
                  "flex items-center gap-1.5 text-[12px] font-medium p-1.5 rounded-full",
                  "transition-all duration-300",
                  "hover:bg-rose-50/80 dark:hover:bg-rose-950/30",
                  "active:bg-rose-100 dark:active:bg-rose-950/50",
                  "focus:outline-hidden focus:ring-2 focus:ring-rose-500/20",
                  engagement?.isLiked
                    ? "text-rose-600"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-rose-600"
                )}
              >
                <Heart
                  className={cn(
                    "w-[16px] h-[16px]",
                    "transition-all duration-300",
                    "hover:scale-110",
                    "active:scale-95",
                    engagement?.isLiked && "fill-current"
                  )}
                />
                <span>{engagement?.likes}</span>
              </button>
              <button
                type="button"
                onClick={onComment}
                className={cn(
                  "flex items-center gap-1.5 text-[12px] font-medium p-1.5 rounded-full",
                  "transition-all duration-300",
                  "hover:bg-blue-50/80 dark:hover:bg-blue-950/30",
                  "active:bg-blue-100 dark:active:bg-blue-950/50",
                  "focus:outline-hidden focus:ring-2 focus:ring-blue-500/20",
                  "text-zinc-500 dark:text-zinc-400 hover:text-blue-500"
                )}
              >
                <MessageCircle className="w-[16px] h-[16px] transition-transform duration-300 hover:scale-110" />
                <span>{engagement?.comments}</span>
              </button>
              <button
                type="button"
                onClick={onShare}
                className={cn(
                  "flex items-center gap-1.5 text-[12px] font-medium p-1.5 rounded-full",
                  "transition-all duration-300",
                  "hover:bg-green-50/80 dark:hover:bg-green-950/30",
                  "active:bg-green-100 dark:active:bg-green-950/50",
                  "focus:outline-hidden focus:ring-2 focus:ring-green-500/20",
                  "text-zinc-500 dark:text-zinc-400 hover:text-green-500"
                )}
              >
                <Share2 className="w-[16px] h-[16px] transition-transform duration-300 hover:scale-110" />
                <span>{engagement?.shares}</span>
              </button>
            </div>
            <button
              type="button"
              onClick={onBookmark}
              className={cn(
                "p-1.5 rounded-full",
                "transition-all duration-300",
                "hover:bg-zinc-100/80 dark:hover:bg-zinc-800/80",
                "active:bg-zinc-200 dark:active:bg-zinc-700",
                "focus:outline-hidden focus:ring-2 focus:ring-zinc-500/20",
                engagement?.isBookmarked
                  ? "text-zinc-900 dark:text-zinc-100"
                  : "text-zinc-400"
              )}
            >
              <Bookmark
                className={cn(
                  "w-[16px] h-[16px]",
                  "transition-all duration-300",
                  "hover:scale-110",
                  "active:scale-95",
                  engagement?.isBookmarked && "fill-current"
                )}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
