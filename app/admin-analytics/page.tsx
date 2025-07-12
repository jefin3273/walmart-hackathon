"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Users, ShoppingCart, TrendingUp, Eye, MessageSquare, MapPin } from "lucide-react"

const userBehaviorData = [
  { hour: "6AM", users: 120, searches: 45, purchases: 12 },
  { hour: "8AM", users: 340, searches: 156, purchases: 34 },
  { hour: "10AM", users: 520, searches: 234, purchases: 67 },
  { hour: "12PM", users: 680, searches: 312, purchases: 89 },
  { hour: "2PM", users: 590, searches: 278, purchases: 76 },
  { hour: "4PM", users: 720, searches: 345, purchases: 98 },
  { hour: "6PM", users: 890, searches: 423, purchases: 134 },
  { hour: "8PM", users: 650, searches: 298, purchases: 87 },
  { hour: "10PM", users: 420, searches: 187, purchases: 45 },
]

const topSearchedItems = [
  { item: "iPhone 15", searches: 2847, category: "Electronics" },
  { item: "Milk", searches: 2156, category: "Grocery" },
  { item: "Bread", searches: 1923, category: "Grocery" },
  { item: "Samsung TV", searches: 1654, category: "Electronics" },
  { item: "Chicken Breast", searches: 1432, category: "Meat" },
  { item: "Bananas", searches: 1298, category: "Produce" },
  { item: "Shampoo", searches: 1156, category: "Health & Beauty" },
  { item: "Rice", searches: 1087, category: "Grocery" },
]

const featureEngagement = [
  { feature: "AR Navigation", usage: 15420, growth: 23.5, color: "#0071dc" },
  { feature: "Voice Search", usage: 12890, growth: 18.2, color: "#ffc220" },
  { feature: "Product Comparison", usage: 9876, growth: 12.8, color: "#00a651" },
  { feature: "Recipe Builder", usage: 8765, growth: 31.4, color: "#ff6b35" },
  { feature: "Review Summarizer", usage: 7654, growth: 9.7, color: "#8e44ad" },
  { feature: "Fast Pickup", usage: 6543, growth: 45.2, color: "#e74c3c" },
  { feature: "Smart Suggestions", usage: 5432, growth: 28.9, color: "#3498db" },
  { feature: "AI Call Center", usage: 4321, growth: 67.3, color: "#f39c12" },
]

const heatmapData = [
  { section: "Electronics", clicks: 2340, x: 70, y: 20 },
  { section: "Grocery", clicks: 3456, x: 20, y: 30 },
  { section: "Pharmacy", clicks: 1234, x: 80, y: 70 },
  { section: "Clothing", clicks: 2100, x: 30, y: 70 },
  { section: "Home & Garden", clicks: 1890, x: 50, y: 50 },
  { section: "Automotive", clicks: 890, x: 10, y: 80 },
]

const conversionData = [
  { name: "Browse", value: 10000, color: "#8884d8" },
  { name: "Add to Cart", value: 3500, color: "#82ca9d" },
  { name: "Checkout", value: 2100, color: "#ffc658" },
  { name: "Purchase", value: 1850, color: "#ff7300" },
]

export default function AdminAnalyticsPage() {
  const [selectedTab, setSelectedTab] = useState("overview")

  const totalUsers = 45672
  const totalSessions = 123456
  const conversionRate = 18.5
  const avgSessionTime = "4m 32s"

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Analytics Dashboard</h1>
          <p className="text-lg text-gray-600">Comprehensive insights into user behavior and platform performance</p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-[#0071dc]">{totalUsers.toLocaleString()}</p>
                </div>
                <Users className="w-8 h-8 text-[#0071dc]" />
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+12.5% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Sessions</p>
                  <p className="text-2xl font-bold text-[#0071dc]">{totalSessions.toLocaleString()}</p>
                </div>
                <Eye className="w-8 h-8 text-[#0071dc]" />
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+8.3% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Conversion Rate</p>
                  <p className="text-2xl font-bold text-[#0071dc]">{conversionRate}%</p>
                </div>
                <ShoppingCart className="w-8 h-8 text-[#0071dc]" />
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+2.1% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Session Time</p>
                  <p className="text-2xl font-bold text-[#0071dc]">{avgSessionTime}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-[#0071dc]" />
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+15.7% from last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="behavior">User Behavior</TabsTrigger>
            <TabsTrigger value="features">Feature Analytics</TabsTrigger>
            <TabsTrigger value="heatmap">Store Heatmap</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Activity by Hour</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={userBehaviorData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="users" fill="#0071dc" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Conversion Funnel</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={conversionData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {conversionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Top Searched Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topSearchedItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-[#0071dc] text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{item.item}</div>
                          <div className="text-sm text-gray-500">{item.category}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{item.searches.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">searches</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="behavior" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Engagement Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={userBehaviorData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="users" stroke="#0071dc" strokeWidth={2} />
                    <Line type="monotone" dataKey="searches" stroke="#ffc220" strokeWidth={2} />
                    <Line type="monotone" dataKey="purchases" stroke="#00a651" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Feature Engagement & Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {featureEngagement.map((feature, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: feature.color }}></div>
                          <span className="font-medium">{feature.feature}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-600">{feature.usage.toLocaleString()} uses</span>
                          <Badge
                            className={`${feature.growth > 20 ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}
                          >
                            +{feature.growth}%
                          </Badge>
                        </div>
                      </div>
                      <Progress value={Math.min(feature.usage / 200, 100)} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="heatmap" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-[#0071dc]" />
                  Store Section Click Heatmap
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative bg-gray-100 rounded-lg h-96 overflow-hidden">
                  {heatmapData.map((section, index) => {
                    const intensity = Math.min(section.clicks / 1000, 1)
                    const size = 20 + intensity * 30

                    return (
                      <div
                        key={index}
                        className="absolute rounded-full flex items-center justify-center text-white text-xs font-semibold cursor-pointer transition-transform hover:scale-110"
                        style={{
                          left: `${section.x}%`,
                          top: `${section.y}%`,
                          width: `${size}px`,
                          height: `${size}px`,
                          backgroundColor: `rgba(0, 113, 220, ${0.3 + intensity * 0.7})`,
                          transform: "translate(-50%, -50%)",
                        }}
                        title={`${section.section}: ${section.clicks} clicks`}
                      >
                        {section.clicks}
                      </div>
                    )
                  })}

                  {/* Store Layout Labels */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-[#ffc220] text-[#0071dc] px-4 py-2 rounded-lg font-semibold">
                    🚪 Entrance
                  </div>
                </div>

                <div className="mt-6 grid md:grid-cols-3 gap-4">
                  {heatmapData.map((section, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                      <span className="font-medium">{section.section}</span>
                      <div className="text-right">
                        <div className="font-semibold text-[#0071dc]">{section.clicks.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">clicks</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
