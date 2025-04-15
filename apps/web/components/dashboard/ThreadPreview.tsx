// apps/web/components/ThreadPreview.tsx
import { useState } from "react";

interface ThreadPreviewProps {
  title: string;
  posts: string[];
  onEdit?: (index: number, newText: string) => void;
}

export default function ThreadPreview({
  title,
  posts,
  onEdit,
}: ThreadPreviewProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>("");

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditingText(posts[index] || "");
  };

  const handleSave = (index: number) => {
    if (onEdit) {
      onEdit(index, editingText);
    }
    setEditingIndex(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-2">Your Thread</h2>
      <h3 className="text-lg text-gray-600 mb-4">Based on: {title}</h3>

      <div className="space-y-4">
        {posts?.map((post, index) => (
          <div key={index} className="border border-gray-200 rounded-md p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
                <span className="ml-2 font-medium">Post {index + 1}</span>
              </div>

              {onEdit && (
                <button
                  onClick={() =>
                    editingIndex === index
                      ? handleSave(index)
                      : handleEdit(index)
                  }
                  className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md"
                >
                  {editingIndex === index ? "Save" : "Edit"}
                </button>
              )}
            </div>

            {editingIndex === index ? (
              <textarea
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-800">{post}</p>
            )}

            <div className="mt-2 text-right text-gray-500 text-sm">
              {post.length} characters
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
