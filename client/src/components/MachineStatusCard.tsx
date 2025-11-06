import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Server } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Machine {
  id: string;
  machineName: string;
  status: string;
  uptime: number;
  lastMaintenance?: Date | null;
}

interface MachineStatusCardProps {
  machine?: Machine;
  machineName?: string;
  status?: string;
  uptime?: number;
}

export default function MachineStatusCard({ 
  machine, 
  machineName = machine?.machineName || "Unknown Machine", 
  status = machine?.status || "Unknown", 
  uptime = machine?.uptime || 0 
}: MachineStatusCardProps) {
  const { t, language } = useLanguage();
  
  const statusVariants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
    Running: "default",
    Maintenance: "secondary", 
    Idle: "outline",
    Error: "destructive",
  };

  const statusColors = {
    Running: "text-green-600",
    Maintenance: "text-amber-600",
    Idle: "text-muted-foreground", 
    Error: "text-red-600",
  };

  // Ensure all statuses are in English
  const getTranslatedStatus = (status: string) => {
    const statusMap: Record<string, string> = {
      "En fonctionnement": "Running",
      "Maintenance": "Maintenance", 
      "Arrêt": "Idle",
      "Idle": "Idle",
      "Erreur": "Error",
      "Error": "Error",
      "Running": "Running"
    };
    return statusMap[status] || status;
  };

  const translatedStatus = getTranslatedStatus(status);
  const safeMachineName = machineName || "Unknown Machine";
  const machineId = safeMachineName.toLowerCase().replace(/\s+/g, "-");

  return (
    <Card className="hover-elevate" data-testid={`card-machine-${machineId}`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <Server className={`h-5 w-5 ${statusColors[status as keyof typeof statusColors] || "text-muted-foreground"}`} />
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm truncate" data-testid={`text-machine-name-${machineId}`}>
              {safeMachineName}
            </h3>
          </div>
          <Badge variant={statusVariants[status] || "outline"} className="text-xs" data-testid={`badge-status-${machineId}`}>
            {translatedStatus}
          </Badge>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              {language === 'fr' ? 'Disponibilité' : 'Uptime'}
            </span>
            <span className="font-mono font-medium" data-testid={`text-uptime-${machineId}`}>
              {uptime}%
            </span>
          </div>
          <Progress value={uptime} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
}
