"use client"

import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EmailVerificationForm } from "@/components/EmailVerificationForm"
import { PinVerificationForm } from "@/components/PinVerificationForm"
import { UpdateEmailForm } from "@/components/UpdateEmailForm"

type VerificationStep = "initial" | "pin" | "update"

export default function VerifyEmail() {
  const searchParams = useSearchParams()
  const initialEmail = searchParams.get("email") || sessionStorage.getItem("unverifiedEmail") || ""
  
  const [email, setEmail] = useState(initialEmail)
  const [currentStep, setCurrentStep] = useState<VerificationStep>("initial")

  const handleEmailUpdated = (newEmail: string) => {
    setEmail(newEmail)
    setCurrentStep("initial")
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            {currentStep === "initial" && "Email Verification"}
            {currentStep === "pin" && "Enter Verification PIN"}
            {currentStep === "update" && "Update Email Address"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentStep === "initial" && (
            <EmailVerificationForm
              email={email}
              onPinRequest={() => setCurrentStep("pin")}
              onEditEmail={() => setCurrentStep("update")}
            />
          )}
          
          {currentStep === "pin" && (
            <PinVerificationForm
              email={email}
              onBack={() => setCurrentStep("initial")}
            />
          )}
          
          {currentStep === "update" && (
            <UpdateEmailForm
              currentEmail={email}
              onBack={() => setCurrentStep("initial")}
              onEmailUpdated={handleEmailUpdated}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}