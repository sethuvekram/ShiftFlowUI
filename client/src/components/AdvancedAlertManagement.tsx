import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  CheckCircle, 
  Clock,
  Filter,
  Search,
  Bell,
  X,
  Eye,
  Archive,
  Settings
} from 'lucide-react';

interface Alert {
  id: string;
  title: string;
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  category: 'safety' | 'quality' | 'production' | 'maintenance' | 'system';
  timestamp: Date;
  source: string;
  status: 'active' | 'acknowledged' | 'resolved';
  assignee?: string;
  estimatedResolution?: string;
}

const mockAlerts: Alert[] = [
  {
    id: 'alert-1',
    title: 'Emergency Stop Activated - Line 2',
    description: 'Safety system triggered emergency stop on production line 2. Immediate investigation required.',
    priority: 'critical',
    category: 'safety',
    timestamp: new Date(Date.now() - 300000), // 5 minutes ago
    source: 'Safety System',
    status: 'active',
    assignee: 'Safety Team',
    estimatedResolution: '15 minutes'
  },
  {
    id: 'alert-2',
    title: 'Quality Deviation Detected',
    description: 'Paint thickness measurements outside tolerance in Booth 3. 12 units affected.',
    priority: 'high',
    category: 'quality',
    timestamp: new Date(Date.now() - 900000), // 15 minutes ago
    source: 'QC Station 3',
    status: 'acknowledged',
    assignee: 'Quality Inspector',
    estimatedResolution: '30 minutes'
  },
  {
    id: 'alert-3',
    title: 'Conveyor Belt Speed Anomaly',
    description: 'Assembly line conveyor operating 5% below optimal speed. Performance impact expected.',
    priority: 'medium',
    category: 'production',
    timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
    source: 'Assembly Line 1',
    status: 'active',
    estimatedResolution: '1 hour'
  },
  {
    id: 'alert-4',
    title: 'Scheduled Maintenance Due',
    description: 'Robot arm #7 requires scheduled maintenance within next 2 hours.',
    priority: 'medium',
    category: 'maintenance',
    timestamp: new Date(Date.now() - 3600000), // 1 hour ago
    source: 'CMMS',
    status: 'active',
    assignee: 'Maintenance Team',
    estimatedResolution: '2 hours'
  },
  {
    id: 'alert-5',
    title: 'Network Latency High',
    description: 'Increased network latency detected between shop floor systems.',
    priority: 'low',
    category: 'system',
    timestamp: new Date(Date.now() - 7200000), // 2 hours ago
    source: 'IT Monitor',
    status: 'resolved'
  }
];

const priorityConfig = {
  critical: {
    icon: <AlertTriangle className="h-4 w-4" />,
    color: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-200',
    badge: 'bg-red-600 text-white'
  },
  high: {
    icon: <AlertCircle className="h-4 w-4" />,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    badge: 'bg-orange-600 text-white'
  },
  medium: {
    icon: <Info className="h-4 w-4" />,
    color: 'text-yellow-600',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    badge: 'bg-yellow-600 text-white'
  },
  low: {
    icon: <CheckCircle className="h-4 w-4" />,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    badge: 'bg-blue-600 text-white'
  }
};

const categoryColors = {
  safety: 'bg-red-100 text-red-800',
  quality: 'bg-blue-100 text-blue-800',
  production: 'bg-green-100 text-green-800',
  maintenance: 'bg-yellow-100 text-yellow-800',
  system: 'bg-purple-100 text-purple-800'
};

const statusColors = {
  active: 'bg-red-100 text-red-800',
  acknowledged: 'bg-yellow-100 text-yellow-800',
  resolved: 'bg-green-100 text-green-800'
};

