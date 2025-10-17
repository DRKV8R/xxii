"use client"

import DashboardHeader from "@/components/dashboard-header"
import SidebarNav from "@/components/sidebar-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Server } from "lucide-react"

const infrastructureHealth = [
  { name: "Kubernetes", status: 98, pods: 45, nodes: 8, details: "8 nodes, 45 pods running" },
  { name: "Kafka", status: 95, throughput: "2.3M msg/s", lag: "< 100ms", details: "Message queue operational" },
  { name: "Elasticsearch", status: 92, docs: "1.2B", shards: 156, details: "156 shards, 1.2B documents" },
  { name: "Zeek", status: 100, packets: "5.2M/s", logs: "Active", details: "Network analysis active" },
  { name: "Suricata", status: 97, rules: "45K", alerts: 23, details: "45K rules, 23 alerts today" },
]

export default function InfrastructurePage() {
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
              <h1 className="text-3xl font-bold text-orange-400">Infrastructure Health</h1>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">All Systems Operational</Badge>
            </div>

            {/* Infrastructure Components */}
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-green-400">Core System Components</CardTitle>
                <CardDescription>Real-time health monitoring of infrastructure services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {infrastructureHealth.map((item) => (
                    <div
                      key={item.name}
                      className="space-y-3 p-4 bg-slate-800/30 rounded-lg border border-slate-700/50"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Server className="h-5 w-5 text-cyan-400" />
                          <span className="text-lg font-semibold">{item.name}</span>
                        </div>
                        <Badge variant={item.status >= 95 ? "default" : "secondary"} className="text-sm px-3 py-1">
                          {item.status}%
                        </Badge>
                      </div>
                      <Progress value={item.status} className="h-3" />
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-slate-500 text-xs">Metric 1</div>
                          <div className="text-slate-300 font-medium">{Object.values(item)[1]}</div>
                        </div>
                        <div>
                          <div className="text-slate-500 text-xs">Metric 2</div>
                          <div className="text-slate-300 font-medium">{Object.values(item)[2]}</div>
                        </div>
                        <div>
                          <div className="text-slate-500 text-xs">Status</div>
                          <div className="text-slate-300 font-medium">{item.details}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Resource Usage */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-slate-900/50 border-slate-700/50">
                <CardContent className="p-6">
                  <div className="text-sm text-slate-400 mb-1">CPU Usage</div>
                  <div className="text-3xl font-bold text-cyan-400">67%</div>
                  <Progress value={67} className="h-2 mt-3" />
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-700/50">
                <CardContent className="p-6">
                  <div className="text-sm text-slate-400 mb-1">Memory Usage</div>
                  <div className="text-3xl font-bold text-cyan-400">54%</div>
                  <Progress value={54} className="h-2 mt-3" />
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-700/50">
                <CardContent className="p-6">
                  <div className="text-sm text-slate-400 mb-1">Disk Usage</div>
                  <div className="text-3xl font-bold text-cyan-400">42%</div>
                  <Progress value={42} className="h-2 mt-3" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
