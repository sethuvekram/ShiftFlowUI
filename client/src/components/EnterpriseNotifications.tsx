import React, { createContext, useContext, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Bell, AlertTriangle, CheckCircle, Info, X, Volume2, VolumeX,
  Clock, Factory, Shield, TrendingUp, Zap
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export interface EnterpriseNotification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info' | 'critical';
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: 'production' | 'safety' | 'quality' | 'maintenance' | 'system';
  timestamp: Date;
  acknowledged: boolean;
  assignedTo?: string;
  source: string;
  actions?: Array<{
    label: string;
    action: () => void;
    variant?: 'default' | 'destructive' | 'outline';
  }>;
  metadata?: Record<string, any>;
  soundAlert?: boolean;
  autoExpire?: number; // seconds
}

interface NotificationContextType {
  notifications: EnterpriseNotification[];
  addNotification: (notification: Omit<EnterpriseNotification, 'id' | 'timestamp' | 'acknowledged'>) => void;
  acknowledgeNotification: (id: string) => void;
  dismissNotification: (id: string) => void;
  clearAllNotifications: () => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  unreadCount: number;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

// Sound utility for enterprise alerts
class NotificationSound {
  private audioContext: AudioContext | null = null;
  
  constructor() {
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  playAlert(type: EnterpriseNotification['type']) {
    if (!this.audioContext) return;

    const frequencies = {
      success: [523, 659, 784], // C, E, G (major chord)
      info: [440, 554], // A, C# (simple notification)
      warning: [466, 554, 622], // A#, C#, D# (tension)
      error: [311, 370, 466], // D#, F#, A# (alarm)
      critical: [277, 311, 370, 466] // Urgent alarm sequence
    };

    const sequence = frequencies[type] || frequencies.info;
    
    sequence.forEach((frequency, index) => {
      setTimeout(() => {
        this.playTone(frequency, 0.2);
      }, index * 150);
    });
  }

  private playTone(frequency: number, duration: number) {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }
}

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<EnterpriseNotification[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [soundManager] = useState(() => new NotificationSound());

  const addNotification = (notification: Omit<EnterpriseNotification, 'id' | 'timestamp' | 'acknowledged'>) => {
    const newNotification: EnterpriseNotification = {
      ...notification,
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      acknowledged: false,
    };

    setNotifications(prev => [newNotification, ...prev]);

    // Play sound for high priority or critical notifications
    if (soundEnabled && (notification.priority === 'high' || notification.priority === 'critical' || notification.soundAlert)) {
      soundManager.playAlert(notification.type);
    }

    // Auto-expire if specified
    if (notification.autoExpire) {
      setTimeout(() => {
        dismissNotification(newNotification.id);
      }, notification.autoExpire * 1000);
    }

    // Auto-acknowledge success notifications after 5 seconds
    if (notification.type === 'success' && notification.priority === 'low') {
      setTimeout(() => {
        acknowledgeNotification(newNotification.id);
      }, 5000);
    }
  };

  const acknowledgeNotification = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, acknowledged: true } : notif
      )
    );
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.acknowledged).length;

  // Simulate real-time enterprise notifications
  useEffect(() => {
    const intervals: NodeJS.Timeout[] = [];

    // Production alerts every 2-5 minutes
    intervals.push(setInterval(() => {
      const productionAlerts = [
        {
          title: "Production target achieved",
          message: "Clio V Line: 850/850 vehicles produced ✓",
          type: 'success' as const,
          priority: 'medium' as const,
          category: 'production' as const,
          source: "Production System",
          autoExpire: 10
        },
        {
          title: "Production rate slowdown detected",
          message: "Robot R-580: Rate reduced to 45 veh/h (target: 50)",
          type: 'warning' as const,
          priority: 'high' as const,
          category: 'production' as const,
          source: "Automatic Monitoring",
          soundAlert: true,
          actions: [
            { label: "View details", action: () => console.log("View details") },
            { label: "Escalate", action: () => console.log("Escalate"), variant: 'destructive' as const }
          ]
        }
      ];

      const alert = productionAlerts[Math.floor(Math.random() * productionAlerts.length)];
      addNotification(alert);
    }, 120000 + Math.random() * 180000)); // 2-5 minutes

    // Quality alerts
    intervals.push(setInterval(() => {
      const qualityAlerts = [
        {
          title: "Quality control required",
          message: "Batch #QC-2025-1028: Sampling required on Megane line",
          type: 'info' as const,
          priority: 'medium' as const,
          category: 'quality' as const,
          source: "Quality System",
          assignedTo: "Marie Laurent"
        },
        {
          title: "Dimensional deviation detected",
          message: "3 parts out of tolerance - Line stop recommended",
          type: 'error' as const,
          priority: 'critical' as const,
          category: 'quality' as const,
          source: "Automatic 3D Control",
          soundAlert: true
        }
      ];

      const alert = qualityAlerts[Math.floor(Math.random() * qualityAlerts.length)];
      addNotification(alert);
    }, 300000 + Math.random() * 300000)); // 5-10 minutes

    // Safety reminders
    intervals.push(setInterval(() => {
      addNotification({
        title: "Scheduled safety inspection",
        message: "PPE and emergency systems control - Assembly area",
        type: 'info',
        priority: 'high',
        category: 'safety',
        source: "Safety System",
        assignedTo: "Pierre Dupont"
      });
    }, 600000)); // 10 minutes

    return () => {
      intervals.forEach(clearInterval);
    };
  }, [soundEnabled]);

  return (
    <NotificationContext.Provider value={{
      notifications,
      addNotification,
      acknowledgeNotification,
      dismissNotification,
      clearAllNotifications,
      soundEnabled,
      setSoundEnabled,
      unreadCount
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

// Enterprise Notification Center Component
export const NotificationCenter: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ 
  isOpen, 
  onClose 
}) => {
  const { 
    notifications, 
    acknowledgeNotification, 
    dismissNotification, 
    clearAllNotifications,
    soundEnabled,
    setSoundEnabled 
  } = useNotifications();

  const getNotificationIcon = (type: EnterpriseNotification['type']) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-orange-600" />;
      case 'error': return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'critical': return <AlertTriangle className="h-5 w-5 text-red-700" />;
      default: return <Info className="h-5 w-5 text-blue-600" />;
    }
  };

  const getCategoryIcon = (category: EnterpriseNotification['category']) => {
    switch (category) {
      case 'production': return <Factory className="h-4 w-4" />;
      case 'safety': return <Shield className="h-4 w-4" />;
      case 'quality': return <CheckCircle className="h-4 w-4" />;
      case 'maintenance': return <Zap className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-end p-4">
      <motion.div
        initial={{ x: 400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 400, opacity: 0 }}
        className="bg-white rounded-lg shadow-2xl w-full max-w-md h-[80vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold">Notification Center</h2>
            {notifications.filter(n => !n.acknowledged).length > 0 && (
              <Badge variant="destructive">
                {notifications.filter(n => !n.acknowledged).length}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSoundEnabled(!soundEnabled)}
            >
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Controls */}
        {notifications.length > 0 && (
          <div className="p-3 border-b bg-gray-50">
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllNotifications}
              className="w-full"
            >
              Clear all notifications
            </Button>
          </div>
        )}

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence>
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <Bell className="h-12 w-12 mb-4 text-gray-300" />
                <p className="text-sm">No notifications</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  className={`p-4 border-b hover:bg-gray-50 transition-colors ${
                    !notification.acknowledged ? 'bg-blue-50/50 border-l-4 border-l-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-medium truncate">
                          {notification.title}
                        </h4>
                        <Badge variant="outline" className="text-xs">
                          {getCategoryIcon(notification.category)}
                          <span className="ml-1 capitalize">{notification.category}</span>
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-2">
                        {notification.message}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          {format(notification.timestamp, 'HH:mm', { locale: fr })}
                          <span>•</span>
                          <span>{notification.source}</span>
                        </div>
                        <Badge 
                          variant={notification.priority === 'critical' ? 'destructive' : 'outline'}
                          className="text-xs"
                        >
                          {notification.priority}
                        </Badge>
                      </div>

                      {notification.assignedTo && (
                        <div className="mt-1 text-xs text-blue-600">
                          Assigned to: {notification.assignedTo}
                        </div>
                      )}

                      {notification.actions && notification.actions.length > 0 && (
                        <div className="flex gap-2 mt-3">
                          {notification.actions.map((action, index) => (
                            <Button
                              key={index}
                              variant={action.variant || 'outline'}
                              size="sm"
                              onClick={action.action}
                              className="text-xs"
                            >
                              {action.label}
                            </Button>
                          ))}
                        </div>
                      )}

                      <div className="flex gap-2 mt-3">
                        {!notification.acknowledged && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => acknowledgeNotification(notification.id)}
                            className="text-xs"
                          >
                            Acknowledge
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => dismissNotification(notification.id)}
                          className="text-xs"
                        >
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

// Real-time notification toast
export const NotificationToast: React.FC = () => {
  const { notifications } = useNotifications();
  const [visibleToasts, setVisibleToasts] = useState<EnterpriseNotification[]>([]);

  useEffect(() => {
    const recentNotifications = notifications
      .filter(n => !n.acknowledged && n.priority === 'critical')
      .slice(0, 3);

    setVisibleToasts(recentNotifications);

    // Auto-hide after 10 seconds
    const timeout = setTimeout(() => {
      setVisibleToasts([]);
    }, 10000);

    return () => clearTimeout(timeout);
  }, [notifications]);

  return (
    <div className="fixed top-4 right-4 z-40 space-y-2">
      <AnimatePresence>
        {visibleToasts.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            className="bg-white border border-red-200 rounded-lg shadow-lg p-4 max-w-sm"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm font-medium text-red-900">
                  {notification.title}
                </h4>
                <p className="text-sm text-red-700 mt-1">
                  {notification.message}
                </p>
                <div className="text-xs text-red-600 mt-2">
                  {notification.source} • {format(notification.timestamp, 'HH:mm')}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};