"use client"

import DashboardHeader from "@/components/dashboard-header"
import SidebarNav from "@/components/sidebar-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AlertTriangle, ShieldAlert, CheckCircle } from "lucide-react"

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

export default function ThreatsPage() {
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
              <h1 className="text-3xl font-bold text-red-400">Threat Intelligence</h1>
              <Badge className="bg-red-500/20 text-red-400 border-red-500/30">23 Active Threats</Badge>
            </div>

            {/* Threat Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border-red-500/30">
                <CardContent className="p-6">
                  <div className="text-sm text-slate-400 mb-1">Threats Blocked Today</div>
                  <div className="text-3xl font-bold text-red-400">1,247</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/30">
                <CardContent className="p-6">
                  <div className="text-sm text-slate-400 mb-1">Active Investigations</div>
                  <div className="text-3xl font-bold text-yellow-400">23</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30">
                <CardContent className="p-6">
                  <div className="text-sm text-slate-400 mb-1">Auto-Mitigated</div>
                  <div className="text-3xl font-bold text-green-400">1,189</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30">
                <CardContent className="p-6">
                  <div className="text-sm text-slate-400 mb-1">Threat Sources</div>
                  <div className="text-3xl font-bold text-purple-400">342</div>
                </CardContent>
              </Card>
            </div>

            {/* Threat Distribution Chart */}
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
                  className="h-[350px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={threatData} cx="50%" cy="50%" outerRadius={120} dataKey="value" label>
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
          </div>
        </div>
      </div>
    </div>
  )
}
