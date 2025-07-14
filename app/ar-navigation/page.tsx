'use client'
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, MapPin, Navigation, Clock, X, Info, Zap, ShoppingCart, Shirt, Smartphone, Package } from 'lucide-react'

const searchResults = [
  { name: "iPhone 15", section: "Electronics", aisle: "E-2", price: "$799", inStock: true, sectionId: 2 },
  { name: "Milk", section: "Grocery", aisle: "G-2", price: "$3.99", inStock: true, sectionId: 1 },
  { name: "Samsung TV", section: "Electronics", aisle: "E-1", price: "$599", inStock: true, sectionId: 2 },
  { name: "Nike Shoes", section: "Clothing", aisle: "C-3", price: "$89.99", inStock: true, sectionId: 3 },
  { name: "Advil", section: "General", aisle: "H-1", price: "$8.99", inStock: true, sectionId: 4 },
]

const storeLayout = {
  sections: [
    {
      id: 1,
      name: "Grocery",
      x: 25,
      y: 35,
      width: 20,
      height: 30,
      color: "bg-green-500",
      icon: <ShoppingCart className="w-6 h-6" />,
      aisles: [
        { id: "G-1", name: "Produce", items: ["Fresh Apples", "Bananas", "Organic Lettuce", "Tomatoes", "Carrots"] },
        { id: "G-2", name: "Dairy", items: ["Whole Milk", "Cheese", "Greek Yogurt", "Butter", "Eggs"] },
        { id: "G-3", name: "Meat & Seafood", items: ["Fresh Chicken", "Ground Beef", "Salmon", "Pork Chops"] },
        { id: "G-4", name: "Frozen Foods", items: ["Ice Cream", "Frozen Pizza", "Frozen Vegetables", "Frozen Meals"] },
        { id: "G-5", name: "Bakery", items: ["Fresh Bread", "Cakes", "Pastries", "Donuts", "Bagels"] },
        { id: "G-6", name: "Pantry", items: ["Pasta", "Rice", "Canned Goods", "Cereals", "Snacks"] },
      ],
    },
    {
      id: 2,
      name: "Electronics",
      x: 55,
      y: 25,
      width: 20,
      height: 25,
      color: "bg-blue-500",
      icon: <Smartphone className="w-6 h-6" />,
      aisles: [
        { id: "E-1", name: "TVs & Audio", items: ["Samsung TV", "LG OLED", "Sound Bars", "Headphones"] },
        { id: "E-2", name: "Mobile Phones", items: ["iPhone 15", "Samsung Galaxy", "Phone Cases", "Chargers"] },
        { id: "E-3", name: "Computers", items: ["Laptops", "Tablets", "Keyboards", "Mice"] },
        { id: "E-4", name: "Gaming", items: ["PlayStation 5", "Xbox", "Nintendo Switch", "Games"] },
        { id: "E-5", name: "Smart Home", items: ["Smart Speakers", "Security Cameras", "Smart Bulbs"] },
      ],
    },
    {
      id: 3,
      name: "Clothing",
      x: 25,
      y: 75,
      width: 20,
      height: 20,
      color: "bg-purple-500",
      icon: <Shirt className="w-6 h-6" />,
      aisles: [
        { id: "C-1", name: "Men's Clothing", items: ["T-Shirts", "Jeans", "Shirts", "Jackets"] },
        { id: "C-2", name: "Women's Clothing", items: ["Dresses", "Blouses", "Pants", "Skirts"] },
        { id: "C-3", name: "Shoes", items: ["Nike Shoes", "Boots", "Sandals", "Sneakers"] },
        { id: "C-4", name: "Accessories", items: ["Bags", "Belts", "Jewelry", "Watches"] },
        { id: "C-5", name: "Kids Clothing", items: ["Kids T-Shirts", "School Uniforms", "Baby Clothes"] },
      ],
    },
    {
      id: 4,
      name: "General",
      x: 55,
      y: 65,
      width: 20,
      height: 30,
      color: "bg-orange-500",
      icon: <Package className="w-6 h-6" />,
      aisles: [
        { id: "H-1", name: "Health & Beauty", items: ["Advil", "Vitamins", "Shampoo", "Makeup"] },
        { id: "H-2", name: "Home & Garden", items: ["Cleaning Supplies", "Tools", "Plants", "Décor"] },
        { id: "H-3", name: "Sports & Outdoors", items: ["Exercise Equipment", "Camping Gear", "Bikes"] },
        { id: "H-4", name: "Toys", items: ["Action Figures", "Board Games", "Dolls", "LEGO"] },
        { id: "H-5", name: "Automotive", items: ["Motor Oil", "Car Accessories", "Tires"] },
      ],
    },
  ],
  userLocation: { x: 65, y: 45 },
  services: [
    { id: "pharmacy", name: "Pharmacy", x: 85, y: 30, icon: "💊" },
    { id: "customer-service", name: "Customer Service", x: 85, y: 50, icon: "ℹ️" },
    { id: "restroom", name: "Restroom", x: 85, y: 70, icon: "🚻" },
  ],
  checkoutLanes: [
    { id: 1, x: 15, y: 15, type: "regular" },
    { id: 2, x: 20, y: 15, type: "regular" },
    { id: 3, x: 25, y: 15, type: "regular" },
    { id: 4, x: 30, y: 15, type: "regular" },
    { id: 5, x: 35, y: 15, type: "express" },
    { id: 6, x: 40, y: 15, type: "express" },
    { id: 7, x: 45, y: 15, type: "self" },
    { id: 8, x: 50, y: 15, type: "self" },
    { id: 9, x: 55, y: 15, type: "self" },
    { id: 10, x: 60, y: 15, type: "self" },
  ],
}

