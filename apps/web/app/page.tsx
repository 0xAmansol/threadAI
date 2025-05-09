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
