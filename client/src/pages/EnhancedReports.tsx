import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area 
} from "recharts";
import { 
  TrendingUp, TrendingDown, Activity, Clock, Factory, Shield, 
  Target, BarChart3, Download, Calendar, Car, Cog, AlertTriangle 
} from "lucide-react";
import { useState } from "react";

// Renault-specific production analytics data
const PRODUCTION_ANALYTICS = [
  { date: "Lun", clio: 850, megane: 420, captur: 380, arkana: 250, total: 1900 },
  { date: "Mar", clio: 847, megane: 418, captur: 375, arkana: 252, total: 1892 },
  { date: "Mer", clio: 855, megane: 415, captur: 385, arkana: 248, total: 1903 },
  { date: "Jeu", clio: 842, megane: 425, captur: 378, arkana: 255, total: 1900 },
  { date: "Ven", clio: 860, megane: 422, captur: 390, arkana: 253, total: 1925 },
  { date: "Sam", clio: 835, megane: 410, captur: 370, arkana: 245, total: 1860 },
  { date: "Dim", clio: 820, megane: 405, captur: 365, arkana: 240, total: 1830 },
];

const QUALITY_METRICS = [
  { shift: "06h-14h", fpy: 97.3, rework: 2.1, scrap: 0.6 },
  { shift: "14h-22h", fpy: 96.8, rework: 2.4, scrap: 0.8 },
  { shift: "22h-06h", fpy: 98.1, rework: 1.5, scrap: 0.4 },
];

const OEE_TRENDS = [
  { week: "W40", oee: 87.2, availability: 92.5, performance: 89.8, quality: 98.9 },
  { week: "W41", oee: 89.1, availability: 94.2, performance: 91.3, quality: 97.8 },
  { week: "W42", oee: 88.7, availability: 93.8, performance: 90.5, quality: 98.6 },
  { week: "W43", oee: 90.3, availability: 95.1, performance: 92.1, quality: 98.1 },
];

const SAFETY_INCIDENTS = [
  { month: "Jan", accidents: 0, nearMisses: 3, trainings: 45 },
  { month: "Feb", accidents: 1, nearMisses: 2, trainings: 52 },
  { month: "Mar", accidents: 0, nearMisses: 4, trainings: 48 },
  { month: "Apr", accidents: 0, nearMisses: 1, trainings: 50 },
  { month: "May", accidents: 0, nearMisses: 2, trainings: 47 },
  { month: "Jun", accidents: 0, nearMisses: 3, trainings: 53 },
];

const MACHINE_PERFORMANCE = [
  { machine: "Robot R-340", oee: 92.1, uptime: 98.5, maintenance: 8 },
  { machine: "Press 2500T", oee: 88.7, uptime: 96.2, maintenance: 12 },
  { machine: "Paint Line L3", oee: 85.3, uptime: 94.8, maintenance: 16 },
  { machine: "3D Control", oee: 95.2, uptime: 99.1, maintenance: 4 },
  { machine: "Robot R-580", oee: 79.8, uptime: 89.3, maintenance: 24 },
  { machine: "Test Bench BT-450", oee: 91.4, uptime: 97.7, maintenance: 10 },
];

const COLORS = {
  clio: "#0066CC",
  megane: "#FF6B35", 
  captur: "#4CAF50",
  arkana: "#9C27B0",
  primary: "#0066CC",
  secondary: "#FF6B35",
  success: "#4CAF50",
  warning: "#FF9800",
  danger: "#F44336"
};

