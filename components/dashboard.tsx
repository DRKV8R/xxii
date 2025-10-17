"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import {
  Activity,
  AlertTriangle,
  Bell,
  CheckCircle,
  Command,
  Database,
  Globe,
  Network,
  Search,
  Settings,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Terminal,
  Zap,
  User,
  TrendingUp,
  Server,
  Lock,
  Eye,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const networkTrafficData = [
  { time: "00:00", inbound: 45, outbound: 32, threats: 2 },
  { time: "04:00", inbound: 52, outbound: 38, threats: 5 },
  { time: "08:00", inbound: 78, outbound: 65, threats: 8 },
  { time: "12:00", inbound: 95, outbound: 82, threats: 12 },
  { time: "16:00", inbound: 88, outbound: 75, threats: 6 },
  { time: "20:00", inbound: 62, outbound: 48, threats: 3 },
]

const threatData = [
  { name: "Malware", value: 35, color: "#ef4444" },
  { name: "Phishing", value: 28, color: "#f97316" },
  { name: "DDoS", value: 18, color: "#eab308" },
  { name: "Intrusion", value: 12, color: "#06b6d4" },
  { name: "Other", value: 7, color: "#8b5cf6" },
]

const alertTimeline = [
  { time: "14:32", type: "Critical", message: "Unauthorized access attempt from 192.168.1.45", severity: "high" },
  { time: "14:28", type: "Warning", message: "Unusual traffic pattern detected on port 8080", severity: "medium" },
  { time: "14:15", type: "Info", message: "OSINT enrichment completed for 15 new IPs", severity: "low" },
  { time: "14:02", type: "Critical", message: "Malware signature detected in network traffic", severity: "high" },
  { time: "13:45", type: "Warning", message: "Failed authentication attempts from multiple IPs", severity: "medium" },
]

const infrastructureHealth = [
  { name: "Kubernetes", status: 98, pods: 45, nodes: 8 },
  { name: "Kafka", status: 95, throughput: "2.3M msg/s", lag: "< 100ms" },
  { name: "Elasticsearch", status: 92, docs: "1.2B", shards: 156 },
  { name: "Zeek", status: 100, packets: "5.2M/s", logs: "Active" },
  { name: "Suricata", status: 97, rules: "45K", alerts: 23 },
]

