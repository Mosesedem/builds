import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"

interface Hospital {
  name: string;
  address: string;
  city: string;
  state: string;
}

interface HospitalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProvidersModal({ isOpen, onClose }: HospitalModalProps) {
  const [hospitals, setHospitals] = useState<Hospital[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch('https://v2.protonmedicare.com/web/api/get_providers.php')
        if (!response.ok) {
          throw new Error('Failed to fetch hospitals')
        }
        const data = await response.json()
        setHospitals(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load hospitals')
      } finally {
        setLoading(false)
      }
    }

    if (isOpen) {
      fetchHospitals()
    }
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Available Hospitals</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
            </div>
          ) : error ? (
            <div className="text-center text-red-500 p-4">
              {error}
            </div>
          ) : hospitals.length === 0 ? (
            <div className="text-center text-gray-500 p-4">
              No hospitals found
            </div>
          ) : (
            <ul className="space-y-4">
              {hospitals.map((hospital, index) => (
                <li key={index} className="border-b pb-2">
                  <h3 className="font-semibold text-indigo-700">{hospital.name}</h3>
                  <p className="text-sm text-gray-600">{hospital.address}</p>
                  <p className="text-sm text-gray-500">
                    {hospital.city}, {hospital.state}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default ProvidersModal