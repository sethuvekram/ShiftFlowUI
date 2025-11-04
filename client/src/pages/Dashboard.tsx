import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import StatCard from "@/components/StatCard";
import MachineStatusCard from "@/components/MachineStatusCard";
import TaskItem from "@/components/TaskItem";
import AlertNotification from "@/components/AlertNotification";
import { Clock, ListTodo, AlertTriangle, Activity } from "lucide-react";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import type { LogEntry, Machine, Alert, Shift } from "@shared/schema";

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

  const pendingTasks = logEntries.filter(t => t.status === "Pending" || t.status === "In Progress");
  const activeAlerts = alerts.filter(a => !a.resolved);

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
                    task={task}
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
