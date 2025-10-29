import type { User, Shift, LogEntry, Machine, Handover, Alert } from "@shared/schema";

// TODO: remove mock functionality
export const mockUsers: User[] = [
  {
    id: "1",
    username: "pierre.dupont",
    password: "password",
    role: "Supervisor",
    fullName: "Pierre Dupont",
  },
  {
    id: "2",
    username: "marie.laurent",
    password: "password",
    role: "Operator",
    fullName: "Marie Laurent",
  },
  {
    id: "3",
    username: "jean.martin",
    password: "password",
    role: "Operator",
    fullName: "Jean Martin",
  },
];

export const mockShifts: Shift[] = [
  {
    id: "1",
    shiftName: "Morning Team",
    startTime: new Date("2025-10-28T06:00:00"),
    endTime: new Date("2025-10-28T14:00:00"),
    supervisorId: "1",
    operatorId: "2",
    status: "Active",
  },
  {
    id: "2",
    shiftName: "Afternoon Team",
    startTime: new Date("2025-10-28T14:00:00"),
    endTime: new Date("2025-10-28T22:00:00"),
    supervisorId: "1",
    operatorId: "3",
    status: "Scheduled",
  },
  {
    id: "3",
    shiftName: "Night Team",
    startTime: new Date("2025-10-28T22:00:00"),
    endTime: new Date("2025-10-29T06:00:00"),
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
    taskDescription: "Clio V engine quality control - Production line A",
    remarks: "97 engines checked. Parameters within standards. 2 rejections for torque deviation.",
    timestamp: new Date("2025-10-28T08:30:00"),
    priority: "High",
    status: "Completed",
  },
  {
    id: "2",
    shiftId: "1",
    userId: "2",
    taskDescription: "Preventive maintenance welding robot R-340",
    remarks: "Electrode replacement. Calibration completed. Ready for production.",
    timestamp: new Date("2025-10-28T10:15:00"),
    priority: "Medium",
    status: "Completed",
  },
  {
    id: "3",
    shiftId: "1",
    userId: "2",
    taskDescription: "Safety inspection - Megane body area",
    remarks: "PPE verification. Emergency stop systems check. All clear.",
    timestamp: new Date("2025-10-28T11:45:00"),
    priority: "High",
    status: "Completed",
  },
  {
    id: "4",
    shiftId: "1",
    userId: "3",
    taskDescription: "Lean Manufacturing audit - Captur line",
    remarks: "Cycle time optimization. Waste reduction identified.",
    timestamp: new Date("2025-10-28T12:30:00"),
    priority: "Medium",
    status: "In Progress",
  },
  {
    id: "5",
    shiftId: "1",
    userId: "1",
    taskDescription: "Team training - New Renault Way standards",
    remarks: "Session scheduled for afternoon shift.",
    timestamp: new Date("2025-10-28T09:00:00"),
    priority: "Low",
    status: "Pending",
  },
  {
    id: "6",
    shiftId: "1",
    userId: "2",
    taskDescription: "Dimensional control chassis - Arkana series",
    remarks: "3D measurements performed. Tolerances met on 245/250 parts.",
    timestamp: new Date("2025-10-28T07:15:00"),
    priority: "High",
    status: "Completed",
  },
];

export const mockMachines: Machine[] = [
  {
    id: "1",
    machineName: "Welding Robot R-340 (Clio Line)",
    status: "Running",
    uptime: 98.5,
    lastMaintenance: new Date("2025-10-28T08:30:00"),
  },
  {
    id: "2",
    machineName: "2500T Press - Megane Body",
    status: "Running",
    uptime: 96.2,
    lastMaintenance: new Date("2025-10-27T14:00:00"),
  },
  {
    id: "3",
    machineName: "Automated Paint Line L3",
    status: "Maintenance",
    uptime: 94.8,
    lastMaintenance: new Date("2025-10-28T06:00:00"),
  },
  {
    id: "4",
    machineName: "3D Quality Control - Captur",
    status: "Running",
    uptime: 99.1,
    lastMaintenance: new Date("2025-10-26T10:00:00"),
  },
  {
    id: "5",
    machineName: "Final Assembly Robot R-580",
    status: "Warning",
    uptime: 89.3,
    lastMaintenance: new Date("2025-10-25T16:00:00"),
  },
  {
    id: "6",
    machineName: "Engine Test Bench BT-450",
    status: "Running",
    uptime: 97.7,
    lastMaintenance: new Date("2025-10-27T08:00:00"),
  },
];

export const mockHandovers: Handover[] = [
  {
    id: "1",
    shiftId: "1",
    fromUserId: "2",
    toUserId: "3",
    status: "Pending",
    approvedAt: null,
    remarks: "Paint line L3 under preventive maintenance. Robot R-580 temperature monitoring required. Clio production: 847 units (target: 850). Quality: 2 engine rejections on torque control.",
    createdAt: new Date("2025-10-28T13:45:00"),
  },
  {
    id: "2",
    shiftId: "1",
    fromUserId: "1",
    toUserId: "2",
    status: "Approved",
    approvedAt: new Date("2025-10-28T06:15:00"),
    remarks: "Night shift handover completed. All systems operational. Renault Way training scheduled at 9:00 AM.",
    createdAt: new Date("2025-10-28T06:00:00"),
  },
];

export const mockAlerts: Alert[] = [
  {
    id: "1",
    message: "Robot R-580 - High engine temperature (78°C)",
    severity: "Warning",
    timestamp: new Date("2025-10-28T11:30:00"),
    resolved: false,
  },
  {
    id: "2",
    message: "Paint Line L3 - Scheduled preventive maintenance stop",
    severity: "Info",
    timestamp: new Date("2025-10-28T06:00:00"),
    resolved: false,
  },
  {
    id: "3",
    message: "Quality Control - Dimensional deviation Arkana chassis (2 parts)",
    severity: "Warning",
    timestamp: new Date("2025-10-28T10:45:00"),
    resolved: true,
  },
  {
    id: "4",
    message: "Daily Clio production target reached at 97%",
    severity: "Success",
    timestamp: new Date("2025-10-28T12:00:00"),
    resolved: false,
  },
  {
    id: "5",
    message: "Lean Manufacturing Captur audit - Optimizations identified",
    severity: "Info",
    timestamp: new Date("2025-10-28T12:30:00"),
    resolved: false,
  },
];
