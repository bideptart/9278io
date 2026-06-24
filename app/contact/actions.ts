"use server"

import nodemailer from "nodemailer"

export type ContactInput = {
  name: string
  email: string
  phone: string
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
  const phone = (input.phone ?? "").trim()
  const company = (input.company ?? "").trim()
  const subject = (input.subject ?? "").trim()
  const message = (input.message ?? "").trim()

  // Silently accept (and drop) anything that trips the honeypot.
  if ((input.website ?? "").trim()) return { status: "success", message: "Thanks! Your message has been sent." }

  if (!name || !email || !phone || !message) {
    return { status: "error", message: "Please fill in your name, email, mobile number, and message." }
  }
  if (!EMAIL_RE.test(email)) {
    return { status: "error", message: "Please enter a valid email address." }
  }
  const phoneDigits = phone.replace(/\D/g, "")
  if (phoneDigits.length < 7 || phoneDigits.length > 15) {
    return { status: "error", message: "Please enter a valid mobile number." }
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
    // Pool so the notification and the acknowledgement reuse ONE connection.
    // Without this each message opens a fresh TLS+auth handshake, and the
    // second one (the auto-reply) tends to hit the serverless timeout or get
    // throttled — which is why the acknowledgement wasn't arriving.
    pool: true,
    maxConnections: 1,
    maxMessages: 100,
    // Don't let a slow SMTP server hang the serverless function.
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  })

  const heading = subject || "Website enquiry"
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Mobile: ${phone}`,
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
  <p style="margin:4px 0"><strong>Mobile:</strong> <a href="tel:${escapeHtml(phone.replace(/\s+/g, ""))}">${escapeHtml(phone)}</a></p>
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
  } catch (err) {
    console.error("[contact] sendMail failed:", err)
    return {
      status: "error",
      message: "Something went wrong sending your message. Please try again, or email us at support@9278.io.",
    }
  }

  // Acknowledgement auto-reply to the person who submitted the form.
  // Best-effort: a failure here must not turn a delivered enquiry into an error.
  const firstName = name.split(/\s+/)[0] || name
  const ackText = [
    `Hi ${firstName},`,
    "",
    "Thanks for reaching out to 9278.io! We've received your message and a member of our team will get back to you shortly.",
    "",
    "For your records, here's a copy of what you sent us:",
    "",
    message,
    "",
    "Warm regards,",
    "The 9278.io Team",
  ].join("\n")

  const ackHtml = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#0f172a">
  <h2 style="margin:0 0 16px;font-size:18px">Thanks for reaching out, ${escapeHtml(firstName)}!</h2>
  <p style="margin:8px 0">We've received your message and a member of the <strong>9278.io</strong> team will get back to you shortly.</p>
  <p style="margin:16px 0 4px">For your records, here's a copy of what you sent us:</p>
  <blockquote style="margin:4px 0;padding:10px 14px;border-left:3px solid #2563eb;background:#f1f5f9;white-space:pre-wrap">${escapeHtml(message)}</blockquote>
  <p style="margin:16px 0 0">Warm regards,<br/>The 9278.io Team</p>
</div>`

  try {
    await transporter.sendMail({
      from: `"9278.io" <${user}>`,
      to: email,
      replyTo: `"9278.io" <${user}>`,
      subject: "We've received your message — 9278.io",
      text: ackText,
      html: ackHtml,
      headers: {
        "Auto-Submitted": "auto-replied",
        "X-Auto-Response-Suppress": "All",
      },
    })
  } catch (err) {
    console.error("[contact] acknowledgement auto-reply failed:", err)
  } finally {
    transporter.close()
  }

  return { status: "success", message: "Thanks for reaching out! Your message is on its way — we'll get back to you soon." }
}
