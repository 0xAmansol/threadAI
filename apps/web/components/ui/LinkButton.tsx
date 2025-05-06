import Link from "next/link";
import { Button } from "@workspace/ui/components/button";
import { Globe2, SquareArrowOutUpRight } from "lucide-react";

interface LinkButtonProps {
  url: string;
}

function LinkButton({ url }: LinkButtonProps) {
  const handleClick = () => {
    console.log(url);
  };

  return (
    <Link href={url || "#"} passHref legacyBehavior>
      <a
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex -space-x-px rounded-lg shadow-sm shadow-black/5 rtl:space-x-reverse"
      >
        <Button
          className="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10 w-auto h-8 text-sm text-neutral-600 dark:text-neutral-400"
          variant="outline"
          onClick={handleClick}
        >
          <Globe2 className="w-4 h-4 mr-1" />
          source
        </Button>
        <Button
          className="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10 w-8 h-8"
          variant="outline"
          size="icon"
          aria-label="Open link"
        >
          <SquareArrowOutUpRight size={12} strokeWidth={1} aria-hidden="true" />
        </Button>
      </a>
    </Link>
  );
}

export { LinkButton };
