// Shared types for API functions - simplified version of schema types
export interface User {
  id: string;
  username: string;
  password: string;
  role: string;
  fullName: string;
  department?: string;
}

export interface Shift {
  id: string;
  shiftName: string;
  startTime: Date;
  endTime: Date;
  supervisorId?: string | null;
  operatorId?: string | null;
  status: string;
}

export interface LogEntry {
  id: string;
  shiftId: string;
  userId: string;
  taskDescription: string;
  remarks?: string | null;
  timestamp: Date;
  priority: string;
  status: string;
}

export interface Machine {
  id: string;
  machineName: string;
  status: string;
  uptime: number;
  lastMaintenance?: Date | null;
}

export interface Handover {
  id: string;
  shiftId: string;
  fromUserId: string;
  toUserId?: string | null;
  status: string;
  approvedAt?: Date | null;
  remarks?: string | null;
  createdAt: Date;
}

export interface Alert {
  id: string;
  message: string;
  severity: string;
  timestamp: Date;
  resolved: boolean;
}

export interface InsertLogEntry {
  shiftId: string;
  userId: string;
  taskDescription: string;
  remarks?: string | null;
  timestamp: Date;
  priority: string;
  status: string;
}

export interface InsertHandover {
  shiftId: string;
  fromUserId: string;
  toUserId?: string;
  status: string;
  approvedAt?: Date | null;
  remarks?: string | null;
  createdAt: Date;
}
