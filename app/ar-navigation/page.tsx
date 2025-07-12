"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Navigation, Zap, Clock, X, Info } from "lucide-react"

const storeLayout = {
  sections: [
    {
      id: 1,
      name: "Grocery",
      x: 20,
      y: 30,
      color: "bg-green-500",
      icon: "🛒",
      aisles: [
        { id: "G-1", name: "Produce", items: ["Apples", "Bananas", "Lettuce", "Tomatoes"] },
        { id: "G-2", name: "Dairy", items: ["Milk", "Cheese", "Yogurt", "Butter"] },
        { id: "G-3", name: "Meat", items: ["Chicken", "Beef", "Pork", "Fish"] },
        { id: "G-4", name: "Frozen", items: ["Ice Cream", "Frozen Pizza", "Vegetables"] },
        { id: "G-5", name: "Bakery", items: ["Bread", "Cakes", "Pastries", "Donuts"] },
        { id: "G-6", name: "Deli", items: ["Sandwiches", "Salads", "Hot Food"] },
      ],
    },
    {
      id: 2,
      name: "Electronics",
      x: 75,
      y: 25,
      color: "bg-blue-500",
      icon: "📱",
      aisles: [
        { id: "E-1", name: "TVs", items: ["Samsung TV", "LG TV", "Sony TV"] },
        { id: "E-2", name: "Phones", items: ["iPhone", "Samsung Galaxy", "Google Pixel"] },
        { id: "E-3", name: "Computers", items: ["Laptops", "Desktops", "Tablets"] },
        { id: "E-4", name: "Gaming", items: ["PlayStation", "Xbox", "Nintendo"] },
        { id: "E-5", name: "Audio", items: ["Headphones", "Speakers", "Soundbars"] },
      ],
    },
    {
      id: 3,
      name: "Pharmacy",
      x: 85,
      y: 75,
      color: "bg-red-500",
      icon: "💊",
      aisles: [
        { id: "P-1", name: "Prescriptions", items: ["Pickup Counter", "Drop-off"] },
        { id: "P-2", name: "Health", items: ["Vitamins", "Pain Relief", "Cold Medicine"] },
        { id: "P-3", name: "Beauty", items: ["Skincare", "Makeup", "Hair Care"] },
      ],
    },
    {
      id: 4,
      name: "Clothing",
      x: 35,
      y: 70,
      color: "bg-purple-500",
      icon: "👕",
      aisles: [
        { id: "C-1", name: "Men's", items: ["Shirts", "Pants", "Suits"] },
        { id: "C-2", name: "Women's", items: ["Dresses", "Tops", "Jeans"] },
        { id: "C-3", name: "Kids", items: ["Boys", "Girls", "Baby"] },
        { id: "C-4", name: "Shoes", items: ["Athletic", "Dress", "Casual"] },
      ],
    },
    {
      id: 5,
      name: "Home & Garden",
      x: 50,
      y: 50,
      color: "bg-orange-500",
      icon: "🏠",
      aisles: [
        { id: "H-1", name: "Furniture", items: ["Chairs", "Tables", "Sofas"] },
        { id: "H-2", name: "Kitchen", items: ["Appliances", "Cookware", "Utensils"] },
        { id: "H-3", name: "Garden", items: ["Plants", "Tools", "Fertilizer"] },
      ],
    },
    {
      id: 6,
      name: "Automotive",
      x: 15,
      y: 85,
      color: "bg-gray-600",
      icon: "🚗",
      aisles: [
        { id: "A-1", name: "Tires", items: ["Car Tires", "Truck Tires"] },
        { id: "A-2", name: "Oil & Fluids", items: ["Motor Oil", "Brake Fluid"] },
      ],
    },
  ],
  userLocation: { x: 50, y: 95, name: "You are here" },
  services: [
    { id: "customer-service", x: 45, y: 85, name: "Customer Service", icon: "🛎️" },
    { id: "restrooms", x: 55, y: 85, name: "Restrooms", icon: "🚻" },
    { id: "pharmacy-counter", x: 87, y: 78, name: "Pharmacy Counter", icon: "💊" },
  ],
}

const searchResults = [
  { name: "iPhone 15", section: "Electronics", aisle: "E-2", price: "$799", inStock: true, sectionId: 2 },
  { name: "Organic Bananas", section: "Grocery", aisle: "G-1", price: "$2.99", inStock: true, sectionId: 1 },
  { name: "Advil Pain Relief", section: "Pharmacy", aisle: "P-2", price: "$8.99", inStock: true, sectionId: 3 },
  { name: "Nike Running Shoes", section: "Clothing", aisle: "C-4", price: "$89.99", inStock: true, sectionId: 4 },
]

