import React from "react";
import TweetCard from "./TweetCard";
import Btn08 from "../ui/kokonutui/btn-08";

interface ThreadPreviewProps {
  title: string;
  posts: string[];
  onEdit?: (index: number, newText: string) => void;
}

const ThreadPreview2 = ({ title, posts, onEdit }: ThreadPreviewProps) => {
  return (
    <div className="w-full flex flex-col items-center space-y-4 ">
      <h2 className="text-2xl font-semibold text-center">{title}</h2>
      <div className="w-full flex flex-col items-center space-y-1">
        {posts?.map((post, index) => (
          <TweetCard
            key={index}
            content={{ text: post }}
            isFirst={index === 0}
            isLast={index === posts.length - 1}
          />
        ))}
        {/* add functionality to button to share on x */}
        <Btn08 thread={posts} />
      </div>
    </div>
  );
};

export default ThreadPreview2;
