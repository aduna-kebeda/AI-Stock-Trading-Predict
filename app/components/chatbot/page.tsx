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
  const [symbol, setSymbol] = useState("")
  const [loading, setLoading] = useState(false)
  const [conversationState, setConversationState] = useState<ConversationState>(ConversationState.INITIAL)

  const handleSend = async () => {
    if (input.trim() === "" || symbol.trim() === "") return

    const userMessage = input
    setMessages((prev) => [...prev, { user: userMessage, bot: "..." }])
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("/api/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: userMessage,
          symbol: symbol,
          period: "6mo",
        }),
      })

      if (!res.ok) throw new Error(`Failed to fetch response: ${res.statusText}`)

      const data = await res.json()
      console.log("API Response:", data)

      const botReply = data.response || "Sorry, I couldn't understand that."

      setMessages((prev) =>
        prev.map((msg, index) =>
          index === prev.length - 1 ? { ...msg, bot: botReply } : msg
        )
      )
    } catch (error) {
      console.error("Error fetching response:", error)
      setMessages((prev) =>
        prev.map((msg, index) =>
          index === prev.length - 1 ? { ...msg, bot: "Error fetching response." } : msg
        )
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-96 bg-black border border-[#00FF00]/30 p-4">
      <CardHeader>
        <CardTitle className="text-[#00FF00] text-lg">AI Chatbot</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto max-h-64 space-y-4 bg-gray-900 p-4 rounded-md">
          {messages.map((msg, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-start">
                <div className="text-white font-bold min-w-[60px]">User:</div>
                <div className="text-white flex-1 break-words">{msg.user}</div>
              </div>
              <div className="flex items-start">
                <div className="text-blue-500 font-bold min-w-[60px]">Bot:</div>
                <div className="text-blue-500 flex-1 break-words">{msg.bot}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Fields */}
        <div className="space-y-3">
          <Input
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            placeholder="Enter stock symbol..."
            className="w-full bg-black border-[#00FF00]/30 text-white"
          />
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="w-full bg-black border-[#00FF00]/30 text-white"
          />
        </div>

        {/* Send Button */}
        <Button 
          onClick={handleSend} 
          className="w-full bg-[#00FF00] text-black py-2 text-lg" 
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </Button>
      </CardContent>
    </Card>
  )
}