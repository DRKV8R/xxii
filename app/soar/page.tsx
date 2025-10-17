"use client"

import DashboardHeader from "@/components/dashboard-header"
import SidebarNav from "@/components/sidebar-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Zap, CheckCircle, XCircle, PlayCircle } from "lucide-react"

const workflows = [
  {
    name: "Malware Response",
    status: "active",
    executions: 45,
    success: 98,
    avgTime: "2.3s",
    lastRun: "2 min ago",
  },
  {
    name: "Phishing Investigation",
    status: "active",
    executions: 32,
    success: 95,
    avgTime: "4.1s",
    lastRun: "5 min ago",
  },
  {
    name: "DDoS Mitigation",
    status: "active",
    executions: 18,
    success: 100,
    avgTime: "1.8s",
    lastRun: "12 min ago",
  },
  {
    name: "Unauthorized Access",
    status: "active",
    executions: 67,
    success: 92,
    avgTime: "3.5s",
    lastRun: "1 min ago",
  },
  {
    name: "Data Exfiltration",
    status: "standby",
    executions: 8,
    success: 100,
    avgTime: "5.2s",
    lastRun: "2 hours ago",
  },
]

const recentExecutions = [
  {
    workflow: "Malware Response",
    trigger: "IDS Alert",
    status: "success",
    duration: "2.1s",
    actions: 8,
    time: "14:45",
  },
  {
    workflow: "Unauthorized Access",
    trigger: "Failed Auth",
    status: "success",
    duration: "3.2s",
    actions: 12,
    time: "14:43",
  },
  {
    workflow: "Phishing Investigation",
    trigger: "Email Analysis",
    status: "success",
    duration: "4.5s",
    actions: 15,
    time: "14:40",
  },
  {
    workflow: "DDoS Mitigation",
    trigger: "Traffic Spike",
    status: "success",
    duration: "1.6s",
    actions: 6,
    time: "14:38",
  },
  {
    workflow: "Malware Response",
    trigger: "File Scan",
    status: "failed",
    duration: "2.8s",
    actions: 5,
    time: "14:35",
  },
]

export default function SoarPage() {
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
              <h1 className="text-3xl font-bold text-yellow-400">SOAR Automation</h1>
              <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                <Zap className="h-3 w-3 mr-1" />5 Active Workflows
              </Badge>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/30">
                <CardContent className="p-6">
                  <div className="text-sm text-slate-400 mb-1">Total Executions</div>
                  <div className="text-3xl font-bold text-yellow-400">170</div>
                  <div className="text-xs text-slate-400 mt-1">Last 24 hours</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/30">
                <CardContent className="p-6">
                  <div className="text-sm text-slate-400 mb-1">Success Rate</div>
                  <div className="text-3xl font-bold text-green-400">96%</div>
                  <div className="text-xs text-slate-400 mt-1">163 successful</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30">
                <CardContent className="p-6">
                  <div className="text-sm text-slate-400 mb-1">Avg Response Time</div>
                  <div className="text-3xl font-bold text-blue-400">3.2s</div>
                  <div className="text-xs text-slate-400 mt-1">Automated response</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30">
                <CardContent className="p-6">
                  <div className="text-sm text-slate-400 mb-1">Actions Executed</div>
                  <div className="text-3xl font-bold text-purple-400">1,247</div>
                  <div className="text-xs text-slate-400 mt-1">Automated actions</div>
                </CardContent>
              </Card>
            </div>

            {/* Active Workflows */}
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-yellow-400">Active Workflows</CardTitle>
                <CardDescription>Automated response playbooks and their performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {workflows.map((workflow) => (
                    <div key={workflow.name} className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <PlayCircle className="h-5 w-5 text-yellow-400" />
                          <div>
                            <div className="font-semibold">{workflow.name}</div>
                            <div className="text-xs text-slate-400">Last run: {workflow.lastRun}</div>
                          </div>
                        </div>
                        <Badge variant={workflow.status === "active" ? "default" : "secondary"}>
                          {workflow.status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-slate-500 text-xs">Executions</div>
                          <div className="text-slate-300 font-medium">{workflow.executions}</div>
                        </div>
                        <div>
                          <div className="text-slate-500 text-xs">Success Rate</div>
                          <div className="text-green-400 font-medium">{workflow.success}%</div>
                        </div>
                        <div>
                          <div className="text-slate-500 text-xs">Avg Time</div>
                          <div className="text-slate-300 font-medium">{workflow.avgTime}</div>
                        </div>
                        <div>
                          <Progress value={workflow.success} className="h-2 mt-2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Executions */}
            <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-orange-400">Recent Executions</CardTitle>
                <CardDescription>Latest automated response activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentExecutions.map((execution, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        execution.status === "success"
                          ? "bg-green-500/10 border-green-500/30"
                          : "bg-red-500/10 border-red-500/30"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        {execution.status === "success" ? (
                          <CheckCircle className="h-5 w-5 text-green-400" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-400" />
                        )}
                        <div>
                          <div className="font-medium">{execution.workflow}</div>
                          <div className="text-xs text-slate-400">Trigger: {execution.trigger}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="text-right">
                          <div className="text-slate-400 text-xs">Duration</div>
                          <div className="font-medium">{execution.duration}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-slate-400 text-xs">Actions</div>
                          <div className="font-medium">{execution.actions}</div>
                        </div>
                        <div className="text-slate-500 text-xs">{execution.time}</div>
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
