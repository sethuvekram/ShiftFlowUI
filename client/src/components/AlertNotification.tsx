import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { AlertTriangle, Info, XCircle } from "lucide-react";

interface Alert {
  id: string;
  message: string;
  severity: string;
  timestamp: Date;
  resolved?: boolean;
}

interface AlertNotificationProps {
  alert?: Alert;
  message?: string;
  severity?: string;
  timestamp?: Date;
}

export default function AlertNotification({ 
  alert, 
  message = alert?.message || "No message", 
  severity = alert?.severity || "Info", 
  timestamp = alert?.timestamp || new Date() 
}: AlertNotificationProps) {
  const severityConfig = {
    Critical: { icon: XCircle, color: "text-red-600", variant: "destructive" as const },
    Warning: { icon: AlertTriangle, color: "text-amber-600", variant: "default" as const },
    Info: { icon: Info, color: "text-primary", variant: "secondary" as const },
  };

  const config = severityConfig[severity as keyof typeof severityConfig] || severityConfig.Info;
  const Icon = config.icon;

  return (
    <div className="flex items-start gap-3 p-3 rounded-md border hover-elevate" data-testid={`alert-${severity.toLowerCase()}`}>
      <Icon className={`h-5 w-5 mt-0.5 ${config.color}`} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium mb-1" data-testid="text-alert-message">
          {message}
        </p>
        <p className="text-xs text-muted-foreground font-mono" data-testid="text-alert-timestamp">
          {format(timestamp, "MMM dd, HH:mm")}
        </p>
      </div>
      <Badge variant={config.variant} className="text-xs shrink-0" data-testid="badge-severity">
        {severity}
      </Badge>
    </div>
  );
}
