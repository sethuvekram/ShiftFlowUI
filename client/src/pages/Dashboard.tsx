import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/StatCard";
import MachineStatusCard from "@/components/MachineStatusCard";
import TaskItem from "@/components/TaskItem";
import AlertNotification from "@/components/AlertNotification";
import { Clock, ListTodo, AlertTriangle, Activity, Building2, CheckCircle, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";

interface LogEntry {
  id: string;
  shiftId: string;
  userId: string;
  taskDescription: string;
  remarks?: string | null;
  timestamp: Date;
  priority: string;
  status: string;
  department?: string;
  area?: string;
}

interface Machine {
  id: string;
  machineName: string;
  status: string;
  uptime: number;
  lastMaintenance?: Date | null;
  department?: string;
  area?: string;
}

interface Alert {
  id: string;
  message: string;
  severity: string;
  timestamp: Date;
  resolved: boolean;
}

interface Shift {
  id: string;
  shiftName: string;
  startTime: Date;
  endTime: Date;
  supervisorId?: string | null;
  operatorId?: string | null;
  status: string;
}

interface Handover {
  id: string;
  shiftId: string;
  fromUserId: string;
  toUserId?: string | null;
  status: string;
  approvedAt?: Date | null;
  remarks?: string | null;
  createdAt: Date;
  department?: string;
  area?: string;
}

export default function Dashboard() {
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
    queryKey: ["/api/alerts"],
    refetchInterval: 30000,
  });

  const { data: handovers = [] } = useQuery<Handover[]>({ 
    queryKey: ["/api/handovers"],
    refetchInterval: 10000,
  });

  const pendingTasks = logEntries.filter(t => t.status === "Pending" || t.status === "In Progress");
  const activeAlerts = alerts.filter(a => !a.resolved);
  const recentHandovers = handovers.filter(h => h.status === "approved").slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Shift Dashboard</h1>
        <p className="text-muted-foreground">
          {format(new Date(), "EEEE, MMMM dd, yyyy")} • {format(new Date(), "HH:mm")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Current Shift"
          value={currentShift?.shiftName || "No Active Shift"}
          icon={Clock}
          subtitle={currentShift ? `${format(currentShift.startTime, "HH:mm")} - ${format(currentShift.endTime, "HH:mm")}` : ""}
        />
        <StatCard
          title="Pending Tasks"
          value={pendingTasks.length}
          icon={ListTodo}
          subtitle={`${pendingTasks.filter(t => t.priority === "High").length} high priority`}
          variant={pendingTasks.length > 0 ? "warning" : "default"}
        />
        <StatCard
          title="Active Alerts"
          value={activeAlerts.length}
          icon={AlertTriangle}
          subtitle={`${activeAlerts.filter(a => a.severity === "Warning").length} warnings`}
          variant={activeAlerts.length > 0 ? "danger" : "default"}
        />
        <StatCard
          title="Machines Online"
          value={`${machines.filter(m => m.status === "Running").length}/${machines.length}`}
          icon={Activity}
          subtitle="System operational"
          variant="success"
        />
      </div>

      {/* Previous Shift Handover Section */}
      {recentHandovers.length > 0 && (
        <Card className="border-l-4 border-l-blue-500 bg-blue-50/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <ArrowRight className="h-5 w-5 text-blue-600" />
                  Previous Shift Handover Information
                </CardTitle>
                <CardDescription>
                  Important information from the previous shift to review before starting work
                </CardDescription>
              </div>
              <Link href="/handover">
                <Button variant="outline" size="sm">
                  View All Handovers
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentHandovers.map((handover) => (
              <div key={handover.id} className="bg-white p-4 rounded-lg border border-blue-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-blue-600" />
                    <span className="font-semibold text-blue-900">
                      {handover.department || "Manufacturing"} Handover
                    </span>
                    {handover.area && (
                      <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300">
                        {handover.area}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Approved
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {handover.approvedAt && format(new Date(handover.approvedAt), "MMM dd, HH:mm")}
                    </span>
                  </div>
                </div>
                <div className="bg-blue-50 p-3 rounded border border-blue-100">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {handover.remarks}
                  </p>
                </div>
              </div>
            ))}
            <div className="text-center pt-2">
              <Link href="/logbook">
                <Button variant="ghost" className="text-blue-600">
                  View Complete Manufacturing Operations Log →
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Machine Status</CardTitle>
              <CardDescription>Real-time monitoring of production equipment</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          <Card>
            <CardHeader>
              <CardTitle>Pending Tasks</CardTitle>
              <CardDescription>Tasks requiring attention this shift</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {pendingTasks.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No pending tasks
                </p>
              ) : (
                pendingTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    taskDescription={task.taskDescription}
                    timestamp={task.timestamp}
                    priority={task.priority}
                    status={task.status}
                    remarks={task.remarks ?? undefined}
                    department={task.department ?? undefined}
                    area={task.area ?? undefined}
                  />
                ))
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Alerts</CardTitle>
              <CardDescription>Recent notifications and warnings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {activeAlerts.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No active alerts
                </p>
              ) : (
                activeAlerts.map((alert) => (
                  <AlertNotification
                    key={alert.id}
                    message={alert.message}
                    severity={alert.severity}
                    timestamp={new Date(alert.timestamp)}
                  />
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
