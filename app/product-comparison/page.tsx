"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Check, X, Leaf, ShoppingCart } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const allProducts = [
  // Shampoos
  {
    id: "1",
    name: "Pantene Pro-V Shampoo",
    brand: "Pantene",
    price: 8.99,
    category: "shampoo",
    image: "/placeholder.svg",
    rating: 4.5,
    reviews: 1247,
    ingredients: ["Water", "Sodium Laureth Sulfate", "Cocamidopropyl Betaine", "Sodium Citrate"],
    ecoRating: 3,
    inStock: true,
    badges: ["Best Value"],
    features: {
      "Sulfate Free": false,
      "Paraben Free": true,
      "Color Safe": true,
      "For Damaged Hair": true,
      "Vitamin Enriched": true,
    },
  },
  {
    id: "2",
    name: "Herbal Essences Shampoo",
    brand: "Herbal Essences",
    price: 6.49,
    category: "shampoo",
    image: "/placeholder.svg",
    rating: 4.2,
    reviews: 892,
    ingredients: ["Water", "Sodium Lauryl Sulfate", "Cocamide MEA", "Fragrance"],
    ecoRating: 4,
    inStock: true,
    badges: ["Top Rated"],
    features: {
      "Sulfate Free": false,
      "Paraben Free": false,
      "Color Safe": true,
      "For Damaged Hair": false,
      "Vitamin Enriched": false,
    },
  },
  // Add more products in different categories
  {
    id: "4",
    name: "Head & Shoulders Shampoo",
    brand: "Head & Shoulders",
    price: 7.99,
    category: "shampoo",
    image: "/placeholder.svg",
    rating: 4.3,
    reviews: 1456,
    ingredients: ["Water", "Zinc Pyrithione", "Sodium Laureth Sulfate"],
    ecoRating: 3,
    inStock: true,
    badges: ["Anti-Dandruff"],
    features: {
      "Sulfate Free": false,
      "Paraben Free": true,
      "Color Safe": true,
      "For Damaged Hair": false,
      "Vitamin Enriched": false,
    },
  },
  // Cereals
  {
    id: "5",
    name: "Honey Nut Cheerios",
    brand: "General Mills",
    price: 4.99,
    category: "cereal",
    image: "/placeholder.svg",
    rating: 4.5,
    reviews: 2341,
    ingredients: ["Whole Grain Oats", "Sugar", "Honey", "Natural Almond Flavor"],
    ecoRating: 4,
    inStock: true,
    badges: ["Heart Healthy"],
    features: {
      "Gluten Free": false,
      "Whole Grain": true,
      "Low Sugar": false,
      "High Fiber": true,
      Fortified: true,
    },
  },
]

const categories = ["shampoo", "cereal", "phone", "tv"]

