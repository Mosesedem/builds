"use client"

import React, { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEnrollmentForm } from "@/hooks/useEnrollmentForm"
import { PersonalInfoStep } from "@/components/PersonalInfoStep"
import { AdditionalInfoStep } from "@/components/AdditionalInfoStep"
import { PreviewStep } from "@/components/PreviewStep"
import PaymentChoiceDialog from "@/components/PaymentChoiceDialog"
import Script from "next/script"
import { useLayoutConfig } from "@/contexts/LayoutConfigContext"
import { Eye, EyeOff, LoaderCircle, RefreshCw } from "lucide-react"
import { Slideshow } from "@/components/Slideshow"
import { Toaster, toast } from "sonner"

declare global {
  interface Window {
    PaystackPop: any
  }
}

const API_BASE = "https://v2.protonmedicare.com/api/actions"

export const checkEmail = async (email: string) => {
  const response = await fetch(`${API_BASE}/dapp.php?action=checkEmail`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  })
  return response.json()
}

export const login = async (email: string, password: string) => {
  const response = await fetch(`${API_BASE}/dapp.php?action=login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
  return response.json()
}

export const register = async (email: string, password: string, firstName: string, lastName: string) => {
  const response = await fetch(`${API_BASE}/dapp.php?action=register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, firstName, lastName }),
  })
  return response.json()
}

