"use server"

import nodemailer from "nodemailer"

export type ContactInput = {
  name: string
  email: string
  company?: string
  subject?: string
  message: string
  /** Honeypot — must be empty; bots tend to fill it. */
  website?: string
}

export type ContactState = { status: "success" | "error"; message: string }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

export async function submitContact(input: ContactInput): Promise<ContactState> {
  const name = (input.name ?? "").trim()
  const email = (input.email ?? "").trim()
  const company = (input.company ?? "").trim()
  const subject = (input.subject ?? "").trim()
  const message = (input.message ?? "").trim()

  // Silently accept (and drop) anything that trips the honeypot.
  if ((input.website ?? "").trim()) return { status: "success", message: "Thanks! Your message has been sent." }

  if (!name || !email || !message) {
    return { status: "error", message: "Please fill in your name, email, and message." }
  }
  if (!EMAIL_RE.test(email)) {
    return { status: "error", message: "Please enter a valid email address." }
  }
  if (message.length > 5000 || name.length > 200) {
    return { status: "error", message: "That message is a little too long — please shorten it." }
  }

  // Non-secret defaults so deployment only needs the SMTP_PASS secret set.
  const host = process.env.SMTP_HOST || "smtp.hostinger.com"
  const port = Number(process.env.SMTP_PORT) || 465
  const secure = String(process.env.SMTP_SECURE ?? "true") !== "false"
  const user = process.env.SMTP_USER || "voice@9278.io"
  const pass = process.env.SMTP_PASS
  const to = process.env.CONTACT_TO || user

  if (!pass) {
    console.error("[contact] SMTP_PASS is not set — cannot send mail")
    return {
      status: "error",
      message: "Sorry, the contact form is temporarily unavailable. Please email us at support@9278.io.",
    }
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    // Don't let a slow SMTP server hang the serverless function.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  })

  const heading = subject || "Website enquiry"
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    company ? `Company: ${company}` : null,
    subject ? `Subject: ${subject}` : null,
    "",
    message,
  ]
    .filter((l) => l !== null)
    .join("\n")

  const html = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#0f172a">
  <h2 style="margin:0 0 16px;font-size:18px">New contact form submission</h2>
  <p style="margin:4px 0"><strong>Name:</strong> ${escapeHtml(name)}</p>
  <p style="margin:4px 0"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
  ${company ? `<p style="margin:4px 0"><strong>Company:</strong> ${escapeHtml(company)}</p>` : ""}
  ${subject ? `<p style="margin:4px 0"><strong>Subject:</strong> ${escapeHtml(subject)}</p>` : ""}
  <p style="margin:16px 0 4px"><strong>Message:</strong></p>
  <p style="margin:0;white-space:pre-wrap">${escapeHtml(message)}</p>
</div>`

  try {
    await transporter.sendMail({
      from: `"9278.io Contact" <${user}>`,
      to,
      replyTo: `"${name.replace(/"/g, "")}" <${email}>`,
      subject: `New contact: ${heading} — ${name}`,
      text,
      html,
    })
    return { status: "success", message: "Thanks for reaching out! Your message is on its way — we'll get back to you soon." }
  } catch (err) {
    console.error("[contact] sendMail failed:", err)
    return {
      status: "error",
      message: "Something went wrong sending your message. Please try again, or email us at support@9278.io.",
    }
  }
}
