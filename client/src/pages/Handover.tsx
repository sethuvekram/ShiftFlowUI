import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { mockLogEntries, mockMachines, mockHandovers } from "@/lib/mockData";
import { format } from "date-fns";

export default function Handover() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [approvalRemarks, setApprovalRemarks] = useState("");
  const userRole = localStorage.getItem("userRole") || "User";

  // TODO: remove mock functionality - fetch real handover data
  const pendingHandover = mockHandovers[0];
  const completedTasks = mockLogEntries.filter(t => t.status === "Completed");
  const machineStatuses = mockMachines;

  const handleApprove = () => {
    // TODO: remove mock functionality - submit approval to API
    console.log("Handover approved", {
      handoverId: pendingHandover.id,
      remarks: approvalRemarks,
      checkedItems,
    });
    alert("Handover approved successfully!");
  };

  const handleReject = () => {
    // TODO: remove mock functionality - submit rejection to API
    console.log("Handover rejected", {
      handoverId: pendingHandover.id,
      remarks: approvalRemarks,
    });
    alert("Handover rejected. Operator will be notified.");
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
                Submitted {format(pendingHandover.createdAt, "MMM dd, yyyy HH:mm")}
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
                    {machineStatuses.filter(m => m.status === "Running").length}/{machineStatuses.length} machines operational
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
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleReject}
              data-testid="button-reject"
            >
              <XCircle className="h-4 w-4 mr-2" />
              Reject Handover
            </Button>
            <Button
              className="flex-1"
              onClick={handleApprove}
              data-testid="button-approve"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve Handover
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
