"use client";

import { useEffect, useState, useRef } from "react";
import { Bookmark, ChevronRight, TelescopeIcon } from "lucide-react";
import { ReflectiveButton } from "@/components/reflective-button";

import { ThreadCardDialog } from "@/components/dashboard/history/ThreadCardDialog";
import { LinkButton } from "@/components/ui/LinkButton";

// Define thread interface
export interface Thread {
  id?: string;
  title?: string;
  video_title?: string;
  thumbnail_url?: string;
  video_url?: string;
  category?: string;
  posts?: string[];
  username?: string;
  user_profile_picture?: string;
}

// Define section types for organizing threads
interface FeaturedSection {
  type: "featured";
  thread: Thread;
  index: number;
}

interface RowSection {
  type: "row";
  threads: Array<{ thread: Thread; index: number }>;
}

type DisplaySection = FeaturedSection | RowSection;

// Simple spinner component
function Spinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
  );
}

export default function DiscoverPage() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("Top");
  const [filteredThreads, setFilteredThreads] = useState<Thread[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [featuredIndices, setFeaturedIndices] = useState<number[]>([]);
  const filterContainerRef = useRef<HTMLDivElement>(null);

  // Categories matching the image
  const categories: string[] = [
    "Top",
    "For You",
    "Tech & Science",
    "Finance",
    "Arts & Culture",
    "Sports",
    "Business",
  ];

  // Update filteredThreads when activeFilter or threads change
  useEffect(() => {
    if (!Array.isArray(threads)) {
      setFilteredThreads([]);
      return;
    }

    let filtered =
      activeFilter === "Top"
        ? [...threads]
        : threads.filter((thread) => thread.category === activeFilter);

    if (searchQuery) {
      filtered = filtered.filter((thread) =>
        thread.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredThreads(filtered);
  }, [activeFilter, threads, searchQuery]);

  // Generate featured indices when filtered threads change
  useEffect(() => {
    if (Array.isArray(filteredThreads) && filteredThreads.length > 0) {
      // Always include first thread (index 0)
      const indices: number[] = [0];

      // Determine how many additional featured cards to show based on total threads
      // About 1 featured card per 5 threads, no maximum limit
      const additionalFeatured = Math.floor(filteredThreads.length / 5);

      // Generate unique random indices for additional featured cards
      // Start from 1 to avoid the first thread which is already featured
      let attempts = 0;
      while (indices.length < additionalFeatured + 1 && attempts < 50) {
        // Select from indices 1 and beyond (since 0 is already included)
        const randomIndex =
          Math.floor(Math.random() * (filteredThreads.length - 1)) + 1;
        if (!indices.includes(randomIndex)) {
          indices.push(randomIndex);
        }
        attempts++;
      }

      setFeaturedIndices(indices);
    } else {
      setFeaturedIndices([]);
    }
  }, [filteredThreads]);

  // Fetch threads
  useEffect(() => {
    const fetchThreads = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/generate-thread");
        if (!res.ok) throw new Error("Failed to fetch threads");
        const data = await res.json();

        if (Array.isArray(data)) {
          setThreads(data);
        } else if (data && Array.isArray(data.threads)) {
          setThreads(data.threads);
        } else {
          console.error("Invalid data format returned from API:", data);
          setError("Invalid data format returned from API");
        }
      } catch (error: any) {
        console.error("Error fetching threads:", error);
        setError(error.message || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchThreads();
  }, []);

  // Function to check if an index is featured
  const isFeatured = (index: number): boolean =>
    featuredIndices.includes(index);

  // Arrange threads into an organized display array
  const organizeThreads = (): DisplaySection[] => {
    if (!Array.isArray(filteredThreads) || filteredThreads.length === 0)
      return [];

    // Create a copy of the threads array to work with
    const threadsCopy = [...filteredThreads];
    const displayThreads: DisplaySection[] = [];
    let currentRow: Array<{ thread: Thread; index: number }> = [];
    let smallCardBuffer: Array<{ thread: Thread; index: number }> = [];

    // First pass: separate featured and regular cards
    const featuredCards: Array<{ thread: Thread; index: number }> = [];
    const smallCards: Array<{ thread: Thread; index: number }> = [];

    threadsCopy.forEach((thread, index) => {
      if (isFeatured(index)) {
        featuredCards.push({ thread, index });
      } else {
        smallCards.push({ thread, index });
      }
    });

    // Second pass: organize into proper layout
    let smallCardIndex = 0;

    // Process each featured card
    featuredCards.forEach((featuredItem) => {
      // If we have small cards in buffer, add them as a row
      if (smallCardBuffer.length >= 2) {
        displayThreads.push({ type: "row", threads: [...smallCardBuffer] });
        smallCardBuffer = [];
      }
      // If we have 1 small card in buffer, see if we can add more before featured
      else if (smallCardBuffer.length === 1) {
        // Try to add more small cards to make a proper row
        while (
          smallCardBuffer.length < 3 &&
          smallCardIndex < smallCards.length
        ) {
          smallCardBuffer.push(smallCards[smallCardIndex]!);
          smallCardIndex++;
        }
        displayThreads.push({ type: "row", threads: [...smallCardBuffer] });
        smallCardBuffer = [];
      }

      // Add the featured card
      displayThreads.push({
        type: "featured",
        thread: featuredItem.thread,
        index: featuredItem.index,
      });

      // Add some small cards after the featured (if available)
      const cardsToAdd = Math.min(3, smallCards.length - smallCardIndex);
      if (cardsToAdd > 0) {
        const rowCards: Array<{ thread: Thread; index: number }> = [];
        for (let i = 0; i < cardsToAdd; i++) {
          if (smallCardIndex < smallCards.length) {
            rowCards.push(smallCards[smallCardIndex]!);
            smallCardIndex++;
          }
        }

        // Only add as row if we have 2 or 3 cards
        if (rowCards.length >= 2) {
          displayThreads.push({ type: "row", threads: rowCards });
        } else {
          // Otherwise add to buffer for later
          smallCardBuffer = [...smallCardBuffer, ...rowCards];
        }
      }
    });

    // Process any remaining small cards
    while (smallCardIndex < smallCards.length) {
      const rowCards: Array<{ thread: Thread; index: number }> = [];
      // Try to create a row of 3 or 2 cards
      const targetSize = smallCards.length - smallCardIndex >= 3 ? 3 : 2;

      for (let i = 0; i < targetSize; i++) {
        if (smallCardIndex < smallCards.length) {
          rowCards.push(smallCards[smallCardIndex]!);
          smallCardIndex++;
        }
      }

      // Add the row if it has cards
      if (rowCards.length >= 2) {
        displayThreads.push({ type: "row", threads: rowCards });
      } else if (rowCards.length === 1) {
        // If only 1 card is left, add to buffer
        smallCardBuffer.push(rowCards[0]!);
      }
    }

    // Handle any remaining buffered cards
    if (smallCardBuffer.length >= 2) {
      displayThreads.push({ type: "row", threads: smallCardBuffer });
    } else if (smallCardBuffer.length === 1) {
      // If only 1 small card is left with no place to put it,
      // convert it to a featured card as a last resort
      displayThreads.push({
        type: "featured",
        thread: smallCardBuffer[0]?.thread || {},
        index: smallCardBuffer[0]?.index || 1,
      });
    }

    return displayThreads;
  };

  const displayThreads = organizeThreads();

  return (
    <div className="w-3xl mx-auto bg-white dark:bg-black">
      {/* Header - Now sticky */}
      <div className="sticky top-0 bg-white dark:bg-black z-10 pb-3 pt-3">
        <div className="flex items-center gap-2 pt-2 pb-2">
          <TelescopeIcon className="size-7 mr-1" />
          <h1
            className="text-3xl font-bold text-neutral-800 dark:text-neutral-200"
            style={{ letterSpacing: "-0.001em" }}
          >
            Discover
          </h1>
        </div>
      </div>

      {/* Category filters with fade effect */}
      <div
        ref={filterContainerRef}
        className="sticky top-16 z-10 pb-7 max-w-5xl"
      >
        <div className="relative">
          <div className="flex overflow-x-hidden gap-2 h-12 bg-white dark:bg-black justify-center items-center max-w-5xl">
            {categories.map((category) => (
              <ReflectiveButton
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`h-8 px-3 rounded-full bg-white dark:bg-black hover:bg-white text-gray-700 dark:text-gray-200 shadow-sm border border-gray-200 dark:border-neutral-800 text-[13px] font-medium whitespace-nowrap inline-flex items-center ${
                  activeFilter === category
                    ? "bg-gray-100 text-gray-800 font-bold"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                }`}
                style={{ letterSpacing: "-0.01em" }}
                variant="default"
              >
                {category === "Top" && <span className="text-blue-500">★</span>}
                {category === "For You" && <span>👤</span>}
                {category === "Tech & Science" && <span>🔬</span>}
                {category === "Finance" && <span>💰</span>}
                {category === "Arts & Culture" && <span>🎭</span>}
                {category === "Sports" && <span>🏆</span>}
                {category === "Business" && <span>📊</span>}
                {category}
              </ReflectiveButton>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-7 pointer-events-none bg-gradient-to-b from-white to-transparent dark:from-black" />
      </div>

      {/* Content area */}
      {isLoading ? (
        <div className="flex justify-center mt-20">
          <Spinner />
        </div>
      ) : error ? (
        <div className="text-center text-red-500">
          <p>Error: {error}</p>
        </div>
      ) : Array.isArray(filteredThreads) && filteredThreads.length === 0 ? (
        <div className="flex text-center text-gray-500 justify-center items-center mt-20">
          <Spinner />
        </div>
      ) : Array.isArray(filteredThreads) ? (
        <div className="space-y-6">
          {/* Display organized threads */}
          {displayThreads.map((section, sectionIndex) => {
            // Featured card (large)
            if (section.type === "featured") {
              const thread = section.thread;
              return (
                <div
                  key={`featured-${sectionIndex}`}
                  className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative">
                    <img
                      src={
                        thread.thumbnail_url ||
                        "/placeholder.svg?height=400&width=800"
                      }
                      alt={thread.title || "Featured article"}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-neutral-300">
                      {thread.video_title || "Featured article"}
                    </h2>
                    <p className="text-gray-600 dark:text-neutral-400 mb-4 leading-relaxed">
                      {thread.posts?.[0] ||
                        "The latest trending content from our community. Check out this featured article and discover more below."}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full overflow-hidden">
                          <img
                            src={
                              thread.user_profile_picture ||
                              "/placeholder.svg?height=24&width=24"
                            }
                            alt="Author"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-sm text-gray-500 dark:text-neutral-300">
                          {thread.username || "username"}
                        </span>
                      </div>
                      <div className="flex justify-center items-center gap-3">
                        <ThreadCardDialog thread={thread} />
                        <LinkButton url={thread.video_url || ""} />

                        <button className="text-gray-400 hover:text-blue-400">
                          <Bookmark className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            // Row of smaller cards
            else if (section.type === "row") {
              return (
                <div
                  key={`row-${sectionIndex}`}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                  {section.threads.map(({ thread, index }) => (
                    <div
                      key={thread.id || `thread-${index}`}
                      className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="h-40 bg-gray-100 relative overflow-hidden">
                        <img
                          src={
                            thread.thumbnail_url ||
                            `/placeholder.svg?height=160&width=300`
                          }
                          alt={thread.title || "Article preview"}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="font-bold text-base mb-2 line-clamp-2 text-gray-900 dark:text-neutral-300">
                          {thread.video_title || `Article ${index + 1}`}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-neutral-400 mb-3 line-clamp-2 leading-relaxed">
                          {thread.posts?.[0] ||
                            "According to recent updates, this content is trending in the community..."}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full overflow-hidden">
                              <img
                                src={
                                  thread.user_profile_picture ||
                                  "/placeholder.svg?height=20&width=20"
                                }
                                alt="Author"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="text-xs text-gray-500 dark:text-neutral-300">
                              {thread.username || "username"}
                            </span>
                          </div>
                          <button className="text-gray-400 hover:text-blue-400">
                            <Bookmark className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            }
            return null;
          })}
        </div>
      ) : (
        <div className="text-center text-red-500">
          <p>Error: Threads data is not in the expected format</p>
        </div>
      )}
    </div>
  );
}
