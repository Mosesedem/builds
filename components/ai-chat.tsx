"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

export function AIChat() {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([])
  const [inputMessage, setInputMessage] = useState("")

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return

    setMessages([...messages, { text: inputMessage, isUser: true }])
    setInputMessage("")

    // Simulate AI response
    setTimeout(() => {
      setMessages(prevMessages => [
        ...prevMessages,
        {
          text: "Hi, I am Proton Medicare automated response system and I am currently unable to assist you. Kindly contact a human through our other channels for further assistance",
          isUser: false
        }
      ])
    }, 1000)
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>AI Support Assistant</CardTitle>
        <CardDescription>Get instant answers to your questions</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[150px] p-4 border rounded-md">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${
                message.isUser ? "text-right" : "text-left"
              }`}
            >
              <span
                className={`inline-block p-2 rounded-lg ${
                  message.isUser
                    ? "bg-primary text-primary-foreground"
                    : "bg-blue-500"
                }`}
              >
                {message.text}
              </span>
            </div>
          ))}

<div className="flex w-full space-x-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
       <div>
        <p className="text-gray-400 text-sm">
          Do not share personal information like passwords with our AI chat assistant
        </p>
       </div>
      </CardFooter>
    </Card>
  )
}

