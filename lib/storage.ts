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
    // Manufacturing Operations Handover Entries
    return [
      // Press Shop (Stamping) Operations
      {
        id: '1',
        shiftId: '1',
        userId: '1',
        taskDescription: 'Press Shop Line 1 - Steel coil changeover completed',
        remarks: 'New coil batch #PS-2025-1105. IHQA dimensional checks passed. Press speed: 15 SPM. Next maintenance due: 2000 cycles.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        priority: 'High',
        status: 'Completed',
        department: 'Press Shop',
        area: 'Stamping Line 1'
      },
      {
        id: '2',
        shiftId: '1',
        userId: '2',
        taskDescription: 'Press Shop - Quality inspection results',
        remarks: 'IHQA: 95 panels inspected. Surface finish: 98.5% pass rate. 2 panels rejected for minor scratches. Jig recalibration completed.',
        timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
        priority: 'Medium',
        status: 'Completed',
        department: 'Press Shop',
        area: 'Quality Control'
      },

      // Body Shop (Welding & Assembly) Operations
      {
        id: '3',
        shiftId: '1',
        userId: '3',
        taskDescription: 'Body Shop - Robotic welding station maintenance',
        remarks: 'Robot #BS-R12 welding tips replaced. Jig accuracy verified: ±0.2mm tolerance maintained. 847 weld points completed this shift.',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        priority: 'High',
        status: 'Completed',
        department: 'Body Shop',
        area: 'Robotic Welding'
      },
      {
        id: '4',
        shiftId: '1',
        userId: '3',
        taskDescription: 'Body Shop - BIW geometry check',
        remarks: 'Body-in-White dimensional verification: 12 units checked. All within specification. CMM measurement data logged. Framing jig #3 needs attention.',
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
        priority: 'Medium',
        status: 'In Progress',
        department: 'Body Shop',
        area: 'Quality Inspection'
      },

      // Paint Shop Operations
      {
        id: '5',
        shiftId: '1',
        userId: '4',
        taskDescription: 'Paint Shop - Environmental controls adjustment',
        remarks: 'Temperature: 22°C, Humidity: 65%. PTQA paint adhesion tests: 99.1% pass rate. Booth #2 filters changed. Color match verification completed.',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        priority: 'High',
        status: 'Completed',
        department: 'Paint Shop',
        area: 'Paint Booth'
      },
      {
        id: '6',
        shiftId: '1',
        userId: '4',
        taskDescription: 'Paint Shop - Coating process monitoring',
        remarks: 'Pre-treatment: OK, Primer: 25μm thickness, Base coat: Uniform coverage, Clear coat: 45μm. 3 units re-sprayed due to contamination.',
        timestamp: new Date(Date.now() - 20 * 60 * 1000),
        priority: 'Medium',
        status: 'Completed',
        department: 'Paint Shop',
        area: 'Multi-stage Coating'
      },

      // Assembly Shop (TCF) Operations
      {
        id: '7',
        shiftId: '1',
        userId: '5',
        taskDescription: 'Assembly Shop - Trim line operations',
        remarks: 'Interior components fitted: 45 units. Poka-yoke system prevented 3 assembly errors. Dashboard installation: 100% first-pass rate.',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        priority: 'Medium',
        status: 'Completed',
        department: 'Assembly Shop',
        area: 'Trim Line'
      },
      {
        id: '8',
        shiftId: '1',
        userId: '5',
        taskDescription: 'Assembly Shop - Chassis torque verification',
        remarks: 'Torque checks: Engine mounts 85Nm, Suspension 120Nm, Wheels 110Nm. All within specification. Torque gun calibration due tomorrow.',
        timestamp: new Date(Date.now() - 10 * 60 * 1000),
        priority: 'High',
        status: 'Completed',
        department: 'Assembly Shop',
        area: 'Chassis Line'
      },
      {
        id: '9',
        shiftId: '1',
        userId: '6',
        taskDescription: 'Final Assembly - Quality gate inspection',
        remarks: 'Final inspection: 52 vehicles completed. VQA approval: 98.1%. 1 unit held for electrical fault. End-of-line test results logged.',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        priority: 'High',
        status: 'Completed',
        department: 'Assembly Shop',
        area: 'Final Line'
      },

      // Maintenance & Safety Operations
      {
        id: '10',
        shiftId: '1',
        userId: '7',
        taskDescription: 'Predictive maintenance - Press Shop',
        remarks: 'Vibration analysis completed on Press #1. Bearing replacement scheduled for next weekend. Oil analysis: within normal parameters.',
        timestamp: new Date(Date.now() - 3 * 60 * 1000),
        priority: 'Medium',
        status: 'Completed',
        department: 'Maintenance',
        area: 'Predictive Maintenance'
      },
      {
        id: '11',
        shiftId: '1',
        userId: '8',
        taskDescription: 'Safety inspection - Assembly area',
        remarks: 'Safety audit completed. All emergency stops functional. Safety training: 5 operators certified. No incidents reported this shift.',
        timestamp: new Date(),
        priority: 'High',
        status: 'Completed',
        department: 'Safety & Environment',
        area: 'Safety Compliance'
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
    // Manufacturing equipment across all departments
    return [
      // Press Shop Equipment
      {
        id: '1',
        machineName: 'Press Line 1 - 800T Hydraulic Press',
        status: 'Running',
        uptime: 96.5,
        lastMaintenance: new Date('2024-10-28'),
        department: 'Press Shop',
        area: 'Stamping Line 1'
      },
      {
        id: '2',
        machineName: 'Press Line 2 - 1200T Mechanical Press',
        status: 'Running',
        uptime: 94.2,
        lastMaintenance: new Date('2024-10-25'),
        department: 'Press Shop',
        area: 'Stamping Line 2'
      },
      
      // Body Shop Equipment
      {
        id: '3',
        machineName: 'Robotic Welding Station #BS-R12',
        status: 'Running',
        uptime: 98.1,
        lastMaintenance: new Date('2024-11-01'),
        department: 'Body Shop',
        area: 'Robotic Welding'
      },
      {
        id: '4',
        machineName: 'Framing Jig #3 - BIW Assembly',
        status: 'Maintenance',
        uptime: 87.3,
        lastMaintenance: new Date('2024-11-05'),
        department: 'Body Shop',
        area: 'Manual Assembly'
      },
      
      // Paint Shop Equipment
      {
        id: '5',
        machineName: 'Paint Booth #2 - Automated Spray',
        status: 'Running',
        uptime: 92.8,
        lastMaintenance: new Date('2024-10-30'),
        department: 'Paint Shop',
        area: 'Paint Booth'
      },
      {
        id: '6',
        machineName: 'Oven #1 - Paint Curing',
        status: 'Running',
        uptime: 99.1,
        lastMaintenance: new Date('2024-10-20'),
        department: 'Paint Shop',
        area: 'Curing'
      },
      
      // Assembly Shop Equipment
      {
        id: '7',
        machineName: 'Trim Line Conveyor System',
        status: 'Running',
        uptime: 95.7,
        lastMaintenance: new Date('2024-10-26'),
        department: 'Assembly Shop',
        area: 'Trim Line'
      },
      {
        id: '8',
        machineName: 'Chassis Assembly Station',
        status: 'Running',
        uptime: 91.4,
        lastMaintenance: new Date('2024-11-02'),
        department: 'Assembly Shop',
        area: 'Chassis Line'
      },
      {
        id: '9',
        machineName: 'Final Test Bench',
        status: 'Running',
        uptime: 97.3,
        lastMaintenance: new Date('2024-10-29'),
        department: 'Assembly Shop',
        area: 'Final Line'
      },
      
      // Quality & Testing Equipment
      {
        id: '10',
        machineName: 'CMM - Coordinate Measuring Machine',
        status: 'Running',
        uptime: 89.6,
        lastMaintenance: new Date('2024-10-24'),
        department: 'Quality',
        area: 'Inspection'
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
    // Manufacturing shift handovers across departments
    return [
      {
        id: '1',
        shiftId: '1',
        fromUserId: '1', // Jean-Marc Dubois (Press Operator)
        toUserId: '2',   // Marie Leclerc (Body Shop Supervisor)
        status: 'pending',
        approvedAt: null,
        remarks: 'Press Shop handover: Line 1 running smoothly, new coil installed. Quality checks passed. Line 2 needs bearing replacement next week.',
        createdAt: new Date(Date.now() - 30 * 60 * 1000),
        department: 'Press Shop',
        area: 'Production Handover'
      },
      {
        id: '2',
        shiftId: '1',
        fromUserId: '2', // Marie Leclerc (Body Shop Supervisor)
        toUserId: '3',   // Pierre Moreau (Paint Operator)
        status: 'approved',
        approvedAt: new Date(Date.now() - 15 * 60 * 1000),
        remarks: 'Body Shop handover: 47 BIW units completed. Robot R12 maintenance done. Jig #3 calibrated. Quality: all dimensional checks passed.',
        createdAt: new Date(Date.now() - 45 * 60 * 1000),
        department: 'Body Shop',
        area: 'Production Handover'
      },
      {
        id: '3',
        shiftId: '1',
        fromUserId: '3', // Pierre Moreau (Paint Operator)
        toUserId: '4',   // Sophie Martin (Assembly Team Lead)
        status: 'pending',
        approvedAt: null,
        remarks: 'Paint Shop handover: Environmental controls optimal. PTQA quality: 99.1% pass rate. 3 units re-sprayed. Booth #2 filters changed.',
        createdAt: new Date(Date.now() - 10 * 60 * 1000),
        department: 'Paint Shop',
        area: 'Production Handover'
      },
      {
        id: '4',
        shiftId: '1',
        fromUserId: '4', // Sophie Martin (Assembly Team Lead)
        toUserId: '5',   // Ahmed Benali (Quality Inspector)
        status: 'pending',
        approvedAt: null,
        remarks: 'Assembly handover: 52 vehicles completed. Torque specifications verified. Poka-yoke system active. Final inspection: 98.1% pass rate.',
        createdAt: new Date(Date.now() - 5 * 60 * 1000),
        department: 'Assembly Shop',
        area: 'Production Handover'
      },
      {
        id: '5',
        shiftId: '1',
        fromUserId: '6', // Carlos Rodriguez (Maintenance Tech)
        toUserId: '8',   // Thomas Schneider (Shift Manager)
        status: 'approved',
        approvedAt: new Date(Date.now() - 20 * 60 * 1000),
        remarks: 'Maintenance handover: Predictive maintenance completed on Press #1. All safety systems verified. No critical issues reported.',
        createdAt: new Date(Date.now() - 60 * 60 * 1000),
        department: 'Maintenance',
        area: 'Maintenance Handover'
      },
      {
        id: '6',
        shiftId: '1',
        fromUserId: '7', // Anna Kowalski (Safety Officer)
        toUserId: '8',   // Thomas Schneider (Shift Manager)
        status: 'pending',
        approvedAt: null,
        remarks: 'Safety handover: All emergency stops functional. 5 operators completed safety training. Environmental compliance checks passed. No incidents.',
        createdAt: new Date(),
        department: 'Safety & Environment',
        area: 'Safety Handover'
      }
    ];
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
