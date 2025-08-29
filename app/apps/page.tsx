"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Code, Github, Globe, Calendar, Settings, Trash2 } from "lucide-react"
import Navigation from "@/components/navigation"

interface App {
  id: string
  name: string
  description: string
  techStack: string[]
  repositoryUrl: string
  liveUrl?: string
  createdAt: string
  lastUpdated: string
  bugsCount: number
}

export default function AppsPage() {
  const { data: session, status } = useSession()
  const [apps, setApps] = useState<App[]>([
    {
      id: "1",
      name: "E-commerce Dashboard",
      description: "A React-based admin dashboard for managing online store inventory and orders.",
      techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
      repositoryUrl: "https://github.com/user/ecommerce-dashboard",
      liveUrl: "https://my-store-admin.vercel.app",
      createdAt: "2024-01-15",
      lastUpdated: "2024-01-20",
      bugsCount: 3,
    },
    {
      id: "2",
      name: "Task Management App",
      description: "A productivity app for managing tasks and projects with team collaboration.",
      techStack: ["Vue.js", "Node.js", "MongoDB", "Express"],
      repositoryUrl: "https://github.com/user/task-manager",
      createdAt: "2024-01-10",
      lastUpdated: "2024-01-18",
      bugsCount: 1,
    },
  ])
  const [isAddingApp, setIsAddingApp] = useState(false)
  const [newApp, setNewApp] = useState({
    name: "",
    description: "",
    techStack: "",
    repositoryUrl: "",
    liveUrl: "",
  })

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (status === "unauthenticated") {
    redirect("/auth/signin")
  }

  const handleAddApp = () => {
    const app: App = {
      id: Date.now().toString(),
      name: newApp.name,
      description: newApp.description,
      techStack: newApp.techStack.split(",").map((tech) => tech.trim()),
      repositoryUrl: newApp.repositoryUrl,
      liveUrl: newApp.liveUrl || undefined,
      createdAt: new Date().toISOString().split("T")[0],
      lastUpdated: new Date().toISOString().split("T")[0],
      bugsCount: 0,
    }
    setApps([...apps, app])
    setNewApp({ name: "", description: "", techStack: "", repositoryUrl: "", liveUrl: "" })
    setIsAddingApp(false)
  }

  const handleDeleteApp = (appId: string) => {
    setApps(apps.filter((app) => app.id !== appId))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Apps</h1>
            <p className="text-gray-600 mt-2">Manage your applications and submit bugs for quick fixes</p>
          </div>

          <Dialog open={isAddingApp} onOpenChange={setIsAddingApp}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add App
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add New App</DialogTitle>
                <DialogDescription>
                  Add your app details so you can quickly submit bugs without re-entering information.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">App Name</Label>
                  <Input
                    id="name"
                    value={newApp.name}
                    onChange={(e) => setNewApp({ ...newApp, name: e.target.value })}
                    placeholder="My Awesome App"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newApp.description}
                    onChange={(e) => setNewApp({ ...newApp, description: e.target.value })}
                    placeholder="Brief description of your app..."
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="techStack">Tech Stack</Label>
                  <Input
                    id="techStack"
                    value={newApp.techStack}
                    onChange={(e) => setNewApp({ ...newApp, techStack: e.target.value })}
                    placeholder="React, Next.js, TypeScript, Tailwind CSS (comma-separated)"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="repositoryUrl">Repository URL</Label>
                  <Input
                    id="repositoryUrl"
                    value={newApp.repositoryUrl}
                    onChange={(e) => setNewApp({ ...newApp, repositoryUrl: e.target.value })}
                    placeholder="https://github.com/username/repo"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="liveUrl">Live URL (Optional)</Label>
                  <Input
                    id="liveUrl"
                    value={newApp.liveUrl}
                    onChange={(e) => setNewApp({ ...newApp, liveUrl: e.target.value })}
                    placeholder="https://myapp.vercel.app"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddingApp(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddApp} disabled={!newApp.name || !newApp.repositoryUrl}>
                  Add App
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app) => (
            <Card key={app.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{app.name}</CardTitle>
                    <CardDescription className="mt-2">{app.description}</CardDescription>
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteApp(app.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Tech Stack</h4>
                  <div className="flex flex-wrap gap-1">
                    {app.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Github className="mr-2 h-4 w-4" />
                    <a
                      href={app.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-600 truncate"
                    >
                      Repository
                    </a>
                  </div>
                  {app.liveUrl && (
                    <div className="flex items-center text-sm text-gray-600">
                      <Globe className="mr-2 h-4 w-4" />
                      <a
                        href={app.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-blue-600 truncate"
                      >
                        Live Site
                      </a>
                    </div>
                  )}
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="mr-2 h-4 w-4" />
                    Updated {app.lastUpdated}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="text-sm text-gray-600">{app.bugsCount} active bugs</div>
                  <Button size="sm" asChild>
                    <a href={`/submit-bug?app=${app.id}`}>Submit Bug</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {apps.length === 0 && (
          <div className="text-center py-12">
            <Code className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No apps yet</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by adding your first app.</p>
            <div className="mt-6">
              <Button onClick={() => setIsAddingApp(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add your first app
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
