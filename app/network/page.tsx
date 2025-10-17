"use client"

import DashboardHeader from "@/components/dashboard-header"
import SidebarNav from "@/components/sidebar-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"

const networkTrafficData = [
  { time: "00:00", inbound: 45, outbound: 32, threats: 2 },
  { time: "04:00", inbound: 52, outbound: 38, threats: 5 },
  { time: "08:00", inbound: 78, outbound: 65, threats: 8 },
  { time: "12:00", inbound: 95, outbound: 82, threats: 12 },
  { time: "16:00", inbound: 88, outbound: 75, threats: 6 },
  { time: "20:00", inbound: 62, outbound: 48, threats: 3 },
]

const protocolData = [
  { protocol: "HTTPS", packets: 45000, percentage: 45 },
  { protocol: "HTTP", packets: 25000, percentage: 25 },
  { protocol: "DNS", packets: 15000, percentage: 15 },
  { protocol: "SSH", packets: 10000, percentage: 10 },
  { protocol: "Other", packets: 5000, percentage: 5 },
]

export default function NetworkPage() {
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
              <h1 className="text-3xl font-bold text-cyan-400">Network Monitoring</h1>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Zeek & Suricata Active</Badge>
            </div>

            {/* Network Traffic Chart */}
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-cyan-400">Real-Time Traffic Analysis</CardTitle>
                <CardDescription>Inbound/outbound traffic and threat detection (Zeek/Suricata)</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    inbound: { label: "Inbound", color: "hsl(var(--chart-1))" },
                    outbound: { label: "Outbound", color: "hsl(var(--chart-2))" },
                    threats: { label: "Threats", color: "hsl(var(--chart-3))" },
                  }}
                  className="h-[400px]"
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

            {/* Protocol Distribution */}
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-cyan-400">Protocol Distribution</CardTitle>
                <CardDescription>Network traffic by protocol type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {protocolData.map((item) => (
                    <div key={item.protocol} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{item.protocol}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-slate-400">{item.packets.toLocaleString()} packets</span>
                          <Badge variant="outline" className="text-xs">
                            {item.percentage}%
                          </Badge>
                        </div>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-500" style={{ width: `${item.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Connection Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-slate-900/50 border-slate-700/50">
                <CardContent className="p-6">
                  <div className="text-sm text-slate-400 mb-1">Active Connections</div>
                  <div className="text-3xl font-bold text-cyan-400">8,432</div>
                  <div className="text-xs text-green-400 mt-1">All verified via mTLS</div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-700/50">
                <CardContent className="p-6">
                  <div className="text-sm text-slate-400 mb-1">Packets Analyzed</div>
                  <div className="text-3xl font-bold text-cyan-400">5.2M/s</div>
                  <div className="text-xs text-slate-400 mt-1">Zeek processing rate</div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-700/50">
                <CardContent className="p-6">
                  <div className="text-sm text-slate-400 mb-1">IDS Rules Active</div>
                  <div className="text-3xl font-bold text-cyan-400">45,231</div>
                  <div className="text-xs text-slate-400 mt-1">Suricata signatures</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
