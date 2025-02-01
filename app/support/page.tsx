import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MessageCircle, Phone, CircleArrowOutUpRight } from 'lucide-react'

export default function SupportPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">How Can We Help You?</h1>
      <div className="grid gap-8 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Phone className="mr-2 h-4 w-4" />
              Phone Support
            </CardTitle>
            <CardDescription>Speak directly with our experts</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Call us at: 1-800-MEDICARE</p>
            <Button asChild className="w-full">
              <a href="tel:1-800-MEDICARE">Call Now</a>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircle className="mr-2 h-4 w-4" />
              Live Chat
            </CardTitle>
            <CardDescription>Chat with our support team</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">We are available 24/7</p>
            <Button asChild className="w-full">
              <Link href="">Start Chat</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="mr-2 h-4 w-4" />
              Email Support
            </CardTitle>
            <CardDescription>Send us your inquiries</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">We respond within 24 hours</p>
            <Button asChild className="w-full">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CircleArrowOutUpRight  className="mr-2 h-4 w-4" />
              Other Channels
            </CardTitle>
            <CardDescription>View all available contact options</CardDescription>
          </CardHeader>
         
          <CardContent>
          <p className="mb-4">Explore other channels</p>
            <Button asChild className="w-full">
              <a href="/contact">Proceed</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

