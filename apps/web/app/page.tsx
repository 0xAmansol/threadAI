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

export default function Page() {
  return (
    <div className=" flex flex-col overflow-hidden bg-gradient-to-tr from-yellow-500/10 to-transparent ">
      <Head>
        <title>Amazing Website Title</title>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="kreateAI" />
        <meta
          name="twitter:description"
          content="Create high-quality tweets by just pasting video links in seconds"
        />
        <meta
          name="twitter:image"
          content="https://avatars.githubusercontent.com/u/118182376?v=4"
        />
        <meta name="twitter:url" content="https://thread-ai-web.vercel.app/" />
        <meta name="twitter:site" content="@0xAmansol" />
      </Head>
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
