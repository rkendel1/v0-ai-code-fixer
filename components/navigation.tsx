"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, User, Settings, LogOut, Bug, Plus, Code } from "lucide-react"
import { useSession, signOut } from "next-auth/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Navigation() {
  const { data: session } = useSession()

  // Mock user data - in real app this would come from database
  const user = session?.user
    ? {
        name: session.user.name || "User",
        email: session.user.email || "",
        plan: "pro", // This would come from database
        aiFixesUsed: 3,
        aiFixesLimit: null, // unlimited for pro
      }
    : null

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" })
  }

  return (
    <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/vibe-fix-logo.png" alt="Vibe Fix" width={120} height={40} className="h-8 w-auto" />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-slate-700 hover:text-slate-900 font-medium">
              Dashboard
            </Link>
            <Link href="/apps" className="text-slate-700 hover:text-slate-900 font-medium">
              My Apps
            </Link>
            <Link href="/bugs" className="text-slate-700 hover:text-slate-900 font-medium">
              My Bugs
            </Link>
            <Link href="/knowledge-base" className="text-slate-700 hover:text-slate-900 font-medium">
              Knowledge Base
            </Link>
            <Link href="/pricing" className="text-slate-700 hover:text-slate-900 font-medium">
              Pricing
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {user && (
              <>
                {/* Submit Bug Button */}
                <Link href="/submit-bug">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Submit Bug
                  </Button>
                </Link>

                {/* Notifications */}
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-4 w-4" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500">2</Badge>
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <div className="hidden md:block text-left">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-slate-500 capitalize">{user.plan} Plan</p>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {user.plan.toUpperCase()}
                        </Badge>
                        {user.plan === "free" && (
                          <span className="text-xs text-slate-500">{user.aiFixesUsed}/5 AI fixes used</span>
                        )}
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">
                        <User className="h-4 w-4 mr-2" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/apps">
                        <Code className="h-4 w-4 mr-2" />
                        My Apps
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/bugs">
                        <Bug className="h-4 w-4 mr-2" />
                        My Bugs
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings">
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600" onClick={handleSignOut}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}

            {!user && (
              <Link href="/auth/signin">
                <Button>Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
