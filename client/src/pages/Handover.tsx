import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, XCircle, Clock, Building2, ArrowRight, Users } from "lucide-react";
import { format } from "date-fns";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface Handover {
  id: string;
  shiftId: string;
  fromUserId: string;
  toUserId?: string | null;
  status: string;
  approvedAt?: Date | null;
  remarks?: string | null;
  createdAt: Date;
  department?: string;
  area?: string;
}

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

interface Machine {
  id: string;
  machineName: string;
  status: string;
  uptime: number;
  lastMaintenance?: Date | null;
  department?: string;
  area?: string;
}

export default function HandoverPage() {
  const { toast } = useToast();
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [approvalRemarks, setApprovalRemarks] = useState("");
  const userRole = localStorage.getItem("userRole") || "User";
  const userName = localStorage.getItem("userFullName") || "User";

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

  const pendingHandovers = handovers.filter(h => h.status === "pending");
  const approvedHandovers = handovers.filter(h => h.status === "approved");
  const completedTasks = logEntries.filter(t => t.status === "Completed");

  const handleApprove = (handoverId: string) => {
    updateHandoverMutation.mutate(
      { 
        id: handoverId, 
        data: { 
          status: "approved",
          approvedAt: new Date().toISOString(),
        } 
      },
      {
        onSuccess: () => {
          toast({
            title: "Handover approved",
            description: "Manufacturing handover has been approved successfully",
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

  const handleReject = (handoverId: string) => {
    updateHandoverMutation.mutate(
      { 
        id: handoverId, 
        data: { 
          status: "rejected",
        } 
      },
      {
        onSuccess: () => {
          toast({
            title: "Handover rejected",
            description: "Personnel will be notified to review and resubmit",
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Manufacturing Handover Management</h1>
        <p className="text-muted-foreground">
          Review and approve shift handovers across all manufacturing departments
        </p>
      </div>

      {/* Pending Handovers */}
      {pendingHandovers.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Pending Handovers</h2>
          {pendingHandovers.map((handover) => (
            <Card key={handover.id} className="border-l-4 border-l-orange-500">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="h-5 w-5" />
                      {handover.department || "Manufacturing"} Handover
                      {handover.area && (
                        <Badge variant="outline">{handover.area}</Badge>
                      )}
                    </CardTitle>
                    <CardDescription>
                      Submitted {format(new Date(handover.createdAt), "MMM dd, yyyy HH:mm")}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                    <Clock className="h-3 w-3 mr-1" />
                    Pending
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Handover Details:</h4>
                  <p className="text-sm text-gray-700">{handover.remarks}</p>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={() => handleApprove(handover.id)}
                    className="bg-green-600 hover:bg-green-700"
                    disabled={updateHandoverMutation.isPending}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                  <Button 
                    variant="destructive"
                    onClick={() => handleReject(handover.id)}
                    disabled={updateHandoverMutation.isPending}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Recent Approved Handovers */}
      {approvedHandovers.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Recent Approved Handovers</h2>
          {approvedHandovers.slice(0, 3).map((handover) => (
            <Card key={handover.id} className="border-l-4 border-l-green-500">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="h-5 w-5" />
                      {handover.department || "Manufacturing"} Handover
                      {handover.area && (
                        <Badge variant="outline">{handover.area}</Badge>
                      )}
                    </CardTitle>
                    <CardDescription>
                      Approved {handover.approvedAt && format(new Date(handover.approvedAt), "MMM dd, yyyy HH:mm")}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Approved
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700">{handover.remarks}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* No Handovers State */}
      {pendingHandovers.length === 0 && approvedHandovers.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Clock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Handovers Available</h3>
            <p className="text-muted-foreground">
              No handovers pending review at this time
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
