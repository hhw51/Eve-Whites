import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export const config = {
  api: { bodyParser: false },
}

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
    const formData = await req.formData()

    // Required fields
    const fullName = formData.get("fullName")?.toString()
    const email = formData.get("email")?.toString()
    if (!fullName || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Optional fields
    const phone = formData.get("phone")?.toString()
    const occasion = formData.get("occasion")?.toString()
    const bust = formData.get("bust")?.toString()
    const waist = formData.get("waist")?.toString()
    const hips = formData.get("hips")?.toString()
    const shoulderWidth = formData.get("shoulderWidth")?.toString()
    const length = formData.get("length")?.toString()
    const sleeveLength = formData.get("sleeveLength")?.toString()
    const neckline = formData.get("neckline")?.toString()
    const backDesign = formData.get("backDesign")?.toString()
    const additionalNotes = formData.get("additionalNotes")?.toString()

    // Favorites array
    const favoritesRaw = formData.get("favorites")?.toString()
    const favorites = favoritesRaw ? JSON.parse(favoritesRaw) : []
    if (!Array.isArray(favorites) || favorites.length === 0) {
      return NextResponse.json({ error: "No favorites provided" }, { status: 400 })
    }

    // Reference image
    let referenceImage = formData.get("referenceImage")
    if (!(referenceImage instanceof File)) referenceImage = null

    let attachments = []
    if (referenceImage) {
      attachments.push({
        filename: referenceImage.name,
        content: Buffer.from(await referenceImage.arrayBuffer()),
        contentType: referenceImage.type,
      })
    }

    // Build favorites HTML
    const favoritesHtml = favorites
      .map(
        (item: any) => `
        <table width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 25px 0;border:1px solid #e8e8e8;border-radius:14px;overflow:hidden;">
          <tr>
            <td width="120" style="padding:0;">
              <img src="${item.image}" width="120" style="display:block;width:120px;height:120px;object-fit:cover;" />
            </td>
            <td style="padding:15px 20px;vertical-align:middle;">
              <div style="font-size:18px;font-weight:600;color:#111;margin-bottom:6px;">
                ${item.name}
              </div>
              <div style="font-size:13px;color:#777;">
                Product ID: ${item.id}
              </div>
            </td>
          </tr>
        </table>`
      )
      .join("")

    // Admin email template
    const htmlAdmin = `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; padding:40px; background:#fafafa; color:#333;">
        <div style="text-align:center; margin-bottom:25px;">
          <img src="https://i.ibb.co/NC0tYLx/eve-whites-logo.png"
               alt="EVE WHITES"
               style="width:180px; opacity:0.95;" />
        </div>
        <h1 style="text-align:center;font-weight:300;font-size:28px;letter-spacing:1px;color:#000;margin-bottom:40px;">
          NEW FAVORITES SUBMISSION
        </h1>
        <div style="background:#fff;padding:30px;border-radius:16px;border:1px solid #eee;">
          <h2 style="font-weight:500;font-size:20px;margin-bottom:10px;color:#000;">Customer Information</h2>
          <p><b>Name:</b> ${fullName}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone:</b> ${phone || "-"}</p>
          <hr style="margin:30px 0;border:none;border-top:1px solid #eee;">
          <h2 style="font-weight:500;font-size:20px;margin-bottom:10px;color:#000;">Design Preferences</h2>
          <p><b>Occasion:</b> ${occasion || "-"}</p>
          <p><b>Neckline:</b> ${neckline || "-"}</p>
          <p><b>Back Design:</b> ${backDesign || "-"}</p>
          <p><b>Additional Notes:</b> ${additionalNotes || "-"}</p>
          <hr style="margin:30px 0;border:none;border-top:1px solid #eee;">
          <h2 style="font-weight:500;font-size:20px;margin-bottom:10px;color:#000;">Measurements</h2>
          <p><b>Bust:</b> ${bust || "-"}</p>
          <p><b>Waist:</b> ${waist || "-"}</p>
          <p><b>Hips:</b> ${hips || "-"}</p>
          <p><b>Shoulder Width:</b> ${shoulderWidth || "-"}</p>
          <p><b>Length:</b> ${length || "-"}</p>
          <p><b>Sleeve Length:</b> ${sleeveLength || "-"}</p>
          <hr style="margin:30px 0;border:none;border-top:1px solid #eee;">
          <h2 style="font-weight:500;font-size:20px;margin-bottom:20px;color:#000;">Favorited Items (${favorites.length})</h2>
          ${favoritesHtml}
        </div>
        <p style="text-align:center;margin-top:40px;font-size:12px;color:#999;">
          Submitted on ${new Date().toLocaleString()}
        </p>
      </div>
    `

    // Customer email template
    const htmlCustomer = `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; padding:40px; background:#fafafa; color:#333;">
        <div style="text-align:center; margin-bottom:25px;">
          <img src="https://i.ibb.co/NC0tYLx/eve-whites-logo.png"
               alt="EVE WHITES"
               style="width:180px; opacity:0.95;" />
        </div>
        <h1 style="text-align:center;font-weight:300;font-size:28px;letter-spacing:1px;color:#000;margin-bottom:20px;">
          Thank You, ${fullName}! 💗
        </h1>
        <p style="text-align:center; font-size:16px; color:#555; line-height:1.6; max-width:600px; margin:0 auto 30px;">
          We’ve received your selected favorites and custom measurements.  
          Our design team at <b>EVE WHITES</b> will get in touch with you shortly
          to guide you through the next steps and finalize your bespoke outfit.
        </p>
        <div style="background:#fff;padding:30px;border-radius:16px;border:1px solid #eee;max-width:700px;margin:0 auto;">
          <h2 style="font-weight:500;font-size:20px;margin-bottom:20px;color:#000;">Your Favorites</h2>
          ${favoritesHtml}
        </div>
        <p style="margin-top:40px;text-align:center;color:#666;font-size:14px;">
          With love,<br>
          <b style="font-size:16px;">The EVE WHITES Team</b>
        </p>
      </div>
    `

    // Send to admin
    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: `New Favorites — ${fullName}`,
      html: htmlAdmin,
      attachments,
      replyTo: email,
    })

    // Send confirmation to customer
    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL,
      to: email,
      subject: "We Received Your Favorites — EVE WHITES",
      html: htmlCustomer,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("API ERROR:", error)
    return NextResponse.json({ 
      error: (error as any)?.message || "Server Error",
      stack: (error as any)?.stack
    }, { status: 500 })
  }
  
}
