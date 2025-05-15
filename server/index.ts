import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  handleContact,
  handleGetSkills,
  handlePostSkills,
  handlePatchSkills,
  handleDeleteSkills,
  handleGetProjects,
  handlePostProjects,
  handlePatchProjects,
  handleDeleteProjects,
  handleGetAbout,
  handlePatchAbout,
} from "./routes";

// Helper function to log request details
const log = (message: string) => console.log(message);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { path, method } = req;
  const start = Date.now();

  try {
    // Route handling
    if (path === "/api/contact" && method === "POST") {
      return await handleContact(req, res);
    } else if (path === "/api/admin/skills" && method === "GET") {
      return await handleGetSkills(req, res);
    } else if (path === "/api/admin/skills" && method === "POST") {
      return await handlePostSkills(req, res);
    } else if (path === "/api/admin/skills/:id" && method === "PATCH") {
      req.query.id = req.query.id || req.params.id; // Adjust for Vercel params
      return await handlePatchSkills(req, res);
    } else if (path === "/api/admin/skills/:id" && method === "DELETE") {
      req.query.id = req.query.id || req.params.id;
      return await handleDeleteSkills(req, res);
    } else if (path === "/api/admin/projects" && method === "GET") {
      return await handleGetProjects(req, res);
    } else if (path === "/api/admin/projects" && method === "POST") {
      return await handlePostProjects(req, res);
    } else if (path === "/api/admin/projects/:id" && method === "PATCH") {
      req.query.id = req.query.id || req.params.id;
      return await handlePatchProjects(req, res);
    } else if (path === "/api/admin/projects/:id" && method === "DELETE") {
      req.query.id = req.query.id || req.params.id;
      return await handleDeleteProjects(req, res);
    } else if (path === "/api/admin/about" && method === "GET") {
      return await handleGetAbout(req, res);
    } else if (path === "/api/admin/about" && method === "PATCH") {
      return await handlePatchAbout(req, res);
    }

    res.status(404).json({ error: "Not Found" });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${method} ${path} ${res.statusCode} in ${duration}ms`;
      if (res.getHeader("Content-Type")?.includes("application/json")) {
        logLine += ` :: ${JSON.stringify(
          res.getHeader("Content-Length")
            ? res.getHeader("Content-Length")
            : "unknown"
        )}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }
      log(logLine);
    }
  }
}