export function AdvancedAlertManagement() {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);
  const [newAlertsCount, setNewAlertsCount] = useState(0);

  useEffect(() => {
    // Simulate new alerts
    const interval = setInterval(() => {
      setNewAlertsCount(prev => prev + 1);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const filteredAlerts = alerts.filter(alert => {
    const matchesFilter = filter === 'all' || alert.status === filter || alert.priority === filter || alert.category === filter;
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleAcknowledge = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, status: 'acknowledged' as const } : alert
    ));
  };

  const handleResolve = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, status: 'resolved' as const } : alert
    ));
  };

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) return `${hours}h ago`;
    return `${minutes}m ago`;
  };

  const activeAlerts = alerts.filter(a => a.status === 'active').length;
  const criticalAlerts = alerts.filter(a => a.priority === 'critical' && a.status === 'active').length;

  return (
    <div className="space-y-6">
      {/* Header with metrics */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-3">
            Advanced Alert Management
            {newAlertsCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-2 px-3 py-1 bg-red-500 text-white rounded-full text-sm"
              >
                <Bell className="h-4 w-4" />
                {newAlertsCount} new
              </motion.div>
            )}
          </h2>
          <p className="text-muted-foreground">Real-time monitoring and alert management for Renault Digital Factory</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-2 bg-red-50 text-red-700 rounded-lg border border-red-200">
            <AlertTriangle className="h-4 w-4" />
            <span className="font-semibold">{criticalAlerts}</span>
            <span className="text-sm">Critical</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg border border-blue-200">
            <AlertCircle className="h-4 w-4" />
            <span className="font-semibold">{activeAlerts}</span>
            <span className="text-sm">Active</span>
          </div>
        </div>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-col lg:flex-row gap-4"
      >
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search alerts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex gap-2 flex-wrap">
          {['all', 'active', 'critical', 'safety', 'quality', 'production'].map((filterOption) => (
            <Button
              key={filterOption}
              variant={filter === filterOption ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(filterOption)}
              className="capitalize"
            >
              {filterOption}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Alerts List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredAlerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                alert.priority === 'critical' ? 'border-l-4 border-l-red-500' :
                alert.priority === 'high' ? 'border-l-4 border-l-orange-500' :
                'border-l-4 border-l-gray-300'
              } ${selectedAlert === alert.id ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => setSelectedAlert(selectedAlert === alert.id ? null : alert.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`p-2 rounded-lg ${priorityConfig[alert.priority].bg} ${priorityConfig[alert.priority].color}`}>
                        {priorityConfig[alert.priority].icon}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold truncate">{alert.title}</h3>
                          <Badge className={priorityConfig[alert.priority].badge}>
                            {alert.priority}
                          </Badge>
                          <Badge variant="outline" className={categoryColors[alert.category]}>
                            {alert.category}
                          </Badge>
                          <Badge variant="outline" className={statusColors[alert.status]}>
                            {alert.status}
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                          {alert.description}
                        </p>
                        
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {getTimeAgo(alert.timestamp)}
                          </span>
                          <span>Source: {alert.source}</span>
                          {alert.assignee && (
                            <span>Assigned: {alert.assignee}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Action buttons */}
                    <div className="flex items-center gap-2">
                      {alert.status === 'active' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAcknowledge(alert.id);
                          }}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Acknowledge
                        </Button>
                      )}
                      
                      {alert.status !== 'resolved' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleResolve(alert.id);
                          }}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Resolve
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Expanded details */}
                  <AnimatePresence>
                    {selectedAlert === alert.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t space-y-3"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-muted-foreground">Priority Level</span>
                            <div className="flex items-center gap-2 mt-1">
                              {priorityConfig[alert.priority].icon}
                              <span className="capitalize font-medium">{alert.priority}</span>
                            </div>
                          </div>
                          
                          <div>
                            <span className="font-medium text-muted-foreground">Category</span>
                            <div className="mt-1 capitalize font-medium">{alert.category}</div>
                          </div>
                          
                          <div>
                            <span className="font-medium text-muted-foreground">Current Status</span>
                            <div className="mt-1 capitalize font-medium">{alert.status}</div>
                          </div>
                          
                          {alert.estimatedResolution && (
                            <div>
                              <span className="font-medium text-muted-foreground">Est. Resolution</span>
                              <div className="mt-1 font-medium">{alert.estimatedResolution}</div>
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <span className="font-medium text-muted-foreground">Full Description</span>
                          <p className="mt-1 text-sm">{alert.description}</p>
                        </div>
                        
                        <div className="flex items-center gap-2 pt-2">
                          <Button size="sm" variant="outline">
                            <Settings className="h-4 w-4 mr-1" />
                            Configure
                          </Button>
                          <Button size="sm" variant="outline">
                            <Archive className="h-4 w-4 mr-1" />
                            Archive
                          </Button>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredAlerts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No alerts found</h3>
          <p className="text-muted-foreground">
            {searchTerm || filter !== 'all' 
              ? 'Try adjusting your filters or search terms' 
              : 'All systems running smoothly!'
            }
          </p>
        </motion.div>
      )}
    </div>
  );
}