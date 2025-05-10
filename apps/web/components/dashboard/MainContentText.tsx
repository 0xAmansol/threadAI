import { TextParticle } from "@workspace/ui/components/text-particle";

export function DashboardMain() {
  return (
    <main className="flex flex-col items-center justify-center px-4 pt-24 md:pt-52 z-10 w-full max-h-screen">
      <div className="w-full max-w-4xl space-y-8">
        <div className="h-64 w-full rounded-lg overflow-hidden">
          <TextParticle
            text="kreateAI"
            fontSize={100} // adjust for mobile view
            particleColor="yellow"
            particleSize={1}
            particleDensity={5}
          />
        </div>

        {/* Optional: Keep this commented block as a responsive grid if needed later */}
        {/* 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-48 w-full border border-gray-200 rounded-lg overflow-hidden bg-gray-900">
            <TextParticle
              text="Nextjs"
              fontSize={80}
              particleColor="#f43f5e"
              particleSize={1}
              particleDensity={8}
              backgroundColor="#111827"
            />
          </div>

          <div className="h-48 w-full border border-gray-200 rounded-lg overflow-hidden">
            <TextParticle
              text="Designali"
              fontSize={50}
              particleColor="#10b981"
              particleSize={1}
              particleDensity={4}
            />
          </div>
        </div> 
        */}
      </div>
    </main>
  );
}
