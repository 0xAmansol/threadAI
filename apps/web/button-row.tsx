import { Camera, FileCode, LayoutDashboard, Droplet, Calculator } from "lucide-react"
import { ReflectiveButton } from "./components/reflective-button"

export default function ButtonRow() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-wrap justify-center gap-1.5 p-4 max-w-4xl">
        <ReflectiveButton
          variant="outline"
          className="h-8 px-3 rounded-full bg-white hover:bg-white text-gray-700 shadow-sm border border-gray-200 text-[13px] font-medium whitespace-nowrap inline-flex items-center"
        >
          <Camera className="w-3.5 h-3.5 stroke-[1.5px]" />
          Clone a Screenshot
        </ReflectiveButton>

        <ReflectiveButton
          variant="outline"
          className="h-8 px-3 rounded-full bg-white hover:bg-white text-gray-700 shadow-sm border border-gray-200 text-[13px] font-medium whitespace-nowrap inline-flex items-center"
        >
          <FileCode className="w-3.5 h-3.5 stroke-[1.5px]" />
          Import from Figma
        </ReflectiveButton>

        <ReflectiveButton
          variant="outline"
          className="h-8 px-3 rounded-full bg-white hover:bg-white text-gray-700 shadow-sm border border-gray-200 text-[13px] font-medium whitespace-nowrap inline-flex items-center"
        >
          <LayoutDashboard className="w-3.5 h-3.5 stroke-[1.5px]" />
          Landing Page
        </ReflectiveButton>

        <ReflectiveButton
          variant="outline"
          className="h-8 px-3 rounded-full bg-white hover:bg-white text-gray-700 shadow-sm border border-gray-200 text-[13px] font-medium whitespace-nowrap inline-flex items-center"
        >
          <Droplet className="w-3.5 h-3.5 stroke-[1.5px]" />
          Sign Up Form
        </ReflectiveButton>

        <ReflectiveButton
          variant="outline"
          className="h-8 px-3 rounded-full bg-white hover:bg-white text-gray-700 shadow-sm border border-gray-200 text-[13px] font-medium whitespace-nowrap inline-flex items-center"
        >
          <Calculator className="w-3.5 h-3.5 stroke-[1.5px]" />
          Calculate Factorial
        </ReflectiveButton>
      </div>
    </div>
  )
}
