import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock,
  Wrench
} from 'lucide-react';

interface ProductionStep {
  id: string;
  name: string;
  position: { x: number; y: number };
  status: 'active' | 'idle' | 'maintenance' | 'error';
  throughput: number;
  efficiency: number;
  queue: number;
}

interface Vehicle {
  id: string;
  model: string;
  stage: string;
  progress: number;
  color: string;
}

const productionSteps: ProductionStep[] = [
  { id: 'stamping', name: 'Stamping', position: { x: 50, y: 200 }, status: 'active', throughput: 45, efficiency: 92, queue: 3 },
  { id: 'welding', name: 'Body Welding', position: { x: 200, y: 200 }, status: 'active', throughput: 42, efficiency: 88, queue: 5 },
  { id: 'painting', name: 'Paint Shop', position: { x: 350, y: 200 }, status: 'maintenance', throughput: 0, efficiency: 0, queue: 12 },
  { id: 'assembly', name: 'Final Assembly', position: { x: 500, y: 200 }, status: 'active', throughput: 38, efficiency: 85, queue: 8 },
  { id: 'quality', name: 'Quality Check', position: { x: 650, y: 200 }, status: 'active', throughput: 40, efficiency: 96, queue: 2 },
  { id: 'shipping', name: 'Shipping', position: { x: 800, y: 200 }, status: 'idle', throughput: 35, efficiency: 78, queue: 15 }
];

const vehicles: Vehicle[] = [
  { id: 'v1', model: 'Clio', stage: 'welding', progress: 65, color: '#3B82F6' },
  { id: 'v2', model: 'Megane', stage: 'assembly', progress: 30, color: '#EF4444' },
  { id: 'v3', model: 'Scenic', stage: 'quality', progress: 85, color: '#10B981' },
  { id: 'v4', model: 'Kadjar', stage: 'stamping', progress: 20, color: '#F59E0B' },
  { id: 'v5', model: 'Captur', stage: 'shipping', progress: 95, color: '#8B5CF6' }
];

const statusColors = {
  active: { bg: 'bg-green-500', border: 'border-green-400', pulse: 'bg-green-400' },
  idle: { bg: 'bg-yellow-500', border: 'border-yellow-400', pulse: 'bg-yellow-400' },
  maintenance: { bg: 'bg-blue-500', border: 'border-blue-400', pulse: 'bg-blue-400' },
  error: { bg: 'bg-red-500', border: 'border-red-400', pulse: 'bg-red-400' }
};

const statusIcons = {
  active: <CheckCircle className="h-4 w-4 text-white" />,
  idle: <Clock className="h-4 w-4 text-white" />,
  maintenance: <Wrench className="h-4 w-4 text-white" />,
  error: <AlertTriangle className="h-4 w-4 text-white" />
};

export function ProductionLineVisualizer() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedStep, setSelectedStep] = useState<string | null>(null);
  const [flowAnimation, setFlowAnimation] = useState(0);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setFlowAnimation(prev => (prev + 1) % 100);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  const getConnectionPath = (start: ProductionStep, end: ProductionStep) => {
    const startX = start.position.x + 40;
    const startY = start.position.y + 20;
    const endX = end.position.x;
    const endY = end.position.y + 20;
    
    return `M ${startX} ${startY} L ${endX} ${endY}`;
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className="text-2xl font-bold">Production Line Monitor</h2>
          <p className="text-muted-foreground">Real-time visualization of Renault manufacturing flow</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant={isPlaying ? "default" : "outline"}
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Configure
          </Button>
        </div>
      </motion.div>

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
            Production Flow Visualization
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-8 min-h-[400px] overflow-hidden">
            {/* SVG for connections */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              {productionSteps.slice(0, -1).map((step, index) => {
                const nextStep = productionSteps[index + 1];
                return (
                  <g key={`connection-${step.id}`}>
                    {/* Connection line */}
                    <path
                      d={getConnectionPath(step, nextStep)}
                      stroke="#cbd5e1"
                      strokeWidth="3"
                      fill="none"
                    />
                    
                    {/* Animated flow particles */}
                    {isPlaying && (
                      <motion.circle
                        cx={step.position.x + 40 + (nextStep.position.x - step.position.x - 40) * (flowAnimation % 50) / 50}
                        cy={step.position.y + 20}
                        r="4"
                        fill="#3b82f6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                      />
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Production steps */}
            {productionSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="absolute cursor-pointer"
                style={{ 
                  left: step.position.x, 
                  top: step.position.y,
                  zIndex: 2
                }}
                onClick={() => setSelectedStep(selectedStep === step.id ? null : step.id)}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative bg-white rounded-lg shadow-lg border-2 ${statusColors[step.status].border} p-4 w-32`}
                >
                  {/* Status indicator */}
                  <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full ${statusColors[step.status].bg} flex items-center justify-center`}>
                    {statusIcons[step.status]}
                  </div>
                  
                  {/* Queue indicator */}
                  {step.queue > 0 && (
                    <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">
                      {step.queue}
                    </div>
                  )}

                  <div className="text-center">
                    <h4 className="font-semibold text-xs mb-1">{step.name}</h4>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>{step.throughput}/h</div>
                      <div className={`font-medium ${step.efficiency > 90 ? 'text-green-600' : step.efficiency > 75 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {step.efficiency}%
                      </div>
                    </div>
                  </div>

                  {/* Pulse animation for active stations */}
                  {step.status === 'active' && isPlaying && (
                    <motion.div
                      className={`absolute inset-0 rounded-lg ${statusColors[step.status].pulse} opacity-20`}
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.div>

                {/* Expanded details */}
                <AnimatePresence>
                  {selectedStep === step.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl border p-3 w-48 z-10"
                    >
                      <h5 className="font-semibold mb-2">{step.name} Details</h5>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span>Status:</span>
                          <Badge variant={step.status === 'active' ? 'default' : 'secondary'}>
                            {step.status}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Throughput:</span>
                          <span className="font-medium">{step.throughput} units/h</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Efficiency:</span>
                          <span className="font-medium">{step.efficiency}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Queue:</span>
                          <span className="font-medium">{step.queue} units</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Next maintenance:</span>
                          <span className="font-medium">2h 15m</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}

            {/* Vehicle tracking */}
            <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg p-4 shadow-lg" style={{ zIndex: 3 }}>
              <h4 className="font-semibold mb-3 text-sm">Vehicles in Production</h4>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {vehicles.map((vehicle) => (
                  <motion.div
                    key={vehicle.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 p-2 rounded border"
                  >
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: vehicle.color }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium truncate">{vehicle.model}</div>
                      <div className="text-xs text-muted-foreground">{vehicle.stage}</div>
                      <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                        <motion.div
                          className="h-1 rounded-full"
                          style={{ backgroundColor: vehicle.color, width: `${vehicle.progress}%` }}
                          initial={{ width: 0 }}
                          animate={{ width: `${vehicle.progress}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}