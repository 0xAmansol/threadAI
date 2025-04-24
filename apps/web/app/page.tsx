import { Hero } from "@/components/landingPage/Hero";
import Navbar from "@/components/landingPage/Navbar";

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <Navbar />
      <main className="max-w-7xl w-full px-4 flex flex-1 h-full items-center justify-center">
        <Hero />
      </main>
    </div>
  );
}
