import { cn } from "@/lib/utils"

interface StepProgressProps {
  currentStep: number
  totalSteps: number
  className?: string
}

export const StepProgress = ({ currentStep, totalSteps, className }: StepProgressProps) => {
  return (
    <div className={cn("w-full space-y-2", className)}>
      <div className="flex justify-between mb-1">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300",
              index + 1 <= currentStep
                ? "border-teal-500 bg-teal-500 text-white"
                : "border-gray-300 text-gray-500"
            )}
          >
            {index + 1}
          </div>
        ))}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1.5 relative overflow-hidden">
        <div
          className="bg-teal-500 h-full rounded-full transition-all duration-300 animate-progress"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  )
}