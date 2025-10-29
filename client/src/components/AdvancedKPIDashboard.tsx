import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Zap, 
  Target, 
  Clock,
  Users,
  AlertTriangle,
  CheckCircle,
  BarChart3
} from 'lucide-react';

interface KPIData {
  id: string;
  title: string;
  value: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  icon: React.ReactNode;
  gradient: string;
}

const mockKPIs: KPIData[] = [
  {
    id: 'oee',
    title: 'Overall Equipment Effectiveness',
    value: 87.5,
    target: 85,
    unit: '%',
    trend: 'up',
    trendValue: 2.3,
    status: 'excellent',
    icon: <Target className="h-6 w-6" />,
    gradient: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'quality',
    title: 'Quality Rate',
    value: 98.2,
    target: 97,
    unit: '%',
    trend: 'up',
    trendValue: 0.8,
    status: 'excellent',
    icon: <CheckCircle className="h-6 w-6" />,
    gradient: 'from-blue-500 to-cyan-600'
  },
  {
    id: 'performance',
    title: 'Performance Efficiency',
    value: 89.1,
    target: 90,
    unit: '%',
    trend: 'down',
    trendValue: -1.2,
    status: 'warning',
    icon: <Activity className="h-6 w-6" />,
    gradient: 'from-amber-500 to-orange-600'
  },
  {
    id: 'availability',
    title: 'Machine Availability',
    value: 96.8,
    target: 95,
    unit: '%',
    trend: 'up',
    trendValue: 1.5,
    status: 'excellent',
    icon: <Zap className="h-6 w-6" />,
    gradient: 'from-purple-500 to-indigo-600'
  },
  {
    id: 'production',
    title: 'Production Volume',
    value: 1847,
    target: 1800,
    unit: 'units',
    trend: 'up',
    trendValue: 47,
    status: 'good',
    icon: <BarChart3 className="h-6 w-6" />,
    gradient: 'from-rose-500 to-pink-600'
  },
  {
    id: 'downtime',
    title: 'Unplanned Downtime',
    value: 12,
    target: 15,
    unit: 'min',
    trend: 'down',
    trendValue: -3,
    status: 'good',
    icon: <Clock className="h-6 w-6" />,
    gradient: 'from-green-500 to-emerald-600'
  }
];

const statusColors = {
  excellent: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  good: 'text-blue-600 bg-blue-50 border-blue-200',
  warning: 'text-amber-600 bg-amber-50 border-amber-200',
  critical: 'text-red-600 bg-red-50 border-red-200'
};

const AnimatedNumber = ({ value, duration = 2000 }: { value: number; duration?: number }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{displayValue.toFixed(1)}</span>;
};

export function AdvancedKPIDashboard() {
  const [selectedKPI, setSelectedKPI] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
            Production Excellence Dashboard
          </h2>
          <p className="text-muted-foreground mt-1">Real-time KPI monitoring for Renault Digital Factory</p>
        </div>
        <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-none">
          <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
          Live Data
        </Badge>
      </motion.div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockKPIs.map((kpi, index) => (
          <motion.div
            key={kpi.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            onClick={() => setSelectedKPI(selectedKPI === kpi.id ? null : kpi.id)}
            className="cursor-pointer"
          >
            <Card className={`overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
              selectedKPI === kpi.id ? 'ring-2 ring-blue-500' : ''
            }`}>
              <div className={`h-2 bg-gradient-to-r ${kpi.gradient}`} />
              
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${kpi.gradient} text-white`}>
                    {kpi.icon}
                  </div>
                  <Badge className={statusColors[kpi.status]}>
                    {kpi.status}
                  </Badge>
                </div>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {kpi.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-4">
                  {/* Main Value */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">
                      {isAnimating ? (
                        <AnimatedNumber value={kpi.value} />
                      ) : (
                        kpi.value.toFixed(1)
                      )}
                    </span>
                    <span className="text-lg text-muted-foreground">{kpi.unit}</span>
                    <div className={`flex items-center gap-1 ml-auto ${
                      kpi.trend === 'up' ? 'text-green-600' : 
                      kpi.trend === 'down' ? 'text-red-600' : 
                      'text-gray-600'
                    }`}>
                      {kpi.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : kpi.trend === 'down' ? (
                        <TrendingDown className="h-4 w-4" />
                      ) : (
                        <Activity className="h-4 w-4" />
                      )}
                      <span className="text-sm font-medium">
                        {kpi.trend === 'up' ? '+' : ''}{kpi.trendValue}
                      </span>
                    </div>
                  </div>

                  {/* Progress towards target */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Target: {kpi.target}{kpi.unit}</span>
                      <span className="font-medium">
                        {((kpi.value / kpi.target) * 100).toFixed(0)}%
                      </span>
                    </div>
                    <Progress 
                      value={(kpi.value / kpi.target) * 100} 
                      className="h-2"
                    />
                  </div>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {selectedKPI === kpi.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t pt-4 space-y-2"
                      >
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Last Hour</span>
                            <div className="font-medium">{(kpi.value - 0.5).toFixed(1)}{kpi.unit}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Last 24h Avg</span>
                            <div className="font-medium">{(kpi.value - 1.2).toFixed(1)}{kpi.unit}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Best Today</span>
                            <div className="font-medium text-green-600">{(kpi.value + 2.1).toFixed(1)}{kpi.unit}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Worst Today</span>
                            <div className="font-medium text-red-600">{(kpi.value - 3.8).toFixed(1)}{kpi.unit}</div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Real-time Updates Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="flex items-center justify-center gap-2 text-sm text-muted-foreground"
      >
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span>Data refreshes every 30 seconds</span>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </motion.div>
    </div>
  );
}