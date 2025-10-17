"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Shield,
  RefreshCw,
  MapPin,
  Globe,
  Monitor,
  Radio,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Eye,
  FileText,
  Activity,
  Wifi,
  Lock,
  ArrowLeft,
  Building2,
} from "lucide-react"

// Types
interface Perxona {
  id: string
  ipAddress: string
  location: {
    city: string
    country: string
    coordinates: { lat: number; lng: number }
  }
  browserFingerprint: string
  osDetails: string
  beaconId: string
  createdAt: Date
}

interface BeaconPing {
  id: string
  beaconId: string
  brokerIp: string
  brokerLocation: {
    city: string
    country: string
    coordinates: { lat: number; lng: number }
  }
  userAgent: string
  timestamp: Date
  company?: string
}

interface ThreatAlert {
  id: string
  type: "virustotal" | "shodan"
  severity: "high" | "medium" | "low"
  description: string
  ip: string
  timestamp: Date
}

interface DataEgressReport {
  id: string
  timestamp: Date
  sourceApp: string
  destination: string
  dataType: string
  status: "blocked" | "spoofed" | "allowed"
  details: string
}

interface TosReport {
  id: string
  vendorName: string
  analysisDate: Date
  ethicalScore: number
  suspiciousPractices: string[]
  recommendation: string
}

// Mock data generators
const generatePerxona = (): Perxona => {
  const cities = [
    { city: "Tokyo", country: "Japan", lat: 35.6762, lng: 139.6503 },
    { city: "London", country: "UK", lat: 51.5074, lng: -0.1278 },
    { city: "New York", country: "USA", lat: 40.7128, lng: -74.006 },
    { city: "Sydney", country: "Australia", lat: -33.8688, lng: 151.2093 },
    { city: "Berlin", country: "Germany", lat: 52.52, lng: 13.405 },
    { city: "Toronto", country: "Canada", lat: 43.6532, lng: -79.3832 },
  ]

  const location = cities[Math.floor(Math.random() * cities.length)]
  const ip = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`

  const browsers = ["Chrome/120.0.0.0", "Firefox/121.0", "Safari/17.2", "Edge/120.0.0.0"]
  const os = ["Windows 11", "macOS 14.2", "Ubuntu 22.04", "iOS 17.2"]

  return {
    id: Math.random().toString(36).substr(2, 9),
    ipAddress: ip,
    location: {
      city: location.city,
      country: location.country,
      coordinates: { lat: location.lat, lng: location.lng },
    },
    browserFingerprint: browsers[Math.floor(Math.random() * browsers.length)],
    osDetails: os[Math.floor(Math.random() * os.length)],
    beaconId: `BCN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    createdAt: new Date(),
  }
}

const mockBeaconPings: BeaconPing[] = [
  {
    id: "1",
    beaconId: "BCN-ABC123",
    brokerIp: "185.220.101.45",
    brokerLocation: { city: "Frankfurt", country: "Germany", coordinates: { lat: 50.1109, lng: 8.6821 } },
    userAgent: "DataBrokerBot/2.1",
    timestamp: new Date(Date.now() - 3600000),
    company: "DataHarvest Inc.",
  },
  {
    id: "2",
    beaconId: "BCN-ABC123",
    brokerIp: "104.28.15.89",
    brokerLocation: { city: "San Francisco", country: "USA", coordinates: { lat: 37.7749, lng: -122.4194 } },
    userAgent: "Mozilla/5.0 (compatible; InfoCollector/1.0)",
    timestamp: new Date(Date.now() - 7200000),
    company: "AdTech Solutions",
  },
  {
    id: "3",
    beaconId: "BCN-DEF456",
    brokerIp: "52.95.110.1",
    brokerLocation: { city: "Singapore", country: "Singapore", coordinates: { lat: 1.3521, lng: 103.8198 } },
    userAgent: "ProfileScraper/3.2",
    timestamp: new Date(Date.now() - 10800000),
    company: "Global Analytics Corp",
  },
]

const mockThreats: ThreatAlert[] = [
  {
    id: "1",
    type: "virustotal",
    severity: "high",
    description: "Malicious IP detected attempting connection",
    ip: "192.168.1.100",
    timestamp: new Date(Date.now() - 1800000),
  },
  {
    id: "2",
    type: "shodan",
    severity: "medium",
    description: "Suspicious port scan detected",
    ip: "10.0.0.50",
    timestamp: new Date(Date.now() - 3600000),
  },
]

