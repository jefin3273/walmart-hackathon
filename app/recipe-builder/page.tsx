"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { ChefHat, Clock, Users, ShoppingCart, Check, Plus } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import Image from "next/image"

const recipes = [
  {
    id: "spaghetti",
    name: "Classic Spaghetti Carbonara",
    cookTime: "20 minutes",
    servings: 4,
    difficulty: "Medium",
    image: "/placeholder.svg",
    ingredients: [
      { name: "Spaghetti pasta", amount: "1 lb", price: 1.99, inCart: false, id: "spaghetti-pasta" },
      { name: "Bacon", amount: "6 strips", price: 4.99, inCart: false, id: "bacon" },
      { name: "Eggs", amount: "3 large", price: 2.49, inCart: true, id: "eggs" },
      { name: "Parmesan cheese", amount: "1 cup grated", price: 5.99, inCart: false, id: "parmesan" },
      { name: "Black pepper", amount: "1 tsp", price: 1.99, inCart: true, id: "black-pepper" },
      { name: "Garlic", amount: "2 cloves", price: 0.99, inCart: false, id: "garlic" },
    ],
    instructions: [
      "Bring a large pot of salted water to boil and cook spaghetti according to package directions",
      "While pasta cooks, fry bacon in a large skillet until crispy",
      "Beat eggs with grated Parmesan and black pepper in a bowl",
      "Drain pasta, reserving 1 cup pasta water",
      "Add hot pasta to bacon in skillet, remove from heat",
      "Quickly stir in egg mixture, adding pasta water as needed",
      "Serve immediately with extra Parmesan and pepper",
    ],
  },
  {
    id: "chicken-stir-fry",
    name: "Chicken Vegetable Stir Fry",
    cookTime: "15 minutes",
    servings: 3,
    difficulty: "Easy",
    image: "/placeholder.svg",
    ingredients: [
      { name: "Chicken breast", amount: "1 lb", price: 6.99, inCart: false, id: "chicken-breast" },
      { name: "Broccoli", amount: "2 cups", price: 2.99, inCart: false, id: "broccoli" },
      { name: "Bell peppers", amount: "2 medium", price: 3.49, inCart: false, id: "bell-peppers" },
      { name: "Soy sauce", amount: "3 tbsp", price: 2.99, inCart: true, id: "soy-sauce" },
      { name: "Vegetable oil", amount: "2 tbsp", price: 3.99, inCart: true, id: "vegetable-oil" },
      { name: "Rice", amount: "2 cups cooked", price: 2.49, inCart: false, id: "rice" },
    ],
    instructions: [
      "Cut chicken into bite-sized pieces and season with salt and pepper",
      "Heat oil in a large wok or skillet over high heat",
      "Add chicken and cook until golden brown, about 5 minutes",
      "Add vegetables and stir-fry for 3-4 minutes until crisp-tender",
      "Add soy sauce and stir to combine",
      "Serve over cooked rice",
    ],
  },
  {
    id: "chocolate-chip-cookies",
    name: "Homemade Chocolate Chip Cookies",
    cookTime: "25 minutes",
    servings: 24,
    difficulty: "Easy",
    image: "/placeholder.svg",
    ingredients: [
      { name: "All-purpose flour", amount: "2¼ cups", price: 2.99, inCart: false, id: "flour" },
      { name: "Butter", amount: "1 cup", price: 4.49, inCart: false, id: "butter" },
      { name: "Brown sugar", amount: "¾ cup", price: 2.99, inCart: false, id: "brown-sugar" },
      { name: "White sugar", amount: "¾ cup", price: 2.49, inCart: true, id: "white-sugar" },
      { name: "Eggs", amount: "2 large", price: 2.49, inCart: true, id: "eggs-cookies" },
      { name: "Chocolate chips", amount: "2 cups", price: 4.99, inCart: false, id: "chocolate-chips" },
      { name: "Vanilla extract", amount: "2 tsp", price: 3.99, inCart: false, id: "vanilla" },
      { name: "Baking soda", amount: "1 tsp", price: 1.99, inCart: true, id: "baking-soda" },
    ],
    instructions: [
      "Preheat oven to 375°F (190°C)",
      "Cream together butter and both sugars until light and fluffy",
      "Beat in eggs one at a time, then add vanilla",
      "In separate bowl, whisk together flour, baking soda, and salt",
      "Gradually mix dry ingredients into wet ingredients",
      "Stir in chocolate chips",
      "Drop rounded tablespoons of dough onto ungreased baking sheets",
      "Bake 9-11 minutes until golden brown",
      "Cool on baking sheet for 2 minutes before transferring to wire rack",
    ],
  },
]

