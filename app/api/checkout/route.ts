import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

function formatItemsList(items: any[]): string {
  if (!items || items.length === 0) return "• No items specified"
  return items
    .map((item) => {
      let breakdownStr = ""
      const measurements = item.measurements
      if (measurements && typeof measurements === "object") {
        const parts = []
        if (measurements.bust) parts.push(`Bust: ${measurements.bust}cm`)
        if (measurements.waist) parts.push(`Waist: ${measurements.waist}cm`)
        if (measurements.hips) parts.push(`Hips: ${measurements.hips}cm`)
        if (measurements.shoulder) parts.push(`Shoulder: ${measurements.shoulder}cm`)
        if (measurements.length) parts.push(`Length: ${measurements.length}cm`)
        if (measurements.notes) parts.push(`Notes: ${measurements.notes}`)
        if (parts.length > 0) {
          breakdownStr = `\n   • Custom Sizing: ${parts.join(", ")}`
        }
      }
      return `• ${item.quantity}x ${item.name} — Rs. ${(item.price * item.quantity).toLocaleString()}${breakdownStr}`
    })
    .join("\n\n")
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      customerName,
      phone,
      email,
      city,
      shippingAddress,
      landmark,
      notes,
      items,
      totalAmount,
    } = body

    if (!customerName || !phone || !city || !shippingAddress || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Missing required order information." },
        { status: 400 }
      )
    }

    const orderId = `EW-${Date.now().toString().slice(-6)}`
    const itemsBreakdown = formatItemsList(items)
    const totalStr = `Rs. ${Number(totalAmount).toLocaleString()}`
    const adminPhone = "+923219981625"

    const directSupportUrl = `https://wa.me/923219981625?text=${encodeURIComponent(
      `Salam Eve Whites! I placed Order #${orderId} for ${items.map((i: any) => i.name).join(", ")}.`
    )}`

    // 1. CUSTOMER WHATSAPP TEMPLATE
    const customerWhatsApp =
      `✨ *Eve Whites Atelier — Order Confirmed!*\n\n` +
      `Thank you for choosing Eve Whites. Your bespoke order has been registered with our couture team.\n\n` +
      `*Order #:* ${orderId}\n` +
      `*Customer:* ${customerName}\n` +
      `*Delivery City:* ${city}\n` +
      `*Shipping Address:* ${shippingAddress}${landmark ? ` (Near: ${landmark})` : ""}\n` +
      `*Total Order Value:* ${totalStr} (50% Advance Upon Confirmation)\n\n` +
      `*Ordered Pieces & Specifications:*\n${itemsBreakdown}\n\n` +
      `*Production Timeline:* 2–3 Months Handcrafted Delivery\n` +
      `*Direct Atelier WhatsApp:* ${directSupportUrl}`

    // 2. ADMIN ALERT WHATSAPP TEMPLATE
    const adminAlertWhatsApp =
      `🚨 *NEW BESPOKE ORDER RECEIVED — EVE WHITES* 🚨\n\n` +
      `*Order #:* ${orderId}\n` +
      `*Customer Name:* ${customerName}\n` +
      `*Phone / WhatsApp:* ${phone}\n` +
      `*Email:* ${email || "N/A"}\n` +
      `*Delivery City:* ${city}\n` +
      `*Shipping Address:* ${shippingAddress}\n` +
      `*Landmark:* ${landmark || "N/A"}\n` +
      `*Total Order Value:* ${totalStr}\n\n` +
      `*Items Breakdown:*\n${itemsBreakdown}` +
      `${notes ? `\n\n*Special Notes:* ${notes}` : ""}`

    // DISPATCH VIA WHATSAPP WORKER (if configured)
    const workerUrl = process.env.WHATSAPP_WORKER_URL
    if (workerUrl) {
      try {
        await Promise.allSettled([
          // A. Dispatch to Customer
          fetch(workerUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone, message: customerWhatsApp }),
          }),
          // B. Dispatch to Shop Admin (+923219981625)
          fetch(workerUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone: adminPhone, message: adminAlertWhatsApp }),
          }),
        ])
      } catch (waError) {
        console.error("[WhatsApp Worker Dispatch Error]:", waError)
      }
    }

    // EMAIL BACKUP NOTIFICATION (Nodemailer)
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASSWORD
    if (smtpUser && smtpPass) {
      try {
        const secureFlag = ["true", "ssl", "1"].includes(
          String(process.env.SMTP_SECURE || "").trim().toLowerCase()
        )
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || "smtp.gmail.com",
          port: Number(process.env.SMTP_PORT) || 465,
          secure: secureFlag,
          auth: { user: smtpUser, pass: smtpPass },
        })

        const adminEmail = process.env.ADMIN_EMAIL || smtpUser

        // Admin notification email
        await transporter.sendMail({
          from: process.env.SMTP_FROM_EMAIL || `"Eve Whites Atelier" <${smtpUser}>`,
          to: adminEmail,
          subject: `New Bespoke Order #${orderId} - ${customerName} (${totalStr})`,
          text: adminAlertWhatsApp,
        }).catch((e) => console.error("[Admin Order Email Error]:", e))

        // Customer notification email (if provided)
        if (email) {
          await transporter.sendMail({
            from: process.env.SMTP_FROM_EMAIL || `"Eve Whites Atelier" <${smtpUser}>`,
            to: email,
            subject: `Order Confirmation #${orderId} - Eve Whites Atelier`,
            text: customerWhatsApp,
          }).catch((e) => console.error("[Customer Order Email Error]:", e))
        }
      } catch (mailError) {
        console.error("[Email Notification Error]:", mailError)
      }
    }

    return NextResponse.json({
      success: true,
      orderId,
      totalAmount,
      totalStr,
      directWhatsappUrl: `https://wa.me/923219981625?text=${encodeURIComponent(
        `Salam Eve Whites! I placed Order #${orderId}.\n\nCustomer: ${customerName}\nTotal: ${totalStr}\n\n${itemsBreakdown}`
      )}`,
      customerWhatsApp,
    })
  } catch (error: any) {
    console.error("[Checkout API Error]:", error)
    return NextResponse.json(
      { error: error.message || "Failed to process checkout" },
      { status: 500 }
    )
  }
}
