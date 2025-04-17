import React from "react";
import TweetCard from "./TweetCard";

interface ThreadPreviewProps {
  title: string;
  posts: string[];
  onEdit?: (index: number, newText: string) => void;
}

const ThreadPreview2 = ({ title, posts, onEdit }: ThreadPreviewProps) => {
  return (
    <div className="w-full flex flex-col items-center space-y-1">
      {posts?.map((post, index) => (
        <TweetCard
          key={index}
          content={{ text: post }}
          isFirst={index === 0}
          isLast={index === posts.length - 1}
        />
      ))}
    </div>
  );
};

export default ThreadPreview2;
