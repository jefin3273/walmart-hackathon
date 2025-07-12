"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mic, Camera, Upload, Search, Star, ShoppingCart } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import Image from "next/image"

const searchResults = [
  {
    id: "cereal1",
    name: "Honey Nut Cheerios",
    brand: "General Mills",
    price: 4.99,
    image: "/placeholder.svg",
    rating: 4.5,
    inStock: true,
    description: "Heart-healthy whole grain cereal",
  },
  {
    id: "cereal2",
    name: "Frosted Flakes",
    brand: "Kellogg's",
    price: 3.99,
    image: "/placeholder.svg",
    rating: 4.2,
    inStock: true,
    description: "Sweet corn flakes cereal",
  },
  {
    id: "cereal3",
    name: "Lucky Charms",
    brand: "General Mills",
    price: 4.49,
    image: "/placeholder.svg",
    rating: 4.3,
    inStock: false,
    description: "Magically delicious marshmallow cereal",
  },
]

const voiceQueries = [
  "Find breakfast cereals under $5",
  "Show me organic milk options",
  "Where can I find iPhone chargers?",
  "I need gluten-free bread",
]

export default function VoiceVisualSearchPage() {
  const [isListening, setIsListening] = useState(false)
  const [voiceQuery, setVoiceQuery] = useState("")
  const [showResults, setShowResults] = useState(false)
  const [searchType, setSearchType] = useState<"voice" | "visual" | null>(null)
  const { addItem } = useCart()

  const [isRecording, setIsRecording] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [recognizedText, setRecognizedText] = useState("")

  const startVoiceRecognition = () => {
    setIsRecording(true)
    setIsListening(true)

    // Simulate voice recognition
    setTimeout(() => {
      const responses = [
        "Find breakfast cereals under five dollars",
        "Show me organic milk options",
        "Where can I find iPhone chargers",
        "I need gluten free bread",
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      setRecognizedText(randomResponse)
      setVoiceQuery(randomResponse)
      setIsRecording(false)
      setIsListening(false)
      setShowResults(true)
      setSearchType("voice")
    }, 3000)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
        setSearchType("visual")
        setShowResults(true)
        setVoiceQuery("Similar breakfast cereals found")
      }
      reader.readAsDataURL(file)
    }
  }

  const takePhoto = () => {
    // Simulate camera capture
    setUploadedImage("/placeholder.svg")
    setSearchType("visual")
    setShowResults(true)
    setVoiceQuery("Product identified from camera")
  }

  const handleVoiceSearch = (query: string) => {
    setVoiceQuery(query)
    setSearchType("voice")
    setShowResults(true)
  }

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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Voice & Visual Product Search</h1>
          <p className="text-lg text-gray-600">Search by speaking or uploading an image</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Search Interface */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Search Methods</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Voice Search */}
                  <div className="text-center">
                    <div className="mb-4">
                      <Button
                        size="lg"
                        className={`w-24 h-24 rounded-full ${
                          isRecording ? "bg-red-500 animate-pulse" : "bg-[#0071dc]"
                        }`}
                        onClick={startVoiceRecognition}
                        disabled={isRecording}
                      >
                        <Mic className="w-8 h-8 text-white" />
                      </Button>
                    </div>
                    <h3 className="font-semibold mb-2">🎙️ Voice Search</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {isRecording ? "🎙️ Listening... Speak now!" : "Tap to start voice search"}
                    </p>

                    {recognizedText && (
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm text-blue-700">Recognized: "{recognizedText}"</p>
                      </div>
                    )}
                  </div>

                  {/* Visual Search */}
                  <div className="text-center">
                    <div className="mb-4">
                      <Button
                        size="lg"
                        className="w-24 h-24 rounded-full bg-[#ffc220] text-[#0071dc] hover:bg-[#ffc220]/90"
                      >
                        <Camera className="w-8 h-8" />
                      </Button>
                    </div>
                    <h3 className="font-semibold mb-2">📷 Visual Search</h3>
                    <p className="text-sm text-gray-600 mb-4">Upload an image to find similar products</p>

                    <div className="space-y-2">
                      <label className="block">
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                        <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                          <span>
                            <Upload className="w-4 h-4 mr-2" />
                            Upload Image
                          </span>
                        </Button>
                      </label>
                      <Button variant="outline" size="sm" className="w-full bg-transparent" onClick={takePhoto}>
                        <Camera className="w-4 h-4 mr-2" />
                        Take Photo
                      </Button>
                    </div>

                    {uploadedImage && (
                      <div className="mt-3">
                        <Image
                          src={uploadedImage || "/placeholder.svg"}
                          alt="Uploaded"
                          width={200}
                          height={128}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Voice Commands */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Voice Commands</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {voiceQueries.map((query, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="justify-start text-left h-auto p-3 bg-transparent"
                      onClick={() => handleVoiceSearch(query)}
                    >
                      <Mic className="w-4 h-4 mr-2 text-[#0071dc]" />
                      <span className="text-sm">{query}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Search Results */}
            {showResults && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Search Results</span>
                    <Badge className="bg-[#0071dc]">{searchType === "voice" ? "🎙️ Voice" : "📷 Visual"} Search</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {searchResults.map((product) => (
                      <Card key={product.id} className="border-2 hover:border-[#0071dc] transition-colors">
                        <CardContent className="p-4">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            width={150}
                            height={150}
                            className="w-full h-32 object-cover rounded-lg mb-3"
                          />

                          <h4 className="font-semibold text-sm mb-1">{product.name}</h4>
                          <p className="text-xs text-gray-600 mb-2">{product.brand}</p>

                          <div className="flex items-center space-x-1 mb-2">
                            <div className="flex">{renderStars(product.rating)}</div>
                            <span className="text-xs text-gray-500">{product.rating}</span>
                          </div>

                          <p className="text-xs text-gray-600 mb-3">{product.description}</p>

                          <div className="flex items-center justify-between mb-3">
                            <span className="font-bold text-[#0071dc]">${product.price}</span>
                            {product.inStock ? (
                              <Badge className="bg-green-500 text-xs">In Stock</Badge>
                            ) : (
                              <Badge variant="destructive" className="text-xs">
                                Out of Stock
                              </Badge>
                            )}
                          </div>

                          <Button
                            size="sm"
                            className="w-full bg-[#0071dc] hover:bg-[#0071dc]/90"
                            disabled={!product.inStock}
                            onClick={() =>
                              addItem({
                                id: product.id,
                                name: product.name,
                                price: product.price,
                                image: product.image,
                              })
                            }
                          >
                            <ShoppingCart className="w-3 h-3 mr-1" />
                            {product.inStock ? "Add to Cart" : "Out of Stock"}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Search Tips & History */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Search Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm mb-2">🎙️ Voice Search Tips</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Speak clearly and naturally</li>
                    <li>• Include brand names for better results</li>
                    <li>• Mention price ranges or categories</li>
                    <li>• Try "Show me..." or "Find..."</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-2">📷 Visual Search Tips</h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• Use clear, well-lit photos</li>
                    <li>• Focus on the main product</li>
                    <li>• Avoid cluttered backgrounds</li>
                    <li>• Multiple angles help accuracy</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Searches</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center">
                      <Mic className="w-3 h-3 mr-2 text-[#0071dc]" />
                      "iPhone chargers"
                    </span>
                    <Button variant="ghost" size="sm" onClick={() => handleVoiceSearch("iPhone chargers")}>
                      <Search className="w-3 h-3" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center">
                      <Camera className="w-3 h-3 mr-2 text-[#ffc220]" />
                      Cereal box image
                    </span>
                    <Button variant="ghost" size="sm" onClick={() => setShowResults(true)}>
                      <Search className="w-3 h-3" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center">
                      <Mic className="w-3 h-3 mr-2 text-[#0071dc]" />
                      "Organic vegetables"
                    </span>
                    <Button variant="ghost" size="sm" onClick={() => handleVoiceSearch("Organic vegetables")}>
                      <Search className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Search Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Voice searches today:</span>
                    <span className="font-medium">1,247</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Visual searches today:</span>
                    <span className="font-medium">892</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Average accuracy:</span>
                    <span className="font-medium">94.2%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Response time:</span>
                    <span className="font-medium">&lt; 2 seconds</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
