import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import StatCard from "@/components/StatCard";
import MachineStatusCard from "@/components/MachineStatusCard";
import TaskItem from "@/components/TaskItem";
import AlertNotification from "@/components/AlertNotification";
import { 
  Clock, ListTodo, AlertTriangle, Activity, Factory, TrendingUp, 
  Shield, Target, Zap, Users, ChevronRight, Car, Cog, BarChart3 
} from "lucide-react";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import type { LogEntry, Machine, Alert, Shift } from "@shared/schema";

// Real-time production data for Renault
const PRODUCTION_METRICS = {
  hourlyRate: 47,
  targetRate: 50,
  efficiency: 94.2,
  oee: 89.7, // Overall Equipment Effectiveness
  qualityRate: 99.1,
  downtime: 12, // minutes in current hour
};

const VEHICLE_PRODUCTION = [
  { model: "Clio V", produced: 847, target: 850, percentage: 99.6, status: "On Track" },
  { model: "Megane E-Tech", produced: 418, target: 420, percentage: 99.5, status: "On Track" },
  { model: "Captur", produced: 375, target: 380, percentage: 98.7, status: "Behind" },
  { model: "Arkana", produced: 252, target: 250, percentage: 100.8, status: "Ahead" },
];

const SAFETY_METRICS = {
  daysWithoutIncident: 127,
  safetyScore: 98.5,
  nearMisses: 2,
  completedTrainings: 156,
};

const QUALITY_METRICS = {
  firstPassYield: 97.3,
  customerComplaints: 0,
  reworkRate: 2.1,
  scrapRate: 0.8,
};

export default function EnhancedDashboard() {
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
  const runningMachines = machines.filter(m => m.status === "Running").length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "On Track": return <Badge className="bg-green-100 text-green-800">✓ Objectif</Badge>;
      case "Behind": return <Badge variant="destructive">↓ Retard</Badge>;
      case "Ahead": return <Badge className="bg-blue-100 text-blue-800">↑ Avance</Badge>;
      default: return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Factory className="h-8 w-8 text-blue-600" />
            Tableau de Bord Production Renault
          </h1>
          <p className="text-muted-foreground flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {format(new Date(), "EEEE dd MMMM yyyy, HH:mm")} • Usine de Flins
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">
            {PRODUCTION_METRICS.hourlyRate} vehicles/h
          </div>
          <div className="text-sm text-muted-foreground">
            Current rate
          </div>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Current Team"
          value={currentShift?.shiftName || "No active team"}
          icon={Users}
          subtitle={currentShift ? `${format(currentShift.startTime, "HH:mm")} - ${format(currentShift.endTime, "HH:mm")}` : ""}
          className="border-blue-200 bg-blue-50/50"
        />
        <StatCard
          title="Priority Tasks"
          value={pendingTasks.length}
          icon={ListTodo}
          subtitle={`${logEntries.filter(t => t.status === "Completed").length} completed`}
          className="border-orange-200 bg-orange-50/50"
        />
        <StatCard
          title="Alertes Actives"
          value={activeAlerts.length}
          icon={AlertTriangle}
          subtitle={activeAlerts.length > 0 ? "Attention required" : "All good"}
          className="border-red-200 bg-red-50/50"
        />
        <StatCard
          title="Operational Machines"
          value={`${runningMachines}/${machines.length}`}
          icon={Activity}
          subtitle={`${((runningMachines / machines.length) * 100).toFixed(1)}% available`}
          className="border-green-200 bg-green-50/50"
        />
      </div>

      {/* Production Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* OEE and Efficiency */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              Real-Time Performance
            </CardTitle>
            <CardDescription>Key production performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">TRS (OEE)</span>
                  <span className="text-lg font-bold text-blue-600">{PRODUCTION_METRICS.oee}%</span>
                </div>
                <Progress value={PRODUCTION_METRICS.oee} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  Objectif: 85% • Performance: Excellente
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Efficiency</span>
                  <span className="text-lg font-bold text-green-600">{PRODUCTION_METRICS.efficiency}%</span>
                </div>
                <Progress value={PRODUCTION_METRICS.efficiency} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  Rate: {PRODUCTION_METRICS.hourlyRate}/{PRODUCTION_METRICS.targetRate} veh/h
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Quality (FPY)</span>
                  <span className="text-lg font-bold text-green-600">{QUALITY_METRICS.firstPassYield}%</span>
                </div>
                <Progress value={QUALITY_METRICS.firstPassYield} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  First pass yield rate
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Availability</span>
                  <span className="text-lg font-bold text-blue-600">
                    {(60 - PRODUCTION_METRICS.downtime)}min
                  </span>
                </div>
                <Progress value={((60 - PRODUCTION_METRICS.downtime) / 60) * 100} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  {PRODUCTION_METRICS.downtime}min downtime this hour
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Safety Dashboard */}
        <Card className="border-green-200 bg-green-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              Safety
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {SAFETY_METRICS.daysWithoutIncident}
              </div>
              <div className="text-sm text-muted-foreground">
                Days without accident
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Safety score</span>
                <span className="font-semibold">{SAFETY_METRICS.safetyScore}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Near misses</span>
                <span className="font-semibold text-orange-600">{SAFETY_METRICS.nearMisses}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Training completed</span>
                <span className="font-semibold text-blue-600">{SAFETY_METRICS.completedTrainings}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vehicle Production Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="h-5 w-5 text-blue-600" />
            Production by Model - Daily Targets
          </CardTitle>
          <CardDescription>Real-time production progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {VEHICLE_PRODUCTION.map((vehicle) => (
              <Card key={vehicle.model} className="relative overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-sm">{vehicle.model}</span>
                    {getStatusBadge(vehicle.status)}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">{vehicle.produced}</span>
                      <span className="text-sm text-muted-foreground">/ {vehicle.target}</span>
                    </div>
                    <Progress value={vehicle.percentage} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      {vehicle.percentage.toFixed(1)}% de l'objectif
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Machine Status and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Machine Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cog className="h-5 w-5 text-gray-600" />
              Machine Status
            </CardTitle>
            <CardDescription>Real-time equipment monitoring</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {machines.slice(0, 4).map((machine) => (
                <MachineStatusCard key={machine.id} machine={machine} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Alertes et Notifications
            </CardTitle>
            <CardDescription>Events requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.slice(0, 4).map((alert) => (
                <AlertNotification key={alert.id} alert={alert} />
              ))}
              {alerts.length === 0 && (
                <div className="text-center py-4 text-muted-foreground">
                  <Shield className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  Aucune alerte active
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Tasks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ListTodo className="h-5 w-5 text-blue-600" />
            Tasks in Progress
          </CardTitle>
          <CardDescription>Current team activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pendingTasks.slice(0, 5).map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
            {pendingTasks.length === 0 && (
              <div className="text-center py-4 text-muted-foreground">
                <Target className="h-8 w-8 mx-auto mb-2 text-green-600" />
                All tasks are completed
              </div>
            )}
          </div>
          {pendingTasks.length > 5 && (
            <div className="mt-4 text-center">
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1 mx-auto">
                View all tasks ({pendingTasks.length})
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}