import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Thermometer, 
  Activity, 
  AlertTriangle, 
  Zap,
  TrendingUp,
  TrendingDown,
  RotateCcw,
  Settings
} from 'lucide-react';

interface HeatmapCell {
  id: string;
  x: number;
  y: number;
  temperature: number;
  activity: number;
  efficiency: number;
  status: 'normal' | 'warning' | 'critical' | 'offline';
  zone: string;
}

const generateHeatmapData = (): HeatmapCell[] => {
  const zones = ['Stamping', 'Welding', 'Painting', 'Assembly', 'Quality', 'Shipping'];
  const data: HeatmapCell[] = [];
  
  for (let x = 0; x < 12; x++) {
    for (let y = 0; y < 8; y++) {
      const temperature = Math.random() * 40 + 20; // 20-60°C
      const activity = Math.random() * 100;
      const efficiency = Math.random() * 40 + 60; // 60-100%
      
      let status: HeatmapCell['status'] = 'normal';
      if (temperature > 50 || activity < 20) status = 'warning';
      if (temperature > 55 || activity < 10) status = 'critical';
      if (Math.random() < 0.05) status = 'offline';
      
      data.push({
        id: `cell-${x}-${y}`,
        x,
        y,
        temperature,
        activity,
        efficiency,
        status,
        zone: zones[Math.floor((x / 12) * zones.length)]
      });
    }
  }
  
  return data;
};

const getTemperatureColor = (temp: number) => {
  if (temp < 25) return '#3B82F6'; // blue
  if (temp < 35) return '#10B981'; // green
  if (temp < 45) return '#F59E0B'; // yellow
  if (temp < 55) return '#F97316'; // orange
  return '#EF4444'; // red
};

const getActivityOpacity = (activity: number) => {
  return Math.max(0.3, activity / 100);
};

