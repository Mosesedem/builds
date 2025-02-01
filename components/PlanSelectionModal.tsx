import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface Plan {
  name: string;
  basePrice: number;
}

interface PlanSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan: (plan: string) => void;
  plans: Plan[];
}

export function PlanSelectionModal({ isOpen, onClose, onSelectPlan, plans }: PlanSelectionModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg overflow-y-auto max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Select a Plan</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          {plans.map((plan) => (
            <Button
              key={plan.name}
              onClick={() => onSelectPlan(plan.name)}
              variant="outline"
              className="justify-between"
            >
              <span>{plan.name}</span>
              <span>${plan.basePrice}/month</span>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}