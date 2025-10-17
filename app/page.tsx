import DashboardHeader from "@/components/dashboard-header"
import SidebarNav from "@/components/sidebar-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Network, ShieldAlert, Activity, Globe, TrendingUp, CheckCircle, Database } from "lucide-react"

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-slate-900 text-slate-100 relative overflow-hidden">
      <div className="container mx-auto p-4 relative z-10">
        <DashboardHeader />

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-3 lg:col-span-2">
            <SidebarNav />
          </div>

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

            {/* Quick Status Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-cyan-400 mb-4">Guard Dog Status</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">Network Monitor</span>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">Threat Intelligence</span>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">SIEM / ELK</span>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">SOAR Automation</span>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-purple-400 mb-4">Investigator Status</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">Perxona Shield</span>
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">Beacon Tracking</span>
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">3 Pings</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">Data Flow Monitor</span>
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">ToS Analysis</span>
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">2 Reports</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-orange-400 mb-4">Infrastructure Health</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">Kubernetes</span>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">98%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">Kafka</span>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">95%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">Elasticsearch</span>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">92%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">Zeek/Suricata</span>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">100%</Badge>
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
