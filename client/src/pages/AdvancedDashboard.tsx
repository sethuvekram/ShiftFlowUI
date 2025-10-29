import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import StatCard from "@/components/StatCard";
import MachineStatusCard from "@/components/MachineStatusCard";
import TaskItem from "@/components/TaskItem";
import AlertNotification from "@/components/AlertNotification";
import { AdvancedKPIDashboard } from "../components/AdvancedKPIDashboard";
import { Advanced3DMonitor } from "../components/Advanced3DMonitor";
import { ProductionLineVisualizer } from "../components/ProductionLineVisualizer";
import { AdvancedAlertManagement } from "../components/AdvancedAlertManagement";
import { FactoryFloorHeatmap } from "../components/FactoryFloorHeatmap";
import { Clock, ListTodo, AlertTriangle, Activity, BarChart3, Eye, Zap, TrendingUp, Thermometer } from "lucide-react";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import type { LogEntry, Machine, Alert, Shift } from "@shared/schema";

export default function AdvancedDashboard() {
  const { data: currentShift } = useQuery<Shift>({ 
    queryKey: ["/api/shifts/current"] 
  });
  
  const { data: logEntries = [] } = useQuery<LogEntry[]>({ 
    queryKey: ["/api/log-entries"] 
  });
  
  const { data: machines = [] } = useQuery<Machine[]>({ 
    queryKey: ["/api/machines"] 
  });
  
  const { data: alerts = [] } = useQuery<Alert[]>({ 
    queryKey: ["/api/alerts"] 
  });

  const activeAlerts = alerts.filter(alert => !alert.resolved);
  const criticalAlerts = activeAlerts.filter(alert => alert.severity === "critical");

  // Mock data for enhanced features
  const stats = [
    { title: "OEE", value: "87.5%", change: "+2.3%", trend: "up" as const },
    { title: "Production", value: "1,847", change: "+47", trend: "up" as const },
    { title: "Quality Rate", value: "98.2%", change: "+0.8%", trend: "up" as const },
    { title: "Downtime", value: "12 min", change: "-3 min", trend: "down" as const }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="p-6 space-y-6">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between"
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 bg-clip-text text-transparent">
              Renault Digital Factory Dashboard
            </h1>
            <p className="text-xl text-muted-foreground mt-2">
              Advanced Manufacturing Intelligence Platform
            </p>
            <div className="flex items-center gap-4 mt-3">
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                Live Production Data
              </Badge>
              <Badge variant="outline">
                Shift: {currentShift?.shiftName || "Day Shift"}
              </Badge>
              <Badge variant="outline">
                {format(new Date(), "MMM dd, yyyy - HH:mm")}
              </Badge>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4 lg:mt-0">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-3 bg-white rounded-lg shadow-sm border"
              >
                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.title}</div>
                <div className={`text-xs flex items-center justify-center gap-1 mt-1 ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <Activity className="h-3 w-3" />
                  )}
                  {stat.change}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6 bg-white shadow-sm">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="production" className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Production Line
              </TabsTrigger>
              <TabsTrigger value="monitoring" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                3D Monitoring
              </TabsTrigger>
              <TabsTrigger value="heatmap" className="flex items-center gap-2">
                <Thermometer className="h-4 w-4" />
                Floor Heatmap
              </TabsTrigger>
              <TabsTrigger value="alerts" className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                Alerts ({activeAlerts.length})
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <AdvancedKPIDashboard />
              
              {/* Traditional cards for compatibility */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <StatCard
                    key={stat.title}
                    title={stat.title}
                    value={stat.value}
                    icon={Activity}
                  />
                ))}
              </div>

              {/* Machine Status */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-blue-600" />
                    Machine Status Overview
                  </CardTitle>
                  <CardDescription>Real-time status of production equipment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {machines.map((machine) => (
                      <MachineStatusCard
                        key={machine.id}
                        machineName={machine.machineName}
                        status={machine.status}
                        uptime={machine.uptime}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="production">
              <ProductionLineVisualizer />
            </TabsContent>

            <TabsContent value="monitoring">
              <Advanced3DMonitor />
            </TabsContent>

            <TabsContent value="heatmap">
              <FactoryFloorHeatmap />
            </TabsContent>

            <TabsContent value="alerts">
              <AdvancedAlertManagement />
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <AdvancedKPIDashboard />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle>Recent Activities</CardTitle>
                    <CardDescription>Latest system activities and updates</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {logEntries.slice(0, 5).map((entry) => (
                      <div key={entry.id} className="flex items-center gap-3 p-3 border rounded-lg">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{entry.taskDescription}</p>
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(entry.timestamp), "MMM dd, HH:mm")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle>Active Alerts</CardTitle>
                    <CardDescription>Current system alerts requiring attention</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {activeAlerts.slice(0, 5).map((alert) => (
                      <AlertNotification
                        key={alert.id}
                        message={alert.message}
                        severity={alert.severity as "low" | "medium" | "high" | "critical"}
                        timestamp={alert.timestamp}
                      />
                    ))}
                    {activeAlerts.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <AlertTriangle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p>No active alerts</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}