const mockDataEgress: DataEgressReport[] = [
  {
    id: "1",
    timestamp: new Date(Date.now() - 900000),
    sourceApp: "Chrome Browser",
    destination: "analytics.example.com",
    dataType: "IP Address, Geolocation",
    status: "spoofed",
    details: "Real IP replaced with Perxona data",
  },
  {
    id: "2",
    timestamp: new Date(Date.now() - 1800000),
    sourceApp: "Mobile App",
    destination: "tracker.adnetwork.com",
    dataType: "Device Fingerprint",
    status: "blocked",
    details: "Blocked by firewall rules",
  },
]

const mockTosReports: TosReport[] = [
  {
    id: "1",
    vendorName: "SocialMedia Corp",
    analysisDate: new Date(Date.now() - 86400000),
    ethicalScore: 45,
    suspiciousPractices: [
      "Excessive data collection",
      "Sharing with unspecified third parties",
      "Indefinite data retention",
    ],
    recommendation: "High Risk - Use with Perxona protection",
  },
  {
    id: "2",
    vendorName: "Privacy-First Service",
    analysisDate: new Date(Date.now() - 172800000),
    ethicalScore: 92,
    suspiciousPractices: [],
    recommendation: "Low Risk - Ethical practices detected",
  },
]

import { getLogoUrl, extractDomain } from "@/lib/logo-api"

