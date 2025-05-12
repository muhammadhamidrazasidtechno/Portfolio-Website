import { pgTable, text, serial, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").default(false).notNull(),
});

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  icon: text("icon").notNull(),
  color: text("color").notNull(),
  category: text("category").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").array().notNull(),
  technologies: text("technologies").array().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const about = pgTable("about", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  experienceYears: text("experience_years").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Message schema
export const insertMessageSchema = createInsertSchema(messages)
  .pick({
    name: true,
    email: true,
    message: true,
  })
  .extend({
    email: z.string().email(),
    message: z.string().min(10),
  });

// User schema
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Skill schema
export const insertSkillSchema = createInsertSchema(skills).pick({
  name: true,
  icon: true,
  color: true,
  category: true,
});

// Project schema
export const insertProjectSchema = createInsertSchema(projects).pick({
  title: true,
  description: true,
  image: true,
  technologies: true,
});

// About schema
export const insertAboutSchema = createInsertSchema(about).pick({
  title: true,
  description: true,
  experienceYears: true,
});

export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertSkill = z.infer<typeof insertSkillSchema>;
export type Skill = typeof skills.$inferSelect;

export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;

export type InsertAbout = z.infer<typeof insertAboutSchema>;
export type About = typeof about.$inferSelect;
