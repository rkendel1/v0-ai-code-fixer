import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Users, Zap, ArrowRight, Bug, Sparkles } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/vibe-fix-logo.png" alt="Vibe Fix" width={40} height={40} className="w-10 h-10" />
            <span className="text-2xl font-bold">
              <span className="text-gray-900">Vibe</span>
              <span className="text-blue-600">Fix</span>
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/knowledge-base" className="text-gray-600 hover:text-gray-900">
              Knowledge Base
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
              Pricing
            </Link>
            <Link href="/auth/signin">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link href="/submit-bug">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 bg-blue-100 text-blue-700 hover:bg-blue-100">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Code Fixing
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 text-balance">
            Fix Your AI-Generated Code
            <span className="text-blue-600"> Instantly</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 text-pretty max-w-2xl mx-auto">
            Non-developer? No problem. Submit your buggy AI-generated app and get it fixed by our AI or expert
            developers. Fast, reliable, and affordable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/submit-bug">
              <Button size="lg" className="text-lg px-8">
                Submit Your Bug
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/knowledge-base">
              <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent">
                Browse Solutions
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How Vibe Fix Works</h2>
            <p className="text-gray-600 text-lg">Three simple steps to get your code fixed</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bug className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle>1. Submit Your Bug</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Upload your code, describe the issue, and provide your tech stack details. Our system analyzes your
                  problem instantly.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle>2. AI Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Our AI attempts to fix your code using our extensive knowledge base. If successful, the fix is free!
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle>3. Human Expert</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  If AI can't solve it, our expert developers step in. $99 for free users, $49 for subscribers.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-600 text-lg">Choose the plan that works for you</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Free</CardTitle>
                <CardDescription className="text-lg">Perfect for trying out the service</CardDescription>
                <div className="text-3xl font-bold text-gray-900">
                  $0<span className="text-lg font-normal text-gray-600">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Limited AI fixes per month</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Human fixes for $99</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Basic support</span>
                  </div>
                </div>
                <Link href="/auth/signin" className="block">
                  <Button variant="outline" className="w-full bg-transparent">
                    Get Started Free
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">Most Popular</Badge>
              <CardHeader>
                <CardTitle className="text-2xl">Pro</CardTitle>
                <CardDescription className="text-lg">For serious developers and teams</CardDescription>
                <div className="text-3xl font-bold text-gray-900">
                  $29<span className="text-lg font-normal text-gray-600">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Unlimited AI fixes</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Human fixes for $49</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Priority support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Knowledge base access</span>
                  </div>
                </div>
                <Link href="/auth/signin" className="block">
                  <Button className="w-full">Start Pro Trial</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Fix Your Code?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of non-developers who trust Vibe Fix to make their AI-generated apps work perfectly.
          </p>
          <Link href="/submit-bug">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Submit Your First Bug
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Image src="/vibe-fix-logo.png" alt="Vibe Fix" width={32} height={32} className="w-8 h-8" />
                <span className="text-xl font-bold">VibeFix</span>
              </div>
              <p className="text-gray-400">AI-powered code fixing for non-developers. Fast, reliable, affordable.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <div className="space-y-2">
                <Link href="/submit-bug" className="block text-gray-400 hover:text-white">
                  Submit Bug
                </Link>
                <Link href="/knowledge-base" className="block text-gray-400 hover:text-white">
                  Knowledge Base
                </Link>
                <Link href="/pricing" className="block text-gray-400 hover:text-white">
                  Pricing
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <div className="space-y-2">
                <Link href="/help" className="block text-gray-400 hover:text-white">
                  Help Center
                </Link>
                <Link href="/contact" className="block text-gray-400 hover:text-white">
                  Contact
                </Link>
                <Link href="/status" className="block text-gray-400 hover:text-white">
                  Status
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <div className="space-y-2">
                <Link href="/about" className="block text-gray-400 hover:text-white">
                  About
                </Link>
                <Link href="/privacy" className="block text-gray-400 hover:text-white">
                  Privacy
                </Link>
                <Link href="/terms" className="block text-gray-400 hover:text-white">
                  Terms
                </Link>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 VibeFix. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
