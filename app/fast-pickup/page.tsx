"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { QrCode, Clock, MapPin, Plus, Star, Truck } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import Image from "next/image"

const orderDetails = {
  orderNumber: "WM-2024-001234",
  pickupTime: "Ready in 15 minutes",
  location: "Pickup Bay 3",
  items: [
    { name: "Organic Bananas", quantity: 2, price: 2.99 },
    { name: "Whole Milk", quantity: 1, price: 3.49 },
    { name: "Bread Loaf", quantity: 1, price: 2.29 },
  ],
  total: 8.77,
}

const suggestedAddOns = [
  {
    id: "addon1",
    name: "Peanut Butter",
    price: 4.99,
    image: "/placeholder.svg",
    reason: "Frequently bought together",
    rating: 4.5,
    tag: "🥜 Perfect with bread",
  },
  {
    id: "addon2",
    name: "Chocolate Chip Cookies",
    price: 3.99,
    image: "/placeholder.svg",
    reason: "Based on your last orders",
    rating: 4.7,
    tag: "🍪 Sweet treat",
  },
  {
    id: "addon3",
    name: "Orange Juice",
    price: 5.49,
    image: "/placeholder.svg",
    reason: "Complements your breakfast items",
    rating: 4.3,
    tag: "🍊 Fresh & healthy",
  },
  {
    id: "addon4",
    name: "Greek Yogurt",
    price: 6.99,
    image: "/placeholder.svg",
    reason: "Healthy addition",
    rating: 4.6,
    tag: "🥛 Protein boost",
  },
  {
    id: "addon5",
    name: "Granola Cereal",
    price: 4.49,
    image: "/placeholder.svg",
    reason: "Goes great with milk",
    rating: 4.4,
    tag: "🥣 Breakfast essential",
  },
  {
    id: "addon6",
    name: "Strawberry Jam",
    price: 3.79,
    image: "/placeholder.svg",
    reason: "Perfect for toast",
    rating: 4.2,
    tag: "🍓 Sweet spread",
  },
]

