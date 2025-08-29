"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Upload, Github, Globe, Code2, ArrowLeft } from "lucide-react"
import Navigation from "@/components/navigation"
import Link from "next/link"

interface App {
  id: string
  name: string
  description: string
  techStack: string[]
  repositoryUrl: string
  liveUrl?: string
}

export default function SubmitBugPage() {
  const { data: session, status } = useSession()
  const searchParams = useSearchParams()
  const selectedAppId = searchParams.get("app")

  const [selectedApp, setSelectedApp] = useState<App | null>(null)
  const [formData, setFormData] = useState({
    appName: "",
    techStack: "",
    repositoryUrl: "",
    liveUrl: "",
    bugTitle: "",
    bugDescription: "",
    steps: "",
    priority: "",
    browser: "",
  })

  // Mock apps data - in real app this would come from database
  const userApps: App[] = [
    {
      id: "1",
      name: "E-commerce Dashboard",
      description: "A React-based admin dashboard for managing online store inventory and orders.",
      techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
      repositoryUrl: "https://github.com/user/ecommerce-dashboard",
      liveUrl: "https://my-store-admin.vercel.app",
    },
    {
      id: "2",
      name: "Task Management App",
      description: "A productivity app for managing tasks and projects with team collaboration.",
      techStack: ["Vue.js", "Node.js", "MongoDB", "Express"],
      repositoryUrl: "https://github.com/user/task-manager",
    },
  ]

  useEffect(() => {
    if (selectedAppId) {
      const app = userApps.find((a) => a.id === selectedAppId)
      if (app) {
        setSelectedApp(app)
        setFormData({
          ...formData,
          appName: app.name,
          techStack: app.techStack.join(", "),
          repositoryUrl: app.repositoryUrl,
          liveUrl: app.liveUrl || "",
        })
      }
    }
  }, [selectedAppId])

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (status === "unauthenticated") {
    redirect("/auth/signin")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Bug report submitted:", formData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/apps">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Apps
              </Button>
            </Link>
            {selectedApp && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600">Submitting bug for:</span>
                <Badge variant="secondary">{selectedApp.name}</Badge>
              </div>
            )}
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Submit Your Bug</h1>
            <p className="text-slate-600">Tell us about your app and the issues you're experiencing</p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code2 className="h-5 w-5 text-blue-600" />
                App & Bug Details
              </CardTitle>
              <CardDescription>
                {selectedApp
                  ? "App details pre-filled from your saved app. Update bug-specific information below."
                  : "Provide detailed information about your app and the specific issues you're facing"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* App Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="app-name">App Name</Label>
                    <Input
                      id="app-name"
                      placeholder="My Awesome App"
                      value={formData.appName}
                      onChange={(e) => setFormData({ ...formData, appName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tech-stack">Tech Stack</Label>
                    <Input
                      id="tech-stack"
                      placeholder="React, Next.js, TypeScript..."
                      value={formData.techStack}
                      onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                    />
                  </div>
                </div>

                {/* Repository & Live URL */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="repo-url" className="flex items-center gap-2">
                      <Github className="h-4 w-4" />
                      Repository URL
                    </Label>
                    <Input
                      id="repo-url"
                      placeholder="https://github.com/username/repo"
                      value={formData.repositoryUrl}
                      onChange={(e) => setFormData({ ...formData, repositoryUrl: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="live-url" className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Live URL (Optional)
                    </Label>
                    <Input
                      id="live-url"
                      placeholder="https://myapp.vercel.app"
                      value={formData.liveUrl}
                      onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    />
                  </div>
                </div>

                {/* Bug Description */}
                <div className="space-y-2">
                  <Label htmlFor="bug-title">Bug Title</Label>
                  <Input
                    id="bug-title"
                    placeholder="Brief description of the issue"
                    value={formData.bugTitle}
                    onChange={(e) => setFormData({ ...formData, bugTitle: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bug-description">Detailed Bug Description</Label>
                  <Textarea
                    id="bug-description"
                    placeholder="Describe the bug in detail. What were you trying to do? What happened instead? Include any error messages you saw."
                    className="min-h-32"
                    value={formData.bugDescription}
                    onChange={(e) => setFormData({ ...formData, bugDescription: e.target.value })}
                  />
                </div>

                {/* Steps to Reproduce */}
                <div className="space-y-2">
                  <Label htmlFor="steps">Steps to Reproduce</Label>
                  <Textarea
                    id="steps"
                    placeholder="1. Go to page X&#10;2. Click on button Y&#10;3. See error"
                    className="min-h-24"
                    value={formData.steps}
                    onChange={(e) => setFormData({ ...formData, steps: e.target.value })}
                  />
                </div>

                {/* Priority & Additional Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority Level</Label>
                    <Select
                      value={formData.priority}
                      onValueChange={(value) => setFormData({ ...formData, priority: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low - Minor issue</SelectItem>
                        <SelectItem value="medium">Medium - Affects functionality</SelectItem>
                        <SelectItem value="high">High - Blocks major features</SelectItem>
                        <SelectItem value="critical">Critical - App unusable</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="browser">Browser/Environment</Label>
                    <Input
                      id="browser"
                      placeholder="Chrome 120, Safari 17, etc."
                      value={formData.browser}
                      onChange={(e) => setFormData({ ...formData, browser: e.target.value })}
                    />
                  </div>
                </div>

                {/* File Upload */}
                <div className="space-y-2">
                  <Label>Screenshots or Files (Optional)</Label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-600">
                      Drop files here or click to upload screenshots, error logs, or other relevant files
                    </p>
                  </div>
                </div>

                {/* Pricing Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">Pricing Information</h3>
                  <div className="space-y-2 text-sm text-blue-800">
                    <div className="flex items-center justify-between">
                      <span>AI Analysis & Fix Attempt:</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        FREE
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Human Developer Fix (if needed):</span>
                      <div className="flex gap-2">
                        <Badge variant="outline">$99 (Free Plan)</Badge>
                        <Badge className="bg-blue-600">$49 (Pro Plan)</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Submit Bug Report
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
