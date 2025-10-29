import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Clock, AlertTriangle, Factory, Shield, Target, TrendingUp } from "lucide-react";
import { format } from "date-fns";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Handover, LogEntry, Machine } from "@shared/schema";

// Renault-specific manufacturing KPIs and checklist items
const PRODUCTION_TARGETS = {
  clio: { target: 850, actual: 847, percentage: 99.6 },
  megane: { target: 420, actual: 418, percentage: 99.5 },
  captur: { target: 380, actual: 375, percentage: 98.7 },
  arkana: { target: 250, actual: 252, percentage: 100.8 }
};

const SAFETY_CHECKLIST = [
  "Personal protective equipment (PPE) verification",
  "Emergency stop systems control",
  "Safety zones and signage inspection",
  "Work station lighting verification",
  "Posted safety instructions control",
];

const QUALITY_CHECKLIST = [
  "Quality parameters control in progress",
  "Measuring instruments calibration verification",
  "Batch traceability control",
  "Completed quality controls validation",
  "Critical spare parts stock verification",
];

const PRODUCTION_CHECKLIST = [
  "Production machines and robots status",
  "Consumables levels (paint, electrodes, etc.)",
  "Preventive maintenance schedule up to date",
  "Shift production objectives achieved",
  "Incidents or anomalies reported and handled",
];

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
      toast({
        title: "Shift Handover Validated",
        description: "The shift handover has been successfully approved.",
      });
    },
  });

  const pendingHandover = handovers.find(h => h.status === "Pending");
  const completedTasks = logEntries.filter(t => t.status === "Completed");
  const machinesWithIssues = machines.filter(m => m.status === "Warning" || m.status === "Maintenance");

  const handleApprove = () => {
    if (!pendingHandover) return;

    const allSafetyChecked = SAFETY_CHECKLIST.every(item => checkedItems[item]);
    if (!allSafetyChecked) {
      toast({
        title: "Incomplete safety checks",
        description: "All safety elements must be verified before validation.",
        variant: "destructive",
      });
      return;
    }

    updateHandoverMutation.mutate({
      id: pendingHandover.id,
      data: {
        status: "Approved",
        approvedAt: new Date().toISOString(),
        approvalRemarks,
      },
    });
  };

  const handleReject = () => {
    if (!pendingHandover || !approvalRemarks.trim()) {
      toast({
        title: "Remarks required",
        description: "Please indicate the reasons for rejecting the handover.",
        variant: "destructive",
      });
      return;
    }

    updateHandoverMutation.mutate({
      id: pendingHandover.id,
      data: {
        status: "Rejected",
        approvalRemarks,
      },
    });
  };

  const handleCheckboxChange = (item: string, checked: boolean) => {
    setCheckedItems(prev => ({ ...prev, [item]: checked }));
  };

  const getProductionIcon = (percentage: number) => {
    if (percentage >= 100) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (percentage >= 95) return <Target className="h-4 w-4 text-blue-600" />;
    return <AlertTriangle className="h-4 w-4 text-orange-600" />;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Shift Handover</h1>
        <p className="text-muted-foreground">
          Validation of shift transfer - {format(new Date(), "EEEE dd MMMM yyyy, HH:mm")}
        </p>
      </div>

      {/* Production Performance Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Factory className="h-5 w-5 text-blue-600" />
            Performance Production - Daily Objectives
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(PRODUCTION_TARGETS).map(([model, data]) => (
              <div key={model} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium capitalize">{model}</span>
                  {getProductionIcon(data.percentage)}
                </div>
                <div className="text-sm text-muted-foreground">
                  {data.actual} / {data.target} units
                </div>
                <Progress value={data.percentage} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  {data.percentage.toFixed(1)}% de l'objectif
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Current Handover Status */}
      {pendingHandover && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-500" />
              Handover Pending Validation
            </CardTitle>
            <CardDescription>
              Request from {pendingHandover.fromUserId} • {format(new Date(pendingHandover.createdAt), "HH:mm")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Outgoing operator notes:</Label>
              <div className="mt-1 p-3 bg-muted rounded-lg text-sm">
                {pendingHandover.remarks}
              </div>
            </div>

            {userRole === "Supervisor" && (
              <>
                {/* Safety Checklist */}
                <Card className="border-red-200 bg-red-50/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Shield className="h-5 w-5 text-red-600" />
                      Safety Checks (Mandatory)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {SAFETY_CHECKLIST.map((item) => (
                      <div key={item} className="flex items-center space-x-2">
                        <Checkbox
                          id={item}
                          checked={checkedItems[item] || false}
                          onCheckedChange={(checked) => handleCheckboxChange(item, checked as boolean)}
                        />
                        <Label htmlFor={item} className="text-sm leading-relaxed">
                          {item}
                        </Label>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Quality Checklist */}
                <Card className="border-blue-200 bg-blue-50/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                      Quality Checks
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {QUALITY_CHECKLIST.map((item) => (
                      <div key={item} className="flex items-center space-x-2">
                        <Checkbox
                          id={item}
                          checked={checkedItems[item] || false}
                          onCheckedChange={(checked) => handleCheckboxChange(item, checked as boolean)}
                        />
                        <Label htmlFor={item} className="text-sm leading-relaxed">
                          {item}
                        </Label>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Production Checklist */}
                <Card className="border-green-200 bg-green-50/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Factory className="h-5 w-5 text-green-600" />
                      Production Checks
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {PRODUCTION_CHECKLIST.map((item) => (
                      <div key={item} className="flex items-center space-x-2">
                        <Checkbox
                          id={item}
                          checked={checkedItems[item] || false}
                          onCheckedChange={(checked) => handleCheckboxChange(item, checked as boolean)}
                        />
                        <Label htmlFor={item} className="text-sm leading-relaxed">
                          {item}
                        </Label>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Machines with Issues */}
                {machinesWithIssues.length > 0 && (
                  <Card className="border-orange-200 bg-orange-50/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <AlertTriangle className="h-5 w-5 text-orange-600" />
                        Machines Requiring Attention
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {machinesWithIssues.map((machine) => (
                          <div key={machine.id} className="flex items-center justify-between p-2 bg-white rounded">
                            <span className="text-sm font-medium">{machine.machineName}</span>
                            <Badge variant={machine.status === "Warning" ? "outline" : "secondary"}>
                              {machine.status === "Warning" ? "Monitoring" : "Maintenance"}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Supervisor Remarks */}
                <div className="space-y-2">
                  <Label htmlFor="approval-remarks">Supervisor Remarks:</Label>
                  <Textarea
                    id="approval-remarks"
                    placeholder="Instructions for incoming team, special attention points..."
                    value={approvalRemarks}
                    onChange={(e) => setApprovalRemarks(e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleApprove}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    disabled={updateHandoverMutation.isPending}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Validate Handover
                  </Button>
                  <Button
                    onClick={handleReject}
                    variant="destructive"
                    className="flex-1"
                    disabled={updateHandoverMutation.isPending}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Refuser
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Recent Handovers History */}
      <Card>
        <CardHeader>
          <CardTitle>Handover History</CardTitle>
          <CardDescription>Recent validated handovers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {handovers
              .filter(h => h.status !== "Pending")
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .slice(0, 5)
              .map((handover) => (
                <div key={handover.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {format(new Date(handover.createdAt), "dd/MM/yyyy HH:mm")}
                      </span>
                      <Badge variant={handover.status === "Approved" ? "default" : "destructive"}>
                        {handover.status === "Approved" ? "Approved" : "Rejected"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {handover.remarks}
                    </p>
                  </div>
                  {handover.status === "Approved" ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {!pendingHandover && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <CheckCircle className="h-12 w-12 text-green-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No pending handovers</h3>
            <p className="text-muted-foreground text-center">
              All shift handovers have been processed.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}