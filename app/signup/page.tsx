"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff } from "lucide-react"
import { Toaster, toast } from "sonner"
import { Slideshow } from "@/components/Slideshow"
import { useLayoutConfig } from "@/contexts/LayoutConfigContext"

interface FormData {
  first_name: string
  last_name: string
  phone_number: string
  email: string
  password: string
  confirmPassword: string
}

export default function SignUpPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password: "",
    confirmPassword: ""
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordError, setPasswordError] = useState("")
  const router = useRouter()
  const { setConfig } = useLayoutConfig()


  useEffect(() => {
    setConfig({ hideHeader: false, hideFooter: true })
    return () => setConfig({ hideHeader: false, hideFooter: false })
  }, [setConfig])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear password error when user types
    if (name === "password" || name === "confirmPassword") {
      setPasswordError("")
    }
  }

  const validateForm = (): boolean => {
    // Check for empty fields
    const requiredFields = ['first_name', 'last_name', 'phone_number', 'email', 'password', 'confirmPassword'] as const
    for (const field of requiredFields) {
      if (!formData[field].trim()) {
        toast.error(`${field.replace('_', ' ').charAt(0).toUpperCase() + field.slice(1)} is required`)
        return false
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address")
      return false
    }

    // Validate phone number (basic validation)
    const phoneRegex = /^\d{11}$/
    if (!phoneRegex.test(formData.phone_number)) {
      toast.error("Please enter a valid 11-digit phone number")
      return false
    }

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match")
      return false
    }

    // Validate password strength
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(formData.password)) {
      setPasswordError(
        "Password must be at least 6 characters long and contains a combination of letters and numbers"
      )
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
  
    setIsLoading(true)
    
    // Create FormData object for submission
    const submitData = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== 'confirmPassword') { // Don't send confirmPassword to server
        submitData.append(key, value)
      }
    })
    
    try {
      const response = await fetch("https://v2.protonmedicare.com/api/signup.php", {
        method: "POST",
        body: submitData
      })
  
      // First check if the response is JSON
      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned non-JSON response")
      }
  
      const data = await response.json()
  
      if (data.success) {
        toast.success(data.message)
        // Start session
        sessionStorage.setItem("user", JSON.stringify({
          email: formData.email,
          firstName: formData.first_name,
          isVerified: false
        }))
        
        setTimeout(() => {
          router.push(data.redirect || "/verify-email")
        }, 2000)
      } else {
        toast.error(data.message || "Registration failed. Please try again.")
      }
    } catch (error) {
      console.error("Error:", error)
      if (error instanceof Error) {
        if (error.message === "Server returned non-JSON response") {
          toast.error("Server error. Please try again later.")
        } else {
          toast.error("Connection error. Please check your internet connection.")
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
    if (field === 'password') {
      setShowPassword(!showPassword)
    } else {
      setShowConfirmPassword(!showConfirmPassword)
    }
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen p-4">
      <Toaster position="top-center" richColors closeButton />
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
          <CardDescription>Create an account to get started</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <CardContent className="space-y-4">
            {/* First Name */}
            <div className="space-y-2">
              <Label htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                name="first_name"
                type="text"
                placeholder="e.g Esther"
                value={formData.first_name}
                onChange={handleChange}
                required
                className="focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                name="last_name"
                type="text"
                placeholder="e.g: Okokon"
                value={formData.last_name}
                onChange={handleChange}
                required
                className="focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <Label htmlFor="phone_number">Phone Number</Label>
              <Input
                id="phone_number"
                name="phone_number"
                type="tel"
                placeholder="e.g: 08012345678"
                value={formData.phone_number}
                onChange={handleChange}
                required
                maxLength={11}
                className="focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="focus:ring-2 focus:ring-teal-500"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="pr-10 focus:ring-2 focus:ring-teal-500"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-1/2 right-2 -translate-y-1/2 h-8 w-8"
                  onClick={() => togglePasswordVisibility('password')}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="pr-10 focus:ring-2 focus:ring-teal-500"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-1/2 right-2 -translate-y-1/2 h-8 w-8"
                  onClick={() => togglePasswordVisibility('confirmPassword')}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              {passwordError && (
                <p className="text-sm text-destructive mt-1">{passwordError}</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full bg-teal-600 hover:bg-teal-700" 
              disabled={isLoading}
            >
              {isLoading ? "Signing up..." : "Sign Up"}
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <Link href="/signin" className="text-teal-600 hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
            <div className="flex-1 hidden md:block">
              <Slideshow />
            </div>
    </div>
    
  )
}