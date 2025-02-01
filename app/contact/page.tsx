"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Mail, MessageCircle, Newspaper, Phone, Globe, Twitter, Instagram, Linkedin,  Calendar, Sparkles, Bot, PhoneIcon as WhatsApp, Facebook } from 'lucide-react'
import { AIChat } from '@/components/ai-chat'
import { CalendlyEmbed } from '@/components/calendly-embed'
import Link from "next/link"


export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    preferredContact: "email"
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setFormData({
      name: "",
      email: "",
      message: "",
      preferredContact: "email"
    })
  }


  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-500/10 via-teal-600/10 to-teal-500/10 px-4 py-8 sm:py-12">
      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-8 sm:mb-12 space-y-4">
          <Sparkles className="h-8 w-8 sm:h-12 sm:w-12 text-teal-600 animate-pulse " />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-teal-600/60">
            Let's Connect
          </h1>
          <p className="text-center text-muted-foreground max-w-2xl text-sm sm:text-base px-4">
            Choose your preferred way to reach us. We're available across multiple platforms
            and ready to assist you 24/7 with our AI-powered response system.
          </p>
        </div>

        <Tabs defaultValue="message" className="w-full">
        <TabsList className="flex flex-wrap justify-center gap-2 sm:gap-4 h-18 bg-gray-700 w-auto">
  <TabsTrigger 
    value="message" 
    className="flex items-center justify-center gap-2 px-3 py-2 text-sm sm:text-base rounded-md border border-transparent hover:bg-primary/10"
  >
    <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
    <span className="hidden sm:inline">Message</span>
  </TabsTrigger>
  
  <TabsTrigger 
    value="schedule"
    className="flex items-center justify-center gap-2 px-3 py-2 text-sm sm:text-base rounded-md border border-transparent hover:bg-primary/10"
  >
    <Calendar className="h-5 w-5 sm:h-6 sm:w-6" />
    <span className="hidden sm:inline">Schedule</span>
  </TabsTrigger>
  
  <TabsTrigger 
    value="social"
    className="flex items-center justify-center gap-2 px-3 py-2 text-sm sm:text-base rounded-md border border-transparent hover:bg-primary/10"
  >
    <Globe className="h-5 w-5 sm:h-6 sm:w-6" />
    <span className="hidden sm:inline">Social</span>
  </TabsTrigger>
  
  <TabsTrigger 
    value="ai"
    className="flex items-center justify-center gap-2 px-3 py-2 text-sm sm:text-base rounded-md border border-transparent hover:bg-primary/10"
  >
    <Bot className="h-5 w-5 sm:h-6 sm:w-6" />
    <span className="hidden sm:inline">AI Support</span>
  </TabsTrigger>
</TabsList>


          {/* Message Tab Content */}
          <TabsContent value="message">
            <div className="grid gap-6 lg:gap-8 md:grid-cols-2">
              {/* Contact Form Card */}
              <Card className="border-1 border-primary">
                <CardHeader className="space-y-1 sm:space-y-2">
                  <CardTitle className="text-xl sm:text-2xl">Send us an Email</CardTitle>
                  <CardDescription className="text-sm">
                    We typically respond within 2 hours
                  </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-3 sm:space-y-4">
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="name" className="text-sm sm:text-base">Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="border-primary/20"
                        required
                      />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="email" className="text-sm sm:text-base">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="border-primary/20"
                        required
                      />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <Label htmlFor="message" className="text-sm sm:text-base">Message</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="border-primary/20 min-h-24 sm:min-h-32"
                        required
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </CardFooter>
                </form>
              </Card>

              {/* Contact Options */}
              <div className="space-y-4 sm:space-y-6">
                {/* <Card className="group hover:border-primary/20 transition-all h-52 sm:h-60">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="flex items-center text-lg sm:text-xl">
                      <Video className="mr-2 h-4 w-4 group-hover:text-primary" />
                      Video Call
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <p className="text-sm sm:text-base">Schedule a face-to-face meeting</p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">Available 9 AM - 5 PM ET</p>
                    <Button variant="outline" className="mt-3 sm:mt-4 text-sm sm:text-base">Schedule Now</Button>
                  </CardContent>
                </Card> */}

                <Card className="group hover:border-primary/20 transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg sm:text-xl">
                      <Phone className="mr-2 h-6 w-6 group-hover:text-primary" />
                      Phone Call 
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm sm:text-base">Call us directly  - +234 (0) 706 973 7196</p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">Available 24/7</p>
                    <Button
                      variant="outline"
                      className="mt-3 sm:mt-4 text-sm sm:text-base"
                      onClick={() => window.location.href = 'tel:+2347069737196'}
                    >
                      Call Now
                    </Button>
                  </CardContent>
                </Card>

                <Card>
              <CardHeader className="space-y-1 sm:space-y-2">
                <CardTitle className="flex items-center text-lg sm:text-xl">
                <MessageCircle className="mr-2 h-6 w-6 group-hover:text-primary" />
                WhatsApp Support</CardTitle>
                <CardDescription className="text-sm">
                  Get in touch with us via WhatsApp
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-50 text-sm sm:text-base"
                  onClick={() => window.open('https://wa.me/2347069737196', '_blank')}
                >
                  <WhatsApp className="mr-2 h-4 w-4" />
                  Chat on WhatsApp
                </Button>
              </CardContent>
            </Card>

                <Card className="group hover:border-primary/20 transition-all">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="flex items-center text-lg sm:text-xl">
                      <Mail className="mr-2 h-6 w-6 group-hover:text-primary" />
                      Direct Email
                    </CardTitle>
                  </CardHeader>
                  <CardContent >
                    <p className="text-sm sm:text-base">support@protonmedicare.com</p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">24/7 Support</p>
                    <Badge className="mt-2" variant="secondary">Priority Response</Badge>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Schedule Tab Content */}
          <TabsContent value="schedule">
            <div className="h-[600px] sm:h-[700px]">
              <CalendlyEmbed />
            </div>
          </TabsContent>

          {/* Social Tab Content */}
          <TabsContent value="social">
            <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Twitter, name: "Twitter", handle: "@protonmedicare", link: 'https://facebook.com/protonmedicare' },
                { icon: Instagram, name: "Instagram", handle: "@protonmedicare", link: 'https://facebook.com/protonmedicare' },
                { icon: Linkedin, name: "LinkedIn", handle: "Proton Medicare", link: 'https://facebook.com/protonmedicare'},
                { icon: Facebook, name: "Facebook", handle: "protonmedicare", link: 'https://facebook.com/protonmedicare' },
                { icon: Newspaper, name: "Medium", handle: "protonmedicare", link: 'https://facebook.com/protonmedicare'},

              ].map((social) => (
                <Card key={social.name} className="group hover:border-primary/20 transition-all">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="flex items-center text-lg sm:text-xl">
                      <social.icon className="mr-2 h-4 w-4 group-hover:text-primary" />
                      {social.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <p className="text-sm sm:text-base">{social.handle}</p>
                    <Button variant="link" className="mt-3 sm:mt-4 text-sm sm:text-base "
                    
                    >  <Link href={social.link} target="_blank"> Follow Us</Link></Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* AI Support Tab Content */}
          <TabsContent value="ai">
            <div className="h-[500px] sm:h-[600px]">
              <AIChat />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}