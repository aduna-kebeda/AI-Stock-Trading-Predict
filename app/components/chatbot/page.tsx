"use client"

import { useState } from "react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card"

enum ConversationState {
  INITIAL,
  WAITING_FOR_NAME_EMAIL,
  WAITING_FOR_QUERY,
  WAITING_FOR_BITCOIN_PRICE,
}

export function Chatbot() {
  const [messages, setMessages] = useState<{ user: string; bot: string }[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [conversationState, setConversationState] = useState<ConversationState>(ConversationState.INITIAL)

  const handleSend = async () => {
    if (input.trim() === "") return

    const userMessage = input
    setMessages([...messages, { user: userMessage, bot: "..." }])
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("https://habesha.app.n8n.cloud/webhook/bitcoin-chat-webhook/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      })
      const data = await res.json()
      console.log("API Response:", data)

      if (data && data.output) {
        setMessages((prevMessages) => {
          const newMessages = [...prevMessages]
          newMessages[newMessages.length - 1].bot = data.output
          console.log("Updated Messages:", newMessages)
          return newMessages
        })

        // Update conversation state based on the response and user input
        if (data.output.includes("<waiting_for_user_input/>")) {
          if (conversationState === ConversationState.INITIAL) {
            setConversationState(ConversationState.WAITING_FOR_NAME_EMAIL)
          } else if (conversationState === ConversationState.WAITING_FOR_NAME_EMAIL) {
            setConversationState(ConversationState.WAITING_FOR_QUERY)
          }
        } else if (userMessage.toLowerCase().includes("bitcoin")) {
          setConversationState(ConversationState.WAITING_FOR_BITCOIN_PRICE)
        } else if (userMessage.toLowerCase().includes("email")) {
          setConversationState(ConversationState.WAITING_FOR_NAME_EMAIL)
        } else {
          setConversationState(ConversationState.WAITING_FOR_QUERY)
        }
      } else {
        console.error("Invalid response format:", data)
        setMessages((prevMessages) => {
          const newMessages = [...prevMessages]
          newMessages[newMessages.length - 1].bot = "Invalid response format."
          return newMessages
        })
      }
    } catch (error) {
      console.error("Error triggering workflow:", error)
      setMessages((prevMessages) => {
        const newMessages = [...prevMessages]
        newMessages[newMessages.length - 1].bot = "Error processing your message."
        return newMessages
      })
    } finally {
      setLoading(false)
    }
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
          <Button onClick={handleSend} className="bg-[#00FF00] text-black" disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}