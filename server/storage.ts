import { type User, type InsertUser, type Shift, type LogEntry, type InsertLogEntry, type Machine, type Handover, type InsertHandover, type Alert } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Shift operations
  getShifts(): Promise<Shift[]>;
  getShift(id: string): Promise<Shift | undefined>;
  getCurrentShift(): Promise<Shift | undefined>;
  
  // Log entry operations
  getLogEntries(): Promise<LogEntry[]>;
  getLogEntriesByShift(shiftId: string): Promise<LogEntry[]>;
  createLogEntry(entry: InsertLogEntry): Promise<LogEntry>;
  
  // Machine operations
  getMachines(): Promise<Machine[]>;
  getMachine(id: string): Promise<Machine | undefined>;
  updateMachine(id: string, updates: Partial<Machine>): Promise<Machine | undefined>;
  
  // Handover operations
  getHandovers(): Promise<Handover[]>;
  getPendingHandovers(): Promise<Handover[]>;
  getHandover(id: string): Promise<Handover | undefined>;
  createHandover(handover: InsertHandover): Promise<Handover>;
  updateHandover(id: string, updates: Partial<Handover>): Promise<Handover | undefined>;
  
  // Alert operations
  getAlerts(): Promise<Alert[]>;
  getActiveAlerts(): Promise<Alert[]>;
  createAlert(message: string, severity: string): Promise<Alert>;
  resolveAlert(id: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private shifts: Map<string, Shift>;
  private logEntries: Map<string, LogEntry>;
  private machines: Map<string, Machine>;
  private handovers: Map<string, Handover>;
  private alerts: Map<string, Alert>;

  constructor() {
    this.users = new Map();
    this.shifts = new Map();
    this.logEntries = new Map();
    this.machines = new Map();
    this.handovers = new Map();
    this.alerts = new Map();
    this.initializeMockData();
  }

  private initializeMockData() {
    // Initialize mock users
    const supervisor: User = {
      id: "1",
      username: "john.supervisor",
      password: "password",
      role: "Supervisor",
      fullName: "John Davis",
    };
    const operator: User = {
      id: "2",
      username: "sarah.operator",
      password: "password",
      role: "Operator",
      fullName: "Sarah Martinez",
    };
    this.users.set(supervisor.id, supervisor);
    this.users.set(operator.id, operator);

    // Initialize shifts
    const morningShift: Shift = {
      id: "1",
      shiftName: "Morning Shift",
      startTime: new Date("2025-10-28T06:00:00"),
      endTime: new Date("2025-10-28T14:00:00"),
      supervisorId: "1",
      operatorId: "2",
      status: "Active",
    };
    const afternoonShift: Shift = {
      id: "2",
      shiftName: "Afternoon Shift",
      startTime: new Date("2025-10-28T14:00:00"),
      endTime: new Date("2025-10-28T22:00:00"),
      supervisorId: "1",
      operatorId: "2",
      status: "Scheduled",
    };
    this.shifts.set(morningShift.id, morningShift);
    this.shifts.set(afternoonShift.id, afternoonShift);

    // Initialize log entries
    const entries: LogEntry[] = [
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
    entries.forEach(entry => this.logEntries.set(entry.id, entry));

    // Initialize machines
    const machines: Machine[] = [
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
    machines.forEach(machine => this.machines.set(machine.id, machine));

    // Initialize handovers
    const handover: Handover = {
      id: "1",
      shiftId: "1",
      fromUserId: "2",
      toUserId: "1",
      status: "Pending",
      approvedAt: null,
      remarks: "Machine B-205 calibration ongoing. All other operations normal.",
      createdAt: new Date("2025-10-28T13:45:00"),
    };
    this.handovers.set(handover.id, handover);

    // Initialize alerts
    const alerts: Alert[] = [
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
    alerts.forEach(alert => this.alerts.set(alert.id, alert));
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getShifts(): Promise<Shift[]> {
    return Array.from(this.shifts.values());
  }

  async getShift(id: string): Promise<Shift | undefined> {
    return this.shifts.get(id);
  }

  async getCurrentShift(): Promise<Shift | undefined> {
    const now = new Date();
    return Array.from(this.shifts.values()).find(
      shift => shift.status === "Active" && shift.startTime <= now && shift.endTime >= now
    );
  }

  async getLogEntries(): Promise<LogEntry[]> {
    return Array.from(this.logEntries.values()).sort(
      (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
    );
  }

  async getLogEntriesByShift(shiftId: string): Promise<LogEntry[]> {
    return Array.from(this.logEntries.values())
      .filter(entry => entry.shiftId === shiftId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  async createLogEntry(insertEntry: InsertLogEntry): Promise<LogEntry> {
    const id = randomUUID();
    const entry: LogEntry = { 
      ...insertEntry, 
      id,
      remarks: insertEntry.remarks ?? null 
    };
    this.logEntries.set(id, entry);
    return entry;
  }

  async getMachines(): Promise<Machine[]> {
    return Array.from(this.machines.values());
  }

  async getMachine(id: string): Promise<Machine | undefined> {
    return this.machines.get(id);
  }

  async updateMachine(id: string, updates: Partial<Machine>): Promise<Machine | undefined> {
    const machine = this.machines.get(id);
    if (!machine) return undefined;
    
    const updated = { ...machine, ...updates };
    this.machines.set(id, updated);
    return updated;
  }

  async getHandovers(): Promise<Handover[]> {
    return Array.from(this.handovers.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getPendingHandovers(): Promise<Handover[]> {
    return Array.from(this.handovers.values())
      .filter(h => h.status === "Pending")
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getHandover(id: string): Promise<Handover | undefined> {
    return this.handovers.get(id);
  }

  async createHandover(insertHandover: InsertHandover): Promise<Handover> {
    const id = randomUUID();
    const handover: Handover = { 
      ...insertHandover, 
      id,
      remarks: insertHandover.remarks ?? null,
      toUserId: insertHandover.toUserId ?? null,
      approvedAt: insertHandover.approvedAt ?? null
    };
    this.handovers.set(id, handover);
    return handover;
  }

  async updateHandover(id: string, updates: Partial<Handover>): Promise<Handover | undefined> {
    const handover = this.handovers.get(id);
    if (!handover) return undefined;
    
    const updated = { ...handover, ...updates };
    this.handovers.set(id, updated);
    return updated;
  }

  async getAlerts(): Promise<Alert[]> {
    return Array.from(this.alerts.values()).sort(
      (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
    );
  }

  async getActiveAlerts(): Promise<Alert[]> {
    return Array.from(this.alerts.values())
      .filter(a => !a.resolved)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  async createAlert(message: string, severity: string): Promise<Alert> {
    const id = randomUUID();
    const alert: Alert = {
      id,
      message,
      severity,
      timestamp: new Date(),
      resolved: false,
    };
    this.alerts.set(id, alert);
    return alert;
  }

  async resolveAlert(id: string): Promise<void> {
    const alert = this.alerts.get(id);
    if (alert) {
      alert.resolved = true;
      this.alerts.set(id, alert);
    }
  }
}

export const storage = new MemStorage();
