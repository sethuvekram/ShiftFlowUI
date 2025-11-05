import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Clock, AlertCircle, CheckCircle, Loader2, Building2, MapPin } from "lucide-react";

interface LogEntry {
  id: string;
  shiftId: string;
  userId: string;
  taskDescription: string;
  remarks?: string | null;
  timestamp: Date;
  priority: string;
  status: string;
  department?: string;
  area?: string;
}

interface TaskItemProps {
  task?: LogEntry;
  taskDescription?: string;
  timestamp?: Date;
  priority?: string;
  status?: string;
  remarks?: string;
  department?: string;
  area?: string;
}

export default function TaskItem({ 
  task, 
  taskDescription = task?.taskDescription || "No description", 
  timestamp = task?.timestamp || new Date(), 
  priority = task?.priority || "Medium", 
  status = task?.status || "Pending", 
  remarks = task?.remarks || undefined,
  department = task?.department || undefined,
  area = task?.area || undefined
}: TaskItemProps) {
  const priorityColors: Record<string, "default" | "secondary" | "destructive"> = {
    High: "destructive",
    Medium: "default",
    Low: "secondary",
  };

  const departmentColors: Record<string, string> = {
    "Press Shop": "bg-red-100 text-red-800 border-red-200",
    "Body Shop": "bg-blue-100 text-blue-800 border-blue-200",
    "Paint Shop": "bg-green-100 text-green-800 border-green-200",
    "Assembly Shop": "bg-purple-100 text-purple-800 border-purple-200",
    "Quality": "bg-orange-100 text-orange-800 border-orange-200",
    "Maintenance": "bg-gray-100 text-gray-800 border-gray-200",
    "Safety & Environment": "bg-yellow-100 text-yellow-800 border-yellow-200",
    "Manufacturing": "bg-indigo-100 text-indigo-800 border-indigo-200",
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
            <div className="flex-1">
              <p className="font-medium mb-1" data-testid="text-task-description">
                {taskDescription}
              </p>
              {/* Department and Area badges */}
              <div className="flex items-center gap-2 mb-2">
                {department && (
                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border ${departmentColors[department] || "bg-gray-100 text-gray-800 border-gray-200"}`}>
                    <Building2 className="h-3 w-3" />
                    {department}
                  </div>
                )}
                {area && (
                  <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                    <MapPin className="h-3 w-3" />
                    {area}
                  </div>
                )}
              </div>
            </div>
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
