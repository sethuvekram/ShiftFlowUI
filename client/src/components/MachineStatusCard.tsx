import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Server } from "lucide-react";

interface MachineStatusCardProps {
  machineName: string;
  status: string;
  uptime: number;
}

export default function MachineStatusCard({ machineName, status, uptime }: MachineStatusCardProps) {
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

  return (
    <Card className="hover-elevate" data-testid={`card-machine-${machineName.toLowerCase().replace(/\s+/g, "-")}`}>
      <CardContent className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <Server className={`h-5 w-5 ${statusColors[status as keyof typeof statusColors] || "text-muted-foreground"}`} />
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-sm truncate" data-testid={`text-machine-name-${machineName.toLowerCase().replace(/\s+/g, "-")}`}>
              {machineName}
            </h3>
          </div>
          <Badge variant={statusVariants[status] || "outline"} className="text-xs" data-testid={`badge-status-${machineName.toLowerCase().replace(/\s+/g, "-")}`}>
            {status}
          </Badge>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Uptime</span>
            <span className="font-mono font-medium" data-testid={`text-uptime-${machineName.toLowerCase().replace(/\s+/g, "-")}`}>
              {uptime}%
            </span>
          </div>
          <Progress value={uptime} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
}