export function FactoryFloorHeatmap() {
  const [heatmapData, setHeatmapData] = useState<HeatmapCell[]>([]);
  const [selectedCell, setSelectedCell] = useState<HeatmapCell | null>(null);
  const [viewMode, setViewMode] = useState<'temperature' | 'activity' | 'efficiency'>('temperature');
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    setHeatmapData(generateHeatmapData());
  }, []);

  useEffect(() => {
    if (isLive) {
      const interval = setInterval(() => {
        setHeatmapData(prev => prev.map(cell => ({
          ...cell,
          temperature: Math.max(15, Math.min(65, cell.temperature + (Math.random() - 0.5) * 2)),
          activity: Math.max(0, Math.min(100, cell.activity + (Math.random() - 0.5) * 10)),
          efficiency: Math.max(50, Math.min(100, cell.efficiency + (Math.random() - 0.5) * 5))
        })));
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isLive]);

  const getVisualizationValue = (cell: HeatmapCell) => {
    switch (viewMode) {
      case 'temperature': return cell.temperature;
      case 'activity': return cell.activity;
      case 'efficiency': return cell.efficiency;
      default: return cell.temperature;
    }
  };

  const getVisualizationColor = (cell: HeatmapCell) => {
    const value = getVisualizationValue(cell);
    
    switch (viewMode) {
      case 'temperature':
        return getTemperatureColor(cell.temperature);
      case 'activity':
        const activityHue = Math.floor((cell.activity / 100) * 120); // 0 (red) to 120 (green)
        return `hsl(${activityHue}, 70%, 50%)`;
      case 'efficiency':
        const efficiencyHue = Math.floor(((cell.efficiency - 50) / 50) * 120);
        return `hsl(${efficiencyHue}, 70%, 50%)`;
      default:
        return getTemperatureColor(cell.temperature);
    }
  };

  const averageTemperature = heatmapData.reduce((sum, cell) => sum + cell.temperature, 0) / heatmapData.length;
  const averageActivity = heatmapData.reduce((sum, cell) => sum + cell.activity, 0) / heatmapData.length;
  const averageEfficiency = heatmapData.reduce((sum, cell) => sum + cell.efficiency, 0) / heatmapData.length;
  
  const criticalCells = heatmapData.filter(cell => cell.status === 'critical').length;
  const warningCells = heatmapData.filter(cell => cell.status === 'warning').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div>
          <h2 className="text-2xl font-bold">Factory Floor Heatmap</h2>
          <p className="text-muted-foreground">Real-time environmental and activity monitoring</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant={isLive ? "default" : "outline"}
            onClick={() => setIsLive(!isLive)}
            className="flex items-center gap-2"
          >
            <Activity className="h-4 w-4" />
            {isLive ? 'Live' : 'Paused'}
          </Button>
          <Button variant="outline" onClick={() => setHeatmapData(generateHeatmapData())}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </motion.div>

      {/* Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-5 gap-4"
      >
        <Card>
          <CardContent className="p-4 text-center">
            <Thermometer className="h-6 w-6 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{averageTemperature.toFixed(1)}°C</div>
            <div className="text-xs text-muted-foreground">Avg Temperature</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Activity className="h-6 w-6 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{averageActivity.toFixed(0)}%</div>
            <div className="text-xs text-muted-foreground">Avg Activity</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Zap className="h-6 w-6 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{averageEfficiency.toFixed(0)}%</div>
            <div className="text-xs text-muted-foreground">Avg Efficiency</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-6 w-6 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-yellow-600">{warningCells}</div>
            <div className="text-xs text-muted-foreground">Warnings</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-6 w-6 text-red-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-red-600">{criticalCells}</div>
            <div className="text-xs text-muted-foreground">Critical</div>
          </CardContent>
        </Card>
      </motion.div>

      {/* View Mode Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex gap-2"
      >
        {['temperature', 'activity', 'efficiency'].map((mode) => (
          <Button
            key={mode}
            variant={viewMode === mode ? 'default' : 'outline'}
            onClick={() => setViewMode(mode as typeof viewMode)}
            className="capitalize"
          >
            {mode}
          </Button>
        ))}
      </motion.div>

      {/* Heatmap */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
              Factory Floor Layout - {viewMode.charAt(0).toUpperCase() + viewMode.slice(1)} View
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="relative">
              <svg
                width="100%"
                height="400"
                viewBox="0 0 600 400"
                className="border rounded-lg bg-gray-50"
              >
                {/* Zone labels */}
                {['Stamping', 'Welding', 'Painting', 'Assembly', 'Quality', 'Shipping'].map((zone, index) => (
                  <text
                    key={zone}
                    x={50 + index * 90}
                    y={30}
                    className="text-xs font-semibold fill-gray-600"
                    textAnchor="middle"
                  >
                    {zone}
                  </text>
                ))}
                
                {/* Heatmap cells */}
                {heatmapData.map((cell) => (
                  <motion.rect
                    key={cell.id}
                    x={10 + cell.x * 45}
                    y={40 + cell.y * 40}
                    width={40}
                    height={35}
                    fill={getVisualizationColor(cell)}
                    opacity={viewMode === 'activity' ? getActivityOpacity(cell.activity) : 0.8}
                    stroke={cell.status === 'critical' ? '#EF4444' : cell.status === 'warning' ? '#F59E0B' : '#E5E7EB'}
                    strokeWidth={cell.status === 'normal' ? 1 : 2}
                    className="cursor-pointer hover:opacity-100 transition-opacity"
                    onClick={() => setSelectedCell(cell)}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: (cell.x + cell.y) * 0.01 }}
                    whileHover={{ scale: 1.1 }}
                  />
                ))}
                
                {/* Status indicators */}
                {heatmapData
                  .filter(cell => cell.status === 'critical' || cell.status === 'offline')
                  .map((cell) => (
                    <motion.circle
                      key={`indicator-${cell.id}`}
                      cx={30 + cell.x * 45}
                      cy={57 + cell.y * 40}
                      r="3"
                      fill={cell.status === 'critical' ? '#EF4444' : '#6B7280'}
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  ))}
              </svg>
              
              {/* Legend */}
              <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-lg border">
                <h4 className="font-semibold text-sm mb-2">Legend</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded"></div>
                    <span>Cool ({viewMode === 'temperature' ? '<25°C' : 'Low'})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span>Normal ({viewMode === 'temperature' ? '25-35°C' : 'Medium'})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                    <span>Warm ({viewMode === 'temperature' ? '35-45°C' : 'High'})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                    <span>Hot ({viewMode === 'temperature' ? '>45°C' : 'Very High'})</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Selected Cell Details */}
      {selectedCell && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Cell Details - {selectedCell.zone} Zone</span>
                <Badge variant={
                  selectedCell.status === 'critical' ? 'destructive' :
                  selectedCell.status === 'warning' ? 'secondary' :
                  'default'
                }>
                  {selectedCell.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-3 border rounded-lg">
                  <Thermometer className="h-5 w-5 mx-auto mb-2 text-orange-500" />
                  <div className="font-semibold">{selectedCell.temperature.toFixed(1)}°C</div>
                  <div className="text-xs text-muted-foreground">Temperature</div>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <Activity className="h-5 w-5 mx-auto mb-2 text-blue-500" />
                  <div className="font-semibold">{selectedCell.activity.toFixed(0)}%</div>
                  <div className="text-xs text-muted-foreground">Activity Level</div>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <Zap className="h-5 w-5 mx-auto mb-2 text-green-500" />
                  <div className="font-semibold">{selectedCell.efficiency.toFixed(0)}%</div>
                  <div className="text-xs text-muted-foreground">Efficiency</div>
                </div>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                Position: Row {selectedCell.y + 1}, Column {selectedCell.x + 1} | 
                Zone: {selectedCell.zone} | 
                Status: {selectedCell.status}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}