export default function ARNavigationPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [showPath, setShowPath] = useState(false)
  const [selectedSection, setSelectedSection] = useState<any>(null)
  const [selectedService, setSelectedService] = useState<any>(null)
  const [navigationMode, setNavigationMode] = useState<"positioning" | "wayfinding" | "arrived">("positioning")

  const handleSearch = () => {
    const result = searchResults.find((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    if (result) {
      setSelectedProduct(result)
      setShowPath(true)
      setNavigationMode("wayfinding")
      // Close any open dropdowns
      setSelectedSection(null)
      setSelectedService(null)
    }
  }

  const handleSectionClick = (section: any) => {
    if (selectedSection?.id === section.id) {
      setSelectedSection(null)
    } else {
      setSelectedSection(section)
      setSelectedService(null)
    }
  }

  const handleServiceClick = (service: any) => {
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
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Store Navigation</h1>
          <p className="text-sm md:text-lg text-gray-600">Find products with indoor GPS</p>
        </div>

        {/* Search Bar - Google Maps Style */}
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
                    Walmart Store Map
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Badge className="bg-[#0071dc] text-white">
                      <Zap className="w-3 h-3 mr-1" />
                      AR Mode
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative bg-gradient-to-br from-blue-50 to-gray-100 rounded-lg h-[500px] md:h-[600px] overflow-hidden">
                  {/* Store Sections - Clean Markers */}
                  {storeLayout.sections.map((section) => (
                    <div key={section.id}>
                      <button
                        className={`absolute w-12 h-12 ${section.color} rounded-full shadow-lg flex items-center justify-center text-white text-lg hover:scale-110 transition-all duration-200 border-4 border-white ${
                          selectedSection?.id === section.id ? "ring-4 ring-blue-400 scale-110" : ""
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
                        className="absolute bg-white px-2 py-1 rounded-md shadow-md text-xs font-medium pointer-events-none"
                        style={{
                          left: `${section.x}%`,
                          top: `${section.y + 8}%`,
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
                        className={`absolute w-8 h-8 bg-yellow-400 rounded-full shadow-md flex items-center justify-center text-sm hover:scale-110 transition-all duration-200 ${
                          selectedService?.id === service.id ? "ring-4 ring-yellow-300 scale-110" : ""
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
                    className="absolute w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg"
                    style={{
                      left: `${storeLayout.userLocation.x}%`,
                      top: `${storeLayout.userLocation.y}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75"></div>
                  </div>

                  {/* Destination Marker */}
                  {selectedProduct && (
                    <div
                      className="absolute w-8 h-8 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold animate-bounce"
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
                    <div className="absolute inset-0 pointer-events-none">
                      <svg className="w-full h-full">
                        <path
                          d={`M ${storeLayout.userLocation.x}% ${storeLayout.userLocation.y}% Q ${
                            (storeLayout.userLocation.x +
                              (storeLayout.sections.find((s) => s.id === selectedProduct.sectionId)?.x || 0)) /
                            2
                          }% ${
                            (storeLayout.userLocation.y +
                              (storeLayout.sections.find((s) => s.id === selectedProduct.sectionId)?.y || 0)) /
                            2
                          }% ${storeLayout.sections.find((s) => s.id === selectedProduct.sectionId)?.x}% ${
                            storeLayout.sections.find((s) => s.id === selectedProduct.sectionId)?.y
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

                  {/* Entrance */}
                  <div
                    className="absolute bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-semibold shadow-lg"
                    style={{
                      left: `${storeLayout.userLocation.x}%`,
                      top: `${storeLayout.userLocation.y + 5}%`,
                      transform: "translate(-50%, 0)",
                    }}
                  >
                    🚪 Main Entrance
                  </div>

                  {/* Arrival Notification */}
                  {navigationMode === "arrived" && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-2xl p-6 text-center animate-bounce border-4 border-green-500">
                      <div className="text-4xl mb-2">🎉</div>
                      <div className="font-bold text-lg text-green-600">You've Arrived!</div>
                      <div className="text-sm text-gray-600">Product found in {selectedProduct?.aisle}</div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Section Details Dropdown */}
            {selectedSection && (
              <Card className="mt-4 shadow-lg border-l-4 border-l-blue-500 animate-in slide-in-from-top-2">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <span className="text-2xl mr-2">{selectedSection.icon}</span>
                      {selectedSection.name} Section
                    </CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedSection(null)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {selectedSection.aisles.map((aisle: any) => (
                      <Card key={aisle.id} className="border hover:border-blue-300 transition-colors cursor-pointer">
                        <CardContent className="p-3">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline">{aisle.id}</Badge>
                            <Info className="w-4 h-4 text-gray-400" />
                          </div>
                          <h4 className="font-medium text-sm mb-2">{aisle.name}</h4>
                          <div className="space-y-1">
                            {aisle.items.slice(0, 3).map((item: string, index: number) => (
                              <div key={index} className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded">
                                {item}
                              </div>
                            ))}
                            {aisle.items.length > 3 && (
                              <div className="text-xs text-blue-600">+{aisle.items.length - 3} more items</div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Service Details Dropdown */}
            {selectedService && (
              <Card className="mt-4 shadow-lg border-l-4 border-l-yellow-500 animate-in slide-in-from-top-2">
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
                      <span className="text-sm">Ground Floor, Near Main Entrance</span>
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
                    <Button variant="outline" className="w-full bg-transparent">
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
                  {["iPhone", "Milk", "TV", "Advil", "Shoes", "Toys"].map((item) => (
                    <Button
                      key={item}
                      variant="outline"
                      size="sm"
                      className="text-xs bg-transparent hover:bg-blue-50"
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
                    <Badge className={navigationMode === "positioning" ? "bg-blue-500" : "bg-gray-400"}>
                      {navigationMode === "positioning"
                        ? "Positioning"
                        : navigationMode === "wayfinding"
                          ? "Navigating"
                          : "Arrived"}
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
