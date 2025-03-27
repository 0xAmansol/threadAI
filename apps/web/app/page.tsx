import { Hero } from "@/components/landingPage/Hero";
import Navbar from "@/components/landingPage/Navbar";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex h-full items-center justify-center">
        <Hero />
      </main>
    </div>
  );
}
