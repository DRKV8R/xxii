"use client"

import { useState } from "react"
import { Shield, Bell, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function DashboardHeader() {
  const [threatsBlocked] = useState(15)

  return (
    <header className="flex items-center justify-between py-4 border-b border-slate-700/50 mb-6">
      <div className="flex items-center space-x-2">
        <Shield className="h-8 w-8 text-cyan-500" />
        <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          AXIOM FRAMEWORK
        </span>
        <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/50 text-xs ml-2">
          OPERATIONAL
        </Badge>
      </div>

      <div className="flex items-center space-x-6">
        <div className="hidden md:flex items-center space-x-1 bg-slate-800/50 rounded-full px-3 py-1.5 border border-slate-700/50 backdrop-blur-sm">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search threats, IPs, domains..."
            className="bg-transparent border-none focus:outline-none text-sm w-48 placeholder:text-slate-500"
          />
        </div>

        <div className="flex items-center space-x-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-100 relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{threatsBlocked} Active Threats</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Operator" />
            <AvatarFallback className="bg-slate-700 text-cyan-500">OP</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