export default function ARNavigationPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showPath, setShowPath] = useState(false)
  const [selectedSection, setSelectedSection] = useState(null)
  const [selectedService, setSelectedService] = useState(null)
  const [navigationMode, setNavigationMode] = useState("positioning")

  const handleSearch = () => {
    const result = searchResults.find((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    if (result) {
      setSelectedProduct(result)
      setShowPath(true)
      setNavigationMode("wayfinding")
      setSelectedSection(null)
      setSelectedService(null)
    }
  }

  const handleSectionClick = (section) => {
    if (selectedSection?.id === section.id) {
      setSelectedSection(null)
    } else {
      setSelectedSection(section)
      setSelectedService(null)
    }
  }

  const handleServiceClick = (service) => {
    if (selectedService?.id === service.id) {
      setSelectedService(null)
    } else {
      setSelectedService(service)
      setSelectedSection(null)
    }
  }

  const startNavigation = () => {
    if (selectedProduct) {
      setNavigationMode("wayfinding")
      setShowPath(true)
      setTimeout(() => {
        setNavigationMode("arrived")
      }, 5000)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Walmart Store Navigation</h1>
          <p className="text-sm md:text-lg text-gray-600">Find products with indoor GPS</p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <Card className="shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Search className="w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search for products, sections, or services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-0 text-base focus-visible:ring-0 shadow-none"
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
                <Button onClick={handleSearch} className="bg-[#0071dc] hover:bg-[#0071dc]/90">
                  Search
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Store Map */}
          <div className="lg:col-span-3">
            <Card className="shadow-lg">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center text-lg">
                    <MapPin className="w-5 h-5 mr-2 text-[#0071dc]" />
                    Store Floor Plan
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Badge className="bg-[#0071dc] text-white">
                      <Zap className="w-3 h-3 mr-1" />
                      AR Mode
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-2">
                <div className="relative bg-white rounded-lg h-[500px] md:h-[600px] overflow-hidden border-2 border-gray-200">
                  {/* Store Entrance */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-4 bg-gray-300 rounded-t-lg flex items-center justify-center">
                    <span className="text-xs font-semibold text-gray-700">🚪 ENTRANCE</span>
                  </div>

                  {/* Checkout Lanes */}
                  <div className="absolute bottom-5 left-0 right-0 px-4">
                    <div className="bg-gray-100 rounded-lg p-2">
                      <div className="text-xs font-semibold text-gray-600 mb-2 text-center">CHECKOUT LANES</div>
                      <div className="flex justify-center space-x-1">
                        {storeLayout.checkoutLanes.map((lane) => (
                          <div
                            key={lane.id}
                            className={`w-6 h-8 rounded text-xs flex items-center justify-center font-bold ${lane.type === 'express' ? 'bg-yellow-400 text-black' :
                              lane.type === 'self' ? 'bg-blue-400 text-white' : 'bg-gray-400 text-white'
                              }`}
                          >
                            {lane.id}
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-center space-x-4 mt-1 text-xs text-gray-500">
                        <span>Regular</span>
                        <span className="text-yellow-600">Express</span>
                        <span className="text-blue-600">Self-Checkout</span>
                      </div>
                    </div>
                  </div>

                  {/* Store Sections */}
                  {storeLayout.sections.map((section) => (
                    <div key={section.id}>
                      {/* Section Area */}
                      <div
                        className={`absolute ${section.color} opacity-20 rounded-lg border-2 border-current`}
                        style={{
                          left: `${section.x}%`,
                          top: `${section.y}%`,
                          width: `${section.width}%`,
                          height: `${section.height}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                      />

                      {/* Section Button */}
                      <button
                        className={`absolute w-14 h-14 ${section.color} rounded-full shadow-lg flex items-center justify-center text-white hover:scale-110 transition-all duration-200 border-4 border-white z-10 ${selectedSection?.id === section.id ? "ring-4 ring-blue-400 scale-110" : ""
                          }`}
                        style={{
                          left: `${section.x}%`,
                          top: `${section.y}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                        onClick={() => handleSectionClick(section)}
                      >
                        {section.icon}
                      </button>

                      {/* Section Label */}
                      <div
                        className="absolute bg-white px-3 py-1 rounded-md shadow-md text-xs font-semibold pointer-events-none z-10"
                        style={{
                          left: `${section.x}%`,
                          top: `${section.y + (section.height / 2) + 5}%`,
                          transform: "translate(-50%, 0)",
                        }}
                      >
                        {section.name}
                      </div>
                    </div>
                  ))}

                  {/* Services */}
                  {storeLayout.services.map((service) => (
                    <div key={service.id}>
                      <button
                        className={`absolute w-10 h-10 bg-yellow-400 rounded-full shadow-md flex items-center justify-center text-lg hover:scale-110 transition-all duration-200 border-2 border-white z-10 ${selectedService?.id === service.id ? "ring-4 ring-yellow-300 scale-110" : ""
                          }`}
                        style={{
                          left: `${service.x}%`,
                          top: `${service.y}%`,
                          transform: "translate(-50%, -50%)",
                        }}
                        onClick={() => handleServiceClick(service)}
                      >
                        {service.icon}
                      </button>
                    </div>
                  ))}

                  {/* User Location */}
                  <div
                    className="absolute w-5 h-5 bg-blue-500 rounded-full border-3 border-white shadow-lg z-20"
                    style={{
                      left: `${storeLayout.userLocation.x}%`,
                      top: `${storeLayout.userLocation.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75"></div>
                  </div>

                  {/* User Location Label */}
                  <div
                    className="absolute bg-blue-500 text-white px-2 py-1 rounded-md text-xs font-semibold pointer-events-none z-20"
                    style={{
                      left: `${storeLayout.userLocation.x}%`,
                      top: `${storeLayout.userLocation.y + 5}%`,
                      transform: "translate(-50%, 0)",
                    }}
                  >
                    You are here
                  </div>

                  {/* Destination Marker */}
                  {selectedProduct && (
                    <div
                      className="absolute w-10 h-10 bg-red-500 rounded-full border-3 border-white shadow-lg flex items-center justify-center text-white text-lg font-bold animate-bounce z-20"
                      style={{
                        left: `${storeLayout.sections.find((s) => s.id === selectedProduct.sectionId)?.x}%`,
                        top: `${storeLayout.sections.find((s) => s.id === selectedProduct.sectionId)?.y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      📍
                    </div>
                  )}

                  {/* Navigation Path */}
                  {showPath && selectedProduct && navigationMode === "wayfinding" && (
                    <div className="absolute inset-0 pointer-events-none z-10">
                      <svg className="w-full h-full">
                        <path
                          d={`M ${storeLayout.userLocation.x}% ${storeLayout.userLocation.y}% Q ${(storeLayout.userLocation.x +
                            (storeLayout.sections.find((s) => s.id === selectedProduct.sectionId)?.x || 0)) /
                            2
                            }% ${(storeLayout.userLocation.y +
                              (storeLayout.sections.find((s) => s.id === selectedProduct.sectionId)?.y || 0)) /
                            2
                            }% ${storeLayout.sections.find((s) => s.id === selectedProduct.sectionId)?.x}% ${storeLayout.sections.find((s) => s.id === selectedProduct.sectionId)?.y
                            }%`}
                          stroke="#3b82f6"
                          strokeWidth="4"
                          fill="none"
                          strokeDasharray="8,4"
                          className="animate-pulse"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Arrival Notification */}
                  {navigationMode === "arrived" && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-2xl p-6 text-center animate-bounce border-4 border-green-500 z-30">
                      <div className="text-4xl mb-2">🎉</div>
                      <div className="font-bold text-lg text-green-600">You've Arrived!</div>
                      <div className="text-sm text-gray-600">Product found in {selectedProduct?.aisle}</div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Section Details */}
            {selectedSection && (
              <Card className="mt-4 shadow-lg border-l-4 border-l-blue-500">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <div className={`w-8 h-8 ${selectedSection.color} rounded-full flex items-center justify-center text-white mr-3`}>
                        {selectedSection.icon}
                      </div>
                      {selectedSection.name} Section
                    </CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedSection(null)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {selectedSection.aisles.map((aisle) => (
                      <Card key={aisle.id} className="border hover:border-blue-300 transition-colors cursor-pointer">
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline" className="font-semibold">{aisle.id}</Badge>
                            <Info className="w-4 h-4 text-gray-400" />
                          </div>
                          <h4 className="font-semibold text-sm mb-2">{aisle.name}</h4>
                          <div className="space-y-1">
                            {aisle.items.slice(0, 3).map((item, index) => (
                              <div key={index} className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded">
                                {item}
                              </div>
                            ))}
                            {aisle.items.length > 3 && (
                              <div className="text-xs text-blue-600 font-medium">+{aisle.items.length - 3} more items</div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Service Details */}
            {selectedService && (
              <Card className="mt-4 shadow-lg border-l-4 border-l-yellow-500">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <span className="text-2xl mr-2">{selectedService.icon}</span>
                      {selectedService.name}
                    </CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedService(null)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">Open 24/7</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">Located near the entrance</span>
                    </div>
                    <Button className="w-full bg-[#ffc220] text-[#0071dc] hover:bg-[#ffc220]/90">
                      <Navigation className="w-4 h-4 mr-2" />
                      Get Directions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Side Panel */}
          <div className="space-y-4">
            {/* Product Info */}
            {selectedProduct && (
              <Card className="shadow-lg">
                <CardHeader className="pb-2">
                  <CardTitle className="text-[#0071dc] text-lg">Product Found!</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h3 className="font-semibold">{selectedProduct.name}</h3>
                    <p className="text-sm text-gray-600">Section: {selectedProduct.section}</p>
                    <p className="text-sm text-gray-600">Aisle: {selectedProduct.aisle}</p>
                    <p className="text-lg font-bold text-[#0071dc]">{selectedProduct.price}</p>
                  </div>

                  <Badge className="bg-green-500">✅ In Stock</Badge>

                  <div className="space-y-2">
                    <Button className="w-full bg-[#0071dc] hover:bg-[#0071dc]/90" onClick={startNavigation}>
                      <Navigation className="w-4 h-4 mr-2" />
                      Start Navigation
                    </Button>
                    <Button variant="outline" className="w-full">
                      Add to Cart
                    </Button>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-center text-sm text-blue-700">
                      <Clock className="w-4 h-4 mr-2" />
                      Walk time: ~2 minutes
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Search */}
            <Card className="shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Quick Search</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {["iPhone", "Milk", "Samsung TV", "Advil", "Nike Shoes", "Toys"].map((item) => (
                    <Button
                      key={item}
                      variant="outline"
                      size="sm"
                      className="text-xs hover:bg-blue-50"
                      onClick={() => {
                        setSearchQuery(item)
                        handleSearch()
                      }}
                    >
                      {item}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Navigation Status */}
            <Card className="shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Navigation Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Mode:</span>
                    <Badge className={navigationMode === "positioning" ? "bg-blue-500" : navigationMode === "wayfinding" ? "bg-green-500" : "bg-purple-500"}>
                      {navigationMode === "positioning" ? "Positioning" : navigationMode === "wayfinding" ? "Navigating" : "Arrived"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Accuracy:</span>
                    <span className="text-sm font-medium">±2 meters</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Floor:</span>
                    <span className="text-sm font-medium">Ground Level</span>
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

