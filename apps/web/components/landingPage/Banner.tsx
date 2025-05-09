import { Banner } from "@workspace/ui/components/banner";
import { ArrowRight } from "lucide-react";

function BannerNewFeature() {
  return (
    <Banner variant="muted" className="dark text-foreground">
      <div className="w-full">
        <p className="flex justify-center text-sm">
          <a href="#" className="group">
            <span className="me-1 text-base leading-none">✨</span>
            Introducing transactional and marketing emails
            <ArrowRight
              className="-mt-0.5 ms-2 inline-flex opacity-60 transition-transform group-hover:translate-x-0.5"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
          </a>
        </p>
      </div>
    </Banner>
  );
}

export { BannerNewFeature };
