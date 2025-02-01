import { Plan } from "./provider-directory"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Shield, ShieldCheck, ShieldPlus } from 'lucide-react'

interface PlansProps {
  plans: Plan[]
  onSelectPlan: (plan: Plan) => void
}

const planIcons = {
  basic: Shield,
  premium: ShieldCheck,
  elite: ShieldPlus,
}

export function Plans({ plans, onSelectPlan }: PlansProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {plans.map((plan) => {
        const Icon = planIcons[plan.tier]
        return (
          <Card key={plan.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Icon className="w-6 h-6 text-blue-600" />
                <CardTitle>{plan.name}</CardTitle>
              </div>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                ${plan.monthlyPremium}
                <span className="text-base font-normal text-gray-600">/month</span>
              </p>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => onSelectPlan(plan)}
              >
                View Providers
              </Button>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}

