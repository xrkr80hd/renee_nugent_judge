"use server";

import { clearAdminSession, createAdminSession, isAdminAuthenticated, validAdminPassword, validAdminUsername } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const volunteerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  city: z.string().optional(),
  interests: z.array(z.string()).default([])
});

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10)
});

async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin");
  }
}

export async function loginAction(formData: FormData) {
  const username = String(formData.get("username") ?? "");
  const password = String(formData.get("password") ?? "");
  if (!validAdminUsername(username) || !validAdminPassword(password)) {
    redirect("/admin?error=1");
  }

  await createAdminSession();
  redirect("/admin");
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin");
}

export async function volunteerAction(formData: FormData) {
  const parsed = volunteerSchema.parse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    city: formData.get("city"),
    interests: formData.getAll("interests")
  });

  await prisma.volunteer.create({
    data: {
      ...parsed,
      interests: parsed.interests.join(", ")
    }
  });

  redirect("/volunteer?success=1");
}

export async function contactAction(formData: FormData) {
  const parsed = contactSchema.parse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message")
  });

  await prisma.contactSubmission.create({ data: parsed });
  redirect("/contact?success=1");
}

export async function saveEventAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const data = {
    title: String(formData.get("title") ?? ""),
    startsAt: new Date(String(formData.get("startsAt") ?? "")),
    location: String(formData.get("location") ?? ""),
    description: String(formData.get("description") ?? ""),
    isPublished: formData.get("isPublished") === "on"
  };

  if (id) {
    await prisma.event.update({ where: { id }, data });
  } else {
    await prisma.event.create({ data });
  }

  revalidatePath("/events");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteEventAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");

  if (id) {
    await prisma.event.delete({ where: { id } });
  }

  revalidatePath("/events");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function saveEndorsementAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const data = {
    name: String(formData.get("name") ?? ""),
    role: String(formData.get("role") ?? ""),
    quote: String(formData.get("quote") ?? ""),
    category: String(formData.get("category") ?? "Community Supporter"),
    isPublished: formData.get("isPublished") === "on"
  };

  if (id) {
    await prisma.endorsement.update({ where: { id }, data });
  } else {
    await prisma.endorsement.create({ data });
  }

  revalidatePath("/endorsements");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function saveSettingAction(formData: FormData) {
  await requireAdmin();
  const key = String(formData.get("key") ?? "");
  const value = String(formData.get("value") ?? "");

  await prisma.siteSetting.upsert({
    where: { key },
    update: { value },
    create: { key, value }
  });

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}
