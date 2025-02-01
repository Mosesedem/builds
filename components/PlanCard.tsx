"use client"
import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Check, ChevronRight } from 'lucide-react'
import Link from "next/link"

interface PlanProps {
  name: string
  description: string
  price: string
  features: string[]
  additionalBenefits?: string[]
}

export function PlanCard({ name, description, price, features, additionalBenefits }: PlanProps) {
  return (
    <Card 
      className="group flex flex-col min-w-[240px] max-w-[290px] relative overflow-hidden
        transform transition-all duration-500 hover:scale-[1.02]
        before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-500/10 before:via-teal-300/10 before:to-teal-600/10 before:opacity-0 
        before:transition-opacity before:duration-500 hover:before:opacity-100
        after:absolute after:inset-0 after:border-2 after:border-transparent hover:after:border-teal-500/50 
        after:rounded-lg after:transition-all after:duration-500
        hover:shadow-[0_0_40px_rgba(45,212,191,0.1)]
         from-purple-500/10 via-blue-500/10 to-teal-500/10"
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold transition-colors group-hover:text-teal-600 relative">
          {name}
        </CardTitle>
        <CardDescription className="group-hover:text-gray-600 transition-colors">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-2xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-teal-400 bg-clip-text text-transparent transition-colors">
          {price}
        </p>
        <ul className="space-y-2">
          {features.slice(0, 4).map((feature, featureIndex) => (
            <li key={featureIndex} className="flex items-center group/item">
              <span className="mr-2 rounded-full p-1 bg-teal-50 group-hover/item:bg-teal-100 transition-colors">
                <Check className="h-3 w-3 text-teal-600" />
              </span>
              <span className="group-hover/item:text-gray-700 transition-colors">{feature}</span>
            </li>
          ))}
        </ul>
        {additionalBenefits && additionalBenefits.length > 0 && (
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="link" 
                className="relative z-10 mt-4 p-0 text-teal-600 hover:text-teal-700 transition-colors group/btn h-auto"
              >
                View more benefits 
                <ChevronRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-teal-600">{name} - Additional Benefits</DialogTitle>
              </DialogHeader>
              <ul className="space-y-2 mt-4">
                {additionalBenefits.map((benefit, index) => (
                  <li key={index} className="flex items-center group/item">
                    <span className="mr-2 rounded-full p-1 bg-teal-50 group-hover/item:bg-teal-100 transition-colors">
                      <Check className="h-3 w-3 text-teal-600" />
                    </span>
                    <span className="group-hover/item:text-gray-700 transition-colors">{benefit}</span>
                  </li>
                ))}
              </ul>
            </DialogContent>
          </Dialog>
        )}
        
      </CardContent>
      <CardFooter>
        <Button 
          asChild 
          className="relative z-10 w-full bg-gradient-to-r from-teal-500 via-teal-550 to-teal-500 
            hover:from-teal-600 hover:to-teal-700 transition-all duration-300 
            shadow-lg hover:shadow-teal-500/25 hover:shadow-xl h-10"
        >
          <Link href={`/enroll?plan=${encodeURIComponent(name)}`} className="w-full h-full flex items-center justify-center">
            Enroll Now
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}