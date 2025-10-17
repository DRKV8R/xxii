"use client"

import DashboardHeader from "@/components/dashboard-header"
import SidebarNav from "@/components/sidebar-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, CheckCircle, XCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const firewallRules = [
  { id: 1, name: "Block Malicious IPs", status: "active", hits: 1247, action: "block" },
  { id: 2, name: "Rate Limiting", status: "active", hits: 892, action: "throttle" },
  { id: 3, name: "Geo-blocking", status: "active", hits: 456, action: "block" },
  { id: 4, name: "Port Scan Detection", status: "active", hits: 234, action: "alert" },
  { id: 5, name: "SQL Injection Prevention", status: "active", hits: 189, action: "block" },
]

const threatIntelFeeds = [
  { name: "VirusTotal", status: "active", lastUpdate: "2 min ago", threats: 45231, health: 98 },
  { name: "Shodan", status: "active", lastUpdate: "5 min ago", threats: 12456, health: 95 },
  { name: "AbuseIPDB", status: "active", lastUpdate: "1 min ago", threats: 8934, health: 100 },
  { name: "Emerging Threats", status: "active", lastUpdate: "3 min ago", threats: 23567, health: 97 },
]

const recentBlocks = [
  { time: "14:45", ip: "203.0.113.45", reason: "Malware distribution", rule: "Block Malicious IPs", severity: "high" },
  { time: "14:42", ip: "198.51.100.23", reason: "Port scanning", rule: "Port Scan Detection", severity: "medium" },
  {
    time: "14:38",
    ip: "192.0.2.156",
    reason: "SQL injection attempt",
    rule: "SQL Injection Prevention",
    severity: "high",
  },
  { time: "14:35", ip: "203.0.113.89", reason: "Geo-blocked region", rule: "Geo-blocking", severity: "low" },
  { time: "14:30", ip: "198.51.100.67", reason: "Rate limit exceeded", rule: "Rate Limiting", severity: "medium" },
]

export default function FirewallPage() {
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
              <h1 className="text-3xl font-bold text-blue-400">Firewall & Threat Intel</h1>
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                <Shield className="h-3 w-3 mr-1" />
                All Systems Protected
              </Badge>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30">
                <CardContent className="p-6">
                  <div className="text-sm text-slate-400 mb-1">Threats Blocked</div>
                  <div className="text-3xl font-bold text-blue-400">3,018</div>
                  <div className="text-xs text-slate-400 mt-1">Last 24 hours</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30">
                <CardContent className="p-6">
                  <div className="text-sm text-slate-400 mb-1">Active Rules</div>
                  <div className="text-3xl font-bold text-green-400">127</div>
                  <div className="text-xs text-slate-400 mt-1">All operational</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30">
                <CardContent className="p-6">
                  <div className="text-sm text-slate-400 mb-1">Intel Feeds</div>
                  <div className="text-3xl font-bold text-purple-400">4</div>
                  <div className="text-xs text-slate-400 mt-1">VirusTotal, Shodan</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/30">
                <CardContent className="p-6">
                  <div className="text-sm text-slate-400 mb-1">Known Threats</div>
                  <div className="text-3xl font-bold text-orange-400">90,188</div>
                  <div className="text-xs text-slate-400 mt-1">In database</div>
                </CardContent>
              </Card>
            </div>

            {/* Firewall Rules */}
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-blue-400">Active Firewall Rules</CardTitle>
                <CardDescription>Current protection rules and their activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {firewallRules.map((rule) => (
                    <div
                      key={rule.id}
                      className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg border border-slate-700/50"
                    >
                      <div className="flex items-center space-x-3">
                        <Shield className="h-5 w-5 text-blue-400" />
                        <div>
                          <div className="font-medium">{rule.name}</div>
                          <div className="text-xs text-slate-400">Action: {rule.action}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-sm font-medium">{rule.hits.toLocaleString()}</div>
                          <div className="text-xs text-slate-400">hits today</div>
                        </div>
                        <Badge variant={rule.status === "active" ? "default" : "secondary"}>{rule.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Threat Intelligence Feeds */}
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-purple-400">Threat Intelligence Feeds</CardTitle>
                <CardDescription>External threat intelligence sources and status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {threatIntelFeeds.map((feed) => (
                    <div key={feed.name} className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-400" />
                          <div>
                            <div className="font-semibold">{feed.name}</div>
                            <div className="text-xs text-slate-400">Last update: {feed.lastUpdate}</div>
                          </div>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">{feed.status}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm">
                          <span className="text-slate-400">Known threats: </span>
                          <span className="text-slate-200 font-medium">{feed.threats.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-slate-400">Health:</span>
                          <Progress value={feed.health} className="w-20 h-2" />
                          <span className="text-xs font-medium">{feed.health}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Blocks */}
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-red-400">Recent Blocks</CardTitle>
                <CardDescription>Latest blocked threats and malicious activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentBlocks.map((block, index) => (
                    <div
                      key={index}
                      className={`flex items-start space-x-3 p-3 rounded-lg border ${
                        block.severity === "high"
                          ? "bg-red-500/10 border-red-500/30"
                          : block.severity === "medium"
                            ? "bg-orange-500/10 border-orange-500/30"
                            : "bg-yellow-500/10 border-yellow-500/30"
                      }`}
                    >
                      <XCircle
                        className={`h-5 w-5 flex-shrink-0 ${
                          block.severity === "high"
                            ? "text-red-400"
                            : block.severity === "medium"
                              ? "text-orange-400"
                              : "text-yellow-400"
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-sm">{block.ip}</span>
                            <Badge variant="outline" className="text-xs">
                              {block.rule}
                            </Badge>
                          </div>
                          <span className="text-xs text-slate-500">{block.time}</span>
                        </div>
                        <p className="text-sm text-slate-400 mt-1">{block.reason}</p>
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