export default function EnhancedReports() {
  const [timeRange, setTimeRange] = useState("week");
  const [selectedModel, setSelectedModel] = useState("all");

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const calculateTrend = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    return {
      value: Math.abs(change).toFixed(1),
      isPositive: change > 0,
      icon: change > 0 ? TrendingUp : TrendingDown,
      color: change > 0 ? "text-green-600" : "text-red-600"
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-blue-600" />
            Renault Reports and Analytics
          </h1>
          <p className="text-muted-foreground flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Production performance analysis - Flins Plant
          </p>
        </div>
        <div className="flex gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Today</SelectItem>
              <SelectItem value="week">This week</SelectItem>
              <SelectItem value="month">This month</SelectItem>
              <SelectItem value="quarter">Quarter</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-blue-200 bg-blue-50/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Production</p>
                <p className="text-2xl font-bold text-blue-600">13,310</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  +2.3% vs previous week
                </p>
              </div>
              <Car className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">TRS Moyen</p>
                <p className="text-2xl font-bold text-green-600">89.7%</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  +1.8% vs objectif 85%
                </p>
              </div>
              <Target className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">FPY Quality</p>
                <p className="text-2xl font-bold text-orange-600">97.4%</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingDown className="h-3 w-3 text-red-600" />
                  -0.4% vs previous week
                </p>
              </div>
              <Shield className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Jours sans Accident</p>
                <p className="text-2xl font-bold text-purple-600">127</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  Year record
                </p>
              </div>
              <Shield className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="production" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="production">Production</TabsTrigger>
          <TabsTrigger value="qualite">Quality</TabsTrigger>
          <TabsTrigger value="machines">Machines</TabsTrigger>
          <TabsTrigger value="securite">Safety</TabsTrigger>
        </TabsList>

        {/* Production Analytics */}
        <TabsContent value="production" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Production by Model (7 days)</CardTitle>
                <CardDescription>Daily production evolution</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={PRODUCTION_ANALYTICS}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatNumber(value as number)} />
                    <Legend />
                    <Bar dataKey="clio" name="Clio V" fill={COLORS.clio} />
                    <Bar dataKey="megane" name="Megane E-Tech" fill={COLORS.megane} />
                    <Bar dataKey="captur" name="Captur" fill={COLORS.captur} />
                    <Bar dataKey="arkana" name="Arkana" fill={COLORS.arkana} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>OEE Evolution</CardTitle>
                <CardDescription>Weekly overall equipment effectiveness trend</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={OEE_TRENDS}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis domain={[75, 100]} />
                    <Tooltip formatter={(value) => `${(value as number).toFixed(1)}%`} />
                    <Legend />
                    <Line type="monotone" dataKey="oee" name="Overall OEE" stroke={COLORS.primary} strokeWidth={3} />
                    <Line type="monotone" dataKey="availability" name="Availability" stroke={COLORS.success} />
                    <Line type="monotone" dataKey="performance" name="Performance" stroke={COLORS.warning} />
                    <Line type="monotone" dataKey="quality" name="Quality" stroke={COLORS.secondary} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Total Production - Trend</CardTitle>
              <CardDescription>Total volume of vehicles produced per day</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={PRODUCTION_ANALYTICS}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatNumber(value as number)} />
                  <Area type="monotone" dataKey="total" name="Total Vehicles" stroke={COLORS.primary} fill={COLORS.primary} fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Quality Analytics */}
        <TabsContent value="qualite" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Quality Indicators by Team</CardTitle>
                <CardDescription>FPY, rework and scrap by shift</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={QUALITY_METRICS}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="shift" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${(value as number).toFixed(1)}%`} />
                    <Legend />
                    <Bar dataKey="fpy" name="FPY %" fill={COLORS.success} />
                    <Bar dataKey="rework" name="Retouches %" fill={COLORS.warning} />
                    <Bar dataKey="scrap" name="Rebuts %" fill={COLORS.danger} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Non-Conformity Distribution</CardTitle>
                <CardDescription>Types of defects identified</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Paint", value: 35, color: COLORS.primary },
                        { name: "Assembly", value: 28, color: COLORS.secondary },
                        { name: "Welding", value: 20, color: COLORS.success },
                        { name: "Electronics", value: 12, color: COLORS.warning },
                        { name: "Others", value: 5, color: COLORS.danger }
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {[
                        { name: "Peinture", value: 35, color: COLORS.primary },
                        { name: "Assemblage", value: 28, color: COLORS.secondary },
                        { name: "Soudure", value: 20, color: COLORS.success },
                        { name: "Electronics", value: 12, color: COLORS.warning },
                        { name: "Autres", value: 5, color: COLORS.danger }
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Machine Performance */}
        <TabsContent value="machines" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Machine Performance</CardTitle>
              <CardDescription>OEE and maintenance time by equipment</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={MACHINE_PERFORMANCE} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="machine" type="category" width={120} />
                  <Tooltip formatter={(value) => `${(value as number).toFixed(1)}%`} />
                  <Legend />
                  <Bar dataKey="oee" name="TRS %" fill={COLORS.primary} />
                  <Bar dataKey="uptime" name="Availability %" fill={COLORS.success} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Safety Analytics */}
        <TabsContent value="securite" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Safety Indicators</CardTitle>
              <CardDescription>Accidents, presqu'accidents et formations</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={SAFETY_INCIDENTS}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mois" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="accidents" name="Accidents" stroke={COLORS.danger} strokeWidth={3} />
                  <Line type="monotone" dataKey="presqueAccidents" name="Presqu'accidents" stroke={COLORS.warning} />
                  <Line type="monotone" dataKey="formations" name="Formations" stroke={COLORS.success} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}