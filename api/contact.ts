import type { VercelRequest, VercelResponse } from "@vercel/node";
import { insertMessageSchema } from "../shared/schema";
import nodemailer from "nodemailer";
import { storage } from "../server/storage";

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
