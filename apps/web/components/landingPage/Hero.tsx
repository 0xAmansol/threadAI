"use client";

import { AIInputWithSuggestions } from "@workspace/ui/components/ai-input-with-suggestions";
import { AuroraText } from "../magicui/aurora-text";

import { HeroPillFirst } from "../magicui/announcement";

import { HeroVideoDialogDemo } from "../magicui/hero-video";
import { AvatarIcons } from "../magicui/avatar-icons";
import { SmallRating } from "../magicui/default-rating";
import { LoginButton } from "./LoginButton";

export function Hero() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-center px-4 py-40">
      <div className="flex flex-col items-center justify-center text-center space-y-3 px-4">
        <HeroPillFirst />
        <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl text-center ">
          Make every video, article, or doc <br />a{" "}
          <AuroraText className="lg:text-6xl">tweetable</AuroraText> moment.
        </h1>
        <p className="text-xl font md:text-3xl lg:text-xl text-center text-gray-600 pb-6">
          Repurpose your writings. Create catchy short-form content for social
          media in a few clicks.
        </p>

        <LoginButton></LoginButton>
        <div className=" text-sm text-muted-foreground animate-fade-in delay-400">
          No credit card required • Free plan available
        </div>
        <div className="pt-6">
          <AvatarIcons />
          <SmallRating />
        </div>
        <HeroVideoDialogDemo />
      </div>
    </div>
  );
}
