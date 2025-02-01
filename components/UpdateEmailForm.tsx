"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

interface UpdateEmailFormProps {
  currentEmail: string
  onBack: () => void
  onEmailUpdated: (newEmail: string) => void
}

export function UpdateEmailForm({ currentEmail, onBack, onEmailUpdated }: UpdateEmailFormProps) {
  const [email, setEmail] = useState(currentEmail)
  const [password, setPassword] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)

  const updateEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !password.trim()) {
      toast.error("Please fill in all fields")
      return
    }

    setIsUpdating(true)
    try {
      const response = await fetch("https://v2.protonmedicare.com/api/verify-email.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          action: 'update-email',
          new_email: email,
          password
        })
      })
      
      const data = await response.json()
      if (data.success) {
        toast.success("Email updated! Please verify your new email.")
        sessionStorage.setItem("unverifiedEmail", email)
        onEmailUpdated(email)
      } else {
        toast.error(data.message || "Failed to update email")
      }
    } catch (error) {
      console.error("Email update error:", error)
      toast.error("An error occurred while updating email")
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <form onSubmit={updateEmail} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">New Email Address</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter new email address"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Confirm Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <Button 
          type="submit" 
          className="w-full bg-teal-600 hover:bg-teal-700"
          disabled={isUpdating}
        >
          {isUpdating && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
          Update Email
        </Button>
        
        <Button
          type="button"
          variant="ghost"
          className="w-full"
          onClick={onBack}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}