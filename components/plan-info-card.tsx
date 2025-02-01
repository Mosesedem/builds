import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from "react";

interface PlanInfoCardProps {
  planId: string;
  hmoId: string;
}

export function PlanInfoCard({ planId, hmoId }: PlanInfoCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Plan Information</CardTitle>
        <CardDescription>Your current plan details</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p><strong>HMO:</strong> {planId}</p>
          <p><strong>HMO ID:</strong> {hmoId}</p>
          {isExpanded && (
            <>
              <p><strong>Coverage Start:</strong> 01/01/2023</p>
              <p><strong>Coverage End:</strong> 12/31/2023</p>
              <p><strong>Plan Type</strong> Dr. Jane Smith</p>
            </>
          )}
        </div>
      </CardContent>
      <Button
        variant="ghost"
        className="w-full"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? (
          <>
            <ChevronUp className="mr-2 h-4 w-4" />
            Show Less
          </>
        ) : (
          <>
            <ChevronDown className="mr-2 h-4 w-4" />
            Show More
          </>
        )}
      </Button>
    </Card>
  );
}

