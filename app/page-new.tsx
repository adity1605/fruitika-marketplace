"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Leaf, Globe, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Navigation from "@/components/Navigation"
import Image from "next/image"

export default function HomePage() {
  const features = [
    {
      icon: <Leaf className="w-6 h-6 sm:w-8 sm:h-8 text-[#2F5233]" />,
      title: "100% Organic",
      description: "Fresh, naturally grown fruits without harmful chemicals",
    },
    {
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-[#2F5233]" />,
      title: "Global Export",
      description: "Delivering premium fruits worldwide with care",
    },
    {
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8 text-[#2F5233]" />,
      title: "Premium Quality",
      description: "Hand-picked fruits meeting international standards",
    },
  ]

  return (
    <div className="min-h-screen bg-[#f9f4e7]">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left order-2 lg:order-1"
            >
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-[#2F5233] mb-4 lg:mb-6 leading-tight">
                Fresh <span className="text-[#8FBC8F]">Organic</span> Fruits
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-[#5A6B5D] mb-6 lg:mb-8 max-w-2xl mx-auto lg:mx-0">
                Experience the finest selection of premium organic fruits, carefully sourced from trusted farms and delivered fresh to your doorstep.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  className="bg-[#2F5233] hover:bg-[#8FBC8F] text-white px-6 sm:px-8 py-3 text-base sm:text-lg w-full sm:w-auto"
                  asChild
                >
                  <Link href="/products">
                    Shop Now
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-[#8FBC8F] text-[#2F5233] hover:bg-[#8FBC8F] hover:text-white px-6 sm:px-8 py-3 text-base sm:text-lg w-full sm:w-auto"
                  asChild
                >
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative order-1 lg:order-2"
            >
              <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-none mx-auto">
                <Image
                  src="https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=600&h=400&fit=crop&crop=center"
                  alt="Fresh Organic Fruits"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-2xl shadow-2xl"
                  priority
                />
                <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-[#8FBC8F] rounded-full flex items-center justify-center">
                  <Leaf className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-white" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12 lg:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2F5233] mb-4">
              Why Choose Fruitika?
            </h2>
            <p className="text-base sm:text-lg text-[#5A6B5D] max-w-2xl mx-auto">
              We're committed to delivering the highest quality organic fruits with unmatched freshness and flavor.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full border-[#8FBC8F]/20 bg-[#fefcf5] hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-[#2F5233] mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#5A6B5D]">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-[#2F5233] to-[#8FBC8F]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 lg:mb-6">
              Ready to Taste the Difference?
            </h2>
            <p className="text-base sm:text-lg text-white/90 mb-6 lg:mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who choose Fruitika for their daily dose of fresh, organic goodness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-[#2F5233] hover:bg-gray-100 px-6 sm:px-8 py-3 text-base sm:text-lg w-full sm:w-auto"
                asChild
              >
                <Link href="/products">
                  Start Shopping
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-[#2F5233] px-6 sm:px-8 py-3 text-base sm:text-lg w-full sm:w-auto"
                asChild
              >
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2F5233] text-white py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="text-center sm:text-left">
              <Image 
                src="/images/ChatGPT_Image_Jul_24__2025__04_18_40_PM-removebg-preview.png" 
                alt="Fruitika" 
                width={200} 
                height={60} 
                className="h-16 w-auto mx-auto sm:mx-0 mb-4 brightness-0 invert" 
              />
              <p className="text-sm text-white/80">
                Premium organic fruits delivered fresh to your doorstep.
              </p>
            </div>
            
            <div className="text-center sm:text-left">
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <Link href="/products" className="block text-white/80 hover:text-white transition-colors">
                  Products
                </Link>
                <Link href="/about" className="block text-white/80 hover:text-white transition-colors">
                  About Us
                </Link>
                <Link href="/contact" className="block text-white/80 hover:text-white transition-colors">
                  Contact
                </Link>
              </div>
            </div>
            
            <div className="text-center sm:text-left">
              <h4 className="font-semibold mb-3">Account</h4>
              <div className="space-y-2 text-sm">
                <Link href="/login" className="block text-white/80 hover:text-white transition-colors">
                  Login
                </Link>
                <Link href="/signup" className="block text-white/80 hover:text-white transition-colors">
                  Sign Up
                </Link>
                <Link href="/dashboard" className="block text-white/80 hover:text-white transition-colors">
                  Dashboard
                </Link>
              </div>
            </div>
            
            <div className="text-center sm:text-left">
              <h4 className="font-semibold mb-3">Support</h4>
              <div className="space-y-2 text-sm">
                <Link href="/track-order" className="block text-white/80 hover:text-white transition-colors">
                  Track Order
                </Link>
                <Link href="/careers" className="block text-white/80 hover:text-white transition-colors">
                  Careers
                </Link>
                <Link href="/quote" className="block text-white/80 hover:text-white transition-colors">
                  Get Quote
                </Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/60">
            <p>&copy; 2025 Fruitika. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
