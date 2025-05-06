import { FeaturesComponent } from "@/components/landingPage/Features";
import { Hero } from "@/components/landingPage/Hero";
import Navbar from "@/components/landingPage/Navbar";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <Navbar />
      <main>
        <Hero />
        <FeaturesComponent />
      </main>
    </div>
  );
}
