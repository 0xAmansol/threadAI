import { FeaturesComponent } from "@/components/landingPage/Features";
import Footer from "@/components/landingPage/Footer";
import { Hero } from "@/components/landingPage/Hero";
import Hero2 from "@/components/landingPage/Hero2";
import HowItWorks from "@/components/landingPage/HowItWorks";
import Navbar from "@/components/landingPage/Navbar";
import Philosophy from "@/components/landingPage/Philosophy";
import { Banner } from "@workspace/ui/components/banner";
import { SkiperCardDemo } from "@/components/ui/HowTo";
import { BannerNewFeature } from "@/components/landingPage/Banner";
import Head from "next/head";

export const metadata = {
  title: "Amazing Website Title",
  description:
    "Create high-quality tweets by just pasting video links in seconds",
  openGraph: {
    title: "kreateAI",
    description:
      "Create high-quality tweets by just pasting video links in seconds",
    url: "https://thread-ai-web.vercel.app",
    images: [
      {
        url: "/kreateAI.png",
        width: 1200,
        height: 630,
        alt: "kreateAI Thumbnail",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@0xAmansol",
    title: "kreateAI",
    description:
      "Create high-quality tweets by just pasting video links in seconds",
    images: ["https://avatars.githubusercontent.com/u/118182376?v=4"],
  },
};

export default function Page() {
  return (
    <div className=" flex flex-col overflow-hidden bg-gradient-to-tr from-yellow-500/10 to-transparent ">
      <Navbar />
      <main>
        <Hero2 />

        <FeaturesComponent />
        {/* <SkiperCardDemo /> */}
        <Philosophy />
        <HowItWorks />
        <Footer />
      </main>
    </div>
  );
}
