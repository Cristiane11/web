import { Resend } from 'resend'
import nodemailer from 'nodemailer'

/** Sends an email with Resend if RESEND_API_KEY is set, otherwise via SMTP. */
export async function sendMail(opts: { to: string; subject: string; html: string; replyTo?: string }) {
  const { RESEND_API_KEY, RESEND_FROM, SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM } = process.env
  if (RESEND_API_KEY) {
    const { error } = await new Resend(RESEND_API_KEY).emails.send({
      from: RESEND_FROM || 'Website Bookings <onboarding@resend.dev>', to: opts.to, subject: opts.subject, html: opts.html, replyTo: opts.replyTo,
    })
    if (!error) return 'resend'
    if (!SMTP_HOST) throw new Error(`Resend error: ${error.message}`)
  }
  if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
    const port = Number(SMTP_PORT || 465)
    await nodemailer.createTransport({ host: SMTP_HOST, port, secure: port === 465, auth: { user: SMTP_USER, pass: SMTP_PASS } })
      .sendMail({ from: SMTP_FROM || SMTP_USER, to: opts.to, subject: opts.subject, html: opts.html, replyTo: opts.replyTo })
    return 'smtp'
  }
  throw new Error('No email provider configured (set RESEND_API_KEY or SMTP_* variables).')
}

export const esc = (s: unknown) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)
