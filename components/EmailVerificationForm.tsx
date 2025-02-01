"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail, Loader2 } from "lucide-react"
import { toast } from "sonner"

interface EmailVerificationFormProps {
  email: string
  onPinRequest: () => void
  onEditEmail: () => void
}

export function EmailVerificationForm({ email, onPinRequest, onEditEmail }: EmailVerificationFormProps) {
  const [isResending, setIsResending] = useState(false)

  const resendVerification = async () => {
    setIsResending(true)
    try {
      const response = await fetch("https://v2.protonmedicare.com/api/verify-email.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          action: 'resend-code',
          email 
        })
      })
      
      const data = await response.json()
      if (data.success) {
        toast.success("Verification email sent! Please check your inbox.")
        onPinRequest()
      } else {
        toast.error(data.message || "Failed to resend verification email")
      }
    } catch (error) {
      console.error("Resend error:", error)
      toast.error("An error occurred while resending verification")
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <p className="text-muted-foreground">Verification email sent to:</p>
        <p className="font-medium">{email}</p>
      </div>
      
      <div className="space-y-4">
        <Button
          onClick={resendVerification}
          variant="default"
          className="w-full bg-teal-600 hover:bg-teal-700"
          disabled={isResending}
        >
          {isResending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
          <Mail className="h-4 w-4 mr-2" />
          Resend Verification Email
        </Button>
        
        <Button
          onClick={onEditEmail}
          variant="outline"
          className="w-full"
        >
          Edit Email Address
        </Button>
      </div>
    </div>
  )
}