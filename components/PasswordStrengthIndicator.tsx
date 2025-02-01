import { cn } from "@/lib/utils"

interface PasswordStrengthIndicatorProps {
  password: string
  className?: string
}

export const PasswordStrengthIndicator = ({ password, className }: PasswordStrengthIndicatorProps) => {
  const getPasswordStrength = (password: string): number => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  const strength = getPasswordStrength(password)
  const strengthText = ["Very Weak", "Weak", "Medium", "Strong", "Very Strong"]
  const strengthColor = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-lime-500",
    "bg-green-500",
  ]

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex gap-1 h-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "flex-1 rounded-full transition-all duration-300",
              index < strength ? strengthColor[strength - 1] : "bg-gray-200"
            )}
          />
        ))}
      </div>
      {password && (
        <p
          className={cn(
            "text-xs transition-all duration-300",
            strength <= 1 ? "text-red-500" :
            strength === 2 ? "text-orange-500" :
            strength === 3 ? "text-yellow-500" :
            strength === 4 ? "text-lime-500" :
            "text-green-500"
          )}
        >
          {strengthText[strength - 1]}
        </p>
      )}
    </div>
  )
}