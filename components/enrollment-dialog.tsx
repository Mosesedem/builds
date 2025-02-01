import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { useState, useEffect } from "react"
import EnrollmentForm from "./EnrollmentForm"
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export function EnrollmentDialog() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Start Enrollment</Button>
      </DialogTrigger>
      <DialogContent className={`
        w-[95vw]
        max-w-[95vw]
        sm:max-w-[600px]
        md:max-w-[700px]
        lg:max-w-[400px]
        h-[90vh]
        overflow-y-auto
        ${isMobile ? 'p-2' : 'p-6'}
      `}>
              <DialogHeader>
              <DialogTitle>Start New Enrollment</DialogTitle>
              <DialogDescription>
                Enroll for your Health Insurance Plan
              </DialogDescription>
            </DialogHeader>
        <EnrollmentForm />
      </DialogContent>
    </Dialog>
  )
}