"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Command,
  Network,
  ShieldAlert,
  Globe,
  Database,
  Zap,
  Activity,
  Eye,
  Shield,
  FileText,
  Wifi,
  Terminal,
  Settings,
} from "lucide-react"

export default function SidebarNav() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", icon: Command, label: "Overview", color: "text-cyan-400" },
    { href: "/network", icon: Network, label: "Network Monitor", color: "text-blue-400" },
    { href: "/threats", icon: ShieldAlert, label: "Threat Intel", color: "text-red-400" },
    { href: "/geospatial", icon: Globe, label: "Geospatial", color: "text-green-400" },
    { href: "/siem", icon: Database, label: "SIEM / ELK", color: "text-purple-400" },
    { href: "/soar", icon: Zap, label: "SOAR Automation", color: "text-yellow-400" },
    { href: "/infrastructure", icon: Activity, label: "Infrastructure", color: "text-orange-400" },
    { href: "/perxona", icon: Eye, label: "Perxona Shield", color: "text-purple-400" },
    { href: "/firewall", icon: Shield, label: "Firewall", color: "text-green-400" },
    { href: "/data-flow", icon: Wifi, label: "Data Flow", color: "text-cyan-400" },
    { href: "/tos", icon: FileText, label: "ToS Compliance", color: "text-pink-400" },
  ]

  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm h-full">
      <CardContent className="p-4">
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${
                    isActive ? `${item.color} bg-cyan-500/10` : "text-slate-400 hover:text-cyan-400"
                  }`}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            )
          })}

          <div className="pt-4">
            <Button variant="ghost" className="w-full justify-start text-slate-400 hover:text-cyan-400">
              <Terminal className="mr-2 h-4 w-4" />
              Console
            </Button>
            <Button variant="ghost" className="w-full justify-start text-slate-400 hover:text-cyan-400">
              <Settings className="mr-2 h-4 w-4" />
              Configuration
            </Button>
          </div>
        </nav>

        <div className="mt-8 pt-6 border-t border-slate-700/50">
          <div className="text-xs text-slate-500 mb-3 font-mono">SYSTEM STATUS</div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">Kubernetes</span>
                <span className="text-cyan-400">98%</span>
              </div>
              <Progress value={98} className="h-1" />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">Zero Trust</span>
                <span className="text-green-400">100%</span>
              </div>
              <Progress value={100} className="h-1" />
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-400">Data Pipeline</span>
                <span className="text-blue-400">95%</span>
              </div>
              <Progress value={95} className="h-1" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
