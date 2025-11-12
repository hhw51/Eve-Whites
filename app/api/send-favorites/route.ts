import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number.parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { fullName, email, phone, occasion, colorPalette, fabricType, customDescription, referenceImage, favorites } =
      data

    if (!fullName || !email || !favorites || favorites.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const favoritesHtml = favorites
      .map(
        (product: any) => `
      <div style="margin: 15px 0; padding: 15px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h4 style="margin: 0 0 10px 0; color: #1a1a1a;">${product.name}</h4>
        <p style="margin: 5px 0; color: #666;">Price: $${product.price}</p>
        <p style="margin: 5px 0; color: #666;">${product.description}</p>
      </div>
    `,
      )
      .join("")

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { border-bottom: 2px solid #000; padding-bottom: 20px; margin-bottom: 20px; }
            .header h1 { margin: 0; font-size: 24px; }
            .section { margin: 20px 0; }
            .section-title { font-weight: bold; font-size: 16px; margin-bottom: 10px; border-bottom: 1px solid #e0e0e0; padding-bottom: 5px; }
            .info-item { margin: 10px 0; }
            .info-label { font-weight: bold; color: #666; }
            .info-value { color: #333; }
            .favorites-section { background: #f9f9f9; padding: 15px; border-radius: 8px; }
            .footer { margin-top: 30px; border-top: 1px solid #e0e0e0; padding-top: 15px; text-align: center; font-size: 12px; color: #999; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>EVE WHITES - Favorites Submission</h1>
            </div>

            <div class="section">
              <div class="section-title">Customer Information</div>
              <div class="info-item">
                <span class="info-label">Name:</span>
                <span class="info-value">${fullName}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Email:</span>
                <span class="info-value">${email}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Phone:</span>
                <span class="info-value">${phone || "Not provided"}</span>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Design Preferences</div>
              <div class="info-item">
                <span class="info-label">Occasion:</span>
                <span class="info-value">${occasion || "Not specified"}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Color Palette:</span>
                <span class="info-value">${colorPalette || "Not specified"}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Fabric Type:</span>
                <span class="info-value">${fabricType || "Not specified"}</span>
              </div>
              ${
                customDescription
                  ? `<div class="info-item">
                <span class="info-label">Additional Notes:</span>
                <span class="info-value">${customDescription}</span>
              </div>`
                  : ""
              }
            </div>

            <div class="section">
              <div class="section-title">Favorited Items (${favorites.length})</div>
              <div class="favorites-section">
                ${favoritesHtml}
              </div>
            </div>

            <div class="footer">
              <p>This email was sent from EVE WHITES website</p>
              <p>${new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </body>
      </html>
    `

    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: `New Favorites Submission from ${fullName}`,
      html: htmlContent,
      replyTo: email,
    })

    const confirmationHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { border-bottom: 2px solid #000; padding-bottom: 20px; margin-bottom: 20px; }
            .header h1 { margin: 0; font-size: 24px; }
            .message { margin: 20px 0; line-height: 1.6; }
            .footer { margin-top: 30px; border-top: 1px solid #e0e0e0; padding-top: 15px; text-align: center; font-size: 12px; color: #999; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>EVE WHITES</h1>
            </div>
            <div class="message">
              <p>Dear ${fullName},</p>
              <p>Thank you for submitting your favorites! We've received your selection and preferences.</p>
              <p>Our team will review your favorites and design preferences shortly. We'll be in touch with you via email or phone to discuss custom options and next steps.</p>
              <p>We appreciate your interest in EVE WHITES and look forward to creating something beautiful for you.</p>
              <p>Best regards,<br>The EVE WHITES Team</p>
            </div>
            <div class="footer">
              <p>If you have any questions, please reply to this email.</p>
            </div>
          </div>
        </body>
      </html>
    `

    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL,
      to: email,
      subject: "Thank You - EVE WHITES Favorites Received",
      html: confirmationHtml,
    })

    return NextResponse.json({
      success: true,
      message: "Your favorites have been submitted successfully! You'll receive a confirmation email shortly.",
    })
  } catch (error) {
    console.error("Error processing favorites:", error)
    return NextResponse.json({ error: "Failed to send favorites. Please try again later." }, { status: 500 })
  }
}
