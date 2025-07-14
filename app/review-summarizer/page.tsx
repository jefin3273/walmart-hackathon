"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Star, ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react"
import Image from "next/image"

const products = [
  {
    id: "1",
    name: "iPhone 15 Pro",
    image: "/items/iphone.webp",
    rating: 4.3,
    totalReviews: 2847,
    sentiment: {
      positive: 75,
      neutral: 15,
      negative: 10,
    },
    summary:
      "Customers love the improved camera quality and battery life. The titanium build feels premium and durable. Minor complaints about the price point and some heating issues during intensive use.",
    keyPoints: {
      positive: ["Amazing camera quality", "Long battery life", "Premium titanium build", "Fast performance"],
      negative: ["Expensive price", "Gets warm during gaming", "Limited storage options"],
    },
    recentReviews: [
      { user: "TechLover23", rating: 5, text: "Best iPhone yet! Camera is incredible.", date: "2 days ago" },
      { user: "PhotoPro", rating: 4, text: "Great photos but battery could be better.", date: "1 week ago" },
      { user: "GamerGirl", rating: 3, text: "Gets hot during long gaming sessions.", date: "2 weeks ago" },
    ],
  },
  {
    id: "2",
    name: "Samsung Galaxy S24",
    image: "/items/samsung.jpg",
    rating: 4.1,
    totalReviews: 1923,
    sentiment: {
      positive: 70,
      neutral: 20,
      negative: 10,
    },
    summary:
      "Users appreciate the bright display and AI features. The S Pen functionality is highly praised. Some concerns about software updates and camera performance in low light.",
    keyPoints: {
      positive: ["Brilliant display", "Useful AI features", "S Pen is great", "Good value"],
      negative: ["Camera struggles in low light", "Software can be buggy", "Battery life average"],
    },
    recentReviews: [
      { user: "AndroidFan", rating: 4, text: "Love the AI features and display quality.", date: "3 days ago" },
      { user: "BusinessUser", rating: 5, text: "S Pen makes note-taking so easy.", date: "5 days ago" },
      { user: "CameraEnthusiast", rating: 3, text: "Night photos could be better.", date: "1 week ago" },
    ],
  },
  {
    id: "3",
    name: "Google Pixel 8",
    image: "/items/pixel.png",
    rating: 4.5,
    totalReviews: 1456,
    sentiment: {
      positive: 80,
      neutral: 12,
      negative: 8,
    },
    summary:
      "Customers rave about the pure Android experience and computational photography. The Magic Eraser feature is a standout. Minor issues with build quality and charging speed.",
    keyPoints: {
      positive: ["Pure Android experience", "Excellent camera AI", "Magic Eraser feature", "Regular updates"],
      negative: ["Build quality concerns", "Slow charging", "Limited availability"],
    },
    recentReviews: [
      { user: "PixelFan", rating: 5, text: "Best Android experience ever!", date: "1 day ago" },
      { user: "PhotoMom", rating: 5, text: "Magic Eraser saved so many family photos.", date: "4 days ago" },
      { user: "TechReviewer", rating: 4, text: "Great phone but charging is slow.", date: "1 week ago" },
    ],
  },
]

export default function ReviewSummarizerPage() {
  const [selectedProduct, setSelectedProduct] = useState(products[0])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">AI Review Summarizer</h1>
          <p className="text-lg text-gray-600">Get instant insights from thousands of customer reviews</p>
        </div>

        {/* Product Selection */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {products.map((product) => (
            <Card
              key={product.id}
              className={`cursor-pointer transition-all ${selectedProduct.id === product.id ? "ring-2 ring-[#0071dc]" : ""}`}
              onClick={() => setSelectedProduct(product)}
            >
              <CardContent className="p-4">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={100}
                  height={300}
                  className="w-full h-74  object-cover rounded-lg mb-3"
                />
                <h3 className="font-semibold">{product.name}</h3>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="flex">{renderStars(product.rating)}</div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.totalReviews})
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sentiment Analysis */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2 text-[#0071dc]" />
                  Sentiment Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center">
                      <ThumbsUp className="w-4 h-4 mr-2 text-green-500" />
                      Positive
                    </span>
                    <span className="font-semibold">{selectedProduct.sentiment.positive}%</span>
                  </div>
                  <Progress value={selectedProduct.sentiment.positive} className="h-3" />

                  <div className="flex items-center justify-between">
                    <span className="flex items-center">
                      <MessageCircle className="w-4 h-4 mr-2 text-gray-500" />
                      Neutral
                    </span>
                    <span className="font-semibold">{selectedProduct.sentiment.neutral}%</span>
                  </div>
                  <Progress value={selectedProduct.sentiment.neutral} className="h-3" />

                  <div className="flex items-center justify-between">
                    <span className="flex items-center">
                      <ThumbsDown className="w-4 h-4 mr-2 text-red-500" />
                      Negative
                    </span>
                    <span className="font-semibold">{selectedProduct.sentiment.negative}%</span>
                  </div>
                  <Progress value={selectedProduct.sentiment.negative} className="h-3" />
                </div>
              </CardContent>
            </Card>

            {/* AI Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">🤖 AI Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{selectedProduct.summary}</p>
              </CardContent>
            </Card>

            {/* Key Points */}
            <Card>
              <CardHeader>
                <CardTitle>Key Points</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-3 flex items-center">
                      <ThumbsUp className="w-4 h-4 mr-2" />
                      What Customers Love
                    </h4>
                    <ul className="space-y-2">
                      {selectedProduct.keyPoints.positive.map((point, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-red-700 mb-3 flex items-center">
                      <ThumbsDown className="w-4 h-4 mr-2" />
                      Common Concerns
                    </h4>
                    <ul className="space-y-2">
                      {selectedProduct.keyPoints.negative.map((point, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Reviews */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Recent Reviews</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedProduct.recentReviews.map((review, index) => (
                  <div key={index} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{review.user}</span>
                      <div className="flex">{renderStars(review.rating)}</div>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{review.text}</p>
                    <span className="text-xs text-gray-400">{review.date}</span>
                  </div>
                ))}

                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  View All Reviews
                </Button>
              </CardContent>
            </Card>

            {/* Product Info */}
            <Card className="mt-6">
              <CardContent className="p-6">
                <Image
                  src={selectedProduct.image || "/placeholder.svg"}
                  alt={selectedProduct.name}
                  width={200}
                  height={200}
                  className="w-full h-74 object-cover rounded-lg mb-4"
                />
                <h3 className="font-semibold text-lg mb-2">{selectedProduct.name}</h3>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex">{renderStars(selectedProduct.rating)}</div>
                  <span className="text-sm text-gray-600">
                    {selectedProduct.rating} ({selectedProduct.totalReviews} reviews)
                  </span>
                </div>
                <Button className="w-full bg-[#0071dc] hover:bg-[#0071dc]/90">View Product Details</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