export default function ProductComparisonPage() {
  const [selectedCategory, setSelectedCategory] = useState("shampoo")
  const [availableProducts, setAvailableProducts] = useState(allProducts.filter((p) => p.category === "shampoo"))
  const [compareList, setCompareList] = useState<string[]>([])
  const [selectedProducts, setSelectedProducts] = useState(
    allProducts.filter((p) => p.id === "1" || p.id === "2" || p.id === "3"),
  )
  const { addItem } = useCart()

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  const renderEcoRating = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Leaf key={i} className={`w-4 h-4 ${i < rating ? "fill-green-500 text-green-500" : "text-gray-300"}`} />
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">AI-Powered Product Comparison</h1>
          <p className="text-lg text-gray-600">Compare products side-by-side with intelligent analysis</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Select Products to Compare</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Select
                value={selectedCategory}
                onValueChange={(value) => {
                  setSelectedCategory(value)
                  setAvailableProducts(allProducts.filter((p) => p.category === value))
                  setCompareList([])
                  setSelectedProducts([])
                }}
              >
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="shampoo">Shampoos</SelectItem>
                  <SelectItem value="cereal">Cereals</SelectItem>
                  <SelectItem value="phone">Phones</SelectItem>
                  <SelectItem value="tv">TVs</SelectItem>
                </SelectContent>
              </Select>

              <div className="grid md:grid-cols-4 gap-4">
                {availableProducts.map((product) => (
                  <Card
                    key={product.id}
                    className={`cursor-pointer transition-all ${
                      compareList.includes(product.id) ? "ring-2 ring-blue-500" : ""
                    }`}
                    onClick={() => {
                      if (compareList.includes(product.id)) {
                        setCompareList(compareList.filter((id) => id !== product.id))
                      } else if (compareList.length < 3) {
                        setCompareList([...compareList, product.id])
                      }
                    }}
                  >
                    <CardContent className="p-3">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={100}
                        height={100}
                        className="w-full h-20 object-cover rounded mb-2"
                      />
                      <h4 className="font-medium text-sm">{product.name}</h4>
                      <p className="text-xs text-gray-600">{product.brand}</p>
                      <p className="font-semibold text-blue-600">${product.price}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button
                onClick={() => {
                  const selected = allProducts.filter((p) => compareList.includes(p.id))
                  setSelectedProducts(selected)
                }}
                disabled={compareList.length < 2}
                className="bg-[#0071dc] hover:bg-[#0071dc]/90"
              >
                Compare Selected Products ({compareList.length})
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {selectedProducts.map((product, index) => (
            <Card key={product.id} className="relative">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <p className="text-sm text-gray-600">{product.brand}</p>
                  </div>
                  {product.badges.map((badge) => (
                    <Badge
                      key={badge}
                      className={`
                        ${badge === "Best Value" ? "bg-[#ffc220] text-[#0071dc]" : ""}
                        ${badge === "Top Rated" ? "bg-green-500" : ""}
                        ${badge === "Premium Choice" ? "bg-purple-500" : ""}
                      `}
                    >
                      {badge}
                    </Badge>
                  ))}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="w-full h-48 object-cover rounded-lg"
                />

                {/* Price */}
                <div className="text-2xl font-bold text-[#0071dc]">${product.price}</div>

                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <div className="flex">{renderStars(product.rating)}</div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                {/* Stock Status */}
                <div className="flex items-center space-x-2">
                  {product.inStock ? (
                    <Badge className="bg-green-500">✅ In Stock</Badge>
                  ) : (
                    <Badge variant="destructive">❌ Out of Stock</Badge>
                  )}
                </div>

                {/* Eco Rating */}
                <div>
                  <p className="text-sm font-medium mb-1">Eco Rating</p>
                  <div className="flex">{renderEcoRating(product.ecoRating)}</div>
                </div>

                {/* Features Comparison */}
                <div>
                  <p className="text-sm font-medium mb-2">Features</p>
                  <div className="space-y-1">
                    {Object.entries(product.features).map(([feature, hasFeature]) => (
                      <div key={feature} className="flex items-center justify-between text-sm">
                        <span>{feature}</span>
                        {hasFeature ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <X className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Ingredients */}
                <div>
                  <p className="text-sm font-medium mb-1">Key Ingredients</p>
                  <div className="text-xs text-gray-600">{product.ingredients.slice(0, 3).join(", ")}...</div>
                </div>

                {/* Add to Cart */}
                <Button
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
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Comparison Summary */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">🤖 AI Comparison Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-[#ffc220]/10 p-4 rounded-lg">
                <h3 className="font-semibold text-[#0071dc] mb-2">Best Value</h3>
                <p className="text-sm">
                  <strong>Pantene Pro-V</strong> offers the best price-to-performance ratio with proven results and
                  vitamin enrichment.
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-700 mb-2">Most Eco-Friendly</h3>
                <p className="text-sm">
                  <strong>OGX Argan Oil</strong> leads in sustainability with natural ingredients and eco-conscious
                  packaging.
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-700 mb-2">Premium Choice</h3>
                <p className="text-sm">
                  <strong>OGX Argan Oil</strong> provides luxury ingredients and superior hair care benefits.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
