import { TextParticle } from "@workspace/ui/components/text-particle";

export function DashboardMain() {
  return (
    <main className="flex max-h-screen h-36 flex-col items-center justify-center p-4 pt-52 z-10 mr-4">
      <div className="w-full max-w-4xl space-y-8">
        <div className="h-64 w-full  border-gray-200 rounded-lg overflow-hidden">
          <TextParticle
            text="ThreadAI"
            fontSize={150}
            particleColor="gray"
            particleSize={1}
            particleDensity={5}
          />
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-48 w-full border border-gray-200 rounded-lg overflow-hidden bg-gray-900">
            <TextParticle
              text="Nextjs"
              fontSize={100}
              particleColor="#f43f5e"
              particleSize={1}
              particleDensity={8}
              backgroundColor="#111827"
            />
          </div>

          <div className="h-48 w-full border border-gray-200 rounded-lg overflow-hidden">
            <TextParticle
              text="Designali"
              fontSize={60}
              particleColor="#10b981"
              particleSize={1}
              particleDensity={4}
            />
          </div>
        </div> */}
      </div>
    </main>
  );
}
