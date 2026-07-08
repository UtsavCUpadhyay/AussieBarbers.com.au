"use server";

import { getSupabaseAdmin } from "@/lib/supabase";

export type ApplyResult = { ok: boolean; stored: boolean; error?: string };

const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();
const bool = (fd: FormData, k: string) => fd.get(k) === "on" || fd.get(k) === "true";

export async function submitApplication(formData: FormData): Promise<ApplyResult> {
  const fullName = str(formData, "fullName");
  const email = str(formData, "email");
  const phone = str(formData, "phone");

  if (!fullName || !email.includes("@") || phone.length < 8) {
    return { ok: false, stored: false, error: "Please fill in your name, a valid email and phone." };
  }

  const yearsRaw = str(formData, "years");
  const record = {
    full_name: fullName,
    email: email.toLowerCase(),
    phone,
    region: str(formData, "region") || null,
    service_suburbs: str(formData, "suburbs") || null,
    years_experience: yearsRaw ? Number(yearsRaw) : null,
    qualification: str(formData, "qualification") || null,
    specialties: str(formData, "specialties")
      ? str(formData, "specialties").split(",").map((s) => s.trim()).filter(Boolean)
      : [],
    right_to_work: bool(formData, "rightToWork"),
    has_abn: bool(formData, "hasAbn"),
    own_tools: bool(formData, "ownTools"),
    own_transport: bool(formData, "ownTransport"),
    insurance_status: str(formData, "insurance") || null,
    police_check_consent: bool(formData, "policeCheck"),
    portfolio_url: str(formData, "portfolio") || null,
    availability: str(formData, "availability") || null,
    cover_note: str(formData, "coverNote") || null,
  };

  const db = getSupabaseAdmin();
  if (!db) {
    console.info("[careers] application (no Supabase configured yet):", {
      name: fullName,
      email: record.email,
      years: record.years_experience,
    });
    return { ok: true, stored: false };
  }

  // Upload resume to private storage if provided.
  let resumeUrl: string | null = null;
  const resume = formData.get("resume");
  if (resume instanceof File && resume.size > 0) {
    if (resume.size > 8 * 1024 * 1024) {
      return { ok: false, stored: false, error: "Resume must be under 8 MB." };
    }
    const ext = resume.name.split(".").pop() || "pdf";
    const path = `${Date.now()}-${email.replace(/[^a-z0-9]/gi, "")}.${ext}`;
    const bytes = new Uint8Array(await resume.arrayBuffer());
    const { error: upErr } = await db.storage
      .from("resumes")
      .upload(path, bytes, { contentType: resume.type || "application/octet-stream" });
    if (!upErr) resumeUrl = path;
    else console.error("[careers] resume upload failed:", upErr.message);
  }

  const { error } = await db.from("applications").insert({ ...record, resume_url: resumeUrl });
  if (error) {
    console.error("[careers] insert failed:", error.message);
    return { ok: false, stored: false, error: "Something went wrong. Please try again." };
  }
  return { ok: true, stored: true };
}
