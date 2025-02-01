"use client"

import { useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Award, Users, DollarSign, Shield } from "lucide-react"

export function GettingStartedSection() {
  const steps = [
    {
      title: "Apply Online",
      description: "Fill out our simple online application form to get started on your journey.",
      icon: Users,
    },
    {
      title: "Complete Training",
      description: "Access our comprehensive training program to learn about Medicare.",
      icon: Award,
    },
    {
      title: "Get Certified",
      description: "Receive your official certification as a Community Ambassador.",
      icon: Shield,
    },
    {
      title: "Start Earning",
      description: "Begin helping seniors and earning rewards for your referrals.",
      icon: DollarSign,
    },
  ]

  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true })

  return (
    <section className="py-24 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-teal-500/10">
      <div className="container px-4 mx-auto max-w-7xl" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Get Started</h2>
          <p className="text-xl text-muted-foreground">Start earning in four simple steps</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="relative h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mb-4">
                    <step.icon className="w-6 h-6 text-teal-600" />
                  </div>
                  <CardTitle className="flex gap-2">
                  
                    <span className="text-teal-600">Step {index + 1}</span>
                    <span className="text-lg">{step.title}</span>
                    
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
            Apply Now <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

