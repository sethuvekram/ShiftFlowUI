import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import TaskItem from "@/components/TaskItem";
import { Plus, Filter, Building2 } from "lucide-react";
import { format } from "date-fns";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

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

export default function Logbook() {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [taskDescription, setTaskDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [remarks, setRemarks] = useState("");
  
  // Get user's department from localStorage and set as default filter
  const userDepartment = localStorage.getItem("userDepartment");
  const [filterDepartment, setFilterDepartment] = useState(userDepartment || "All");
  
  // Pre-fill department when adding new entry
  const [department, setDepartment] = useState("");
  const [area, setArea] = useState("");

  // When "Add Entry" is clicked, pre-fill with user's department
  const handleAddEntry = () => {
    setShowForm(!showForm);
    if (!showForm && userDepartment) {
      setDepartment(userDepartment);
    }
  };

  // Manufacturing departments for Renault operations
  const departments = [
    "Press Shop",
    "Body Shop", 
    "Paint Shop",
    "Assembly Shop",
    "Quality (VQA/IHQA/PTQA)",
    "Maintenance",
    "Safety & Environment"
  ];

  const areas = {
    "Press Shop": ["Stamping Line 1", "Stamping Line 2", "Quality Control"],
    "Body Shop": ["Robotic Welding", "Manual Assembly", "Quality Inspection"],
    "Paint Shop": ["Paint Booth", "Multi-stage Coating", "Curing"],
    "Assembly Shop": ["Trim Line", "Chassis Line", "Final Line"],
    "Quality (VQA/IHQA/PTQA)": ["VQA Inspection", "IHQA Testing", "PTQA Monitoring"],
    "Maintenance": ["Predictive Maintenance", "Corrective Maintenance", "Equipment Service"],
    "Safety & Environment": ["Safety Compliance", "Environmental Control", "Training"]
  };

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
        description: "Manufacturing log entry has been recorded successfully",
      });
      setTaskDescription("");
      setPriority("Medium");
      setRemarks("");
      setDepartment("");
      setArea("");
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
      department: department || null,
      area: area || null,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Manufacturing Operations Logbook</h1>
          <p className="text-muted-foreground">
            Record shift activities, handovers, and operational notes across departments
          </p>
          {userDepartment && filterDepartment !== "All" && filterDepartment === userDepartment && (
            <div className="mt-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
                👤 Your Department View: {userDepartment}
              </Badge>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Select value={filterDepartment} onValueChange={setFilterDepartment}>
            <SelectTrigger className="w-[200px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleAddEntry} data-testid="button-add-entry">
            <Plus className="h-4 w-4 mr-2" />
            Add Entry
          </Button>
        </div>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>New Manufacturing Log Entry</CardTitle>
            <CardDescription>
              Record a task, event, or handover for the current shift
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select value={department} onValueChange={(value) => {
                    setDepartment(value);
                    setArea(""); // Reset area when department changes
                  }} disabled={createEntryMutation.isPending}>
                    <SelectTrigger id="department">
                      <Building2 className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="area">Area</Label>
                  <Select value={area} onValueChange={setArea} disabled={createEntryMutation.isPending || !department}>
                    <SelectTrigger id="area">
                      <SelectValue placeholder="Select area" />
                    </SelectTrigger>
                    <SelectContent>
                      {department && areas[department as keyof typeof areas]?.map((a) => (
                        <SelectItem key={a} value={a}>{a}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="task">Task Description</Label>
                <Input
                  id="task"
                  placeholder="Describe the task, operation, or handover activity"
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
                <Label htmlFor="remarks">Remarks & Handover Notes</Label>
                <Textarea
                  id="remarks"
                  placeholder="Include quality checks, safety notes, equipment status, handover details, etc."
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
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Manufacturing Operations Log
            {filterDepartment !== "All" && (
              <Badge variant="outline" className="ml-2">
                {filterDepartment}
              </Badge>
            )}
          </CardTitle>
          <CardDescription>
            Shift activities, handovers, and operational notes from all departments
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {logEntries
            .filter((entry) => 
              filterDepartment === "All" || entry.department === filterDepartment
            )
            .map((entry) => (
              <TaskItem
                key={entry.id}
                task={entry}
              />
            ))}
          {logEntries.filter((entry) => 
            filterDepartment === "All" || entry.department === filterDepartment
          ).length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              {filterDepartment === "All" 
                ? "No log entries recorded yet"
                : `No entries for ${filterDepartment} department`
              }
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
