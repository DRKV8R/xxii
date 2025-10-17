"use client"

import DashboardHeader from "@/components/dashboard-header"
import SidebarNav from "@/components/sidebar-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AlertCircle, Database, Activity } from "lucide-react"

const logVolumeData = [
  { hour: "00:00", firewall: 12000, ids: 8000, system: 5000 },
  { hour: "04:00", firewall: 15000, ids: 9500, system: 6200 },
  { hour: "08:00", firewall: 28000, ids: 18000, system: 12000 },
  { hour: "12:00", firewall: 35000, ids: 22000, system: 15000 },
  { hour: "16:00", firewall: 32000, ids: 20000, system: 14000 },
  { hour: "20:00", firewall: 22000, ids: 14000, system: 9000 },
]

const eventsBySource = [
  { source: "Firewall", events: 145000, critical: 23 },
  { source: "IDS/IPS", events: 98000, critical: 45 },
  { source: "Web Server", events: 67000, critical: 12 },
  { source: "Database", events: 45000, critical: 8 },
  { source: "Application", events: 34000, critical: 15 },
]

const recentAlerts = [
  { time: "14:45", severity: "Critical", source: "IDS", message: "SQL injection attempt detected", ip: "203.0.113.45" },
  { time: "14:42", severity: "High", source: "Firewall", message: "Port scan from external IP", ip: "198.51.100.23" },
  { time: "14:38", severity: "Medium", source: "Web Server", message: "Multiple 404 errors", ip: "192.0.2.156" },
  {
    time: "14:35",
    severity: "Critical",
    source: "Database",
    message: "Unauthorized access attempt",
    ip: "203.0.113.89",
  },
  {
    time: "14:30",
    severity: "High",
    source: "Application",
    message: "Authentication failure spike",
    ip: "198.51.100.67",
  },
]

export default function SiemPage() {
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
              <h1 className="text-3xl font-bold text-purple-400">SIEM / ELK Stack</h1>
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                <Database className="h-3 w-3 mr-1" />
                1.2B Events Indexed
              </Badge>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30">
                <CardContent className="p-6">
                  <div className="text-sm text-slate-400 mb-1">Events/Second</div>
                  <div className="text-3xl font-bold text-purple-400">12,450</div>
                  <div className="text-xs text-slate-400 mt-1">Real-time ingestion</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border-red-500/30">
                <CardContent className="p-6">
                  <div className="text-sm text-slate-400 mb-1">Critical Alerts</div>
                  <div className="text-3xl font-bold text-red-400">103</div>
                  <div className="text-xs text-slate-400 mt-1">Last 24 hours</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30">
                <CardContent className="p-6">
                  <div className="text-sm text-slate-400 mb-1">Log Sources</div>
                  <div className="text-3xl font-bold text-blue-400">47</div>
                  <div className="text-xs text-slate-400 mt-1">Active collectors</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30">
                <CardContent className="p-6">
                  <div className="text-sm text-slate-400 mb-1">Index Health</div>
                  <div className="text-3xl font-bold text-green-400">98%</div>
                  <div className="text-xs text-slate-400 mt-1">All shards green</div>
                </CardContent>
              </Card>
            </div>

            {/* Log Volume Chart */}
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-purple-400">Log Volume Analysis</CardTitle>
                <CardDescription>Events per hour by source type</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    firewall: { label: "Firewall", color: "#06b6d4" },
                    ids: { label: "IDS/IPS", color: "#8b5cf6" },
                    system: { label: "System", color: "#10b981" },
                  }}
                  className="h-[350px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={logVolumeData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="hour" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="firewall" fill="#06b6d4" />
                      <Bar dataKey="ids" fill="#8b5cf6" />
                      <Bar dataKey="system" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Events by Source */}
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-cyan-400">Events by Source</CardTitle>
                <CardDescription>Total events and critical alerts per source</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {eventsBySource.map((item) => (
                    <div key={item.source} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Activity className="h-5 w-5 text-purple-400" />
                        <div>
                          <div className="font-medium">{item.source}</div>
                          <div className="text-sm text-slate-400">{item.events.toLocaleString()} events</div>
                        </div>
                      </div>
                      <Badge variant={item.critical > 20 ? "destructive" : "secondary"}>{item.critical} critical</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Alerts */}
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-orange-400">Recent Security Alerts</CardTitle>
                <CardDescription>Latest events requiring attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentAlerts.map((alert, index) => (
                    <div
                      key={index}
                      className={`flex items-start space-x-3 p-3 rounded-lg border ${
                        alert.severity === "Critical"
                          ? "bg-red-500/10 border-red-500/30"
                          : alert.severity === "High"
                            ? "bg-orange-500/10 border-orange-500/30"
                            : "bg-yellow-500/10 border-yellow-500/30"
                      }`}
                    >
                      <AlertCircle
                        className={`h-5 w-5 flex-shrink-0 ${
                          alert.severity === "Critical"
                            ? "text-red-400"
                            : alert.severity === "High"
                              ? "text-orange-400"
                              : "text-yellow-400"
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">
                              {alert.source}
                            </Badge>
                            <span className="text-xs text-slate-500">{alert.time}</span>
                          </div>
                          <Badge
                            variant={alert.severity === "Critical" ? "destructive" : "secondary"}
                            className="text-xs"
                          >
                            {alert.severity}
                          </Badge>
                        </div>
                        <p className="text-sm mt-1">{alert.message}</p>
                        <p className="text-xs text-slate-500 mt-1">Source IP: {alert.ip}</p>
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
