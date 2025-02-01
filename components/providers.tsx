"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, MapPin, Phone, Clock, Mail, Building2 } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import Image from 'next/image'
// Provider type definition
interface Provider {
  id: number
  name: string
  specialty: string
  address: string
  phone: string
  email: string
  hours: string
  image: string
  type: string[]
}

// Sample provider data - in a real app, this would come from an API
const allProviders: Provider[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Family Medicine",
    address: "123 Healthcare Ave, Medical City, MC 12345",
    phone: "(555) 123-4567",
    email: "sjohnson@protonmedicare.com",
    hours: "Mon-Fri: 9:00 AM - 5:00 PM",
    image: "",
    type: ["medicarePlans", "standardPlans"]
  },
  {
    id: 2,
    name: "Central Medical Group",
    specialty: "Multi-specialty Practice",
    address: "456 Wellness Blvd, Medical City, MC 12345",
    phone: "(555) 987-6543",
    email: "info@centralmedical.com",
    hours: "Mon-Sat: 8:00 AM - 8:00 PM",
    image: "",
    type: ["medicarePlans", "maternityPlans"]
  },
  {
    id: 3,
    name: "Elite Care Center",
    specialty: "Specialized Care",
    address: "789 Premium Lane, Medical City, MC 12345",
    phone: "(555) 456-7890",
    email: "care@elitecare.com",
    hours: "24/7",
    image: "",
    type: ["standardPlans", "maternityPlans"], 
  },
]

type ProvidersProps = {
  planType: string
}

export function Providers({ planType }: ProvidersProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null)

  // Filter providers based on plan type and search term
  const filteredProviders = allProviders.filter(provider => 
    provider.type.includes(planType) &&
    provider.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <div className="space-y-6">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <Input
            className="pl-10 py-6 text-lg"
            placeholder="Search providers..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredProviders.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProviders.map(provider => (
              <Card key={provider.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent 
                  className="p-6"
                  onClick={() => setSelectedProvider(provider)}
                >
                  <h3 className="text-xl font-bold mb-2">{provider.name}</h3>
                  <p className="text-gray-500/100">{provider.specialty}</p>
                  <hr />
                  <p className="text-gray-500/100 mt-2">{provider.address}</p>

                  <div className="flex justify-end mt-4 mb-0"> 
  <span className="text-sm text-teal-500 font-medium hover:animate-pulse">
    View Details →
  </span>
</div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">
            No providers found for this plan type.
          </p>
        )}
      </div>

      <Dialog open={!!selectedProvider} onOpenChange={() => setSelectedProvider(null)}>
        <DialogContent className="max-w-4xl">
          {selectedProvider && (
            <div className="grid md:grid-cols-2 gap-8">
              <div>
              <Image
                 src={selectedProvider.image || "https://static.flashscore.com/res/image/data/ba3RUOf5-6FckE7BN.png"}
                  alt={selectedProvider.name}
                  className="w-full rounded-lg"
                  width={400}
                  height={300}
                />
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-bold">{selectedProvider.name}</h2>
                  <p className="text-xl text-gray-600">{selectedProvider.specialty}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 mt-1 text-blue-600" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-gray-600">{selectedProvider.address}</p>
                      <Button
                        variant="link"
                        className="px-0"
                        onClick={() => {
                          window.open(
                            `https://maps.google.com/?q=${encodeURIComponent(
                              `${selectedProvider.name} ${selectedProvider.address}`
                            )}`,
                            "_blank"
                          )
                        }}
                      >
                        Get Directions
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 mt-1 text-blue-600" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-gray-600">{selectedProvider.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 mt-1 text-blue-600" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-gray-600">{selectedProvider.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 mt-1 text-blue-600" />
                    <div>
                      <p className="font-medium">Hours</p>
                      <p className="text-gray-600">{selectedProvider.hours}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}