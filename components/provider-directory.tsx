"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { plans } from "@/lib/constants"
import { Providers } from "./providers"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { Search } from "lucide-react"

export type Plan = {
  id: string
  name: string
  description: string
  basePrice: number
  type: string
}

export function ProviderDirectory() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  // Group plans by type for categorization
  const planCategories = plans.reduce((acc, plan) => {
    if (!acc[plan.type]) {
      acc[plan.type] = []
    }
    acc[plan.type].push(plan)
    return acc
  }, {} as Record<string, Plan[]>)

  // Filter plans based on search query
  const filteredCategories = Object.entries(planCategories).reduce(
    (acc, [type, typePlans]) => {
      const filtered = typePlans.filter(
        (plan) =>
          plan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          plan.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
      if (filtered.length > 0) {
        acc[type] = filtered
      }
      return acc
    },
    {} as Record<string, Plan[]>
  )

  return (
    <div className="container mx-auto px-4 py-12">
      <AnimatePresence mode="wait">
        {!selectedPlan ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="relative max-w-xl mx-auto mb-12">
              <Input
                type="text"
                placeholder="Search plans..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg rounded-2xl shadow-sm border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>

            {Object.entries(filteredCategories).map(([type, typePlans]) => (
              <motion.div
                key={type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <h2 className="text-2xl font-semibold mb-6 capitalize pl-1">
                  {type.replace("Plans", " Plans")}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {typePlans.map((plan) => (
                    <motion.div
                      key={plan.id}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card
                        className="cursor-pointer bg-accent/20 backdrop-blur-sm border border-gray-100 hover:border-teal-200 transition-all duration-200"
                        onClick={() => setSelectedPlan(plan)}
                      >
                        <CardContent className="p-6">
                          <h3 className="text-xl font-bold mb-3 text-light">
                            {plan.name}
                          </h3>
                          <p className="text-gray-500/100 mb-4 min-h-[3rem]">
                            {plan.description}
                          </p>
                          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                            <span className="text-lg font-semibold text-teal-600">
                              ${plan.basePrice}
                              <span className="text-sm text-gray-500/100">/month</span>
                            </span>
                            <span className="text-sm text-teal-500 font-medium">
                              View Providers →
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <Card className="border-gray-100 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-light">
                      {selectedPlan.name}
                    </h2>
                    <p className="text-gray-500/100 mt-1">{selectedPlan.description}</p>
                  </div>
                  <button
                    onClick={() => setSelectedPlan(null)}
                    className="px-4 py-2 text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors duration-200"
                  >
                    ← Change Plan
                  </button>
                </div>
              </CardContent>
            </Card>
            <Providers planType={selectedPlan.type} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}