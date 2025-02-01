import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from 'lucide-react'

const plans = [
  {
    name: "Basic",
    description: "Essential coverage for individuals",
    price: "$0",
    features: [
      "Original Medicare (Part A & B)",
      "Hospital Insurance",
      "Medical Insurance",
    ],
    cta: "Enroll Now",
    popular: false,
  },
  {
    name: "Standard",
    description: "Comprehensive coverage for most needs",
    price: "$49",
    features: [
      "Everything in Basic",
      "Prescription Drug Coverage",
      "Dental and Vision Coverage",
      "Fitness Program",
    ],
    cta: "Enroll Now",
    popular: true,
  },
  {
    name: "Premium",
    description: "Full coverage for complete peace of mind",
    price: "$99",
    features: [
      "Everything in Standard",
      "Worldwide Emergency Coverage",
      "Alternative Medicine Coverage",
      "Personal Health Coaching",
    ],
    cta: "Enroll Now",
    popular: false,
  },
]

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Choose Your Medicare Plan</h1>
      <div className="grid gap-8 md:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.name} className={plan.popular ? "border-primary" : ""}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold mb-4">{plan.price}<span className="text-sm font-normal">/month</span></p>
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/enroll">{plan.cta}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

