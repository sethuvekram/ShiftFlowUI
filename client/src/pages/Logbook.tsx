import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TaskItem from "@/components/TaskItem";
import { Plus } from "lucide-react";
import { format } from "date-fns";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { LogEntry } from "@shared/schema";

export default function Logbook() {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [taskDescription, setTaskDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [remarks, setRemarks] = useState("");

  const { data: currentShift } = useQuery<any>({ 
    queryKey: ["/api/shifts/current"] 
  });

  const { data: logEntries = [] } = useQuery<LogEntry[]>({ 
    queryKey: ["/api/log-entries"] 
  });

  const createEntryMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/log-entries", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/log-entries"] });
      toast({
        title: "Entry created",
        description: "Log entry has been recorded successfully",
      });
      setTaskDescription("");
      setPriority("Medium");
      setRemarks("");
      setShowForm(false);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create log entry",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentShift) {
      toast({
        variant: "destructive",
        title: "No active shift",
        description: "Cannot create log entry without an active shift",
      });
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast({
        variant: "destructive",
        title: "Not authenticated",
        description: "Please log in to create entries",
      });
      return;
    }

    createEntryMutation.mutate({
      shiftId: currentShift.id,
      userId,
      taskDescription,
      priority,
      remarks: remarks || null,
      timestamp: new Date().toISOString(),
      status: "Pending",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Digital Logbook</h1>
          <p className="text-muted-foreground">
            Record and track shift activities
          </p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} data-testid="button-add-entry">
          <Plus className="h-4 w-4 mr-2" />
          Add Entry
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>New Log Entry</CardTitle>
            <CardDescription>
              Record a task or event for the current shift
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="task">Task Description</Label>
                <Input
                  id="task"
                  placeholder="Describe the task or activity"
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  data-testid="input-task-description"
                  disabled={createEntryMutation.isPending}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={priority} onValueChange={setPriority} disabled={createEntryMutation.isPending}>
                    <SelectTrigger id="priority" data-testid="select-priority">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Timestamp</Label>
                  <Input
                    value={format(new Date(), "MMM dd, yyyy HH:mm")}
                    disabled
                    className="font-mono"
                    data-testid="input-timestamp"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="remarks">Remarks</Label>
                <Textarea
                  id="remarks"
                  placeholder="Additional notes or observations (optional)"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  className="min-h-24"
                  data-testid="textarea-remarks"
                  disabled={createEntryMutation.isPending}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                  disabled={createEntryMutation.isPending}
                  data-testid="button-cancel"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={createEntryMutation.isPending} data-testid="button-submit">
                  {createEntryMutation.isPending ? "Submitting..." : "Submit Entry"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Log Entries</CardTitle>
          <CardDescription>
            All activities recorded for the current shift
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {logEntries.map((entry) => (
            <TaskItem
              key={entry.id}
              task={entry.taskDescription}
              timestamp={new Date(entry.timestamp)}
              priority={entry.priority}
              status={entry.status}
              remarks={entry.remarks || undefined}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
