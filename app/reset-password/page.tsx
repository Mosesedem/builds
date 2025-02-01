"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { toast } from "sonner"

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("")
  const [pin, setPin] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [currentStage, setCurrentStage] = useState<'email' | 'pin' | 'password'>('email')
  const [isLoading, setIsLoading] = useState(false)
  const [pinAttempts, setPinAttempts] = useState(0)
  const router = useRouter()

  const togglePasswordVisibility = (field: 'new' | 'confirm') => {
    if (field === 'new') {
      setShowNewPassword(!showNewPassword)
    } else {
      setShowConfirmPassword(!showConfirmPassword)
    }
  }

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://v2.protonmedicare.com/api'

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const response = await fetch(`${API_BASE_URL}/reset-password.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'send_email',
          email: email.trim()
        })
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()

      if (data.success) {
        toast.success(data.message)
        setCurrentStage('pin')
        setPinAttempts(0)
      } else {
        toast.error(data.message || 'Failed to send reset PIN')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Cannot connect to server. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePinVerification = async (e: React.FormEvent) => {
    e.preventDefault()
    if (pinAttempts >= 3) {
      toast.error('Too many attempts. Please request a new PIN.')
      return
    }

    setIsLoading(true)
    
    try {
      const response = await fetch(`${API_BASE_URL}/reset-password.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'verify_pin',
          email: email.trim(),
          pin: pin.trim()
        })
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()

      if (data.success) {
        toast.success(data.message)
        setCurrentStage('password')
      } else {
        setPinAttempts(prev => prev + 1)
        toast.error(data.message || 'Invalid PIN')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const validatePassword = (password: string): string | null => {
    if (password.length < 8) return 'Password must be at least 8 characters long'
    if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter'
    if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter'
    if (!/\d/.test(password)) return 'Password must contain at least one number'
    if (!/[@$!%*?&]/.test(password)) return 'Password must contain at least one special character (@$!%*?&)'
    return null
  }

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match!')
      return
    }

    const passwordError = validatePassword(newPassword)
    if (passwordError) {
      toast.error(passwordError)
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/reset-password.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'reset_password',
          email: email.trim(),
          pin: pin.trim(),
          new_password: newPassword
        })
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()

      if (data.success) {
        toast.success(data.message)
        setTimeout(() => {
          router.push('/signin')
        }, 2000)
      } else {
        toast.error(data.message || 'Failed to reset password')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendPin = async () => {
    if (isLoading) return
    setIsLoading(true)
    
    try {
      const response = await fetch(`${API_BASE_URL}/reset-password.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'resend_pin',
          email: email.trim()
        })
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()

      if (data.success) {
        toast.success(data.message)
        setPinAttempts(0)
      } else {
        toast.error(data.message || 'Failed to resend PIN')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Cannot connect to server. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>
            {currentStage === 'email' && "Enter your email to receive a reset PIN"}
            {currentStage === 'pin' && "Enter the 6-digit PIN sent to your email"}
            {currentStage === 'password' && "Create a new password for your account"}
          </CardDescription>
        </CardHeader>
        
        {currentStage === 'email' && (
          <form onSubmit={handleEmailSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="w-full"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Reset PIN'
                )}
              </Button>
            </CardContent>
          </form>
        )}

        {currentStage === 'pin' && (
          <form onSubmit={handlePinVerification}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pin">6-Digit PIN</Label>
                <Input
                  id="pin"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  placeholder="Enter PIN"
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                  required
                  disabled={isLoading}
                  className="w-full"
                />
                {pinAttempts > 0 && (
                  <p className="text-sm text-destructive">
                    Attempts remaining: {3 - pinAttempts}
                  </p>
                )}
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading || pinAttempts >= 3}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Verify PIN'
                )}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="w-full"
                onClick={handleResendPin}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Resend PIN'
                )}
              </Button>
            </CardContent>
          </form>
        )}

        {currentStage === 'password' && (
          <form onSubmit={handlePasswordReset}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="pr-10"
                    placeholder="Enter new password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-1/2 right-2 -translate-y-1/2 h-8 w-8"
                    onClick={() => togglePasswordVisibility('new')}
                    disabled={isLoading}
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    disabled={isLoading}
                    className="pr-10"
                    placeholder="Confirm new password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-1/2 right-2 -translate-y-1/2 h-8 w-8"
                    onClick={() => togglePasswordVisibility('confirm')}
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Resetting...
                  </>
                ) : (
                  'Reset Password'
                )}
              </Button>
            </CardContent>
          </form>
        )}

        <div className="p-6 pt-0 text-center">
          <Link 
            href="/signin" 
            className="text-sm text-muted-foreground hover:underline"
          >
            Back to Sign In
          </Link>
        </div>
      </Card>
    </div>
  )
}