export default function FastPickupPage() {
  const [addedItems, setAddedItems] = useState<string[]>([])
  const { addItem } = useCart()

  const [cartItems, setCartItems] = useState(orderDetails.items)
  const [showAddItems, setShowAddItems] = useState(false)
  const [pickupSelected, setPickupSelected] = useState(false)
  const [orderConfirmed, setOrderConfirmed] = useState(false)

  const availableItems = [
    { name: "Apples", price: 3.99, category: "Produce" },
    { name: "Chicken Thighs", price: 5.99, category: "Meat" },
    { name: "Pasta", price: 1.99, category: "Grocery" },
    { name: "Cheese", price: 4.49, category: "Dairy" },
    { name: "Tomatoes", price: 2.99, category: "Produce" },
    { name: "Ground Beef", price: 7.99, category: "Meat" },
  ]

  const addItemToCart = (item: any) => {
    setCartItems([...cartItems, { ...item, quantity: 1 }])
  }

  const confirmPickupOrder = () => {
    setPickupSelected(true)
    setOrderConfirmed(true)
  }

  const downloadQR = () => {
    // Simulate QR code download
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    canvas.width = 200
    canvas.height = 200

    if (ctx) {
      ctx.fillStyle = "#000"
      ctx.fillRect(0, 0, 200, 200)
      ctx.fillStyle = "#fff"
      ctx.font = "12px Arial"
      ctx.fillText("QR CODE", 80, 100)
    }

    const link = document.createElement("a")
    link.download = "walmart-pickup-qr.png"
    link.href = canvas.toDataURL()
    link.click()
  }

  const handleAddItem = (item: any) => {
    if (!addedItems.includes(item.id)) {
      setAddedItems([...addedItems, item.id])
      addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
      })
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Walmart Fast Pickup</h1>
          <p className="text-lg text-gray-600">Your order is ready! Quick pickup with smart suggestions</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Confirmation */}
          <div className="lg:col-span-2 space-y-6">
            {!orderConfirmed && (
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Choose Fulfillment Option</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      className="h-20 flex flex-col bg-transparent"
                      onClick={() => setPickupSelected(false)}
                    >
                      <Truck className="w-6 h-6 mb-2" />
                      Delivery
                    </Button>
                    <Button
                      className="h-20 flex flex-col bg-[#0071dc] hover:bg-[#0071dc]/90"
                      onClick={confirmPickupOrder}
                    >
                      <MapPin className="w-6 h-6 mb-2" />
                      Store Pickup
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {orderConfirmed && (
              <div className="mb-6">
                <Button onClick={downloadQR} className="bg-[#ffc220] text-[#0071dc] hover:bg-[#ffc220]/90">
                  📱 Download QR Code
                </Button>
              </div>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Order Confirmation</span>
                  <Badge className="bg-green-500">✅ Ready for Pickup</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-4">Order Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Order Number:</span>
                        <span className="font-medium">{orderDetails.orderNumber}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Pickup Time:</span>
                        <Badge className="bg-[#ffc220] text-[#0071dc]">
                          <Clock className="w-3 h-3 mr-1" />
                          {orderDetails.pickupTime}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Location:</span>
                        <Badge variant="outline">
                          <MapPin className="w-3 h-3 mr-1" />
                          {orderDetails.location}
                        </Badge>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="font-medium mb-3">Items Ordered</h4>
                      <div className="space-y-2">
                        {orderDetails.items.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>
                              {item.name} (x{item.quantity})
                            </span>
                            <span>${item.price}</span>
                          </div>
                        ))}
                        <div className="border-t pt-2 flex justify-between font-semibold">
                          <span>Total:</span>
                          <span>${orderDetails.total}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center bg-gray-100 rounded-lg p-6">
                    <QrCode className="w-32 h-32 text-[#0071dc] mb-4" />
                    <p className="text-sm text-center text-gray-600">Show this QR code at pickup</p>
                    <Button className="mt-4 bg-[#0071dc] hover:bg-[#0071dc]/90">Download QR Code</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button onClick={() => setShowAddItems(!showAddItems)} variant="outline" className="mb-6">
              {showAddItems ? "Hide" : "Add More Items"}
            </Button>

            {showAddItems && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Add More Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {availableItems.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-sm text-gray-500">{item.category}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">${item.price}</div>
                          <Button size="sm" onClick={() => addItemToCart(item)}>
                            Add
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Smart Add-on Suggestions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  🤖 Smart Suggestions
                  <Badge className="ml-2 bg-[#ffc220] text-[#0071dc]">AI Powered</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">Based on your order and shopping history, you might also want:</p>

                <div className="grid md:grid-cols-2 gap-4">
                  {suggestedAddOns.map((item) => (
                    <Card
                      key={item.id}
                      className="border-2 border-dashed border-gray-200 hover:border-[#0071dc] transition-colors"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={60}
                            height={60}
                            className="rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{item.name}</h4>
                            <div className="flex items-center space-x-1 mt-1">
                              <div className="flex">{renderStars(item.rating)}</div>
                              <span className="text-xs text-gray-500">{item.rating}</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{item.reason}</p>
                            <div className="text-xs text-[#0071dc] mt-1">{item.tag}</div>
                            <div className="flex items-center justify-between mt-2">
                              <span className="font-semibold text-[#0071dc]">${item.price}</span>
                              <Button
                                size="sm"
                                variant={addedItems.includes(item.id) ? "secondary" : "default"}
                                onClick={() => handleAddItem(item)}
                                disabled={addedItems.includes(item.id)}
                                className={addedItems.includes(item.id) ? "" : "bg-[#0071dc] hover:bg-[#0071dc]/90"}
                              >
                                {addedItems.includes(item.id) ? (
                                  "✅ Added"
                                ) : (
                                  <>
                                    <Plus className="w-3 h-3 mr-1" />
                                    Add
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pickup Instructions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pickup Instructions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#0071dc] text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium">Drive to Pickup Bay 3</h4>
                    <p className="text-sm text-gray-600">Follow the signs for curbside pickup</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#0071dc] text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium">Show QR Code</h4>
                    <p className="text-sm text-gray-600">Present the QR code to our associate</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#0071dc] text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium">Verify Identity</h4>
                    <p className="text-sm text-gray-600">Show ID matching your order</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-medium">Enjoy!</h4>
                    <p className="text-sm text-gray-600">Your groceries will be loaded</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  📞 Call Store: (555) 123-4567
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  💬 Chat with Support
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  📍 Get Directions
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pickup Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Average wait time:</span>
                    <span className="font-medium">2 minutes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Orders today:</span>
                    <span className="font-medium">847</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Customer satisfaction:</span>
                    <span className="font-medium">98.5%</span>
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
