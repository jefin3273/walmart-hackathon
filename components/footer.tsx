import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#0071dc] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-[#0071dc] font-bold text-sm">W</span>
              </div>
              <span className="text-xl font-bold">Walmart</span>
            </div>
            <p className="text-blue-100 mb-4">Saving people money so they can live better.</p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-white hover:text-[#ffc220]">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:text-[#ffc220]">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:text-[#ffc220]">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:text-[#ffc220]">
                <Youtube className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/ar-navigation" className="text-blue-100 hover:text-white transition-colors">
                  Store Navigation
                </Link>
              </li>
              <li>
                <Link href="/product-comparison" className="text-blue-100 hover:text-white transition-colors">
                  Product Comparison
                </Link>
              </li>
              <li>
                <Link href="/recipe-builder" className="text-blue-100 hover:text-white transition-colors">
                  Recipe Builder
                </Link>
              </li>
              <li>
                <Link href="/rewards-dashboard" className="text-blue-100 hover:text-white transition-colors">
                  Rewards Program
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-blue-100">
                <Phone className="w-4 h-4" />
                <span>1-800-WALMART</span>
              </li>
              <li className="flex items-center space-x-2 text-blue-100">
                <Mail className="w-4 h-4" />
                <span>help@walmart.com</span>
              </li>
              <li className="flex items-center space-x-2 text-blue-100">
                <MapPin className="w-4 h-4" />
                <span>Store Locator</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-blue-100 mb-4">Get the latest deals and updates</p>
            <div className="flex space-x-2">
              <Input
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-blue-100"
              />
              <Button className="bg-[#ffc220] text-[#0071dc] hover:bg-[#ffc220]/90">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-600 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-blue-100 text-sm">© 2024 Walmart Inc. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-blue-100 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-blue-100 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-blue-100 hover:text-white text-sm transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
