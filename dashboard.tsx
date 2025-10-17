"use client"

import { useEffect, useState, useRef } from "react"
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  Bell,
  Command,
  Database,
  Download,
  Globe,
  LineChart,
  Lock,
  type LucideIcon,
  Moon,
  Network,
  RefreshCw,
  Search,
  Settings,
  Shield,
  ShieldAlert,
  Sun,
  Terminal,
  TrendingDown,
  TrendingUp,
  Wifi,
  Zap,
  Info,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function Dashboard() {
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isLoading, setIsLoading] = useState(true)

  const [networkThroughput, setNetworkThroughput] = useState(1.2)
  const [activeConnections, setActiveConnections] = useState(1847)
  const [threatsBlocked, setThreatsBlocked] = useState(23)
  const [osintQueries, setOsintQueries] = useState(156)
  const [kafkaLag, setKafkaLag] = useState(0.3)
  const [k8sHealth, setK8sHealth] = useState(98)
  const [zeekEvents, setZeekEvents] = useState(4521)
  const [suricataAlerts, setSuricataAlerts] = useState(12)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mapCanvasRef = useRef<HTMLCanvasElement>(null)

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  // Update time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setNetworkThroughput(+(Math.random() * 2 + 0.5).toFixed(2))
      setActiveConnections(Math.floor(Math.random() * 500) + 1500)
      setThreatsBlocked(Math.floor(Math.random() * 10) + 20)
      setOsintQueries(Math.floor(Math.random() * 50) + 150)
      setKafkaLag(+(Math.random() * 0.5).toFixed(2))
      setK8sHealth(Math.floor(Math.random() * 5) + 95)
      setZeekEvents(Math.floor(Math.random() * 1000) + 4000)
      setSuricataAlerts(Math.floor(Math.random() * 8) + 10)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Particle effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles: Particle[] = []
    const particleCount = 100

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.color = `rgba(${Math.floor(Math.random() * 100) + 100}, ${Math.floor(Math.random() * 100) + 150}, ${Math.floor(Math.random() * 55) + 200}, ${Math.random() * 0.5 + 0.2})`
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const particle of particles) {
        particle.update()
        particle.draw()
      }

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    const canvas = mapCanvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const threats = [
      { x: 0.15, y: 0.3, severity: "high" },
      { x: 0.45, y: 0.25, severity: "medium" },
      { x: 0.7, y: 0.4, severity: "low" },
      { x: 0.3, y: 0.6, severity: "high" },
      { x: 0.85, y: 0.35, severity: "medium" },
      { x: 0.6, y: 0.7, severity: "low" },
      { x: 0.25, y: 0.8, severity: "medium" },
    ]

    function drawMap() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw grid
      ctx.strokeStyle = "rgba(100, 200, 255, 0.1)"
      ctx.lineWidth = 1
      for (let i = 0; i < 10; i++) {
        ctx.beginPath()
        ctx.moveTo((canvas.width / 10) * i, 0)
        ctx.lineTo((canvas.width / 10) * i, canvas.height)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(0, (canvas.height / 10) * i)
        ctx.lineTo(canvas.width, (canvas.height / 10) * i)
        ctx.stroke()
      }

      // Draw threats
      threats.forEach((threat) => {
        const x = threat.x * canvas.width
        const y = threat.y * canvas.height

        const color =
          threat.severity === "high"
            ? "rgba(239, 68, 68, 0.8)"
            : threat.severity === "medium"
              ? "rgba(251, 191, 36, 0.8)"
              : "rgba(34, 197, 94, 0.8)"

        // Pulsing circle
        const time = Date.now() / 1000
        const pulse = Math.sin(time * 2) * 0.5 + 0.5
        const radius = 8 + pulse * 4

        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fill()

        // Outer ring
        ctx.strokeStyle = color
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(x, y, radius + 8, 0, Math.PI * 2)
        ctx.stroke()
      })

      requestAnimationFrame(drawMap)
    }

    drawMap()

    const handleResize = () => {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // Format time
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div
      className={`${theme} min-h-screen bg-gradient-to-br from-black to-slate-900 text-slate-100 relative overflow-hidden`}
    >
      {/* Background particle effect */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30" />

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 border-4 border-cyan-500/30 rounded-full animate-ping"></div>
              <div className="absolute inset-2 border-4 border-t-cyan-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-4 border-4 border-r-purple-500 border-t-transparent border-b-transparent border-l-transparent rounded-full animate-spin-slow"></div>
              <div className="absolute inset-6 border-4 border-b-blue-500 border-t-transparent border-r-transparent border-l-transparent rounded-full animate-spin-slower"></div>
              <div className="absolute inset-8 border-4 border-l-green-500 border-t-transparent border-r-transparent border-b-transparent rounded-full animate-spin"></div>
            </div>
            <div className="mt-4 text-cyan-500 font-mono text-sm tracking-wider">AXIOM FRAMEWORK INITIALIZING</div>
          </div>
        </div>
      )}

      <div className="container mx-auto p-4 relative z-10">
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
                    <Button variant="ghost" size="icon" className="relative text-slate-400 hover:text-slate-100">
                      <Bell className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{threatsBlocked} Active Threats</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleTheme}
                      className="text-slate-400 hover:text-slate-100"
                    >
                      {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Toggle theme</p>
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

        {/* Main content */}
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-12 md:col-span-3 lg:col-span-2">
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm h-full">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <NavItem icon={Command} label="Overview" active />
                  <NavItem icon={Network} label="Network Monitor" />
                  <NavItem icon={ShieldAlert} label="Threat Intel" />
                  <NavItem icon={Globe} label="Geospatial" />
                  <NavItem icon={Database} label="SIEM / ELK" />
                  <NavItem icon={Zap} label="SOAR Automation" />
                  <NavItem icon={Activity} label="Infrastructure" />
                  <NavItem icon={Terminal} label="Console" />
                  <NavItem icon={Settings} label="Configuration" />
                </nav>

                <div className="mt-8 pt-6 border-t border-slate-700/50">
                  <div className="text-xs text-slate-500 mb-2 font-mono">SYSTEM STATUS</div>
                  <div className="space-y-3">
                    <StatusItem label="Kubernetes" value={k8sHealth} color="cyan" />
                    <StatusItem label="Zero Trust" value={100} color="green" />
                    <StatusItem label="Data Pipeline" value={95} color="blue" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main dashboard */}
          <div className="col-span-12 md:col-span-9 lg:col-span-7">
            <div className="grid gap-6">
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
                <CardHeader className="border-b border-slate-700/50 pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-slate-100 flex items-center">
                      <Network className="mr-2 h-5 w-5 text-cyan-500" />
                      Network Traffic & Threat Overview
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="bg-slate-800/50 text-cyan-400 border-cyan-500/50 text-xs">
                        <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 mr-1 animate-pulse"></div>
                        LIVE
                      </Badge>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <MetricCard
                      title="Network Throughput"
                      value={`${networkThroughput} GB/s`}
                      icon={Wifi}
                      trend="up"
                      color="cyan"
                      detail={`${activeConnections} active connections`}
                      isNumeric={false}
                    />
                    <MetricCard
                      title="Threats Blocked"
                      value={`${threatsBlocked}`}
                      icon={ShieldAlert}
                      trend="down"
                      color="red"
                      detail="Last hour"
                      isNumeric={false}
                    />
                    <MetricCard
                      title="Zeek Events"
                      value={`${zeekEvents}`}
                      icon={Activity}
                      trend="stable"
                      color="purple"
                      detail="Per minute"
                      isNumeric={false}
                    />
                    <MetricCard
                      title="Suricata Alerts"
                      value={`${suricataAlerts}`}
                      icon={AlertTriangle}
                      trend="stable"
                      color="amber"
                      detail="Active alerts"
                      isNumeric={false}
                    />
                  </div>

                  <div className="mt-8">
                    <Tabs defaultValue="traffic" className="w-full">
                      <div className="flex items-center justify-between mb-4">
                        <TabsList className="bg-slate-800/50 p-1">
                          <TabsTrigger
                            value="traffic"
                            className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                          >
                            Traffic
                          </TabsTrigger>
                          <TabsTrigger
                            value="threats"
                            className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                          >
                            Threats
                          </TabsTrigger>
                          <TabsTrigger
                            value="protocols"
                            className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                          >
                            Protocols
                          </TabsTrigger>
                          <TabsTrigger
                            value="geo"
                            className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400"
                          >
                            Geographic
                          </TabsTrigger>
                        </TabsList>

                        <div className="flex items-center space-x-2 text-xs text-slate-400">
                          <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-cyan-500 mr-1"></div>
                            Inbound
                          </div>
                          <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-purple-500 mr-1"></div>
                            Outbound
                          </div>
                          <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-red-500 mr-1"></div>
                            Threats
                          </div>
                        </div>
                      </div>

                      <TabsContent value="traffic" className="mt-0">
                        <div className="h-64 w-full relative bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
                          <NetworkTrafficChart />
                          <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-sm rounded-md px-3 py-2 border border-slate-700/50">
                            <div className="text-xs text-slate-400">Current Load</div>
                            <div className="text-lg font-mono text-cyan-400">{networkThroughput} GB/s</div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="threats" className="mt-0">
                        <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
                          <div className="grid grid-cols-12 text-xs text-slate-400 p-3 border-b border-slate-700/50 bg-slate-800/50">
                            <div className="col-span-2">Time</div>
                            <div className="col-span-3">Source IP</div>
                            <div className="col-span-3">Threat Type</div>
                            <div className="col-span-2">Severity</div>
                            <div className="col-span-2">Action</div>
                          </div>

                          <div className="divide-y divide-slate-700/30">
                            <ThreatRow
                              time="15:42:18"
                              sourceIp="185.220.101.45"
                              threatType="Port Scan"
                              severity="high"
                              action="Blocked"
                            />
                            <ThreatRow
                              time="15:41:52"
                              sourceIp="192.168.1.156"
                              threatType="Malware C2"
                              severity="critical"
                              action="Quarantined"
                            />
                            <ThreatRow
                              time="15:40:33"
                              sourceIp="10.0.45.23"
                              threatType="Data Exfiltration"
                              severity="high"
                              action="Blocked"
                            />
                            <ThreatRow
                              time="15:39:12"
                              sourceIp="203.0.113.42"
                              threatType="SQL Injection"
                              severity="medium"
                              action="Logged"
                            />
                            <ThreatRow
                              time="15:38:45"
                              sourceIp="198.51.100.78"
                              threatType="Brute Force"
                              severity="medium"
                              action="Rate Limited"
                            />
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="protocols" className="mt-0">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-4">
                            <div className="text-sm text-slate-400 mb-4">Protocol Distribution</div>
                            <div className="space-y-3">
                              <ProtocolBar protocol="HTTPS" percentage={45} color="cyan" />
                              <ProtocolBar protocol="HTTP" percentage={25} color="blue" />
                              <ProtocolBar protocol="DNS" percentage={15} color="purple" />
                              <ProtocolBar protocol="SSH" percentage={8} color="green" />
                              <ProtocolBar protocol="Other" percentage={7} color="slate" />
                            </div>
                          </div>
                          <div className="bg-slate-800/30 rounded-lg border border-slate-700/50 p-4">
                            <div className="text-sm text-slate-400 mb-4">Top Ports</div>
                            <div className="space-y-3">
                              <PortActivity port="443" service="HTTPS" connections={1245} />
                              <PortActivity port="80" service="HTTP" connections={856} />
                              <PortActivity port="53" service="DNS" connections={623} />
                              <PortActivity port="22" service="SSH" connections={234} />
                              <PortActivity port="3306" service="MySQL" connections={145} />
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="geo" className="mt-0">
                        <div className="h-64 w-full relative bg-slate-800/30 rounded-lg border border-slate-700/50 overflow-hidden">
                          <canvas ref={mapCanvasRef} className="w-full h-full" />
                          <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-sm rounded-md px-3 py-2 border border-slate-700/50">
                            <div className="text-xs text-slate-400 mb-2">Threat Severity</div>
                            <div className="space-y-1">
                              <div className="flex items-center text-xs">
                                <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                                <span className="text-slate-300">High</span>
                              </div>
                              <div className="flex items-center text-xs">
                                <div className="h-2 w-2 rounded-full bg-amber-500 mr-2"></div>
                                <span className="text-slate-300">Medium</span>
                              </div>
                              <div className="flex items-center text-xs">
                                <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                                <span className="text-slate-300">Low</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 flex items-center text-base">
                      <Database className="mr-2 h-5 w-5 text-blue-500" />
                      Infrastructure Health
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <InfrastructureItem
                        name="Kubernetes Cluster"
                        status="healthy"
                        metric={`${k8sHealth}%`}
                        detail="3 nodes, 42 pods"
                      />
                      <InfrastructureItem
                        name="Kafka Pipeline"
                        status="healthy"
                        metric={`${kafkaLag}s lag`}
                        detail="3 brokers, 12 topics"
                      />
                      <InfrastructureItem
                        name="Elasticsearch"
                        status="healthy"
                        metric="98%"
                        detail="5 nodes, 2.4TB indexed"
                      />
                      <InfrastructureItem
                        name="Zeek Sensors"
                        status="healthy"
                        metric={`${zeekEvents}/min`}
                        detail="4 active sensors"
                      />
                      <InfrastructureItem
                        name="Suricata IDS"
                        status="warning"
                        metric={`${suricataAlerts} alerts`}
                        detail="2 active instances"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 flex items-center text-base">
                      <Search className="mr-2 h-5 w-5 text-purple-500" />
                      OSINT Enrichment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-400">TheHive Cases</div>
                        <div className="text-sm text-cyan-400 font-mono">24 open</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-400">OSINT Queries (24h)</div>
                        <div className="text-sm text-cyan-400 font-mono">{osintQueries}</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-400">Cache Hit Rate</div>
                        <div className="text-sm text-green-400 font-mono">87%</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-400">n8n Workflows</div>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/50">8 Active</Badge>
                      </div>

                      <div className="pt-2 mt-2 border-t border-slate-700/50">
                        <div className="text-xs text-slate-500 mb-2">Recent Enrichments</div>
                        <div className="space-y-2">
                          <EnrichmentItem
                            observable="185.220.101.45"
                            type="IP"
                            sources={["Shodan", "VirusTotal"]}
                            risk="high"
                          />
                          <EnrichmentItem
                            observable="malware.example.com"
                            type="Domain"
                            sources={["VirusTotal", "URLhaus"]}
                            risk="critical"
                          />
                          <EnrichmentItem
                            observable="a3f5d8c2e1b4..."
                            type="Hash"
                            sources={["VirusTotal"]}
                            risk="medium"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 flex items-center text-base">
                      <Zap className="mr-2 h-5 w-5 text-amber-500" />
                      SOAR Automation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <WorkflowItem name="Alert Triage" status="running" executions={1247} successRate={98} />
                      <WorkflowItem name="OSINT Enrichment" status="running" executions={856} successRate={95} />
                      <WorkflowItem name="Threat Response" status="running" executions={234} successRate={100} />
                      <WorkflowItem name="TOS Compliance Check" status="idle" executions={45} successRate={92} />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-slate-100 flex items-center text-base">
                      <Shield className="mr-2 h-5 w-5 text-green-500" />
                      Zero Trust Security
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-400">mTLS Enforcement</div>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-400">Service Mesh (Istio)</div>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/50">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-400">Network Policies</div>
                        <div className="text-sm text-cyan-400 font-mono">42 enforced</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-400">Failed Auth Attempts</div>
                        <div className="text-sm text-amber-400 font-mono">3 (last hour)</div>
                      </div>

                      <div className="pt-2 mt-2 border-t border-slate-700/50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm font-medium">Security Posture</div>
                          <div className="text-sm text-green-400">Excellent</div>
                        </div>
                        <Progress value={98} className="h-2 bg-slate-700">
                          <div
                            className="h-full bg-gradient-to-r from-green-500 to-cyan-500 rounded-full"
                            style={{ width: "98%" }}
                          />
                        </Progress>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <CardTitle className="text-slate-100 flex items-center text-base">
                    <AlertCircle className="mr-2 h-5 w-5 text-amber-500" />
                    Alert Timeline
                  </CardTitle>
                  <Badge variant="outline" className="bg-slate-800/50 text-amber-400 border-amber-500/50">
                    {threatsBlocked} Active Alerts
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <AlertItem
                      title="High-Severity Port Scan Detected"
                      time="15:42:18"
                      description="Source: 185.220.101.45 → Multiple ports scanned on 10.0.1.0/24"
                      type="error"
                    />
                    <AlertItem
                      title="Malware C2 Communication Blocked"
                      time="15:41:52"
                      description="Host 192.168.1.156 attempted connection to known C2 server"
                      type="error"
                    />
                    <AlertItem
                      title="OSINT Enrichment Complete"
                      time="15:40:15"
                      description="IP 203.0.113.42 enriched with Shodan and VirusTotal data"
                      type="info"
                    />
                    <AlertItem
                      title="Unusual Bandwidth Spike"
                      time="15:38:33"
                      description="Outbound traffic increased 340% on interface eth0"
                      type="warning"
                    />
                    <AlertItem
                      title="Kafka Consumer Lag Normalized"
                      time="15:35:12"
                      description="All consumer groups back within acceptable lag thresholds"
                      type="success"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <div className="grid gap-6">
              {/* System time */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-6 border-b border-slate-700/50">
                    <div className="text-center">
                      <div className="text-xs text-slate-500 mb-1 font-mono">SYSTEM TIME</div>
                      <div className="text-3xl font-mono text-cyan-400 mb-1">{formatTime(currentTime)}</div>
                      <div className="text-sm text-slate-400">{formatDate(currentTime)}</div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                        <div className="text-xs text-slate-500 mb-1">Uptime</div>
                        <div className="text-sm font-mono text-slate-200">14d 06:42:18</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
                        <div className="text-xs text-slate-500 mb-1">Time Zone</div>
                        <div className="text-sm font-mono text-slate-200">UTC-08:00</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick actions */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 text-base">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <ActionButton icon={Shield} label="Security Scan" />
                    <ActionButton icon={RefreshCw} label="Sync Threat Intel" />
                    <ActionButton icon={Download} label="Export Logs" />
                    <ActionButton icon={Terminal} label="Console" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 text-base">Operator Controls</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Lock className="text-cyan-500 mr-2 h-4 w-4" />
                        <Label className="text-sm text-slate-400">Audio Obfuscation</Label>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Globe className="text-cyan-500 mr-2 h-4 w-4" />
                        <Label className="text-sm text-slate-400">Persona Management</Label>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <ShieldAlert className="text-cyan-500 mr-2 h-4 w-4" />
                        <Label className="text-sm text-slate-400">Auto-Response</Label>
                      </div>
                      <Switch />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Zap className="text-cyan-500 mr-2 h-4 w-4" />
                        <Label className="text-sm text-slate-400">SOAR Workflows</Label>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Resource allocation */}
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-slate-100 text-base">Resource Allocation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm text-slate-400">Zeek Processing</div>
                        <div className="text-xs text-cyan-400">65% allocated</div>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                          style={{ width: "65%" }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm text-slate-400">OSINT Enrichment</div>
                        <div className="text-xs text-purple-400">42% allocated</div>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                          style={{ width: "42%" }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <div className="text-sm text-slate-400">Elasticsearch</div>
                        <div className="text-xs text-blue-400">78% allocated</div>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                          style={{ width: "78%" }}
                        ></div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-700/50">
                      <div className="flex items-center justify-between text-sm">
                        <div className="text-slate-400">Priority Level</div>
                        <div className="flex items-center">
                          <Slider defaultValue={[4]} max={5} step={1} className="w-24 mr-2" />
                          <span className="text-cyan-400">4/5</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Component for nav items
function NavItem({ icon: Icon, label, active }: { icon: LucideIcon; label: string; active?: boolean }) {
  return (
    <Button
      variant="ghost"
      className={`w-full justify-start ${active ? "bg-slate-800/70 text-cyan-400" : "text-slate-400 hover:text-slate-100"}`}
    >
      <Icon className="mr-2 h-4 w-4" />
      {label}
    </Button>
  )
}

// Component for status items
function StatusItem({ label, value, color }: { label: string; value: number; color: string }) {
  const getColor = () => {
    switch (color) {
      case "cyan":
        return "from-cyan-500 to-blue-500"
      case "green":
        return "from-green-500 to-emerald-500"
      case "blue":
        return "from-blue-500 to-indigo-500"
      case "purple":
        return "from-purple-500 to-pink-500"
      default:
        return "from-cyan-500 to-blue-500"
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <div className="text-xs text-slate-400">{label}</div>
        <div className="text-xs text-slate-400">{value}%</div>
      </div>
      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full bg-gradient-to-r ${getColor()} rounded-full`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  )
}

// Component for metric cards
function MetricCard({
  title,
  value,
  icon: Icon,
  trend,
  color,
  detail,
  isNumeric = true,
}: {
  title: string
  value: string | number
  icon: LucideIcon
  trend: "up" | "down" | "stable"
  color: string
  detail: string
  isNumeric?: boolean
}) {
  const getColor = () => {
    switch (color) {
      case "cyan":
        return "from-cyan-500 to-blue-500 border-cyan-500/30"
      case "green":
        return "from-green-500 to-emerald-500 border-green-500/30"
      case "blue":
        return "from-blue-500 to-indigo-500 border-blue-500/30"
      case "purple":
        return "from-purple-500 to-pink-500 border-purple-500/30"
      case "red":
        return "from-red-500 to-rose-500 border-red-500/30"
      case "amber":
        return "from-amber-500 to-orange-500 border-amber-500/30"
      default:
        return "from-cyan-500 to-blue-500 border-cyan-500/30"
    }
  }

  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-amber-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-green-500" />
      case "stable":
        return <LineChart className="h-4 w-4 text-blue-500" />
      default:
        return null
    }
  }

  return (
    <div className={`bg-slate-800/50 rounded-lg border ${getColor()} p-4 relative overflow-hidden`}>
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-slate-400">{title}</div>
        <Icon className={`h-5 w-5 text-${color}-500`} />
      </div>
      <div className="text-2xl font-bold mb-1 bg-gradient-to-r bg-clip-text text-transparent from-slate-100 to-slate-300">
        {value}
      </div>
      <div className="text-xs text-slate-500">{detail}</div>
      <div className="absolute bottom-2 right-2 flex items-center">{getTrendIcon()}</div>
      <div className="absolute -bottom-6 -right-6 h-16 w-16 rounded-full bg-gradient-to-r opacity-20 blur-xl from-cyan-500 to-blue-500"></div>
    </div>
  )
}

function NetworkTrafficChart() {
  return (
    <div className="h-full w-full flex items-end justify-between px-4 pt-4 pb-8 relative">
      <div className="absolute left-2 top-0 h-full flex flex-col justify-between py-4">
        <div className="text-xs text-slate-500">3.0</div>
        <div className="text-xs text-slate-500">2.5</div>
        <div className="text-xs text-slate-500">2.0</div>
        <div className="text-xs text-slate-500">1.5</div>
        <div className="text-xs text-slate-500">1.0</div>
        <div className="text-xs text-slate-500">0.5</div>
        <div className="text-xs text-slate-500">0.0</div>
      </div>

      <div className="absolute left-0 right-0 top-0 h-full flex flex-col justify-between py-4 px-10">
        <div className="border-b border-slate-700/30 w-full"></div>
        <div className="border-b border-slate-700/30 w-full"></div>
        <div className="border-b border-slate-700/30 w-full"></div>
        <div className="border-b border-slate-700/30 w-full"></div>
        <div className="border-b border-slate-700/30 w-full"></div>
        <div className="border-b border-slate-700/30 w-full"></div>
        <div className="border-b border-slate-700/30 w-full"></div>
      </div>

      <div className="flex-1 h-full flex items-end justify-between px-2 z-10">
        {Array.from({ length: 24 }).map((_, i) => {
          const inboundHeight = Math.floor(Math.random() * 60) + 20
          const outboundHeight = Math.floor(Math.random() * 50) + 15
          const threatHeight = Math.floor(Math.random() * 15) + 5

          return (
            <div key={i} className="flex space-x-0.5">
              <div
                className="w-1 bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t-sm"
                style={{ height: `${inboundHeight}%` }}
              ></div>
              <div
                className="w-1 bg-gradient-to-t from-purple-500 to-purple-400 rounded-t-sm"
                style={{ height: `${outboundHeight}%` }}
              ></div>
              <div
                className="w-1 bg-gradient-to-t from-red-500 to-red-400 rounded-t-sm"
                style={{ height: `${threatHeight}%` }}
              ></div>
            </div>
          )
        })}
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-10">
        <div className="text-xs text-slate-500">00:00</div>
        <div className="text-xs text-slate-500">06:00</div>
        <div className="text-xs text-slate-500">12:00</div>
        <div className="text-xs text-slate-500">18:00</div>
        <div className="text-xs text-slate-500">24:00</div>
      </div>
    </div>
  )
}

// Performance chart component
function PerformanceChart() {
  return (
    <div className="h-full w-full flex items-end justify-between px-4 pt-4 pb-8 relative">
      {/* Y-axis labels */}
      <div className="absolute left-2 top-0 h-full flex flex-col justify-between py-4">
        <div className="text-xs text-slate-500">100%</div>
        <div className="text-xs text-slate-500">75%</div>
        <div className="text-xs text-slate-500">50%</div>
        <div className="text-xs text-slate-500">25%</div>
        <div className="text-xs text-slate-500">0%</div>
      </div>

      {/* X-axis grid lines */}
      <div className="absolute left-0 right-0 top-0 h-full flex flex-col justify-between py-4 px-10">
        <div className="border-b border-slate-700/30 w-full"></div>
        <div className="border-b border-slate-700/30 w-full"></div>
        <div className="border-b border-slate-700/30 w-full"></div>
        <div className="border-b border-slate-700/30 w-full"></div>
        <div className="border-b border-slate-700/30 w-full"></div>
      </div>

      {/* Chart bars */}
      <div className="flex-1 h-full flex items-end justify-between px-2 z-10">
        {Array.from({ length: 24 }).map((_, i) => {
          const cpuHeight = Math.floor(Math.random() * 60) + 20
          const memHeight = Math.floor(Math.random() * 40) + 40
          const netHeight = Math.floor(Math.random() * 30) + 30

          return (
            <div key={i} className="flex space-x-0.5">
              <div
                className="w-1 bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t-sm"
                style={{ height: `${cpuHeight}%` }}
              ></div>
              <div
                className="w-1 bg-gradient-to-t from-purple-500 to-purple-400 rounded-t-sm"
                style={{ height: `${memHeight}%` }}
              ></div>
              <div
                className="w-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-sm"
                style={{ height: `${netHeight}%` }}
              ></div>
            </div>
          )
        })}
      </div>

      {/* X-axis labels */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-between px-10">
        <div className="text-xs text-slate-500">00:00</div>
        <div className="text-xs text-slate-500">06:00</div>
        <div className="text-xs text-slate-500">12:00</div>
        <div className="text-xs text-slate-500">18:00</div>
        <div className="text-xs text-slate-500">24:00</div>
      </div>
    </div>
  )
}

// Process row component
function ProcessRow({
  pid,
  name,
  user,
  cpu,
  memory,
  status,
}: {
  pid: string
  name: string
  user: string
  cpu: number
  memory: number
  status: string
}) {
  return (
    <div className="grid grid-cols-12 py-2 px-3 text-sm hover:bg-slate-800/50">
      <div className="col-span-1 text-slate-500">{pid}</div>
      <div className="col-span-4 text-slate-300">{name}</div>
      <div className="col-span-2 text-slate-400">{user}</div>
      <div className="col-span-2 text-cyan-400">{cpu}%</div>
      <div className="col-span-2 text-purple-400">{memory} MB</div>
      <div className="col-span-1">
        <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30 text-xs">
          {status}
        </Badge>
      </div>
    </div>
  )
}

// Storage item component
function StorageItem({
  name,
  total,
  used,
  type,
}: {
  name: string
  total: number
  used: number
  type: string
}) {
  const percentage = Math.round((used / total) * 100)

  return (
    <div className="bg-slate-800/50 rounded-md p-3 border border-slate-700/50">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-slate-300">{name}</div>
        <Badge variant="outline" className="bg-slate-700/50 text-slate-300 border-slate-600/50 text-xs">
          {type}
        </Badge>
      </div>
      <div className="mb-2">
        <div className="flex items-center justify-between mb-1">
          <div className="text-xs text-slate-500">
            {used} GB / {total} GB
          </div>
          <div className="text-xs text-slate-400">{percentage}%</div>
        </div>
        <Progress value={percentage} className="h-1.5 bg-slate-700">
          <div
            className={`h-full rounded-full ${
              percentage > 90 ? "bg-red-500" : percentage > 70 ? "bg-amber-500" : "bg-cyan-500"
            }`}
            style={{ width: `${percentage}%` }}
          />
        </Progress>
      </div>
      <div className="flex items-center justify-between text-xs">
        <div className="text-slate-500">Free: {total - used} GB</div>
        <Button variant="ghost" size="sm" className="h-6 text-xs px-2 text-slate-400 hover:text-slate-100">
          Details
        </Button>
      </div>
    </div>
  )
}

// Communication item component
function CommunicationItem({
  sender,
  time,
  message,
  avatar,
  unread,
}: {
  sender: string
  time: string
  message: string
  avatar: string
  unread?: boolean
}) {
  return (
    <div className={`flex space-x-3 p-2 rounded-md ${unread ? "bg-slate-800/50 border border-slate-700/50" : ""}`}>
      <Avatar className="h-8 w-8">
        <AvatarImage src={avatar || "/placeholder.svg"} alt={sender} />
        <AvatarFallback className="bg-slate-700 text-cyan-500">{sender.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-slate-200">{sender}</div>
          <div className="text-xs text-slate-500">{time}</div>
        </div>
        <div className="text-xs text-slate-400 mt-1">{message}</div>
      </div>
      {unread && (
        <div className="flex-shrink-0 self-center">
          <div className="h-2 w-2 rounded-full bg-cyan-500"></div>
        </div>
      )}
    </div>
  )
}

// Action button component
function ActionButton({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <Button
      variant="outline"
      className="h-auto py-3 px-3 border-slate-700 bg-slate-800/50 hover:bg-slate-700/50 flex flex-col items-center justify-center space-y-1 w-full"
    >
      <Icon className="h-5 w-5 text-cyan-500" />
      <span className="text-xs">{label}</span>
    </Button>
  )
}

// Add missing imports
function Check(props) {
  return <Shield {...props} />
}

function ThreatRow({
  time,
  sourceIp,
  threatType,
  severity,
  action,
}: {
  time: string
  sourceIp: string
  threatType: string
  severity: "critical" | "high" | "medium" | "low"
  action: string
}) {
  const getSeverityColor = () => {
    switch (severity) {
      case "critical":
        return "bg-red-500/10 text-red-400 border-red-500/30"
      case "high":
        return "bg-orange-500/10 text-orange-400 border-orange-500/30"
      case "medium":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30"
      case "low":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/30"
    }
  }

  return (
    <div className="grid grid-cols-12 py-2 px-3 text-sm hover:bg-slate-800/50">
      <div className="col-span-2 text-slate-500 font-mono text-xs">{time}</div>
      <div className="col-span-3 text-cyan-400 font-mono text-xs">{sourceIp}</div>
      <div className="col-span-3 text-slate-300">{threatType}</div>
      <div className="col-span-2">
        <Badge variant="outline" className={`${getSeverityColor()} text-xs uppercase`}>
          {severity}
        </Badge>
      </div>
      <div className="col-span-2 text-slate-400">{action}</div>
    </div>
  )
}

function ProtocolBar({ protocol, percentage, color }: { protocol: string; percentage: number; color: string }) {
  const getColor = () => {
    switch (color) {
      case "cyan":
        return "from-cyan-500 to-blue-500"
      case "blue":
        return "from-blue-500 to-indigo-500"
      case "purple":
        return "from-purple-500 to-pink-500"
      case "green":
        return "from-green-500 to-emerald-500"
      case "slate":
        return "from-slate-500 to-slate-600"
      default:
        return "from-cyan-500 to-blue-500"
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <div className="text-xs text-slate-400">{protocol}</div>
        <div className="text-xs text-slate-400">{percentage}%</div>
      </div>
      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full bg-gradient-to-r ${getColor()} rounded-full`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  )
}

function PortActivity({
  port,
  service,
  connections,
}: {
  port: string
  service: string
  connections: number
}) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-slate-700/30 last:border-0">
      <div className="flex items-center space-x-3">
        <div className="text-sm font-mono text-cyan-400">{port}</div>
        <div className="text-xs text-slate-400">{service}</div>
      </div>
      <div className="text-sm text-slate-300">{connections.toLocaleString()}</div>
    </div>
  )
}

function InfrastructureItem({
  name,
  status,
  metric,
  detail,
}: {
  name: string
  status: "healthy" | "warning" | "error"
  metric: string
  detail: string
}) {
  const getStatusColor = () => {
    switch (status) {
      case "healthy":
        return "bg-green-500/20 text-green-400 border-green-500/50"
      case "warning":
        return "bg-amber-500/20 text-amber-400 border-amber-500/50"
      case "error":
        return "bg-red-500/20 text-red-400 border-red-500/50"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/50"
    }
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <div className="text-sm text-slate-300 mb-1">{name}</div>
        <div className="text-xs text-slate-500">{detail}</div>
      </div>
      <div className="flex items-center space-x-2">
        <div className="text-sm text-cyan-400 font-mono">{metric}</div>
        <Badge className={`${getStatusColor()} text-xs uppercase`}>{status}</Badge>
      </div>
    </div>
  )
}

function EnrichmentItem({
  observable,
  type,
  sources,
  risk,
}: {
  observable: string
  type: string
  sources: string[]
  risk: "critical" | "high" | "medium" | "low"
}) {
  const getRiskColor = () => {
    switch (risk) {
      case "critical":
        return "text-red-400"
      case "high":
        return "text-orange-400"
      case "medium":
        return "text-amber-400"
      case "low":
        return "text-green-400"
      default:
        return "text-slate-400"
    }
  }

  return (
    <div className="flex items-start justify-between py-2 border-b border-slate-700/30 last:border-0">
      <div className="flex-1">
        <div className="text-xs font-mono text-cyan-400 mb-1">{observable}</div>
        <div className="text-xs text-slate-500">{sources.join(", ")}</div>
      </div>
      <Badge variant="outline" className={`${getRiskColor()} border-current text-xs uppercase`}>
        {risk}
      </Badge>
    </div>
  )
}

function WorkflowItem({
  name,
  status,
  executions,
  successRate,
}: {
  name: string
  status: "running" | "idle" | "error"
  executions: number
  successRate: number
}) {
  const getStatusColor = () => {
    switch (status) {
      case "running":
        return "bg-green-500/20 text-green-400 border-green-500/50"
      case "idle":
        return "bg-slate-500/20 text-slate-400 border-slate-500/50"
      case "error":
        return "bg-red-500/20 text-red-400 border-red-500/50"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/50"
    }
  }

  return (
    <div className="flex items-center justify-between py-2 border-b border-slate-700/30 last:border-0">
      <div className="flex-1">
        <div className="text-sm text-slate-300 mb-1">{name}</div>
        <div className="text-xs text-slate-500">
          {executions.toLocaleString()} executions • {successRate}% success
        </div>
      </div>
      <Badge className={`${getStatusColor()} text-xs uppercase`}>{status}</Badge>
    </div>
  )
}

function AlertItem({
  title,
  time,
  description,
  type,
}: {
  title: string
  time: string
  description: string
  type: "info" | "warning" | "error" | "success" | "update"
}) {
  const getTypeStyles = () => {
    switch (type) {
      case "info":
        return { icon: Info, color: "text-blue-500 bg-blue-500/10 border-blue-500/30" }
      case "warning":
        return { icon: AlertCircle, color: "text-amber-500 bg-amber-500/10 border-amber-500/30" }
      case "error":
        return { icon: AlertCircle, color: "text-red-500 bg-red-500/10 border-red-500/30" }
      case "success":
        return { icon: Shield, color: "text-green-500 bg-green-500/10 border-green-500/30" }
      case "update":
        return { icon: Download, color: "text-cyan-500 bg-cyan-500/10 border-cyan-500/30" }
      default:
        return { icon: AlertCircle, color: "text-blue-500 bg-blue-500/10 border-blue-500/30" }
    }
  }

  const { icon: Icon, color } = getTypeStyles()

  return (
    <div className="flex items-start space-x-3">
      <div className={`mt-0.5 p-1 rounded-full ${color.split(" ")[1]} ${color.split(" ")[2]}`}>
        <Icon className={`h-3 w-3 ${color.split(" ")[0]}`} />
      </div>
      <div className="flex-1">
        <div className="flex items-center">
          <div className="text-sm font-medium text-slate-200">{title}</div>
          <div className="ml-2 text-xs text-slate-500 font-mono">{time}</div>
        </div>
        <div className="text-xs text-slate-400 mt-1">{description}</div>
      </div>
    </div>
  )
}
