import { useState, useEffect, useCallback } from "react"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function AppointmentDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState("")
  const [date, setDate] = useState("")

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open)
    if (!open) {
      // Reset form fields when dialog closes
      setName("")
      setDate("")
    }
  }, [])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("Appointment scheduled:", { name, date })
    handleOpenChange(false)
  }, [name, date, handleOpenChange])

  // Cleanup effect
  useEffect(() => {
    return () => {
      // This will run when the component unmounts
      setIsOpen(false)
      setName("")
      setDate("")
    }
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">Schedule Appointment</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>Schedule an Appointment</DialogTitle>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="col-span-3" 
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Date
            </Label>
            <Input 
              id="date" 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
              className="col-span-3" 
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit">Schedule</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

