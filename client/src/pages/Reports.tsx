import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, Activity, Clock } from "lucide-react";
import { useState } from "react";

// TODO: remove mock functionality - fetch real analytics data
const shiftPerformanceData = [
  { shift: "Mon", completed: 24, pending: 3 },
  { shift: "Tue", completed: 28, pending: 2 },
  { shift: "Wed", completed: 22, pending: 5 },
  { shift: "Thu", completed: 26, pending: 4 },
  { shift: "Fri", completed: 30, pending: 2 },
  { shift: "Sat", completed: 25, pending: 3 },
  { shift: "Sun", completed: 20, pending: 6 },
];

const taskCompletionData = [
  { name: "Completed", value: 87, color: "hsl(var(--chart-1))" },
  { name: "In Progress", value: 8, color: "hsl(var(--chart-2))" },
  { name: "Pending", value: 5, color: "hsl(var(--chart-3))" },
];

const machineUptimeData = [
  { machine: "A-101", uptime: 98 },
  { machine: "B-205", uptime: 95 },
  { machine: "C-310", uptime: 99 },
  { machine: "D-412", uptime: 87 },
];

const monthlyTrendsData = [
  { month: "Jan", tasks: 320, incidents: 2 },
  { month: "Feb", tasks: 345, incidents: 1 },
  { month: "Mar", tasks: 380, incidents: 3 },
  { month: "Apr", tasks: 390, incidents: 1 },
  { month: "May", tasks: 420, incidents: 2 },
  { month: "Jun", tasks: 410, incidents: 1 },
];

export default function Reports() {
  const [timeRange, setTimeRange] = useState("week");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Performance metrics and operational insights
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="time-range" className="text-sm">Time Range:</Label>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger id="time-range" className="w-32" data-testid="select-time-range">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Tasks
            </CardTitle>
            <Activity className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-total-tasks">420</div>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="default" className="text-xs">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12%
              </Badge>
              <p className="text-xs text-muted-foreground">vs last week</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completion Rate
            </CardTitle>
            <Activity className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-completion-rate">87%</div>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="default" className="text-xs">
                <TrendingUp className="h-3 w-3 mr-1" />
                +3%
              </Badge>
              <p className="text-xs text-muted-foreground">vs last week</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg Response Time
            </CardTitle>
            <Clock className="h-5 w-5 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-response-time">2.3h</div>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="default" className="text-xs">
                <TrendingDown className="h-3 w-3 mr-1" />
                -8%
              </Badge>
              <p className="text-xs text-muted-foreground">vs last week</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              System Uptime
            </CardTitle>
            <Activity className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="text-system-uptime">99.2%</div>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="default" className="text-xs">
                <TrendingUp className="h-3 w-3 mr-1" />
                +0.5%
              </Badge>
              <p className="text-xs text-muted-foreground">vs last week</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Shift Performance</CardTitle>
            <CardDescription>Task completion over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={shiftPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="shift" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" fill="hsl(var(--chart-1))" name="Completed" />
                <Bar dataKey="pending" fill="hsl(var(--chart-3))" name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Task Distribution</CardTitle>
            <CardDescription>Current task status breakdown</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={taskCompletionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {taskCompletionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Machine Uptime</CardTitle>
            <CardDescription>Equipment performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={machineUptimeData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis type="number" domain={[0, 100]} className="text-xs" />
                <YAxis dataKey="machine" type="category" className="text-xs" />
                <Tooltip />
                <Bar dataKey="uptime" fill="hsl(var(--chart-2))" name="Uptime %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Trends</CardTitle>
            <CardDescription>Task volume and incident tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrendsData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="tasks" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Tasks" />
                <Line type="monotone" dataKey="incidents" stroke="hsl(var(--chart-5))" strokeWidth={2} name="Incidents" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
