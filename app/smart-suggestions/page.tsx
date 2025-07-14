"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Leaf, DollarSign, Star, ShoppingCart, Lightbulb } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import Image from "next/image"


const recentPurchases = [
  { name: "Chicken Legs", category: "Meat", purchaseDate: "2 days ago", price: 249.0 },
  { name: "Tomatoes", category: "Vegetables", purchaseDate: "3 days ago", price: 25.0 },
  { name: "Ginger Garlic Paste", category: "Condiments", purchaseDate: "1 week ago", price: 30.0 },
  { name: "Garam Masala", category: "Spices", purchaseDate: "1 week ago", price: 60.0 },
  { name: "Onions", category: "Vegetables", purchaseDate: "4 days ago", price: 20.0 },
  { name: "Fresh Coriander Leaves", category: "Vegetables", purchaseDate: "5 days ago", price: 15.0 },
  { name: "Kashmiri Chilli Powder", category: "Spices", purchaseDate: "2 weeks ago", price: 45.0 },
  { name: "Butter", category: "Dairy", purchaseDate: "3 days ago", price: 55.0 },
]


const suggestedRecipes = [
  {
    id: "chicken-tikka",
    name: "Chicken Tikka",
    image: "/items/chicken-tikka.jpg",
    cookTime: "45 minutes",
    difficulty: "Medium",
    rating: 4.8,
    tags: ["Tandoori", "Spicy", "Grilled"],
    availableIngredients: ["Chicken Legs", "Ginger Garlic Paste", "Kashmiri Chilli Powder", "Onions"],
    missingIngredients: ["Hung Curd - ₹40", "Lemon Juice - ₹10"],
    description: "Spicy marinated chicken pieces grilled to perfection",
  },
  {
    id: "butter-chicken",
    name: "Butter Chicken",
    image: "/items/butter-chicken.jpg",
    cookTime: "1 hour",
    difficulty: "Medium",
    rating: 4.9,
    tags: ["Rich", "Creamy", "Popular"],
    availableIngredients: ["Chicken Legs", "Butter", "Tomatoes", "Ginger Garlic Paste", "Onions", "Garam Masala"],
    missingIngredients: ["Cream - ₹40", "Kasuri Methi - ₹15"],
    description: "Creamy tomato-based curry loved across India",
  },
  {
    id: "murg-malai",
    name: "Murg Malai",
    image: "/items/malai-chicken.jpg",
    cookTime: "50 minutes",
    difficulty: "Medium",
    rating: 4.7,
    tags: ["Creamy", "Mild", "Juicy"],
    availableIngredients: ["Chicken Legs", "Ginger Garlic Paste", "Fresh Coriander Leaves"],
    missingIngredients: ["Fresh Cream - ₹40", "Cheese - ₹50", "Green Chillies - ₹10"],
    description: "Tender chicken marinated in a creamy base, grilled or pan-cooked",
  },
]

const smartSuggestions = {
  quickToCook: [
    {
      id: "instant-noodles",
      name: "Upgraded Instant Ramen",
      image: "/placeholder.svg",
      price: 1.99,
      cookTime: "5 minutes",
      ingredients: ["Your chicken", "Your vegetables", "Instant noodles"],
      reason: "Quick meal using your ingredients",
    },
    {
      id: "chicken-wrap",
      name: "Quick Chicken Wrap",
      image: "/placeholder.svg",
      price: 3.99,
      cookTime: "8 minutes",
      ingredients: ["Your chicken", "Tortillas", "Your vegetables"],
      reason: "Fast and filling",
    },
  ],
  healthy: [
    {
      id: "power-bowl",
      name: "Chicken Power Bowl",
      image: "/placeholder.svg",
      price: 2.99,
      cookTime: "12 minutes",
      ingredients: ["Your chicken", "Your rice", "Your vegetables"],
      reason: "High protein, balanced nutrition",
    },
    {
      id: "veggie-soup",
      name: "Garden Vegetable Soup",
      image: "/placeholder.svg",
      price: 1.49,
      cookTime: "20 minutes",
      ingredients: ["Your vegetables", "Vegetable broth"],
      reason: "Low calorie, nutrient dense",
    },
  ],
  budgetFriendly: [
    {
      id: "fried-rice",
      name: "Simple Fried Rice",
      image: "/placeholder.svg",
      price: 0.99,
      cookTime: "10 minutes",
      ingredients: ["Your rice", "Your vegetables", "Eggs"],
      reason: "Uses pantry staples",
    },
    {
      id: "veggie-pasta",
      name: "Vegetable Pasta",
      image: "/placeholder.svg",
      price: 2.49,
      cookTime: "15 minutes",
      ingredients: ["Pasta", "Your vegetables", "Your garlic"],
      reason: "Affordable and filling",
    },
  ],
}

