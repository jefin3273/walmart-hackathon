"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send, Phone, MessageCircle, Package, RefreshCw, MapPin, Clock } from "lucide-react"

interface Message {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
  quickReplies?: string[]
}

const predefinedQueries = [
  { id: 1, text: "Where's my order?", icon: Package },
  { id: 2, text: "Return an item", icon: RefreshCw },
  { id: 3, text: "Store hours", icon: Clock },
  { id: 4, text: "Find store location", icon: MapPin },
  { id: 5, text: "Talk to human agent", icon: Phone },
  { id: 6, text: "Product availability", icon: Package },
]

const aiResponses: { [key: string]: any } = {
  "where's my order": {
    content:
      "I'd be happy to help you track your order! 📦 I can see you have an active order #WM-2024-001234. Your order is currently being prepared for pickup and will be ready in about 15 minutes at Pickup Bay 3. Would you like me to send you the QR code for pickup?",
    quickReplies: ["Send QR code", "Change pickup time", "Cancel order"],
  },
  "return an item": {
    content:
      "I can help you with returns! 🔄 Walmart has a generous return policy. Most items can be returned within 90 days with a receipt. What item would you like to return? I can check the return policy for that specific product and help you start the return process.",
    quickReplies: ["Electronics return", "Clothing return", "Grocery return", "Start return online"],
  },
  "store hours": {
    content:
      "Here are today's store hours! 🕐 Most Walmart stores are open 6 AM - 11 PM, but hours may vary by location. Your nearest store at 123 Main Street is open until 11 PM today. Pharmacy hours are 9 AM - 9 PM. Would you like directions to the store?",
    quickReplies: ["Get directions", "Pharmacy hours", "Holiday hours"],
  },
  "find store location": {
    content:
      "I can help you find the nearest Walmart! 📍 Based on your location, the closest store is at 123 Main Street, about 2.5 miles away. They have a full grocery section, pharmacy, and auto center. Would you like directions or information about their services?",
    quickReplies: ["Get directions", "Store services", "Call store"],
  },
  "talk to human agent": {
    content:
      "I'd be happy to connect you with a human agent! 👨‍💼 Our customer service team is available 24/7. I can transfer you now, or if you'd like, I might be able to help resolve your issue quickly. What specific assistance do you need?",
    quickReplies: ["Connect now", "Describe my issue first", "Schedule callback"],
  },
  "product availability": {
    content:
      "I can check product availability for you! 🔍 Just tell me what product you're looking for and your preferred store location. I can check current stock levels and even reserve items for pickup if they're available.",
    quickReplies: ["Check iPhone availability", "Check grocery items", "Reserve for pickup"],
  },
  default: {
    content:
      "I understand you need help with that! 😊 I'm here to assist you with orders, returns, store information, and more. Could you please provide a bit more detail about what you need help with? I'm designed to help with most Walmart-related questions!",
    quickReplies: ["Order status", "Return policy", "Store locations", "Product questions"],
  },
}

export default function AICallCenterPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Hi there! 👋 I'm Walmart's AI Assistant. I'm here to help you 24/7 with orders, returns, store information, and more. How can I assist you today?",
      timestamp: new Date(),
      quickReplies: ["Track my order", "Return an item", "Find store hours", "Product questions"],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateAIResponse = (userMessage: string): any => {
    const lowerMessage = userMessage.toLowerCase()

    for (const [key, response] of Object.entries(aiResponses)) {
      if (key !== "default" && lowerMessage.includes(key)) {
        return response
      }
    }

    // Check for specific keywords
    if (lowerMessage.includes("order") || lowerMessage.includes("track")) {
      return aiResponses["where's my order"]
    }
    if (lowerMessage.includes("return") || lowerMessage.includes("refund")) {
      return aiResponses["return an item"]
    }
    if (lowerMessage.includes("hours") || lowerMessage.includes("open") || lowerMessage.includes("close")) {
      return aiResponses["store hours"]
    }
    if (lowerMessage.includes("location") || lowerMessage.includes("address") || lowerMessage.includes("directions")) {
      return aiResponses["find store location"]
    }
    if (lowerMessage.includes("human") || lowerMessage.includes("agent") || lowerMessage.includes("representative")) {
      return aiResponses["talk to human agent"]
    }
    if (lowerMessage.includes("stock") || lowerMessage.includes("available") || lowerMessage.includes("inventory")) {
      return aiResponses["product availability"]
    }

    return aiResponses["default"]
  }

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: content,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(content)
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: aiResponse.content,
        timestamp: new Date(),
        quickReplies: aiResponse.quickReplies,
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickQuery = (query: string) => {
    handleSendMessage(query)
  }

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">AI Virtual Call Center</h1>
          <p className="text-lg text-gray-600">Get instant help from our AI assistant - available 24/7</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Quick Help</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {predefinedQueries.map((query) => (
                    <Button
                      key={query.id}
                      variant="outline"
                      className="w-full justify-start h-auto p-3 bg-transparent"
                      onClick={() => handleQuickQuery(query.text)}
                    >
                      <query.icon className="w-4 h-4 mr-3 text-[#0071dc]" />
                      <span className="text-sm">{query.text}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Support Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Response time:</span>
                    <Badge className="bg-green-100 text-green-800">Instant</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Availability:</span>
                    <Badge className="bg-blue-100 text-blue-800">24/7</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Resolution rate:</span>
                    <span className="font-medium">94.2%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Satisfaction:</span>
                    <span className="font-medium">4.8/5</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center">
                  <Avatar className="w-8 h-8 mr-3">
                    <AvatarFallback className="bg-[#0071dc] text-white">AI</AvatarFallback>
                  </Avatar>
                  Walmart AI Assistant
                  <Badge className="ml-2 bg-green-100 text-green-800">Online</Badge>
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[80%] ${message.type === "user" ? "order-2" : "order-1"}`}>
                        {message.type === "ai" && (
                          <div className="flex items-center mb-2">
                            <Avatar className="w-6 h-6 mr-2">
                              <AvatarFallback className="bg-[#0071dc] text-white text-xs">AI</AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-gray-500">
                              {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </span>
                          </div>
                        )}

                        <div
                          className={`p-3 rounded-lg ${
                            message.type === "user" ? "bg-[#0071dc] text-white" : "bg-white border border-gray-200"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>

                        {message.type === "user" && (
                          <div className="text-xs text-gray-500 mt-1 text-right">
                            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </div>
                        )}

                        {message.quickReplies && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {message.quickReplies.map((reply, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                className="text-xs bg-transparent"
                                onClick={() => handleQuickReply(reply)}
                              >
                                {reply}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="bg-[#0071dc] text-white text-xs">AI</AvatarFallback>
                        </Avatar>
                        <div className="bg-white border border-gray-200 p-3 rounded-lg">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </CardContent>

              <div className="border-t p-4">
                <div className="flex space-x-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your message here..."
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
                    className="flex-1"
                  />
                  <Button onClick={() => handleSendMessage(inputValue)} className="bg-[#0071dc] hover:bg-[#0071dc]/90">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                  <span>Powered by Walmart AI</span>
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="w-3 h-3" />
                    <span>Secure & Private</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
