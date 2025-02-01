"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ProgramExplained() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true })

  const sections = [
    {
      id: "what-means",
      title: "What it means to be a Community Ambassador",
      content: [
        {
          title: "Community Leadership",
          description:
            "As a Community Ambassador, you'll be a trusted resource in your community, helping seniors navigate their Medicare options with confidence and clarity.",
        },
        {
          title: "Flexible Schedule",
          description:
            "Work on your own terms and set your own schedule while making a meaningful impact in your community.",
        },
        {
          title: "Ongoing Support",
          description:
            "Receive continuous training and support from our experienced team to ensure your success in the program.",
        },
      ],
    },
    {
      id: "program",
      title: "Community Ambassador Program Explained",
      content: [
        {
          title: "Comprehensive Training",
          description: "Access our extensive training materials and resources to become a Medicare expert.",
        },
        {
          title: "Marketing Support",
          description:
            "Receive professional marketing materials and tools to help you connect with seniors in your community.",
        },
        {
          title: "Compliance Guidance",
          description:
            "Stay informed about Medicare regulations and compliance requirements with our ongoing education.",
        },
      ],
    },
    {
      id: "rewards",
      title: "Rewards and Benefits",
      content: [
        {
          title: "Competitive Compensation",
          description: "Earn competitive referral fees for every successful Medicare enrollment you facilitate.",
        },
        {
          title: "Performance Bonuses",
          description: "Qualify for additional bonuses and incentives based on your performance and dedication.",
        },
        {
          title: "Professional Development",
          description: "Access exclusive training opportunities and certifications to advance your career.",
        },
      ],
    },
  ]

  return (
    <section className="py-24 bg-accent/10" ref={containerRef}>
      <div className="container px-4 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <Tabs defaultValue="what-means" className="space-y-8 ">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto">
              {sections.map((section) => (
                <TabsTrigger
                  key={section.id}
                  value={section.id}
                  className="py-4 data-[state=active]:bg-teal-50 text-gray-500/80 data-[state=active]:text-slate-700"
                >
                  {section.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {sections.map((section) => (
              <TabsContent key={section.id} value={section.id}>
                <div className="grid gap-6 md:grid-cols-3">
                  {section.content.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                    >
                      <Card className="h-full">
                        <CardHeader>
                          <CardTitle className="text-xl">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">{item.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </section>
  )
}

