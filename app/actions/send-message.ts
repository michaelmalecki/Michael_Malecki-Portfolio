"use server"

import { Resend } from "resend"

type SendMessageResult = {
  success: boolean
  error?: string
}

export async function sendMessage(formData: FormData): Promise<SendMessageResult> {
  const name = (formData.get("name") as string)?.trim()
  const email = (formData.get("email") as string)?.trim()
  const subject = (formData.get("subject") as string)?.trim()
  const message = (formData.get("message") as string)?.trim()

  if (!name || !email || !subject || !message) {
    return { success: false, error: "Please fill out all fields." }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { success: false, error: "Please enter a valid email address." }
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return { success: false, error: "Email service is not configured. Please try again later." }
  }

  const resend = new Resend(apiKey)

  try {
    const { error } = await resend.emails.send({
      // Uses Resend's shared onboarding domain so it works without domain setup.
      // Swap to an address on your own verified domain for production.
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["maleckimichael81@gmail.com"],
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `New message from your portfolio contact form:

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}`,
    })

    if (error) {
      console.log("[v0] Resend error:", error)
      return { success: false, error: "Failed to send message. Please try again." }
    }

    return { success: true }
  } catch (err) {
    console.log("[v0] send-message exception:", err)
    return { success: false, error: "Something went wrong. Please try again." }
  }
}
