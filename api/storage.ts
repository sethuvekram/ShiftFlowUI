// Simplified storage for API functions
// In production, this should connect to your actual database
import type { User, LogEntry, Machine, Handover, Alert, Shift, InsertLogEntry, InsertHandover } from './types';

// Mock data for demonstration - replace with actual database calls
export const apiStorage = {
  async getUserByUsername(username: string): Promise<User | null> {
    // Manufacturing shift personnel with role-based access
    const users = [
      {
        id: '1',
        username: 'press.operator',
        password: 'admin', // In production, this should be hashed
        role: 'Press Operator',
        fullName: 'Jean-Marc Dubois',
        department: 'Press Shop'
      },
      {
        id: '2',
        username: 'body.supervisor',
        password: 'admin',
        role: 'Body Shop Supervisor',
        fullName: 'Marie Leclerc',
        department: 'Body Shop'
      },
      {
        id: '3',
        username: 'paint.operator',
        password: 'admin',
        role: 'Paint Operator',
        fullName: 'Pierre Moreau',
        department: 'Paint Shop'
      },
      {
        id: '4',
        username: 'assembly.lead',
        password: 'admin',
        role: 'Assembly Team Lead',
        fullName: 'Sophie Martin',
        department: 'Assembly Shop'
      },
      {
        id: '5',
        username: 'quality.inspector',
        password: 'admin',
        role: 'Quality Inspector',
        fullName: 'Ahmed Benali',
        department: 'Quality (VQA/IHQA/PTQA)'
      },
      {
        id: '6',
        username: 'maintenance.tech',
        password: 'admin',
        role: 'Maintenance Technician',
        fullName: 'Carlos Rodriguez',
        department: 'Maintenance'
      },
      {
        id: '7',
        username: 'safety.officer',
        password: 'admin',
        role: 'Safety Officer',
        fullName: 'Anna Kowalski',
        department: 'Safety & Environment'
      },
      {
        id: '8',
        username: 'shift.manager',
        password: 'admin',
        role: 'Shift Manager',
        fullName: 'Thomas Schneider',
        department: 'Manufacturing'
      }
    ];
    
    return users.find(user => user.username === username) || null;
  },

  async getShifts(): Promise<Shift[]> {
    // TODO: Replace with actual database query
    return [
      {
        id: '1',
        shiftName: 'Morning Shift',
        startTime: new Date('2024-01-01T06:00:00Z'),
        endTime: new Date('2024-01-01T14:00:00Z'),
        supervisorId: '1',
        operatorId: '1',
        status: 'Active'
      }
    ];
  },

  async getCurrentShift(): Promise<Shift | null> {
    // TODO: Replace with actual database query
    const shifts = await this.getShifts();
    return shifts[0] || null;
  },

  async getLogEntries(): Promise<LogEntry[]> {
    // TODO: Replace with actual database query
    return [
      {
        id: '1',
        shiftId: '1',
        userId: '1',
        taskDescription: 'System startup check completed',
        remarks: 'All systems operational',
        timestamp: new Date(),
        priority: 'Medium',
        status: 'Completed'
      }
    ];
  },

  async getLogEntriesByShift(shiftId: string): Promise<LogEntry[]> {
    // TODO: Replace with actual database query
    const entries = await this.getLogEntries();
    return entries.filter(entry => entry.shiftId === shiftId);
  },

  async createLogEntry(entry: InsertLogEntry): Promise<LogEntry> {
    // TODO: Replace with actual database insert
    return {
      id: Date.now().toString(),
      ...entry
    };
  },

  async getMachines(): Promise<Machine[]> {
    // TODO: Replace with actual database query
    return [
      {
        id: '1',
        machineName: 'Production Line A',
        status: 'Running',
        uptime: 95,
        lastMaintenance: new Date('2024-01-01')
      }
    ];
  },

  async updateMachine(id: string, updates: Partial<Machine>): Promise<Machine | null> {
    // TODO: Replace with actual database update
    const machines = await this.getMachines();
    const machine = machines.find(m => m.id === id);
    if (!machine) return null;
    return { ...machine, ...updates };
  },

  async getHandovers(): Promise<Handover[]> {
    // TODO: Replace with actual database query
    return [];
  },

  async getPendingHandovers(): Promise<Handover[]> {
    // TODO: Replace with actual database query
    const handovers = await this.getHandovers();
    return handovers.filter(h => h.status === 'pending');
  },

  async createHandover(handover: InsertHandover): Promise<Handover> {
    // TODO: Replace with actual database insert
    return {
      id: Date.now().toString(),
      ...handover
    };
  },

  async updateHandover(id: string, updates: Partial<Handover>): Promise<Handover | null> {
    // TODO: Replace with actual database update
    const handovers = await this.getHandovers();
    const handover = handovers.find(h => h.id === id);
    if (!handover) return null;
    return { ...handover, ...updates };
  },

  async getAlerts(): Promise<Alert[]> {
    // TODO: Replace with actual database query
    return [];
  },

  async getActiveAlerts(): Promise<Alert[]> {
    // TODO: Replace with actual database query
    const alerts = await this.getAlerts();
    return alerts.filter(alert => !alert.resolved);
  },

  async createAlert(message: string, severity: string): Promise<Alert> {
    // TODO: Replace with actual database insert
    return {
      id: Date.now().toString(),
      message,
      severity,
      timestamp: new Date(),
      resolved: false
    };
  },

  async resolveAlert(id: string): Promise<void> {
    // TODO: Replace with actual database update
    console.log(`Alert ${id} resolved`);
  }
};
