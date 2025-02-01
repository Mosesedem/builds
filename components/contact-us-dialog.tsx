"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ContactUsDialogProps {
  type: "phone" | "email" | "chat";
  children: React.ReactNode;
}

export function ContactUsDialog({ type, children }: ContactUsDialogProps) {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(`${type} contact submitted`);
    // Handle form submission
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Contact Us</DialogTitle>
          <DialogDescription>
            {type === "phone"
              ? "Request a call back from our support team."
              : type === "email"
              ? "Send us an email and we'll get back to you."
              : "Start a live chat with our support team."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" className="col-span-3" />
            </div>
            {type === "phone" && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input id="phone" type="tel" className="col-span-3" />
              </div>
            )}
            {type === "email" && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" type="email" className="col-span-3" />
              </div>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="message" className="text-right">
                Message
              </Label>
              <Textarea id="message" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">
              {type === "phone"
                ? "Request Call"
                : type === "email"
                ? "Send Email"
                : "Start Chat"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