export default function PerxonaShield() {
  const [activePerxona, setActivePerxona] = useState<Perxona>(generatePerxona())
  const [isRandomizing, setIsRandomizing] = useState(false)
  const [beaconPings] = useState<BeaconPing[]>(mockBeaconPings)
  const [threats] = useState<ThreatAlert[]>(mockThreats)
  const [dataEgress] = useState<DataEgressReport[]>(mockDataEgress)
  const [tosReports] = useState<TosReport[]>(mockTosReports)

  const handleRandomize = () => {
    setIsRandomizing(true)
    setTimeout(() => {
      setActivePerxona(generatePerxona())
      setIsRandomizing(false)
    }, 1000)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-500"
      case "medium":
        return "text-yellow-500"
      case "low":
        return "text-blue-500"
      default:
        return "text-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "blocked":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "spoofed":
        return <Shield className="h-4 w-4 text-cyan-500" />
      case "allowed":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-slate-400 hover:text-cyan-400">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="p-3 bg-cyan-500/20 rounded-lg border border-cyan-500/30">
              <Shield className="h-8 w-8 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Perxona Privacy Shield
              </h1>
              <p className="text-sm text-slate-400">Your data, your control</p>
            </div>
          </div>
          <Badge variant="outline" className="border-green-500/50 text-green-400">
            <Activity className="h-3 w-3 mr-1" />
            Active Protection
          </Badge>
        </div>

        {/* Active Perxona Section */}
        <Card className="bg-slate-900/50 border-cyan-500/30 backdrop-blur">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-cyan-400 flex items-center gap-2">
                  <Radio className="h-5 w-5" />
                  Active Perxona
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Current spoofed identity protecting your real data
                </CardDescription>
              </div>
              <Button onClick={handleRandomize} disabled={isRandomizing} className="bg-cyan-600 hover:bg-cyan-700">
                <RefreshCw className={`h-4 w-4 mr-2 ${isRandomizing ? "animate-spin" : ""}`} />
                Randomize
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                  <Globe className="h-4 w-4" />
                  IP Address
                </div>
                <div className="text-lg font-mono text-cyan-400">{activePerxona.ipAddress}</div>
              </div>

              <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                  <MapPin className="h-4 w-4" />
                  Location
                </div>
                <div className="text-lg text-cyan-400">
                  {activePerxona.location.city}, {activePerxona.location.country}
                </div>
              </div>

              <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                  <Monitor className="h-4 w-4" />
                  Browser
                </div>
                <div className="text-lg text-cyan-400">{activePerxona.browserFingerprint}</div>
              </div>

              <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                  <Monitor className="h-4 w-4" />
                  Operating System
                </div>
                <div className="text-lg text-cyan-400">{activePerxona.osDetails}</div>
              </div>

              <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                  <Radio className="h-4 w-4" />
                  Beacon ID
                </div>
                <div className="text-lg font-mono text-cyan-400">{activePerxona.beaconId}</div>
              </div>

              <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                  <Activity className="h-4 w-4" />
                  Status
                </div>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active & Broadcasting</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="beacon" className="space-y-4">
          <TabsList className="bg-slate-900/50 border border-slate-700">
            <TabsTrigger value="beacon" className="data-[state=active]:bg-cyan-600">
              <MapPin className="h-4 w-4 mr-2" />
              Beacon Tracking
            </TabsTrigger>
            <TabsTrigger value="firewall" className="data-[state=active]:bg-cyan-600">
              <Shield className="h-4 w-4 mr-2" />
              Firewall
            </TabsTrigger>
            <TabsTrigger value="data" className="data-[state=active]:bg-cyan-600">
              <Eye className="h-4 w-4 mr-2" />
              Data Flow
            </TabsTrigger>
            <TabsTrigger value="tos" className="data-[state=active]:bg-cyan-600">
              <FileText className="h-4 w-4 mr-2" />
              ToS Analysis
            </TabsTrigger>
          </TabsList>

          {/* Beacon Tracking Tab */}
          <TabsContent value="beacon" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Map Placeholder */}
              <Card className="bg-slate-900/50 border-cyan-500/30 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-cyan-400">Broker Location Map</CardTitle>
                  <CardDescription className="text-slate-400">
                    Real-time tracking of data brokers accessing your spoofed data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative h-[400px] bg-slate-800/50 rounded-lg border border-slate-700 overflow-hidden">
                    {/* Simulated map with markers */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 to-slate-900/30">
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage: `radial-gradient(circle at 2px 2px, cyan 1px, transparent 0)`,
                          backgroundSize: "40px 40px",
                        }}
                      />

                      {/* Marker indicators */}
                      {beaconPings.map((ping, idx) => (
                        <div
                          key={ping.id}
                          className="absolute animate-pulse"
                          style={{
                            left: `${20 + idx * 25}%`,
                            top: `${30 + idx * 15}%`,
                          }}
                        >
                          <div className="relative">
                            <div className="h-4 w-4 bg-red-500 rounded-full border-2 border-red-300 animate-ping absolute" />
                            <div className="h-4 w-4 bg-red-500 rounded-full border-2 border-white relative" />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="absolute bottom-4 left-4 bg-slate-900/90 p-3 rounded-lg border border-cyan-500/30">
                      <div className="text-xs text-slate-400 mb-1">Active Beacons</div>
                      <div className="text-2xl font-bold text-cyan-400">{beaconPings.length}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Beacon Pings List */}
              <Card className="bg-slate-900/50 border-cyan-500/30 backdrop-blur">
                <CardHeader>
                  <CardTitle className="text-cyan-400">Recent Beacon Pings</CardTitle>
                  <CardDescription className="text-slate-400">
                    Data brokers who accessed your spoofed identity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-3">
                      {beaconPings.map((ping) => (
                        <div
                          key={ping.id}
                          className="p-4 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-cyan-500/50 transition-colors"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
                              <div className="relative h-8 w-8 rounded bg-white/10 flex items-center justify-center overflow-hidden">
                                <img
                                  src={getLogoUrl(extractDomain(ping.company || ""))}
                                  alt={ping.company}
                                  className="h-full w-full object-contain"
                                  onError={(e) => {
                                    e.currentTarget.style.display = "none"
                                    e.currentTarget.nextElementSibling?.classList.remove("hidden")
                                  }}
                                />
                                <Building2 className="h-4 w-4 text-slate-500 hidden" />
                              </div>
                              <span className="font-semibold text-white">{ping.company}</span>
                            </div>
                            <Badge variant="outline" className="text-xs border-red-500/50 text-red-400">
                              Tracked
                            </Badge>
                          </div>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center gap-2 text-slate-400">
                              <Globe className="h-3 w-3" />
                              <span className="font-mono">{ping.brokerIp}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-400">
                              <MapPin className="h-3 w-3" />
                              <span>
                                {ping.brokerLocation.city}, {ping.brokerLocation.country}
                              </span>
                            </div>
                            <div className="text-xs text-slate-500">{ping.timestamp.toLocaleString()}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Firewall Tab */}
          <TabsContent value="firewall" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-slate-900/50 border-green-500/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-slate-400">Firewall Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-green-400" />
                    <span className="text-2xl font-bold text-green-400">Active</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-cyan-500/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-slate-400">Blocked Threats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-cyan-400">247</div>
                  <div className="text-xs text-slate-500">Last 24 hours</div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-yellow-500/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-slate-400">Active Rules</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-400">1,432</div>
                  <div className="text-xs text-slate-500">Auto-updated</div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-slate-900/50 border-cyan-500/30">
              <CardHeader>
                <CardTitle className="text-cyan-400">Threat Intelligence Alerts</CardTitle>
                <CardDescription className="text-slate-400">
                  Real-time threats from VirusTotal and Shodan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-3">
                    {threats.map((threat) => (
                      <div key={threat.id} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <AlertTriangle className={`h-4 w-4 ${getSeverityColor(threat.severity)}`} />
                            <span className="font-semibold text-white">{threat.description}</span>
                          </div>
                          <Badge variant="outline" className={`text-xs ${getSeverityColor(threat.severity)}`}>
                            {threat.severity.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2 text-slate-400">
                            <Wifi className="h-3 w-3" />
                            <span className="font-mono">{threat.ip}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-400">
                            <Shield className="h-3 w-3" />
                            <span>Source: {threat.type === "virustotal" ? "VirusTotal" : "Shodan"}</span>
                          </div>
                          <div className="text-xs text-slate-500">{threat.timestamp.toLocaleString()}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Data Flow Tab */}
          <TabsContent value="data" className="space-y-4">
            <Card className="bg-slate-900/50 border-cyan-500/30">
              <CardHeader>
                <CardTitle className="text-cyan-400">Data Egress Monitoring</CardTitle>
                <CardDescription className="text-slate-400">
                  Real-time monitoring of data transmission attempts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px]">
                  <div className="space-y-3">
                    {dataEgress.map((report) => (
                      <div key={report.id} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(report.status)}
                            <span className="font-semibold text-white">{report.sourceApp}</span>
                          </div>
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              report.status === "blocked"
                                ? "border-red-500/50 text-red-400"
                                : report.status === "spoofed"
                                  ? "border-cyan-500/50 text-cyan-400"
                                  : "border-green-500/50 text-green-400"
                            }`}
                          >
                            {report.status.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-slate-400">
                            <div className="relative h-5 w-5 rounded bg-white/10 flex items-center justify-center overflow-hidden">
                              <img
                                src={getLogoUrl(report.destination) || "/placeholder.svg"}
                                alt={report.destination}
                                className="h-full w-full object-contain"
                                onError={(e) => {
                                  e.currentTarget.style.display = "none"
                                  e.currentTarget.nextElementSibling?.classList.remove("hidden")
                                }}
                              />
                              <Globe className="h-3 w-3 text-slate-500 hidden" />
                            </div>
                            <span>Destination: {report.destination}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-400">
                            <FileText className="h-3 w-3" />
                            <span>Data Type: {report.dataType}</span>
                          </div>
                          <div className="p-2 bg-slate-900/50 rounded text-xs text-slate-300">{report.details}</div>
                          <div className="text-xs text-slate-500">{report.timestamp.toLocaleString()}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ToS Analysis Tab */}
          <TabsContent value="tos" className="space-y-4">
            <Card className="bg-slate-900/50 border-cyan-500/30">
              <CardHeader>
                <CardTitle className="text-cyan-400">Terms of Service Compliance</CardTitle>
                <CardDescription className="text-slate-400">
                  Automated analysis of vendor privacy practices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px]">
                  <div className="space-y-4">
                    {tosReports.map((report) => (
                      <div key={report.id} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="relative h-12 w-12 rounded-lg bg-white/10 flex items-center justify-center overflow-hidden p-1">
                              <img
                                src={getLogoUrl(extractDomain(report.vendorName)) || "/placeholder.svg"}
                                alt={report.vendorName}
                                className="h-full w-full object-contain"
                                onError={(e) => {
                                  e.currentTarget.style.display = "none"
                                  e.currentTarget.nextElementSibling?.classList.remove("hidden")
                                }}
                              />
                              <Building2 className="h-6 w-6 text-slate-500 hidden" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-white text-lg">{report.vendorName}</h3>
                              <p className="text-xs text-slate-500">
                                Analyzed: {report.analysisDate.toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div
                              className={`text-3xl font-bold ${
                                report.ethicalScore >= 80
                                  ? "text-green-400"
                                  : report.ethicalScore >= 50
                                    ? "text-yellow-400"
                                    : "text-red-400"
                              }`}
                            >
                              {report.ethicalScore}
                            </div>
                            <div className="text-xs text-slate-400">Ethical Score</div>
                          </div>
                        </div>

                        {report.suspiciousPractices.length > 0 && (
                          <div className="mb-3">
                            <div className="text-sm font-semibold text-red-400 mb-2">Suspicious Practices:</div>
                            <div className="space-y-1">
                              {report.suspiciousPractices.map((practice, idx) => (
                                <div key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                                  <AlertTriangle className="h-3 w-3 text-red-400 mt-0.5 flex-shrink-0" />
                                  <span>{practice}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="p-3 bg-slate-900/50 rounded border border-slate-700">
                          <div className="text-xs text-slate-400 mb-1">Recommendation:</div>
                          <div className="text-sm text-slate-200">{report.recommendation}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
