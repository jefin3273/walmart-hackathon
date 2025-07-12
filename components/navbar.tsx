"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Menu,
  ShoppingCart,
  User,
  Search,
  MapPin,
  Brain,
  MessageSquare,
  Truck,
  Mic,
  ChefHat,
  Lightbulb,
  Phone,
  Trophy,
} from "lucide-react"
import { useCart } from "@/components/cart-provider"
import CartSidebar from "@/components/cart-sidebar"

const navigationItems = [
  { href: "/ar-navigation", label: "AR Navigation", icon: MapPin },
  { href: "/product-comparison", label: "AI Comparison", icon: Brain },
  { href: "/review-summarizer", label: "Reviews", icon: MessageSquare },
  { href: "/fast-pickup", label: "Fast Pickup", icon: Truck },
  { href: "/voice-visual-search", label: "Voice Search", icon: Mic },
  { href: "/recipe-builder", label: "Recipes", icon: ChefHat },
  { href: "/smart-suggestions", label: "Suggestions", icon: Lightbulb },
  { href: "/ai-call-center", label: "Support", icon: Phone },
  { href: "/rewards-dashboard", label: "Rewards", icon: Trophy },
]

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { items } = useCart()
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#0071dc] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <span className="text-xl font-bold text-[#0071dc]">Walmart</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navigationItems.slice(0, 5).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-[#0071dc] transition-colors flex items-center space-x-1"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-gray-700 hover:text-[#0071dc]">
                  More
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {navigationItems.slice(5).map((item) => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href} className="flex items-center space-x-2">
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem asChild>
                  <Link href="/admin-analytics" className="flex items-center space-x-2">
                    <span>📊</span>
                    <span>Admin Analytics</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>

            <Button variant="ghost" size="sm">
              <User className="w-4 h-4" />
            </Button>

            <Button variant="ghost" size="sm" className="relative" onClick={() => setIsCartOpen(true)}>
              <ShoppingCart className="w-4 h-4" />
              {itemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-[#ffc220] text-[#0071dc] text-xs">{itemCount}</Badge>
              )}
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="w-4 h-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Navigation</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-6">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center space-x-3 text-gray-700 hover:text-[#0071dc] transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                  <Link
                    href="/admin-analytics"
                    className="flex items-center space-x-3 text-gray-700 hover:text-[#0071dc] transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="w-5 h-5 flex items-center justify-center">📊</span>
                    <span>Admin Analytics</span>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  )
}
