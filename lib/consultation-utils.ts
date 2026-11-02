"use client"

/**
 * Shared consultation form logic used by both ConsultationModal and OrderBotWidget.
 * Provides the form state shape, message generator, and contact handlers.
 */

export interface ConsultationFormData {
  name: string
  email: string
  phone: string
  bust: string
  waist: string
  hips: string
  shoulder: string
  length: string
  sleeve: string
  neckline: string
  backDesign: string
  occasion: string
  notes: string
}

export const INITIAL_FORM_DATA: ConsultationFormData = {
  name: "",
  email: "",
  phone: "",
  bust: "",
  waist: "",
  hips: "",
  shoulder: "",
  length: "",
  sleeve: "",
  neckline: "",
  backDesign: "",
  occasion: "",
  notes: "",
}

export const CONTACT_INFO = {
  whatsapp: "+923250948136",
  whatsappRaw: "923250948136",
  email: "info@evewhites.com",
  instagram: "evewhites.offical",
} as const

export function generateConsultationMessage(
  formData: ConsultationFormData,
  intent: "consultation" | "order" = "consultation"
): string {
  const action =
    intent === "consultation"
      ? "scheduling a consultation for a custom bridal ensemble"
      : "ordering a custom bridal ensemble"

  const hasData = Object.values(formData).some((v) => v)

  if (!hasData) {
    return `Hello Eve Whites! I'm interested in ${action}. Please guide me through the process.`
  }

  return `Hello Eve Whites!\n\nI'm interested in ${action}.\n\n*PERSONAL DETAILS*\nName: ${formData.name || "Not provided"}\nEmail: ${formData.email || "Not provided"}\nPhone: ${formData.phone || "Not provided"}\n\n*MEASUREMENTS (in cm)*\nBust: ${formData.bust || "-"}\nWaist: ${formData.waist || "-"}\nHips: ${formData.hips || "-"}\nShoulder Width: ${formData.shoulder || "-"}\nLength: ${formData.length || "-"}\nSleeve Length: ${formData.sleeve || "-"}\n\n*DESIGN PREFERENCES*\nNeckline: ${formData.neckline || "-"}\nBack Design: ${formData.backDesign || "-"}\nOccasion: ${formData.occasion || "-"}\n\n*ADDITIONAL NOTES*\n${formData.notes || "None"}\n\nPlease guide me through the process.`
}

export const NECKLINE_OPTIONS = [
  { value: "sweetheart", label: "Sweetheart" },
  { value: "plunging", label: "Plunging" },
  { value: "high-neck", label: "High Neck" },
  { value: "illusion", label: "Illusion" },
  { value: "off-shoulder", label: "Off-Shoulder" },
]

export const BACK_DESIGN_OPTIONS = [
  { value: "low-back", label: "Low Back" },
  { value: "open-back", label: "Open Back" },
  { value: "lace-up", label: "Lace Up" },
  { value: "button", label: "Button Back" },
  { value: "closed", label: "Closed Back" },
]

export const OCCASION_OPTIONS = [
  { value: "wedding", label: "Wedding" },
  { value: "engagement", label: "Engagement" },
  { value: "mehndi", label: "Mehndi" },
  { value: "walima", label: "Walima" },
  { value: "evening", label: "Evening Event" },
]
