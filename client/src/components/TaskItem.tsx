import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Clock, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import type { LogEntry } from "@shared/schema";

interface TaskItemProps {
  task?: LogEntry;
  taskDescription?: string;
  timestamp?: Date;
  priority?: string;
  status?: string;
  remarks?: string;
}

export default function TaskItem({ 
  task, 
  taskDescription = task?.taskDescription || "No description", 
  timestamp = task?.timestamp || new Date(), 
  priority = task?.priority || "Medium", 
  status = task?.status || "Pending", 
  remarks = task?.remarks || undefined 
}: TaskItemProps) {
  const priorityColors: Record<string, "default" | "secondary" | "destructive"> = {
    High: "destructive",
    Medium: "default",
    Low: "secondary",
  };

  const statusIcons = {
    Completed: CheckCircle,
    "In Progress": Loader2,
    Pending: Clock,
  };

  const StatusIcon = statusIcons[status as keyof typeof statusIcons] || AlertCircle;
  const safeTaskId = taskDescription.toLowerCase().slice(0, 20).replace(/\s+/g, "-");

  return (
    <div className="p-4 border-l-4 border-primary/20 hover-elevate" data-testid={`item-task-${safeTaskId}`}>
      <div className="flex items-start gap-3">
        <StatusIcon className={`h-5 w-5 mt-0.5 ${status === "Completed" ? "text-green-600" : status === "In Progress" ? "text-amber-600" : "text-muted-foreground"}`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <p className="font-medium" data-testid="text-task-description">
              {taskDescription}
            </p>
            <Badge variant={priorityColors[priority]} className="text-xs shrink-0" data-testid="badge-priority">
              {priority}
            </Badge>
          </div>
          {remarks && (
            <p className="text-sm text-muted-foreground mb-2" data-testid="text-remarks">
              {remarks}
            </p>
          )}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="font-mono" data-testid="text-timestamp">
              {format(timestamp, "MMM dd, yyyy HH:mm")}
            </span>
            <Badge variant="outline" className="text-xs" data-testid="badge-status">
              {status}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
