"use client"

import { signIn, getSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Mail, Chrome } from "lucide-react" // Using Chrome icon instead of Google
import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog" // Imported Dialog components
import { Input } from "@/components/ui/input" // Imported Input
import { Label } from "@/components/ui/label" // Imported Label

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const [showEmailSignIn, setShowEmailSignIn] = useState(false)
  const [email, setEmail] = useState("")
  const [emailLoading, setEmailLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.push("/dashboard")
      }
    })
  }, [router])

  const handleGitHubSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn("github", { callbackUrl: "/dashboard" })
    } catch (error) {
      console.error("GitHub sign in error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn("google", { callbackUrl: "/dashboard" })
    } catch (error) {
      console.error("Google sign in error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailSignIn = async () => {
    setEmailLoading(true)
    try {
      await signIn("email", { email, callbackUrl: "/dashboard" })
      // Optionally, show a message to the user to check their email
      alert("Check your email for a sign-in link!")
      setShowEmailSignIn(false)
    } catch (error) {
      console.error("Email sign in error:", error)
    } finally {
      setEmailLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <Image src="/vibe-fix-logo.png" alt="Vibe Fix" width={120} height={40} className="h-10 w-auto" />
          </div>
          <CardTitle className="text-2xl font-bold">Welcome to Vibe Fix</CardTitle>
          <CardDescription>Sign in to start fixing your AI-generated apps</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={handleGitHubSignIn}
            disabled={isLoading}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white"
            size="lg"
          >
            <Github className="mr-2 h-5 w-5" />
            {isLoading ? "Signing in..." : "Continue with GitHub"}
          </Button>
          <Button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            size="lg"
          >
            <Chrome className="mr-2 h-5 w-5" />
            {isLoading ? "Signing in..." : "Continue with Google"}
          </Button>
          <Button
            onClick={() => setShowEmailSignIn(true)}
            disabled={isLoading}
            className="w-full bg-slate-200 hover:bg-slate-300 text-gray-800"
            size="lg"
          >
            <Mail className="mr-2 h-5 w-5" />
            Continue with Email
          </Button>
          <p className="text-xs text-gray-500 text-center">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </CardContent>
      </Card>

      <Dialog open={showEmailSignIn} onOpenChange={setShowEmailSignIn}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Sign in with Email</DialogTitle>
            <DialogDescription>
              Enter your email address and we'll send you a magic link to sign in.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={emailLoading}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={emailLoading}>
                Cancel
              </Button>
            </DialogClose>
            <Button onClick={handleEmailSignIn} disabled={emailLoading || !email}>
              {emailLoading ? "Sending link..." : "Send Magic Link"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}