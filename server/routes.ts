import type { VercelRequest, VercelResponse } from "@vercel/node";
import { storage } from "./storage";
import {
  insertMessageSchema,
  insertSkillSchema,
  insertProjectSchema,
  insertAboutSchema,
} from "@shared/schema";
import nodemailer from "nodemailer";

const EMAIL_USER = process.env.EMAIL_USER || "hamidsidtechno@gmail.com";
const EMAIL_PASS = process.env.EMAIL_PASS || "lwtq pbtn fzrb exia";
const EMAIL_RECEIVER = process.env.EMAIL_RECEIVER || "hamidsidtechno@gmail.com";

export async function handleContact(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const data = insertMessageSchema.parse(req.body);
    console.log("Received contact form data:", data);

    // Database operation
    let message;
    try {
      message = await storage.createMessage(data);
    } catch (dbError) {
      console.error("Database error in createMessage:", dbError);
      throw new Error("Failed to save message to database");
    }

    // Email operation
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: EMAIL_USER, pass: EMAIL_PASS },
      });

      const mailOptions = {
        from: data.email,
        to: EMAIL_RECEIVER,
        subject: "New Contact Form Submission",
        text: `
          You have received a new contact message:
          Name: ${data.name}
          Email: ${data.email}
          Message: ${data.message}
        `,
      };

      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error("Nodemailer error:", emailError);
      throw new Error("Failed to send email");
    }

    res
      .status(200)
      .json({ success: true, message: "Message received and email sent!" });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(400).json({
      error:
        error instanceof Error
          ? error.message
          : "Invalid message data or email failed",
    });
  }
}

// Admin - Skills handlers
export async function handleGetSkills(req: VercelRequest, res: VercelResponse) {
  try {
    const skills = await storage.getSkills();
    res.status(200).json(skills);
  } catch (error) {
    console.error("Get skills error:", error);
    res.status(500).json({ error: "Failed to fetch skills" });
  }
}

export async function handlePostSkills(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const data = insertSkillSchema.parse(req.body);
    const skill = await storage.createSkill(data);
    res.status(201).json(skill);
  } catch (error) {
    console.error("Create skill error:", error);
    res.status(400).json({ error: "Invalid skill data" });
  }
}

export async function handlePatchSkills(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const id = parseInt(req.query.id as string);
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
}

export async function handleDeleteSkills(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const id = parseInt(req.query.id as string);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid skill ID" });
    }
    await storage.deleteSkill(id);
    res.status(204).send();
  } catch (error) {
    console.error("Delete skill error:", error);
    res.status(400).json({ error: "Failed to delete skill" });
  }
}

// Admin - Projects handlers
export async function handleGetProjects(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    const projects = await storage.getProjects();
    res.status(200).json(projects);
  } catch (error) {
    console.error("Get projects error:", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
}

export async function handlePostProjects(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const data = insertProjectSchema.parse(req.body);
    const project = await storage.createProject(data);
    res.status(201).json(project);
  } catch (error) {
    console.error("Create project error:", error);
    res.status(400).json({ error: "Invalid project data" });
  }
}

export async function handlePatchProjects(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const id = parseInt(req.query.id as string);
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
}

export async function handleDeleteProjects(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const id = parseInt(req.query.id as string);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid project ID" });
    }
    await storage.deleteProject(id);
    res.status(204).send();
  } catch (error) {
    console.error("Delete project error:", error);
    res.status(400).json({ error: "Failed to delete project" });
  }
}

// Admin - About handlers
export async function handleGetAbout(req: VercelRequest, res: VercelResponse) {
  try {
    const about = await storage.getAbout();
    res.status(200).json(about);
  } catch (error) {
    console.error("Get about error:", error);
    res.status(500).json({ error: "Failed to fetch about data" });
  }
}

export async function handlePatchAbout(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const data = insertAboutSchema.parse(req.body);
    const about = await storage.updateAbout(data);
    res.status(200).json(about);
  } catch (error) {
    console.error("Update about error:", error);
    res.status(400).json({ error: "Invalid about data" });
  }
}
