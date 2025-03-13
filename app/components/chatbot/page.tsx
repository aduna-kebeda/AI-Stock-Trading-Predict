"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"

const mockAIResponse = (message: string) => {
  // Mock AI response based on the user's message
  if (message.toLowerCase().includes("recommend")) {
    return "I recommend buying Bitcoin (BTC) as it shows a positive trend."
  }
  return "I'm here to help with your stock trading predictions. Ask me anything!"
}

export function Chatbot() {
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (input.trim() === "") return

    const userMessage = input
    const botResponse = mockAIResponse(userMessage)

    setMessages([...messages, { user: userMessage, bot: botResponse }])
    setInput("")
  }

  return (
    <Card className="fixed bottom-4 right-4 w-80 bg-black border border-[#00FF00]/30">
      <CardHeader>
        <CardTitle className="text-[#00FF00]">AI Chatbot</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        <div className="flex-1 overflow-y-auto max-h-64 space-y-2">
          {messages.map((msg, index) => (
            <div key={index} className="space-y-1">
              <div className="text-white">User: {msg.user}</div>
              <div className="text-[#00FF00]">Bot: {msg.bot}</div>
            </div>
          ))}
        </div>
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-black border-[#00FF00]/30 text-white"
          />
          <Button onClick={handleSend} className="bg-[#00FF00] text-black">
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}