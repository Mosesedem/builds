"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface PinVerificationFormProps {
  email: string
  onBack: () => void
}

export function PinVerificationForm({ email, onBack }: PinVerificationFormProps) {
  const [pin, setPin] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const verifyPin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!pin.trim()) {
      toast.error("Please enter the verification PIN")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("https://v2.protonmedicare.com/api/verify-email.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          action: 'verify',
          pin,
          email 
        })
      })
      
      const data = await response.json()
      if (data.success) {
        toast.success("Email verified successfully!")
        sessionStorage.removeItem("unverifiedEmail")
        setTimeout(() => router.push("/signin"), 2000)
      } else {
        toast.error(data.message || "Verification failed")
      }
    } catch (error) {
      console.error("Verification error:", error)
      toast.error("An error occurred during verification")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={verifyPin} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="pin">Enter Verification PIN</Label>
        <Input
          id="pin"
          type="text"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="Enter the PIN from your email"
          className="text-center text-lg tracking-wider"
          maxLength={6}
        />
      </div>
      
      <div className="space-y-4">
        <Button 
          type="submit" 
          className="w-full bg-teal-600 hover:bg-teal-700"
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
          Verify PIN
        </Button>
        
        <Button
          type="button"
          variant="ghost"
          className="w-full"
          onClick={onBack}
        >
          Back
        </Button>
      </div>
    </form>
  )
}