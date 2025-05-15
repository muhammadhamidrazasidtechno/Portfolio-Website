import type { VercelRequest, VercelResponse } from "@vercel/node";
import { insertMessageSchema } from "../shared/schema";
import { storage } from "../server/storage";
import nodemailer from "nodemailer";

const EMAIL_USER = process.env.EMAIL_USER || "hamidsidtechno@gmail.com";
const EMAIL_PASS = process.env.EMAIL_PASS || "lwtq pbtn fzrb exia";
const EMAIL_RECEIVER = process.env.EMAIL_RECEIVER || "hamidsidtechno@gmail.com";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const data = insertMessageSchema.parse(req.body);
    console.log("Received contact form data:", data);

    const message = await storage.createMessage(data);
    console.log("Message saved successfully:", message);

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
    console.log("Email sent successfully");

    res
      .status(200)
      .json({ success: true, message: "Message received and email sent!" });
  } catch (error) {
    console.error("Error in contact endpoint:", error);
    res.status(500).json({
      error: error instanceof Error ? error.message : "Internal server error",
    });
  }
}
