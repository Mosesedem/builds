// compare/page.tsx

"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Check, X, Search, Users, ChevronRight } from 'lucide-react'
import { ProvidersModal } from "@/components/ProvidersModal"
import { motion } from "framer-motion"
import { plans } from '@/lib/constants'

// Helper function to transform features and additional benefits into a features object
const transformPlanFeatures = (features: string[], additionalBenefits: string[]) => {
  const featuresObj: { [key: string]: boolean } = {};
  
  // Add main features
  features.forEach(feature => {
    featuresObj[feature] = true;
  });
  
  // Add additional benefits
  additionalBenefits.forEach(benefit => {
    featuresObj[benefit] = true;
  });
  
  return featuresObj;
};

export default function ComparePlansPage() {
  // Initialize with the first two plans' IDs
  const [selectedPlans, setSelectedPlans] = useState<string[]>([plans[0].id, plans[1].id])
  const [searchTerm, setSearchTerm] = useState("")
  const [showProvidersModal, setShowProvidersModal] = useState(false)

  const handlePlanChange = (index: number, value: string) => {
    const newSelectedPlans = [...selectedPlans]
    newSelectedPlans[index] = value
    setSelectedPlans(newSelectedPlans)
  }

  const filteredPlans = plans.filter(plan => 
    plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <main className="min-h-screen bg-gradient-to-b from-teal-700 to-teal-200">
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              Find care providers by plan
            </h1>
            <p className="text-xl text-blue-100">
              Select your Proton Medicare plan to view available healthcare providers in your network.
            </p>
          </div>
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 rounded-xl blur-2xl" />
              <img
                src="https://protonmedicare.com/assets/images/great.png"
                alt="Medical facility illustration"
                className="relative rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="container bg-background mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">Compare Medicare Plans</h1>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center justify-center gap-4 w-full max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="Search plans..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            </div>
            <Button onClick={() => setShowProvidersModal(true)} className="bg-teal-600 hover:bg-teal-700">
              <Users className="mr-2" size={18} />
              View Providers
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto pb-4">
          <div className="flex gap-8 min-w-max justify-center">
            {selectedPlans.map((planId, index) => {
              const plan = filteredPlans.find(p => p.id === planId)
              if (!plan) return null

              const allFeatures = transformPlanFeatures(plan.features, plan.additionalBenefits || [])
              
              return (
                <motion.div 
                  key={index} 
                  className="w-80"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Select value={planId} onValueChange={(value) => handlePlanChange(index, value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a plan" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredPlans.map((plan) => (
                        <SelectItem key={plan.id} value={plan.id}>
                          {plan.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <br />
                  <Card className="flex flex-col min-w-[300px] max-w-[350px] transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-primary border border-gray-200">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold transition-colors hover:text-primary">
                        {plan.name}
                      </CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold mb-4">${plan.basePrice}<span className="text-sm font-normal">/month</span></p>
                      <ul className="space-y-2">
                        {Object.entries(allFeatures).map(([feature, included]) => (
                          <li key={feature} className="flex items-center">
                            {included ? (
                              <Check className="mr-2 h-5 w-5 text-green-500" />
                            ) : (
                              <X className="mr-2 h-5 w-5 text-red-500" />
                            )}
                            <span className={included ? "text-primary": "text-gray-400"}>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button 
                onClick={() => setShowProvidersModal(true)}
                variant="link" 
                className="relative z-10 mt-4 p-0 text-teal-600 hover:text-teal-500 transition-colors group/btn h-auto"
              >
                View Providers
                <ChevronRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Button>

                    </CardContent>
                    <CardFooter>
                      <Button asChild className="w-full bg-gradient-to-r from-teal-600 to-teal-500 hover:from-gray-500 hover:to-teal-700 transition-all duration-300">
                        <Link href={`/enroll?plan=${plan.name}`}>Enroll Now</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
        <ProvidersModal isOpen={showProvidersModal} onClose={() => setShowProvidersModal(false)} />
      </div>
    </main>
  )
}