export default function Dashboard() {
  const [theme, setTheme] = useState("dark")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [threatsBlocked, setThreatsBlocked] = useState(0)

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    setThreatsBlocked(15)

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{ x: number; y: number; vx: number; vy: number; size: number }> = []
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2,
      })
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "rgba(6, 182, 212, 0.5)"

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-slate-900 text-slate-100 relative overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30" />

      {isLoading && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 border-4 border-cyan-500/30 rounded-full animate-ping"></div>
              <div className="absolute inset-2 border-4 border-t-cyan-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
            </div>
            <div className="mt-4 text-cyan-500 font-mono text-sm tracking-wider">AXIOM FRAMEWORK INITIALIZING</div>
          </div>
        </div>
      )}

      <div className="container mx-auto p-4 relative z-10">
        {/* Header */}
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
                    <Link href="/perxona">
                      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-cyan-400">
                        <User className="h-5 w-5" />
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Perxona Privacy Shield</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

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

        {/* Main Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-12 md:col-span-3 lg:col-span-2">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start text-cyan-400 bg-cyan-500/10">
                    <Command className="mr-2 h-4 w-4" />
                    Overview
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-slate-400 hover:text-cyan-400">
                    <Network className="mr-2 h-4 w-4" />
                    Network Monitor
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-slate-400 hover:text-cyan-400">
                    <ShieldAlert className="mr-2 h-4 w-4" />
                    Threat Intel
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-slate-400 hover:text-cyan-400">
                    <Globe className="mr-2 h-4 w-4" />
                    Geospatial
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-slate-400 hover:text-cyan-400">
                    <Database className="mr-2 h-4 w-4" />
                    SIEM / ELK
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-slate-400 hover:text-cyan-400">
                    <Zap className="mr-2 h-4 w-4" />
                    SOAR Automation
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-slate-400 hover:text-cyan-400">
                    <Activity className="mr-2 h-4 w-4" />
                    Infrastructure
                  </Button>
                  <Link href="/perxona">
                    <Button variant="ghost" className="w-full justify-start text-slate-400 hover:text-purple-400">
                      <Eye className="mr-2 h-4 w-4" />
                      Perxona Shield
                    </Button>
                  </Link>
                  <Button variant="ghost" className="w-full justify-start text-slate-400 hover:text-cyan-400">
                    <Terminal className="mr-2 h-4 w-4" />
                    Console
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-slate-400 hover:text-cyan-400">
                    <Settings className="mr-2 h-4 w-4" />
                    Configuration
                  </Button>
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
          </div>

          {/* Main Content */}
          <div className="col-span-12 md:col-span-9 lg:col-span-10 space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/30">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Network Throughput</p>
                      <p className="text-2xl font-bold text-cyan-400">2.3 GB/s</p>
                      <p className="text-xs text-green-400 flex items-center mt-1">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +12% from baseline
                      </p>
                    </div>
                    <Network className="h-10 w-10 text-cyan-500/50" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border-red-500/30">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Threats Blocked</p>
                      <p className="text-2xl font-bold text-red-400">1,247</p>
                      <p className="text-xs text-red-400 flex items-center mt-1">
                        <ShieldAlert className="h-3 w-3 mr-1" />
                        23 in last hour
                      </p>
                    </div>
                    <ShieldAlert className="h-10 w-10 text-red-500/50" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Active Connections</p>
                      <p className="text-2xl font-bold text-green-400">8,432</p>
                      <p className="text-xs text-green-400 flex items-center mt-1">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        All verified
                      </p>
                    </div>
                    <Activity className="h-10 w-10 text-green-500/50" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400">OSINT Enriched</p>
                      <p className="text-2xl font-bold text-purple-400">3,891</p>
                      <p className="text-xs text-purple-400 flex items-center mt-1">
                        <Database className="h-3 w-3 mr-1" />
                        156 new today
                      </p>
                    </div>
                    <Globe className="h-10 w-10 text-purple-500/50" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Network Traffic Chart */}
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-cyan-400">Network Traffic Analysis</CardTitle>
                <CardDescription>Real-time inbound/outbound traffic and threat detection</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    inbound: { label: "Inbound", color: "hsl(var(--chart-1))" },
                    outbound: { label: "Outbound", color: "hsl(var(--chart-2))" },
                    threats: { label: "Threats", color: "hsl(var(--chart-3))" },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={networkTrafficData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="time" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="inbound"
                        stackId="1"
                        stroke="#06b6d4"
                        fill="#06b6d4"
                        fillOpacity={0.6}
                      />
                      <Area
                        type="monotone"
                        dataKey="outbound"
                        stackId="1"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.6}
                      />
                      <Area
                        type="monotone"
                        dataKey="threats"
                        stackId="2"
                        stroke="#ef4444"
                        fill="#ef4444"
                        fillOpacity={0.8}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Threat Distribution & Infrastructure */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-red-400">Threat Distribution</CardTitle>
                  <CardDescription>Classification of detected threats</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      malware: { label: "Malware", color: "#ef4444" },
                      phishing: { label: "Phishing", color: "#f97316" },
                      ddos: { label: "DDoS", color: "#eab308" },
                      intrusion: { label: "Intrusion", color: "#06b6d4" },
                      other: { label: "Other", color: "#8b5cf6" },
                    }}
                    className="h-[250px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={threatData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                          {threatData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-green-400">Infrastructure Health</CardTitle>
                  <CardDescription>Core system component status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {infrastructureHealth.map((item) => (
                      <div key={item.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Server className="h-4 w-4 text-cyan-400" />
                            <span className="text-sm font-medium">{item.name}</span>
                          </div>
                          <Badge variant={item.status >= 95 ? "default" : "secondary"} className="text-xs">
                            {item.status}%
                          </Badge>
                        </div>
                        <Progress value={item.status} className="h-2" />
                        <div className="flex justify-between text-xs text-slate-500">
                          <span>{Object.values(item)[1]}</span>
                          <span>{Object.values(item)[2]}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Alert Timeline */}
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-orange-400">Security Alert Timeline</CardTitle>
                <CardDescription>Recent security events and notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {alertTimeline.map((alert, index) => (
                    <div
                      key={index}
                      className={`flex items-start space-x-3 p-3 rounded-lg border ${
                        alert.severity === "high"
                          ? "bg-red-500/10 border-red-500/30"
                          : alert.severity === "medium"
                            ? "bg-orange-500/10 border-orange-500/30"
                            : "bg-blue-500/10 border-blue-500/30"
                      }`}
                    >
                      <div className="flex-shrink-0">
                        {alert.severity === "high" ? (
                          <AlertTriangle className="h-5 w-5 text-red-400" />
                        ) : alert.severity === "medium" ? (
                          <ShieldAlert className="h-5 w-5 text-orange-400" />
                        ) : (
                          <CheckCircle className="h-5 w-5 text-blue-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium">{alert.type}</p>
                          <span className="text-xs text-slate-500">{alert.time}</span>
                        </div>
                        <p className="text-sm text-slate-400 mt-1">{alert.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Zero Trust Status */}
            <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center">
                  <Lock className="mr-2 h-5 w-5" />
                  Zero Trust Security Status
                </CardTitle>
                <CardDescription>mTLS enforcement and network policy compliance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-slate-900/50 rounded-lg">
                    <ShieldCheck className="h-8 w-8 text-green-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-green-400">100%</p>
                    <p className="text-xs text-slate-400">mTLS Coverage</p>
                  </div>
                  <div className="text-center p-4 bg-slate-900/50 rounded-lg">
                    <Network className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-cyan-400">8,432</p>
                    <p className="text-xs text-slate-400">Verified Connections</p>
                  </div>
                  <div className="text-center p-4 bg-slate-900/50 rounded-lg">
                    <ShieldAlert className="h-8 w-8 text-red-400 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-red-400">0</p>
                    <p className="text-xs text-slate-400">Policy Violations</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
