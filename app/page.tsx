import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Brain, MessageSquare, Truck, Mic, ChefHat, Lightbulb, Phone, Trophy, BarChart3 } from "lucide-react"

const features = [
  {
    icon: MapPin,
    title: "AR Store Navigation",
    description: "Find products instantly with AR-powered store maps",
    href: "/ar-navigation",
    color: "bg-blue-500",
  },
  {
    icon: Brain,
    title: "AI Product Comparison",
    description: "Smart side-by-side product analysis",
    href: "/product-comparison",
    color: "bg-green-500",
  },
  {
    icon: MessageSquare,
    title: "Review Summarizer",
    description: "AI-powered sentiment analysis of customer reviews",
    href: "/review-summarizer",
    color: "bg-purple-500",
  },
  {
    icon: Truck,
    title: "Fast Pickup & Suggestions",
    description: "Quick pickup with smart add-on recommendations",
    href: "/fast-pickup",
    color: "bg-orange-500",
  },
  {
    icon: Mic,
    title: "Voice & Visual Search",
    description: "Search by voice commands or image uploads",
    href: "/voice-visual-search",
    color: "bg-red-500",
  },
  {
    icon: ChefHat,
    title: "Recipe Builder",
    description: "Build recipes and find missing ingredients",
    href: "/recipe-builder",
    color: "bg-yellow-500",
  },
  {
    icon: Lightbulb,
    title: "Smart Suggestions",
    description: "Personalized recommendations based on inventory",
    href: "/smart-suggestions",
    color: "bg-indigo-500",
  },
  {
    icon: Phone,
    title: "AI Call Center",
    description: "Virtual assistant for instant support",
    href: "/ai-call-center",
    color: "bg-pink-500",
  },
  {
    icon: Trophy,
    title: "Rewards Dashboard",
    description: "Gamified shopping with points and badges",
    href: "/rewards-dashboard",
    color: "bg-cyan-500",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0071dc] to-[#004c91] text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-[#ffc220] text-[#0071dc] hover:bg-[#ffc220]/90">
            🚀 The Future of Retail is Here
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Reimagining Retail with AI, AR, and Voice
          </h1>
          <h2 className="text-xl md:text-2xl mb-4 text-blue-100">The Future of Walmart Shopping</h2>
          <p className="text-lg md:text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Experience next-generation shopping with intelligent product discovery, AR-powered navigation, and
            personalized AI recommendations.
          </p>
          <Button size="lg" className="bg-[#ffc220] text-[#0071dc] hover:bg-[#ffc220]/90 text-lg px-8 py-3" asChild>
            <Link href="#features">Explore Features</Link>
          </Button>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-[#ffc220]/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-white/10 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 right-20 w-12 h-12 bg-[#ffc220]/30 rounded-full animate-ping"></div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Intelligent Shopping Features</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover how AI, AR, and voice technology transform your shopping experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-6">
                  <Link href={feature.href} className="block">
                    <div
                      className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#0071dc] transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-[#0071dc]">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">10M+</div>
              <div className="text-blue-100">Products Available</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">4,700+</div>
              <div className="text-blue-100">Store Locations</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">95%</div>
              <div className="text-blue-100">Customer Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">AI Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Dashboard Link */}
      <section className="py-12 px-4 bg-white border-t">
        <div className="container mx-auto text-center">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-6">
              <BarChart3 className="w-12 h-12 text-[#0071dc] mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Admin Analytics</h3>
              <p className="text-gray-600 mb-4">View comprehensive analytics and insights</p>
              <Button asChild className="bg-[#0071dc] hover:bg-[#0071dc]/90">
                <Link href="/admin-analytics">View Dashboard</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
