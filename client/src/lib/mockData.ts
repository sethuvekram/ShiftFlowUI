import type { User, Shift, LogEntry, Machine, Handover, Alert } from "@shared/schema";

// TODO: remove mock functionality
export const mockUsers: User[] = [
  {
    id: "1",
    username: "john.supervisor",
    password: "password",
    role: "Supervisor",
    fullName: "John Davis",
  },
  {
    id: "2",
    username: "sarah.operator",
    password: "password",
    role: "Operator",
    fullName: "Sarah Martinez",
  },
];

export const mockShifts: Shift[] = [
  {
    id: "1",
    shiftName: "Morning Shift",
    startTime: new Date("2025-10-28T06:00:00"),
    endTime: new Date("2025-10-28T14:00:00"),
    supervisorId: "1",
    operatorId: "2",
    status: "Active",
  },
  {
    id: "2",
    shiftName: "Afternoon Shift",
    startTime: new Date("2025-10-28T14:00:00"),
    endTime: new Date("2025-10-28T22:00:00"),
    supervisorId: "1",
    operatorId: "2",
    status: "Scheduled",
  },
];

export const mockLogEntries: LogEntry[] = [
  {
    id: "1",
    shiftId: "1",
    userId: "2",
    taskDescription: "Completed routine maintenance on Machine A-101",
    remarks: "All parameters within normal range. Filter replaced.",
    timestamp: new Date("2025-10-28T08:30:00"),
    priority: "Medium",
    status: "Completed",
  },
  {
    id: "2",
    shiftId: "1",
    userId: "2",
    taskDescription: "Quality inspection batch #4521",
    remarks: "Samples passed all quality checks. Documentation updated.",
    timestamp: new Date("2025-10-28T10:15:00"),
    priority: "High",
    status: "Completed",
  },
  {
    id: "3",
    shiftId: "1",
    userId: "2",
    taskDescription: "Temperature calibration for Machine B-205",
    remarks: "Calibration in progress. Expected completion at 13:00.",
    timestamp: new Date("2025-10-28T11:45:00"),
    priority: "High",
    status: "In Progress",
  },
  {
    id: "4",
    shiftId: "1",
    userId: "1",
    taskDescription: "Safety equipment inspection",
    remarks: null,
    timestamp: new Date("2025-10-28T09:00:00"),
    priority: "Low",
    status: "Pending",
  },
];

export const mockMachines: Machine[] = [
  {
    id: "1",
    machineName: "Machine A-101",
    status: "Running",
    uptime: 98,
    lastMaintenance: new Date("2025-10-28T08:30:00"),
  },
  {
    id: "2",
    machineName: "Machine B-205",
    status: "Maintenance",
    uptime: 95,
    lastMaintenance: new Date("2025-10-27T14:00:00"),
  },
  {
    id: "3",
    machineName: "Machine C-310",
    status: "Running",
    uptime: 99,
    lastMaintenance: new Date("2025-10-26T10:00:00"),
  },
  {
    id: "4",
    machineName: "Machine D-412",
    status: "Idle",
    uptime: 87,
    lastMaintenance: new Date("2025-10-25T16:30:00"),
  },
];

export const mockHandovers: Handover[] = [
  {
    id: "1",
    shiftId: "1",
    fromUserId: "2",
    toUserId: "1",
    status: "Pending",
    approvedAt: null,
    remarks: "Machine B-205 calibration ongoing. All other operations normal.",
    createdAt: new Date("2025-10-28T13:45:00"),
  },
];

export const mockAlerts: Alert[] = [
  {
    id: "1",
    message: "Machine B-205 temperature variance detected",
    severity: "Warning",
    timestamp: new Date("2025-10-28T11:30:00"),
    resolved: false,
  },
  {
    id: "2",
    message: "Shift handover pending approval",
    severity: "Info",
    timestamp: new Date("2025-10-28T13:45:00"),
    resolved: false,
  },
  {
    id: "3",
    message: "Safety inspection due in 2 hours",
    severity: "Info",
    timestamp: new Date("2025-10-28T11:00:00"),
    resolved: false,
  },
];
