import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull(),
  fullName: text("full_name").notNull(),
});

export const shifts = pgTable("shifts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  shiftName: text("shift_name").notNull(),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  supervisorId: varchar("supervisor_id"),
  operatorId: varchar("operator_id"),
  status: text("status").notNull(),
});

export const logEntries = pgTable("log_entries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  shiftId: varchar("shift_id").notNull(),
  userId: varchar("user_id").notNull(),
  taskDescription: text("task_description").notNull(),
  remarks: text("remarks"),
  timestamp: timestamp("timestamp").notNull(),
  priority: text("priority").notNull(),
  status: text("status").notNull(),
  department: text("department"),
  area: text("area"),
});

export const machines = pgTable("machines", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  machineName: text("machine_name").notNull(),
  status: text("status").notNull(),
  uptime: integer("uptime").notNull(),
  lastMaintenance: timestamp("last_maintenance"),
  department: text("department"),
  area: text("area"),
});

export const handovers = pgTable("handovers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  shiftId: varchar("shift_id").notNull(),
  fromUserId: varchar("from_user_id").notNull(),
  toUserId: varchar("to_user_id"),
  status: text("status").notNull(),
  approvedAt: timestamp("approved_at"),
  remarks: text("remarks"),
  createdAt: timestamp("created_at").notNull(),
  department: text("department"),
  area: text("area"),
});

export const alerts = pgTable("alerts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  message: text("message").notNull(),
  severity: text("severity").notNull(),
  timestamp: timestamp("timestamp").notNull(),
  resolved: boolean("resolved").notNull().default(false),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  role: true,
  fullName: true,
});

export const insertLogEntrySchema = createInsertSchema(logEntries).omit({
  id: true,
});

export const insertHandoverSchema = createInsertSchema(handovers).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Shift = typeof shifts.$inferSelect;
export type LogEntry = typeof logEntries.$inferSelect;
export type Machine = typeof machines.$inferSelect;
export type Handover = typeof handovers.$inferSelect;
export type Alert = typeof alerts.$inferSelect;
export type InsertLogEntry = z.infer<typeof insertLogEntrySchema>;
export type InsertHandover = z.infer<typeof insertHandoverSchema>;
