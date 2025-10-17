"use client"

import DashboardHeader from "@/components/dashboard-header"
import SidebarNav from "@/components/sidebar-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Globe, AlertTriangle } from "lucide-react"

const threatLocations = [
  { country: "China", ip: "203.0.113.45", threats: 45, severity: "high", lat: 35.8617, lon: 104.1954 },
  { country: "Russia", ip: "198.51.100.23", threats: 38, severity: "high", lat: 61.524, lon: 105.3188 },
  { country: "Brazil", ip: "192.0.2.156", threats: 22, severity: "medium", lat: -14.235, lon: -51.9253 },
  { country: "USA", ip: "203.0.113.89", threats: 18, severity: "medium", lat: 37.0902, lon: -95.7129 },
  { country: "India", ip: "198.51.100.67", threats: 15, severity: "low", lat: 20.5937, lon: 78.9629 },
  { country: "Germany", ip: "192.0.2.234", threats: 12, severity: "low", lat: 51.1657, lon: 10.4515 },
]

const topThreatCountries = [
  { country: "China", threats: 145, blocked: 142, percentage: 32 },
  { country: "Russia", threats: 128, blocked: 125, percentage: 28 },
  { country: "Brazil", threats: 67, blocked: 65, percentage: 15 },
  { country: "USA", threats: 45, blocked: 43, percentage: 10 },
  { country: "India", threats: 38, blocked: 37, percentage: 8 },
  { country: "Others", threats: 32, blocked: 31, percentage: 7 },
]

export default function GeospatialPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-slate-900 text-slate-100">
      <div className="container mx-auto p-4">
        <DashboardHeader />

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-3 lg:col-span-2">
            <SidebarNav />
          </div>

          <div className="col-span-12 md:col-span-9 lg:col-span-10 space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-green-400">Geospatial Threat Map</h1>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                <Globe className="h-3 w-3 mr-1" />
                67 Countries Monitored
              </Badge>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border-red-500/30">
                <CardContent className="p-6">
                  <div className="text-sm text-slate-400 mb-1">Active Threats</div>
                  <div className="text-3xl font-bold text-red-400">455</div>
                  <div className="text-xs text-slate-400 mt-1">From 67 countries</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30">
                <CardContent className="p-6">
                  <div className="text-sm text-slate-400 mb-1">Blocked</div>
                  <div className="text-3xl font-bold text-green-400">443</div>
                  <div className="text-xs text-slate-400 mt-1">97% success rate</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30">
                <CardContent className="p-6">
                  <div className="text-sm text-slate-400 mb-1">Unique IPs</div>
                  <div className="text-3xl font-bold text-blue-400">342</div>
                  <div className="text-xs text-slate-400 mt-1">Threat sources</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30">
                <CardContent className="p-6">
                  <div className="text-sm text-slate-400 mb-1">OSINT Enriched</div>
                  <div className="text-3xl font-bold text-purple-400">298</div>
                  <div className="text-xs text-slate-400 mt-1">87% coverage</div>
                </CardContent>
              </Card>
            </div>

            {/* Map Placeholder */}
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-green-400">Global Threat Distribution</CardTitle>
                <CardDescription>Real-time visualization of threat origins</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative h-[400px] bg-slate-800/50 rounded-lg border border-slate-700/50 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5" />
                  <div className="relative z-10 text-center">
                    <Globe className="h-16 w-16 text-cyan-400 mx-auto mb-4 animate-pulse" />
                    <p className="text-slate-400">Interactive threat map visualization</p>
                    <p className="text-sm text-slate-500 mt-2">
                      Showing {threatLocations.length} active threat sources
                    </p>
                  </div>
                  {/* Simulated threat markers */}
                  {threatLocations.map((location, index) => (
                    <div
                      key={index}
                      className="absolute"
                      style={{
                        left: `${20 + index * 12}%`,
                        top: `${30 + (index % 3) * 20}%`,
                      }}
                    >
                      <div className="relative group">
                        <MapPin
                          className={`h-6 w-6 ${
                            location.severity === "high"
                              ? "text-red-400"
                              : location.severity === "medium"
                                ? "text-orange-400"
                                : "text-yellow-400"
                          } animate-pulse cursor-pointer`}
                        />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-800 border border-slate-700 rounded-lg p-2 text-xs whitespace-nowrap z-20">
                          <div className="font-semibold">{location.country}</div>
                          <div className="text-slate-400">{location.ip}</div>
                          <div className="text-red-400">{location.threats} threats</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Threat Countries */}
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-cyan-400">Top Threat Countries</CardTitle>
                <CardDescription>Countries with highest threat activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topThreatCountries.map((item) => (
                    <div key={item.country} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <AlertTriangle className="h-4 w-4 text-red-400" />
                          <span className="font-medium">{item.country}</span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-slate-400">{item.threats} threats</span>
                          <span className="text-green-400">{item.blocked} blocked</span>
                          <Badge variant="outline">{item.percentage}%</Badge>
                        </div>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-red-500 to-orange-500"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Threat Locations */}
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-orange-400">Recent Threat Locations</CardTitle>
                <CardDescription>Latest detected threat sources by location</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {threatLocations.map((location, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        location.severity === "high"
                          ? "bg-red-500/10 border-red-500/30"
                          : location.severity === "medium"
                            ? "bg-orange-500/10 border-orange-500/30"
                            : "bg-yellow-500/10 border-yellow-500/30"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <MapPin
                          className={`h-5 w-5 ${
                            location.severity === "high"
                              ? "text-red-400"
                              : location.severity === "medium"
                                ? "text-orange-400"
                                : "text-yellow-400"
                          }`}
                        />
                        <div>
                          <div className="font-medium">{location.country}</div>
                          <div className="text-xs text-slate-400">{location.ip}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <div className="text-sm font-medium">{location.threats} threats</div>
                          <div className="text-xs text-slate-400">
                            {location.lat.toFixed(2)}, {location.lon.toFixed(2)}
                          </div>
                        </div>
                        <Badge
                          variant={location.severity === "high" ? "destructive" : "secondary"}
                          className="capitalize"
                        >
                          {location.severity}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
