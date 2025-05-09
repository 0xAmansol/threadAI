"use client";
import { HeroPill } from "@workspace/ui/components/hero-pill";

export function HeroPillFirst() {
  return (
    <HeroPill
      href="https://badget.tech/blog/introducing-Badget-ai"
      label="Introducing kreateAI"
      announcement="beta✨"
      isExternal
      className="bg-gradient-to-r from-[hsl(50,100%,85%,0.4)] via-[hsl(48,100%,80%,0.4)] to-[hsl(45,100%,75%,0.4)] 
           ring-[hsl(48,100%,80%)] 
           [&_div]:bg-[hsl(51,47%,94%)] 
           [&_div]:text-[hsl(40,100%,30%)] 
           [&_p]:text-[#000000] 
           
           [&_svg_path]:fill-[hsl(40,100%,30%)]"
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
