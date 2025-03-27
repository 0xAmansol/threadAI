"use client";
import { HeroPill } from "@workspace/ui/components/hero-pill";

export function HeroPillFirst() {
  return (
    <HeroPill
      href="https://badget.tech/blog/introducing-Badget-ai"
      label="Introducing Badget.ai"
      announcement="📣 Announcement"
      isExternal
      className="bg-[hsl(187,80.8%,34.7%)]/20 ring-[hsl(210,40%,96.1%)] [&_div]:bg-[hsl(210,40%,96.1%)] [&_div]:text-[hsl(187,80.8%,34.7%)] [&_p]:text-[hsl(187,80.8%,34.7%)] [&_svg_path]:fill-[hsl(187,80.8%,34.7%)]"
    />
  );
}

export function HeroPillSecond() {
  return (
    <HeroPill
      href="https://supavec-ship-letter.beehiiv.com/p/supavec-s-first-update-tysm-for-joining"
      label="PDF files are now supported"
      announcement="🛠️ New"
      isExternal
    />
  );
}
