import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertLogEntrySchema, insertHandoverSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      return res.json({ 
        user: { 
          id: user.id, 
          username: user.username, 
          role: user.role, 
          fullName: user.fullName 
        } 
      });
    } catch (error) {
      return res.status(500).json({ error: "Login failed" });
    }
  });

  // Shifts
  app.get("/api/shifts", async (req, res) => {
    try {
      const shifts = await storage.getShifts();
      return res.json(shifts);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch shifts" });
    }
  });

  app.get("/api/shifts/current", async (req, res) => {
    try {
      const shift = await storage.getCurrentShift();
      return res.json(shift);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch current shift" });
    }
  });

  // Log entries
  app.get("/api/log-entries", async (req, res) => {
    try {
      const { shiftId } = req.query;
      const entries = shiftId 
        ? await storage.getLogEntriesByShift(shiftId as string)
        : await storage.getLogEntries();
      return res.json(entries);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch log entries" });
    }
  });

  app.post("/api/log-entries", async (req, res) => {
    try {
      const parsed = insertLogEntrySchema.parse(req.body);
      const entry = await storage.createLogEntry(parsed);
      return res.status(201).json(entry);
    } catch (error) {
      return res.status(400).json({ error: "Invalid log entry data" });
    }
  });

  // Machines
  app.get("/api/machines", async (req, res) => {
    try {
      const machines = await storage.getMachines();
      return res.json(machines);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch machines" });
    }
  });

  app.patch("/api/machines/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const machine = await storage.updateMachine(id, req.body);
      
      if (!machine) {
        return res.status(404).json({ error: "Machine not found" });
      }
      
      return res.json(machine);
    } catch (error) {
      return res.status(400).json({ error: "Failed to update machine" });
    }
  });

  // Handovers
  app.get("/api/handovers", async (req, res) => {
    try {
      const { status } = req.query;
      const handovers = status === "pending"
        ? await storage.getPendingHandovers()
        : await storage.getHandovers();
      return res.json(handovers);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch handovers" });
    }
  });

  app.post("/api/handovers", async (req, res) => {
    try {
      const parsed = insertHandoverSchema.parse(req.body);
      const handover = await storage.createHandover(parsed);
      return res.status(201).json(handover);
    } catch (error) {
      return res.status(400).json({ error: "Invalid handover data" });
    }
  });

  app.patch("/api/handovers/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const handover = await storage.updateHandover(id, req.body);
      
      if (!handover) {
        return res.status(404).json({ error: "Handover not found" });
      }
      
      return res.json(handover);
    } catch (error) {
      return res.status(400).json({ error: "Failed to update handover" });
    }
  });

  // Alerts
  app.get("/api/alerts", async (req, res) => {
    try {
      const { active } = req.query;
      const alerts = active === "true"
        ? await storage.getActiveAlerts()
        : await storage.getAlerts();
      return res.json(alerts);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch alerts" });
    }
  });

  app.post("/api/alerts", async (req, res) => {
    try {
      const { message, severity } = req.body;
      const alert = await storage.createAlert(message, severity);
      return res.status(201).json(alert);
    } catch (error) {
      return res.status(400).json({ error: "Invalid alert data" });
    }
  });

  app.patch("/api/alerts/:id/resolve", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.resolveAlert(id);
      return res.json({ success: true });
    } catch (error) {
      return res.status(400).json({ error: "Failed to resolve alert" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