export default function RecipeBuilderPage() {
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const { addItem } = useCart()

  const handleRecipeSelect = (recipeId: string) => {
    const recipe = recipes.find((r) => r.id === recipeId)
    setSelectedRecipe(recipe)
    setCurrentStep(0)
    setCompletedSteps([])
  }

  const addMissingIngredients = () => {
    if (!selectedRecipe) return

    const missingIngredients = selectedRecipe.ingredients.filter((ing: any) => !ing.inCart)
    missingIngredients.forEach((ingredient: any) => {
      addItem({
        id: ingredient.id,
        name: ingredient.name,
        price: ingredient.price,
        image: "/placeholder.svg",
      })
    })
  }

  const toggleStepComplete = (stepIndex: number) => {
    if (completedSteps.includes(stepIndex)) {
      setCompletedSteps(completedSteps.filter((s) => s !== stepIndex))
    } else {
      setCompletedSteps([...completedSteps, stepIndex])
    }
  }

  const missingIngredients = selectedRecipe?.ingredients.filter((ing: any) => !ing.inCart) || []
  const totalMissingCost = missingIngredients.reduce((sum: number, ing: any) => sum + ing.price, 0)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Reverse Recipe Builder</h1>
          <p className="text-lg text-gray-600">Choose a recipe and we'll find the missing ingredients</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recipe Selection & Instructions */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Select a Recipe</CardTitle>
              </CardHeader>
              <CardContent>
                <Select onValueChange={handleRecipeSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a recipe to get started..." />
                  </SelectTrigger>
                  <SelectContent>
                    {recipes.map((recipe) => (
                      <SelectItem key={recipe.id} value={recipe.id}>
                        {recipe.name} - {recipe.cookTime} - {recipe.difficulty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {selectedRecipe && (
                  <div className="mt-6 grid md:grid-cols-2 gap-6">
                    <div>
                      <Image
                        src={selectedRecipe.image || "/placeholder.svg"}
                        alt={selectedRecipe.name}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-4">{selectedRecipe.name}</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">{selectedRecipe.cookTime}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span className="text-sm">Serves {selectedRecipe.servings}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <ChefHat className="w-4 h-4 text-gray-500" />
                          <Badge variant={selectedRecipe.difficulty === "Easy" ? "default" : "secondary"}>
                            {selectedRecipe.difficulty}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {selectedRecipe && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Cooking Instructions
                    <Badge variant="outline">
                      {completedSteps.length}/{selectedRecipe.instructions.length} completed
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress
                    value={(completedSteps.length / selectedRecipe.instructions.length) * 100}
                    className="mb-6"
                  />

                  <div className="space-y-4">
                    {selectedRecipe.instructions.map((instruction: string, index: number) => (
                      <div
                        key={index}
                        className={`flex items-start space-x-4 p-4 rounded-lg border-2 transition-colors ${
                          completedSteps.includes(index)
                            ? "bg-green-50 border-green-200"
                            : currentStep === index
                              ? "bg-blue-50 border-blue-200"
                              : "bg-white border-gray-200"
                        }`}
                      >
                        <Button
                          variant={completedSteps.includes(index) ? "default" : "outline"}
                          size="sm"
                          className={`min-w-8 h-8 rounded-full p-0 ${
                            completedSteps.includes(index) ? "bg-green-500 hover:bg-green-600" : ""
                          }`}
                          onClick={() => toggleStepComplete(index)}
                        >
                          {completedSteps.includes(index) ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <span className="text-sm font-bold">{index + 1}</span>
                          )}
                        </Button>
                        <div className="flex-1">
                          <p className={`${completedSteps.includes(index) ? "line-through text-gray-500" : ""}`}>
                            {instruction}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Ingredients & Shopping */}
          <div className="space-y-6">
            {selectedRecipe && (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-700">✅ You Already Have</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedRecipe.ingredients
                        .filter((ing: any) => ing.inCart)
                        .map((ingredient: any, index: number) => (
                          <div key={index} className="flex items-center justify-between text-sm">
                            <span>{ingredient.name}</span>
                            <span className="text-gray-500">{ingredient.amount}</span>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-700">🛒 Missing Ingredients</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {missingIngredients.length === 0 ? (
                      <p className="text-green-600 text-center py-4">🎉 You have all ingredients!</p>
                    ) : (
                      <div className="space-y-3">
                        {missingIngredients.map((ingredient: any, index: number) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                            <div>
                              <div className="font-medium text-sm">{ingredient.name}</div>
                              <div className="text-xs text-gray-500">{ingredient.amount}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-[#0071dc]">${ingredient.price}</div>
                              <Button
                                size="sm"
                                variant="outline"
                                className="mt-1 bg-transparent"
                                onClick={() =>
                                  addItem({
                                    id: ingredient.id,
                                    name: ingredient.name,
                                    price: ingredient.price,
                                    image: "/placeholder.svg",
                                  })
                                }
                              >
                                <Plus className="w-3 h-3 mr-1" />
                                Add
                              </Button>
                            </div>
                          </div>
                        ))}

                        <div className="border-t pt-3 mt-4">
                          <div className="flex justify-between items-center mb-3">
                            <span className="font-semibold">Total Missing:</span>
                            <span className="font-bold text-lg text-[#0071dc]">${totalMissingCost.toFixed(2)}</span>
                          </div>
                          <Button className="w-full bg-[#0071dc] hover:bg-[#0071dc]/90" onClick={addMissingIngredients}>
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Add All to Cart
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recipe Tags</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-green-100 text-green-800">Quick to Cook</Badge>
                      <Badge className="bg-blue-100 text-blue-800">Family Friendly</Badge>
                      {selectedRecipe.cookTime.includes("15") || selectedRecipe.cookTime.includes("20") ? (
                        <Badge className="bg-yellow-100 text-yellow-800">Under 30 Min</Badge>
                      ) : null}
                      {totalMissingCost < 15 ? (
                        <Badge className="bg-purple-100 text-purple-800">Budget Friendly</Badge>
                      ) : null}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Popular Recipes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recipes.slice(0, 3).map((recipe) => (
                    <Button
                      key={recipe.id}
                      variant="outline"
                      className="w-full justify-start h-auto p-3 bg-transparent"
                      onClick={() => handleRecipeSelect(recipe.id)}
                    >
                      <div className="text-left">
                        <div className="font-medium text-sm">{recipe.name}</div>
                        <div className="text-xs text-gray-500">
                          {recipe.cookTime} • {recipe.difficulty}
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
