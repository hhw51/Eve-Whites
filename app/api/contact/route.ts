import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: ["true", "ssl", "1"].includes((process.env.SMTP_SECURE ?? "").toLowerCase()),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Email to admin
    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL,
      to: process.env.ADMIN_EMAIL,
      replyTo: email,
      subject: `New Contact Message — ${name}`,
      html: `
        <div style="font-family:'Helvetica Neue',Arial,sans-serif;padding:40px;background:#fafafa;color:#333;">
          <div style="text-align:center;margin-bottom:25px;">
            <img src="https://i.ibb.co/NC0tYLx/eve-whites-logo.png" alt="EVE WHITES" style="width:180px;opacity:0.95;" />
          </div>
          <h1 style="text-align:center;font-weight:300;font-size:28px;letter-spacing:1px;color:#000;margin-bottom:40px;">
            NEW CONTACT MESSAGE
          </h1>
          <div style="background:#fff;padding:30px;border-radius:16px;border:1px solid #eee;">
            <p><b>Name:</b> ${name}</p>
            <p><b>Email:</b> ${email}</p>
            <hr style="margin:20px 0;border:none;border-top:1px solid #eee;" />
            <h2 style="font-weight:500;font-size:18px;color:#000;margin-bottom:10px;">Message</h2>
            <p style="white-space:pre-wrap;line-height:1.7;">${message}</p>
          </div>
          <p style="text-align:center;margin-top:40px;font-size:12px;color:#999;">
            Received on ${new Date().toLocaleString()}
          </p>
        </div>
      `,
    })

    // Acknowledgement to customer
    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL,
      to: email,
      subject: "Thank You for Reaching Out — EVE WHITES",
      html: `
        <div style="font-family:'Helvetica Neue',Arial,sans-serif;padding:40px;background:#fafafa;color:#333;">
          <div style="text-align:center;margin-bottom:25px;">
            <img src="https://i.ibb.co/NC0tYLx/eve-whites-logo.png" alt="EVE WHITES" style="width:180px;opacity:0.95;" />
          </div>
          <h1 style="text-align:center;font-weight:300;font-size:28px;letter-spacing:1px;color:#000;margin-bottom:20px;">
            Thank You, ${name}!
          </h1>
          <p style="text-align:center;font-size:16px;color:#555;line-height:1.7;max-width:560px;margin:0 auto 30px;">
            We've received your message and will get back to you as soon as possible.
            In the meantime, feel free to explore our collections or reach out to us directly via WhatsApp.
          </p>
          <div style="text-align:center;margin-top:30px;">
            <a href="https://wa.me/923250948136" style="background:#000;color:#fff;padding:14px 32px;text-decoration:none;font-weight:500;letter-spacing:1px;font-size:13px;">
              CHAT ON WHATSAPP
            </a>
          </div>
          <p style="margin-top:50px;text-align:center;color:#666;font-size:14px;">
            With love,<br/>
            <b style="font-size:16px;">The EVE WHITES Team</b>
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact API Error:", error)
    return NextResponse.json(
      { error: (error as Error).message || "Server error" },
      { status: 500 }
    )
  }
}