export default function SmartSuggestionsPage() {
  const [selectedTab, setSelectedTab] = useState("recipes")
  const { addItem } = useCart()

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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Smart Inventory Suggestions</h1>
          <p className="text-lg text-gray-600">Personalized recommendations based on what you already have</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Recent Purchases */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2 text-[#ffc220]" />
                  Your Inventory
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentPurchases.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-gray-500">{item.purchaseDate}</div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {item.category}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Inventory Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Items available:</span>
                    <span className="font-medium">{recentPurchases.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Categories:</span>
                    <span className="font-medium">5</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Estimated value:</span>
                    <span className="font-medium">$26.91</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="recipes">Recipe Suggestions</TabsTrigger>
                <TabsTrigger value="categories">By Category</TabsTrigger>
              </TabsList>

              <TabsContent value="recipes" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>🤖 AI Recipe Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {suggestedRecipes.map((recipe) => (
                        <Card key={recipe.id} className="border-2 hover:border-[#0071dc] transition-colors">
                          <CardContent className="p-4">
                            <Image
                              src={recipe.image || "/placeholder.svg"}
                              alt={recipe.name}
                              width={200}
                              height={150}
                              className="w-full h-32 object-cover rounded-lg mb-3"
                            />

                            <h4 className="font-semibold mb-2">{recipe.name}</h4>

                            <div className="flex items-center space-x-1 mb-2">
                              <div className="flex">{renderStars(recipe.rating)}</div>
                              <span className="text-xs text-gray-500">{recipe.rating}</span>
                            </div>

                            <p className="text-xs text-gray-600 mb-3">{recipe.description}</p>

                            <div className="flex items-center space-x-2 mb-3">
                              <Clock className="w-3 h-3 text-gray-500" />
                              <span className="text-xs">{recipe.cookTime}</span>
                              <Badge variant="outline" className="text-xs">
                                {recipe.difficulty}
                              </Badge>
                            </div>

                            <div className="space-y-2 mb-3">
                              <div className="text-xs">
                                <span className="text-green-600 font-medium">
                                  ✅ Available: {recipe.availableIngredients.length} items
                                </span>
                              </div>
                              {recipe.missingIngredients.length > 0 && (
                                <div className="text-xs">
                                  <span className="text-red-600 font-medium">
                                    🛒 Need: {recipe.missingIngredients.join(", ")}
                                  </span>
                                </div>
                              )}
                            </div>

                            <div className="flex flex-wrap gap-1 mb-3">
                              {recipe.tags.map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>

                            <Button size="sm" className="w-full bg-[#0071dc] hover:bg-[#0071dc]/90">
                              View Recipe
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="categories" className="space-y-6">
                <div className="grid gap-6">
                  {/* Quick to Cook */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-green-500" />
                        Quick to Cook
                        <Badge className="ml-2 bg-green-100 text-green-800">Under 15 min</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        {smartSuggestions.quickToCook.map((item) => (
                          <Card key={item.id} className="border hover:border-green-300 transition-colors">
                            <CardContent className="p-4">
                              <div className="flex items-start space-x-3">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  width={80}
                                  height={80}
                                  className="rounded-lg object-cover"
                                />
                                <div className="flex-1">
                                  <h4 className="font-medium text-sm mb-1">{item.name}</h4>
                                  <div className="flex items-center space-x-2 mb-2">
                                    <Clock className="w-3 h-3 text-gray-500" />
                                    <span className="text-xs">{item.cookTime}</span>
                                    <span className="text-sm font-semibold text-[#0071dc]">${item.price}</span>
                                  </div>
                                  <p className="text-xs text-gray-600 mb-2">{item.reason}</p>
                                  <p className="text-xs text-green-600 mb-3">Uses: {item.ingredients.join(", ")}</p>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="w-full bg-transparent"
                                    onClick={() =>
                                      addItem({
                                        id: item.id,
                                        name: item.name,
                                        price: item.price,
                                        image: item.image,
                                      })
                                    }
                                  >
                                    <ShoppingCart className="w-3 h-3 mr-1" />
                                    Add Missing Items
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Healthy */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Leaf className="w-5 h-5 mr-2 text-green-600" />
                        Healthy Options
                        <Badge className="ml-2 bg-green-100 text-green-800">Nutritious</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        {smartSuggestions.healthy.map((item) => (
                          <Card key={item.id} className="border hover:border-green-300 transition-colors">
                            <CardContent className="p-4">
                              <div className="flex items-start space-x-3">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  width={80}
                                  height={80}
                                  className="rounded-lg object-cover"
                                />
                                <div className="flex-1">
                                  <h4 className="font-medium text-sm mb-1">{item.name}</h4>
                                  <div className="flex items-center space-x-2 mb-2">
                                    <Clock className="w-3 h-3 text-gray-500" />
                                    <span className="text-xs">{item.cookTime}</span>
                                    <span className="text-sm font-semibold text-[#0071dc]">${item.price}</span>
                                  </div>
                                  <p className="text-xs text-gray-600 mb-2">{item.reason}</p>
                                  <p className="text-xs text-green-600 mb-3">Uses: {item.ingredients.join(", ")}</p>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="w-full bg-transparent"
                                    onClick={() =>
                                      addItem({
                                        id: item.id,
                                        name: item.name,
                                        price: item.price,
                                        image: item.image,
                                      })
                                    }
                                  >
                                    <ShoppingCart className="w-3 h-3 mr-1" />
                                    Add Missing Items
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Budget Friendly */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <DollarSign className="w-5 h-5 mr-2 text-blue-600" />
                        Budget-Friendly
                        <Badge className="ml-2 bg-blue-100 text-blue-800">Under $5</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        {smartSuggestions.budgetFriendly.map((item) => (
                          <Card key={item.id} className="border hover:border-blue-300 transition-colors">
                            <CardContent className="p-4">
                              <div className="flex items-start space-x-3">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  width={80}
                                  height={80}
                                  className="rounded-lg object-cover"
                                />
                                <div className="flex-1">
                                  <h4 className="font-medium text-sm mb-1">{item.name}</h4>
                                  <div className="flex items-center space-x-2 mb-2">
                                    <Clock className="w-3 h-3 text-gray-500" />
                                    <span className="text-xs">{item.cookTime}</span>
                                    <span className="text-sm font-semibold text-[#0071dc]">${item.price}</span>
                                  </div>
                                  <p className="text-xs text-gray-600 mb-2">{item.reason}</p>
                                  <p className="text-xs text-green-600 mb-3">Uses: {item.ingredients.join(", ")}</p>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="w-full bg-transparent"
                                    onClick={() =>
                                      addItem({
                                        id: item.id,
                                        name: item.name,
                                        price: item.price,
                                        image: item.image,
                                      })
                                    }
                                  >
                                    <ShoppingCart className="w-3 h-3 mr-1" />
                                    Add Missing Items
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
