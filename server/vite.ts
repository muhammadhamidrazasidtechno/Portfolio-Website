import express from "express";
import fs from "fs";
import path from "path";

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}

export function serveStatic(app: express.Express) {
  const distPath = path.resolve(__dirname, "..", "dist", "public");

  if (!fs.existsSync(distPath)) {
    log(
      `Could not find the build directory: ${distPath}, ensure the client is built`,
      "error"
    );
    throw new Error(`Build directory ${distPath} not found`);
  }

  app.use(express.static(distPath));

  // Serve index.html for SPA fallback
  app.use("*", (req, res) => {
    const indexPath = path.resolve(distPath, "index.html");
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res
        .status(500)
        .json({ error: "Index file not found in build directory" });
    }
  });
}

// Remove setupVite function as it's not needed in Vercel production
// export async function setupVite(app: Express, server: Server) { ... }
