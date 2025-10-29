import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}

export function AnimatedCard({ children, className, delay = 0, hover = true }: AnimatedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { y: -5, transition: { duration: 0.2 } } : {}}
      className={cn("h-full", className)}
    >
      <Card className="h-full">
        {children}
      </Card>
    </motion.div>
  );
}

interface PulsingBadgeProps {
  children: React.ReactNode;
  variant?: "default" | "destructive" | "outline" | "secondary";
  pulse?: boolean;
}

export function PulsingBadge({ children, variant = "default", pulse = true }: PulsingBadgeProps) {
  return (
    <motion.div
      animate={pulse ? { scale: [1, 1.05, 1] } : {}}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <Badge variant={variant}>{children}</Badge>
    </motion.div>
  );
}

interface CounterAnimationProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function CounterAnimation({ 
  value, 
  duration = 1, 
  suffix = "", 
  prefix = "", 
  className 
}: CounterAnimationProps) {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (count < value) {
        setCount(Math.min(count + Math.ceil(value / (duration * 60)), value));
      }
    }, 16);

    return () => clearTimeout(timer);
  }, [count, value, duration]);

  return (
    <span className={className}>
      {prefix}{count.toLocaleString('fr-FR')}{suffix}
    </span>
  );
}

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  showAnimation?: boolean;
  color?: string;
}

export function AnimatedProgressBar({ 
  value, 
  max = 100, 
  className, 
  showAnimation = true,
  color = "bg-blue-600"
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={cn("w-full bg-gray-200 rounded-full h-2", className)}>
      <motion.div
        className={cn("h-2 rounded-full", color)}
        initial={{ width: 0 }}
        animate={{ width: showAnimation ? `${percentage}%` : `${percentage}%` }}
        transition={{ duration: showAnimation ? 1.5 : 0, ease: "easeOut" }}
      />
    </div>
  );
}

interface StatusIndicatorProps {
  status: "running" | "warning" | "maintenance" | "stopped";
  size?: "sm" | "md" | "lg";
  animate?: boolean;
}

export function StatusIndicator({ status, size = "md", animate = true }: StatusIndicatorProps) {
  const sizeClasses = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4"
  };

  const statusConfig = {
    running: { color: "bg-green-500", pulse: true },
    warning: { color: "bg-orange-500", pulse: true },
    maintenance: { color: "bg-blue-500", pulse: false },
    stopped: { color: "bg-red-500", pulse: false }
  };

  const config = statusConfig[status];

  return (
    <motion.div
      className={cn(
        "rounded-full",
        sizeClasses[size],
        config.color
      )}
      animate={animate && config.pulse ? { 
        scale: [1, 1.2, 1],
        opacity: [1, 0.8, 1]
      } : {}}
      transition={{ 
        duration: 2, 
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
}

interface NotificationToastProps {
  message: string;
  type: "success" | "warning" | "error" | "info";
  onClose?: () => void;
}

export function NotificationToast({ message, type, onClose }: NotificationToastProps) {
  const typeConfig = {
    success: { color: "bg-green-500", icon: "✓" },
    warning: { color: "bg-orange-500", icon: "⚠" },
    error: { color: "bg-red-500", icon: "✕" },
    info: { color: "bg-blue-500", icon: "i" }
  };

  const config = typeConfig[type];

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      className="fixed top-4 right-4 z-50 flex items-center gap-3 bg-white border rounded-lg shadow-lg p-4 min-w-[300px]"
    >
      <div className={cn("w-2 h-2 rounded-full", config.color)} />
      <span className="flex-1 text-sm">{message}</span>
      {onClose && (
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-lg"
        >
          ×
        </button>
      )}
    </motion.div>
  );
}

interface RealTimeValueProps {
  value: number;
  previousValue?: number;
  format?: (value: number) => string;
  className?: string;
}

export function RealTimeValue({ 
  value, 
  previousValue, 
  format = (v) => v.toString(),
  className 
}: RealTimeValueProps) {
  const hasChanged = previousValue !== undefined && value !== previousValue;
  const isIncrease = hasChanged && value > previousValue;

  return (
    <motion.span
      className={className}
      animate={hasChanged ? {
        scale: [1, 1.1, 1],
        color: isIncrease ? ["currentColor", "#22c55e", "currentColor"] : ["currentColor", "#ef4444", "currentColor"]
      } : {}}
      transition={{ duration: 0.6 }}
    >
      {format(value)}
    </motion.span>
  );
}

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: string;
}

export function LoadingSpinner({ size = "md", color = "text-blue-600" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8"
  };

  return (
    <motion.div
      className={cn(
        "border-2 border-t-transparent border-current rounded-full",
        sizeClasses[size],
        color
      )}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );
}