export const createEnrollment = async (formData: FormData) => {
  formData.append("action", "create-enrollment")

  try {
    const response = await fetch(`${API_BASE}/dapp.php`, {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    console.log("Create enrollment response:", result)
    return result
  } catch (error) {
    console.error("Error in createEnrollment:", error)
    throw error
  }
}

export interface ApiResponse {
  success: boolean
  message: string
  exists?: boolean
  paymentUrl?: string
  enrollment_id?: number
  reference?: string
}

export interface PaymentData {
  email: string
  price: number
  plan: string
  enrollment_id: number
  paymentType: "subscription" | "onetime"
}

export const initiatePayment = async (data: PaymentData) => {
  const response = await fetch(`${API_BASE}/dapp.php?action=initiate-payment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  return response.json()
}

export default function EnrollmentForm() {
  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<"login" | "register">("login")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPaymentChoice, setShowPaymentChoice] = useState(false)
  const {
    formData,
    price,
    previewImage,
    handleFileChange,
    handleSelectChange,
    setFormData,
  } = useEnrollmentForm()
  const [enrollmentId, setEnrollmentId] = useState<number | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const { setConfig } = useLayoutConfig()
  const firstInputRef = useRef<HTMLInputElement>(null)

  // Effect for Paystack script
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://js.paystack.co/v1/inline.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  // Effect for keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault()
        if (currentStep < 3) {
          handleNextStep()
        } else {
          handleSubmit(e as unknown as React.FormEvent)
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentStep])

  // Effect for autofocus
  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus()
    }
  }, [currentStep])

  // Effect for layout configuration
  useEffect(() => {
    setConfig({ hideHeader: false, hideFooter: true })
    return () => setConfig({ hideHeader: false, hideFooter: false })
  }, [setConfig])

  const handleNextStep = () => {
    // if (currentStep === 1 && !validateStep1(formData)) return
    // if (currentStep === 2 && !validateStep2(formData)) return
    setCurrentStep((prev) => Math.min(prev + 1, 3))
  }

  const handlePreviousStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1))

  const handleReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      headshot: null,
      dob: "",
      maritalStatus: "",
      plan: "",
      duration: "",
      referral: "",
    })
    setCurrentStep(1)
    setShowModal(false)
    setShowPaymentChoice(false)
    setEnrollmentId(null)
    setPassword("")
    setConfirmPassword("")
    toast.success("Form has been reset")
  }

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\+?[0-9]\d{1,14}$/
    return phoneRegex.test(phone) && phone.length === 11
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateName = (name: string) => {
    return name.trim().length >= 2
  }

  const validateDOB = (dob: string) => {
    const birthDate = new Date(dob)
    const today = new Date()
    if (isNaN(birthDate.getTime())) {
      return false
    }
    return birthDate < today
  }

  const validateStep1 = (formData: any) => {
    const { firstName, lastName, email, phone } = formData

    if (!validateName(firstName)) {
      toast.error("First name must be at least 2 characters.")
      return false
    }

    if (!validateName(lastName)) {
      toast.error("Last name must be at least 2 characters.")
      return false
    }

    if (!validateEmail(email)) {
      toast.error("Invalid email format.")
      return false
    }

    if (!validatePhone(phone)) {
      toast.error("Phone number must be exactly 11 digits.")
      return false
    }

    return true
  }

  const validateStep2 = (formData: any) => {
    const { plan, duration, maritalStatus, headshot, dob } = formData

    if (!plan) {
      toast.error("Plan is required.")
      return false
    }

    if (!duration) {
      toast.error("Payment duration is required.")
      return false
    }

    if (!validateDOB(dob)) {
      toast.error("Date of birth must be in the past.")
      return false
    }

    if (!maritalStatus) {
      toast.error("Marital status is required.")
      return false
    }

    if (!headshot) {
      toast.error("Headshot is required.")
      return false
    }
    return true
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const emailCheckResult = await checkEmail(formData.email)

      if (emailCheckResult.exists) {
        setModalType("login")
      } else {
        setModalType("register")
      }
      setShowModal(true)
    } catch (error) {
      toast.error("Failed to check email. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleModalSubmit = async () => {
    setLoading(true)
    try {
      let authResult

      if (modalType === "register") {
        if (password !== confirmPassword) {
          toast.error("Passwords do not match!")
          return
        }
        authResult = await register(formData.email, password, formData.firstName, formData.lastName)
      } else {
        authResult = await login(formData.email, password)
      }

      if (authResult.success) {
        const enrollmentFormData = new FormData()
        Object.entries(formData).forEach(([key, value]) => {
          if (value instanceof File) {
            enrollmentFormData.append(key, value)
          } else if (value != null) {
            enrollmentFormData.append(key, String(value))
          }
        })

        const enrollmentResult = await createEnrollment(enrollmentFormData)

        if (enrollmentResult.success) {
          setEnrollmentId(enrollmentResult.enrollment_id)
          setShowModal(false)
          setShowPaymentChoice(true)
        } else {
          throw new Error(enrollmentResult.message || "Failed to create enrollment")
        }
      } else {
        throw new Error(authResult.message || "Authentication failed")
      }
    } catch (error) {
      console.error("Error in handleModalSubmit:", error)
      toast.error(error instanceof Error ? error.message : "Process failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handlePaymentChoice = async (type: "subscription" | "onetime") => {
    if (!enrollmentId) {
      toast.error("Enrollment not found")
      return
    }

    setLoading(true)
    try {
      const paymentData = {
        email: formData.email,
        price: price,
        plan: formData.plan,
        enrollment_id: enrollmentId,
        paymentType: type,
      }

      const paymentResult = await initiatePayment(paymentData)

      if (!paymentResult.success) {
        throw new Error(paymentResult.message)
      }

      const handler = window.PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
        email: formData.email,
        amount: price * 100,
        ref: paymentResult.reference,
        callback: (response: any) => {
          if (response.status === "success") {
            toast.success("Payment successful!")
            window.location.href = "/dashboard"
          }
        },
        onClose: () => {
          toast.error("Payment window closed")
        },
      })

      handler.openIframe()
    } catch (error) {
      toast.error("Payment failed. Please try again.")
    } finally {
      setLoading(false)
      setShowPaymentChoice(false)
    }
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen relative">
      <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 overflow-y-auto relative z-999">
        <div className="mb-12"></div>
        <form id="paystack-form">
          <Script src="https://js.paystack.co/v1/inline.js" strategy="lazyOnload" />
        </form>
        <Card className="w-full max-w-2xl mx-auto shadow-none">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold">Enrollment Form</CardTitle>
            <CardDescription className="text-emerald-600">Step {currentStep} of 3</CardDescription>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="h-12 px-6 ml-auto text-teal-600 hover:text-teal-500"
            >
              <RefreshCw className="h-4 w-4 text-teal-600" />
              Reset Form
            </Button>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {currentStep === 1 && (
                <PersonalInfoStep
                  formData={formData}
                  handleInputChange={handleInputChange}
                  ref={firstInputRef}
                />
              )}
              {currentStep === 2 && (
                <AdditionalInfoStep
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleSelectChange={handleSelectChange}
                  handleFileChange={handleFileChange}
                  price={price}
                  ref={firstInputRef}
                />
              )}
              {currentStep === 3 && <PreviewStep formData={formData} previewImage={previewImage} />}
            </CardContent>
            <CardFooter className="flex justify-between pt-6">
              {currentStep > 1 && (
                <Button type="button" onClick={handlePreviousStep} variant="outline" className="h-12 px-6">
                  Previous
                </Button>
              )}
              {currentStep < 3 && (
                <Button
                  type="button"
                  onClick={handleNextStep}
                  className="h-12 px-6 bg-teal-500 hover:bg-emerald-600 ml-auto"
                >
                  Next
                </Button>
              )}
              {currentStep === 3 && (
                <Button type="submit" disabled={loading} className="h-12 px-6 bg-teal-600 hover:bg-emerald-600 ml-auto">
                  {loading ? (
                    <div className="flex items-center">
                      <LoaderCircle className="animate-spin h-5 w-5 mr-3 ... text-accent" viewBox="0 0 24 24" />
                      Processing...
                    </div>
                  ) : (
                    "Submit Enrollment"
                  )}
                </Button>
              )}
            </CardFooter>
          </form>
        </Card>

        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent className="sm:max-w-md">
            <DialogTitle className="text-xl font-semibold">
              {modalType === "login" ? "Welcome Back!" : `Create Your Account`}
            </DialogTitle>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12"
                    placeholder="Enter your Password"
                    type={showPassword ? "text" : "password"}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-1/2 right-2 -translate-y-1/2 h-8 w-8"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>
              {modalType === "register" && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="h-12"
                      placeholder="Confirm your password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-1/2 right-2 -translate-y-1/2 h-8 w-8"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>
              )}
              <Button
                onClick={handleModalSubmit}
                disabled={loading}
                className="w-full h-12 bg-teal-600 hover:bg-emerald-600"
              >
                {loading ? "Processing..." : modalType === "login" ? "Sign In" : "Create Account"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <PaymentChoiceDialog
          open={showPaymentChoice}
          onClose={() => setShowPaymentChoice(false)}
          onChoose={handlePaymentChoice}
          price={price}
          duration={formData.duration}
        />

        <Toaster position="top-center" richColors closeButton />
      </div>
      <div className="hidden md:block w-1/2 fixed top-0 right-0 bottom-0 z-10">
        <Slideshow />
      </div>
    </div>
  )
}

