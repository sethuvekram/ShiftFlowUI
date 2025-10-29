import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { motion } from 'framer-motion';
import { 
  Server, 
  CheckCircle, 
  AlertTriangle, 
  Wrench, 
  Clock,
  Activity,
  Thermometer,
  Zap
} from 'lucide-react';

interface MachineNode {
  id: string;
  name: string;
  position: { x: number; y: number };
  status: 'running' | 'idle' | 'maintenance' | 'error';
  efficiency: number;
  temperature: number;
}

const machines: MachineNode[] = [
  { id: 'press-1', name: 'Press Line 1', position: { x: 10, y: 40 }, status: 'running', efficiency: 92, temperature: 65 },
  { id: 'press-2', name: 'Press Line 2', position: { x: 10, y: 80 }, status: 'running', efficiency: 88, temperature: 72 },
  { id: 'weld-1', name: 'Weld Station 1', position: { x: 30, y: 40 }, status: 'maintenance', efficiency: 0, temperature: 45 },
  { id: 'weld-2', name: 'Weld Station 2', position: { x: 30, y: 80 }, status: 'running', efficiency: 95, temperature: 68 },
  { id: 'paint-1', name: 'Paint Booth 1', position: { x: 50, y: 40 }, status: 'running', efficiency: 87, temperature: 55 },
  { id: 'assembly-1', name: 'Assembly Line 1', position: { x: 70, y: 60 }, status: 'idle', efficiency: 0, temperature: 38 },
];

const statusColors = {
  running: 'bg-green-500 border-green-400',
  idle: 'bg-yellow-500 border-yellow-400',
  maintenance: 'bg-blue-500 border-blue-400',
  error: 'bg-red-500 border-red-400'
};

const statusIcons = {
  running: <CheckCircle className="h-4 w-4 text-white" />,
  idle: <Clock className="h-4 w-4 text-white" />,
  maintenance: <Wrench className="h-4 w-4 text-white" />,
  error: <AlertTriangle className="h-4 w-4 text-white" />
};

export function Advanced3DMonitor() {
  const [selectedMachine, setSelectedMachine] = useState<MachineNode | null>(null);
  const [animationFrame, setAnimationFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationFrame(prev => prev + 1);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              Advanced Production Monitor
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="relative bg-gradient-to-br from-slate-800 to-slate-700 rounded-lg p-8 min-h-[400px] overflow-hidden">
              {/* Factory Floor Grid */}
              <svg className="absolute inset-0 w-full h-full opacity-20">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#64748b" strokeWidth="1"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>

              {/* Production Flow Lines */}
              <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
                {machines.slice(0, -1).map((machine, index) => {
                  const nextMachine = machines[index + 1];
                  if (!nextMachine) return null;
                  
                  const startX = machine.position.x + 8;
                  const startY = machine.position.y + 4;
                  const endX = nextMachine.position.x;
                  const endY = nextMachine.position.y + 4;
                  
                  return (
                    <g key={`flow-${machine.id}`}>
                      <line
                        x1={`${startX}%`}
                        y1={`${startY}%`}
                        x2={`${endX}%`}
                        y2={`${endY}%`}
                        stroke="#3b82f6"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        opacity="0.6"
                      />
                      {/* Animated flow particles */}
                      <motion.circle
                        cx={`${startX + (endX - startX) * ((animationFrame % 50) / 50)}%`}
                        cy={`${startY + (endY - startY) * ((animationFrame % 50) / 50)}%`}
                        r="3"
                        fill="#60a5fa"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Machine Nodes */}
              {machines.map((machine, index) => (
                <motion.div
                  key={machine.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="absolute cursor-pointer"
                  style={{ 
                    left: `${machine.position.x}%`, 
                    top: `${machine.position.y}%`,
                    zIndex: 10
                  }}
                  onClick={() => setSelectedMachine(selectedMachine?.id === machine.id ? null : machine)}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative bg-white rounded-xl shadow-lg border-4 ${statusColors[machine.status]} p-4 w-32 backdrop-blur-sm`}
                  >
                    {/* Status indicator */}
                    <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full ${statusColors[machine.status]} flex items-center justify-center shadow-lg`}>
                      {statusIcons[machine.status]}
                    </div>
                    
                    {/* Efficiency indicator */}
                    {machine.efficiency > 0 && (
                      <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center font-bold shadow-lg">
                        {machine.efficiency}%
                      </div>
                    )}

                    <div className="text-center">
                      <Server className="h-6 w-6 mx-auto mb-2 text-slate-600" />
                      <h4 className="font-semibold text-xs mb-2 text-slate-800">{machine.name}</h4>
                      
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between items-center">
                          <Thermometer className="h-3 w-3 text-orange-500" />
                          <span className="font-mono text-slate-600">{machine.temperature}°C</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <Activity className="h-3 w-3 text-blue-500" />
                          <span className="font-mono text-slate-600">{machine.efficiency}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Pulse animation for active machines */}
                    {machine.status === 'running' && (
                      <motion.div
                        className="absolute inset-0 rounded-xl bg-green-400 opacity-20"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </motion.div>

                  {/* Expanded details */}
                  {selectedMachine?.id === machine.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-xl border p-4 w-56 z-20"
                    >
                      <h5 className="font-semibold mb-3 text-slate-800">{machine.name} Details</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-600">Status:</span>
                          <Badge variant={machine.status === 'running' ? 'default' : 'secondary'}>
                            {machine.status}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Efficiency:</span>
                          <span className="font-medium">{machine.efficiency}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Temperature:</span>
                          <span className="font-medium">{machine.temperature}°C</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Uptime:</span>
                          <span className="font-medium">8h 45m</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Next maintenance:</span>
                          <span className="font-medium">2h 15m</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}

              {/* Zone Labels */}
              <div className="absolute bottom-4 left-4 right-4 bg-black bg-opacity-60 rounded-lg p-3 text-white">
                <div className="grid grid-cols-3 gap-4 text-xs">
                  <div>
                    <div className="font-semibold text-blue-400">Stamping Zone</div>
                    <div>Press Lines 1-2</div>
                  </div>
                  <div>
                    <div className="font-semibold text-green-400">Welding Zone</div>
                    <div>Weld Stations 1-2</div>
                  </div>
                  <div>
                    <div className="font-semibold text-purple-400">Assembly Zone</div>
                    <div>Paint & Assembly</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Machine Status Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {machines.map((machine, index) => (
          <motion.div
            key={machine.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer bg-gradient-to-br from-white to-gray-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-sm">{machine.name}</h3>
                  <Badge 
                    variant={machine.status === 'running' ? 'default' : machine.status === 'error' ? 'destructive' : 'secondary'}
                    className="capitalize"
                  >
                    {machine.status}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Zap className="h-3 w-3" />
                      Efficiency
                    </span>
                    <span className="text-sm font-mono font-bold">{machine.efficiency}%</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-green-500"
                      style={{ width: `${machine.efficiency}%` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${machine.efficiency}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Thermometer className="h-3 w-3" />
                      Temperature
                    </span>
                    <span className="text-sm font-mono">{machine.temperature}°C</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}