import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertMessageSchema,
  insertSkillSchema,
  insertProjectSchema,
  insertAboutSchema,
} from "@shared/schema";
import nodemailer from "nodemailer";
import multer from "multer";
import fs from "fs";

// Load environment variables (recommended to use dotenv in production)
const EMAIL_USER = "hamidsidtechno@gmail.com";
const EMAIL_PASS = process.env.EMAIL_PASS || "lwtq pbtn fzrb exia";
const EMAIL_RECEIVER =
  process.env.EMAIL_RECEIVER || "mustafasidtechno@gmail.com";

// Ensure uploads directory exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log(`Created uploads directory at ${uploadDir}`);
}

const upload = multer({
  dest: uploadDir,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    console.log(
      `Filtering file: ${file.originalname}, mimetype: ${file.mimetype}`
    );
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"));
    }
    cb(null, true);
  },
});

export function registerRoutes(app: Express): Server {
  // Error handling middleware to catch unhandled errors
  app.use(
    (
      err: Error,
      req: Express.Request,
      res: Express.Response,
      next: Express.NextFunction
    ) => {
      console.error("Unhandled error:", err.stack);
      res.setHeader("Content-Type", "application/json");
      res.status(500).json({ error: "Internal server error" });
      next(err);
    }
  );

  // Contact form
  app.post("/api/contact", async (req, res) => {
    try {
      const data = insertMessageSchema.parse(req.body);
      console.log("Received contact form data:", data);
      const message = await storage.createMessage(data);

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: EMAIL_USER,
          pass: EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: data.email,
        to: EMAIL_RECEIVER,
        subject: "New Contact Form Submission",
        text: `
          You have received a new contact message:
          
          Name: ${data.name}
          Email: ${data.email}
          Message:
          ${data.message}
        `,
      };

      await transporter.sendMail(mailOptions);
      res
        .status(200)
        .json({ success: true, message: "Message received and email sent!" });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(400).json({ error: "Invalid message data or email failed" });
    }
  });

  // Image upload endpoint
  app.post(
    "/api/admin/upload-images",
    upload.array("images", 10),
    async (req, res) => {
      res.setHeader("Content-Type", "application/json");
      try {
        console.log("Received request for /api/admin/upload-images");
        console.log("Request body:", req.body);
        console.log("Request files:", req.files);
        const files = req.files as Express.Multer.File[];
        if (!files || files.length === 0) {
          return res.status(400).json({ error: "No images provided" });
        }
        if (files.length > 10) {
          return res
            .status(400)
            .json({ error: "Too many files uploaded. Maximum is 10." });
        }
        const imageUrls = files.map((file) => `/uploads/${file.filename}`);
        console.log("Generated image URLs:", imageUrls);
        res.status(200).json({ imageUrls });
      } catch (error) {
        console.error("Image upload error:", error);
        res.status(400).json({
          error:
            error instanceof Error ? error.message : "Failed to upload images",
        });
      }
    }
  );

  // Admin - Skills
  app.get("/api/admin/skills", async (req, res) => {
    try {
      const skills = await storage.getSkills();
      res.status(200).json(skills);
    } catch (error) {
      console.error("Get skills error:", error);
      res.status(500).json({ error: "Failed to fetch skills" });
    }
  });

  app.post("/api/admin/skills", async (req, res) => {
    try {
      const data = insertSkillSchema.parse(req.body);
      const skill = await storage.createSkill(data);
      res.status(201).json(skill);
    } catch (error) {
      console.error("Create skill error:", error);
      res.status(400).json({ error: "Invalid skill data" });
    }
  });

  app.patch("/api/admin/skills/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid skill ID" });
      }
      const data = insertSkillSchema.partial().parse(req.body);
      const skill = await storage.updateSkill(id, data);
      if (!skill) {
        return res.status(404).json({ error: "Skill not found" });
      }
      res.status(200).json(skill);
    } catch (error) {
      console.error("Update skill error:", error);
      res.status(400).json({ error: "Invalid skill data" });
    }
  });

  app.delete("/api/admin/skills/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid skill ID" });
      }
      await storage.deleteSkill(id);
      res.status(204).send();
    } catch (error) {
      console.error("Delete skill error:", error);
      res.status(400).json({ error: "Failed to delete skill" });
    }
  });

  // Admin - Projects
  app.get("/api/admin/projects", async (req, res) => {
    try {
      const projects = await storage.getProjects();
      res.status(200).json(projects);
    } catch (error) {
      console.error("Get projects error:", error);
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.post("/api/admin/projects", async (req, res) => {
    try {
      const data = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(data);
      res.status(201).json(project);
    } catch (error) {
      console.error("Create project error:", error);
      res.status(400).json({ error: "Invalid project data" });
    }
  });

  app.patch("/api/admin/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid project ID" });
      }
      const data = insertProjectSchema.partial().parse(req.body);
      const project = await storage.updateProject(id, data);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.status(200).json(project);
    } catch (error) {
      console.error("Update project error:", error);
      res.status(400).json({ error: "Invalid project data" });
    }
  });

  app.delete("/api/admin/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid project ID" });
      }
      await storage.deleteProject(id);
      res.status(204).send();
    } catch (error) {
      console.error("Delete project error:", error);
      res.status(400).json({ error: "Failed to delete project" });
    }
  });

  // Admin - About
  app.get("/api/admin/about", async (req, res) => {
    try {
      const about = await storage.getAbout();
      res.status(200).json(about);
    } catch (error) {
      console.error("Get about error:", error);
      res.status(500).json({ error: "Failed to fetch about data" });
    }
  });

  app.patch("/api/admin/about", async (req, res) => {
    try {
      const data = insertAboutSchema.parse(req.body);
      const about = await storage.updateAbout(data);
      res.status(200).json(about);
    } catch (error) {
      console.error("Update about error:", error);
      res.status(400).json({ error: "Invalid about data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
