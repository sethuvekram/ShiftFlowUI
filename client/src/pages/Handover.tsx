import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { format } from "date-fns";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Handover, LogEntry, Machine } from "@shared/schema";

export default function HandoverPage() {
  const { toast } = useToast();
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [approvalRemarks, setApprovalRemarks] = useState("");
  const userRole = localStorage.getItem("userRole") || "User";

  const { data: handovers = [] } = useQuery<Handover[]>({ 
    queryKey: ["/api/handovers"],
    refetchInterval: 10000,
  });

  const { data: logEntries = [] } = useQuery<LogEntry[]>({ 
    queryKey: ["/api/log-entries"] 
  });

  const { data: machines = [] } = useQuery<Machine[]>({ 
    queryKey: ["/api/machines"] 
  });

  const updateHandoverMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const response = await apiRequest("PATCH", `/api/handovers/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/handovers"] });
    },
  });

  const pendingHandover = handovers.find(h => h.status === "Pending");
  const completedTasks = logEntries.filter(t => t.status === "Completed");

  const handleApprove = () => {
    if (!pendingHandover) return;

    updateHandoverMutation.mutate(
      { 
        id: pendingHandover.id, 
        data: { 
          status: "Approved",
          approvedAt: new Date().toISOString(),
        } 
      },
      {
        onSuccess: () => {
          toast({
            title: "Handover approved",
            description: "Shift handover has been approved successfully",
          });
          setCheckedItems({});
          setApprovalRemarks("");
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to approve handover",
          });
        },
      }
    );
  };

  const handleReject = () => {
    if (!pendingHandover) return;

    updateHandoverMutation.mutate(
      { 
        id: pendingHandover.id, 
        data: { 
          status: "Rejected",
        } 
      },
      {
        onSuccess: () => {
          toast({
            title: "Handover rejected",
            description: "Operator will be notified to review and resubmit",
          });
          setCheckedItems({});
          setApprovalRemarks("");
        },
        onError: () => {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to reject handover",
          });
        },
      }
    );
  };

  if (userRole !== "Supervisor") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Handover Approval</h1>
          <p className="text-muted-foreground">
            Supervisor approval required
          </p>
        </div>
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">
              This section is only accessible to Supervisors.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!pendingHandover) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Handover Approval</h1>
          <p className="text-muted-foreground">
            Review and approve shift handover
          </p>
        </div>
        <Card>
          <CardContent className="p-12 text-center">
            <Clock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              No pending handovers at this time
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Handover Approval</h1>
        <p className="text-muted-foreground">
          Review and approve shift handover
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>Shift Handover Review</CardTitle>
              <CardDescription>
                Submitted {format(new Date(pendingHandover.createdAt), "MMM dd, yyyy HH:mm")}
              </CardDescription>
            </div>
            <Badge variant="secondary" data-testid="badge-status">
              <Clock className="h-3 w-3 mr-1" />
              Pending Approval
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">Operator Remarks</h3>
            <p className="text-sm text-muted-foreground p-3 bg-muted/50 rounded-md" data-testid="text-operator-remarks">
              {pendingHandover.remarks}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Verification Checklist</h3>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-md border">
                <Checkbox
                  id="check-tasks"
                  checked={checkedItems.tasks || false}
                  onCheckedChange={(checked) =>
                    setCheckedItems({ ...checkedItems, tasks: checked as boolean })
                  }
                  data-testid="checkbox-tasks"
                />
                <div className="flex-1">
                  <Label htmlFor="check-tasks" className="font-medium cursor-pointer">
                    All tasks completed
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {completedTasks.length} tasks marked as completed
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-md border">
                <Checkbox
                  id="check-machines"
                  checked={checkedItems.machines || false}
                  onCheckedChange={(checked) =>
                    setCheckedItems({ ...checkedItems, machines: checked as boolean })
                  }
                  data-testid="checkbox-machines"
                />
                <div className="flex-1">
                  <Label htmlFor="check-machines" className="font-medium cursor-pointer">
                    Machine statuses verified
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {machines.filter(m => m.status === "Running").length}/{machines.length} machines operational
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-md border">
                <Checkbox
                  id="check-documentation"
                  checked={checkedItems.documentation || false}
                  onCheckedChange={(checked) =>
                    setCheckedItems({ ...checkedItems, documentation: checked as boolean })
                  }
                  data-testid="checkbox-documentation"
                />
                <div className="flex-1">
                  <Label htmlFor="check-documentation" className="font-medium cursor-pointer">
                    Documentation complete
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    All logbook entries properly documented
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-md border">
                <Checkbox
                  id="check-safety"
                  checked={checkedItems.safety || false}
                  onCheckedChange={(checked) =>
                    setCheckedItems({ ...checkedItems, safety: checked as boolean })
                  }
                  data-testid="checkbox-safety"
                />
                <div className="flex-1">
                  <Label htmlFor="check-safety" className="font-medium cursor-pointer">
                    Safety protocols followed
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    No safety incidents reported
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="approval-remarks">Supervisor Remarks</Label>
            <Textarea
              id="approval-remarks"
              placeholder="Add any comments or instructions for the incoming shift..."
              value={approvalRemarks}
              onChange={(e) => setApprovalRemarks(e.target.value)}
              className="min-h-24"
              data-testid="textarea-approval-remarks"
              disabled={updateHandoverMutation.isPending}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleReject}
              disabled={updateHandoverMutation.isPending}
              data-testid="button-reject"
            >
              <XCircle className="h-4 w-4 mr-2" />
              Reject Handover
            </Button>
            <Button
              className="flex-1"
              onClick={handleApprove}
              disabled={updateHandoverMutation.isPending}
              data-testid="button-approve"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              {updateHandoverMutation.isPending ? "Processing..." : "Approve Handover"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
