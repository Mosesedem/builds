import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export function SubscriptionCard() {
  const [isActive, setIsActive] = useState(true);

  const handleCancelSubscription = () => {
    setIsActive(false);
    // Here you would typically make an API call to cancel the subscription
    console.log("Subscription cancelled");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Status</CardTitle>
        <CardDescription>Manage your plan subscription</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-semibold">
          Status: <span className={isActive ? "text-green-500" : "text-red-500"}>
            {isActive ? "Active" : "Inactive"}
          </span>
        </p>
        {isActive && (
          <p className="mt-2">Your next billing date is on July 1, 2023</p>
        )}
      </CardContent>
      <CardFooter>
        {isActive ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Cancel Subscription</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will cancel your current plan and you will lose access to its benefits.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleCancelSubscription}>
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <Button onClick={() => setIsActive(true)}>Reactivate Subscription</Button>
        )}
      </CardFooter>
    </Card>
  );
}

