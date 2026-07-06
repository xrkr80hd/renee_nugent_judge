"use server";

import { sendAlert } from "@/lib/alerts";
import { clearAdminSession, createAdminSession, isAdminAuthenticated, validAdminPassword, validAdminUsername } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const volunteerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  address1: z.string().optional(),
  address2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  interests: z.array(z.string()).default([])
});

const donationSubmissionSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  address1: z.string().min(3),
  address2: z.string().optional(),
  city: z.string().min(2),
  state: z.string().min(2),
  zip: z.string().min(5),
  amount: z.string().optional(),
  notes: z.string().optional()
});

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10)
});

async function normalizeEventOrder(eventIds: string[]) {
  await prisma.$transaction(
    eventIds.map((id, index) => prisma.event.update({ where: { id }, data: { sortOrder: index } }))
  );
}

async function normalizeEndorsementOrder(endorsementIds: string[]) {
  await prisma.$transaction(
    endorsementIds.map((id, index) => prisma.endorsement.update({ where: { id }, data: { sortOrder: index } }))
  );
}

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
    address1: formData.get("address1"),
    address2: formData.get("address2"),
    city: formData.get("city"),
    state: formData.get("state"),
    zip: formData.get("zip"),
    interests: formData.getAll("interests")
  });

  await prisma.volunteer.create({
    data: {
      ...parsed,
      interests: parsed.interests.join(", ")
    }
  });

  await sendAlert({
    type: "volunteer_signup",
    title: "New Volunteer Signup",
    path: "/volunteer",
    occurredAt: new Date().toISOString(),
    data: {
      name: parsed.name,
      email: parsed.email,
      phone: parsed.phone || null,
      address1: parsed.address1 || null,
      address2: parsed.address2 || null,
      city: parsed.city || null,
      state: parsed.state || null,
      zip: parsed.zip || null,
      interests: parsed.interests
    }
  });

  redirect("/volunteer?success=1");
}

export async function donationSubmissionAction(formData: FormData) {
  const parsed = donationSubmissionSchema.parse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    address1: formData.get("address1"),
    address2: formData.get("address2"),
    city: formData.get("city"),
    state: formData.get("state"),
    zip: formData.get("zip"),
    amount: formData.get("amount"),
    notes: formData.get("notes")
  });

  await prisma.donationSubmission.create({ data: parsed });

  await sendAlert({
    type: "donation_submission",
    title: "New Donor Reporting Submission",
    path: "/donate",
    occurredAt: new Date().toISOString(),
    data: {
      name: parsed.name,
      email: parsed.email,
      phone: parsed.phone || null,
      amount: parsed.amount || null,
      address1: parsed.address1,
      address2: parsed.address2 || null,
      city: parsed.city,
      state: parsed.state,
      zip: parsed.zip,
      notes: parsed.notes || null
    }
  });

  redirect("/donate?success=1");
}

export async function updateVolunteerStatusAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const contacted = formData.get("contacted") === "on";
  const confirmed = formData.get("confirmed") === "on";

  if (!id) {
    redirect("/admin");
  }

  // Confirmed volunteers are always treated as contacted.
  await prisma.volunteer.update({
    where: { id },
    data: {
      contacted: contacted || confirmed,
      confirmed
    }
  });

  revalidatePath("/admin");
  redirect("/admin");
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
    isPublished: true
  };

  if (id) {
    await prisma.event.update({ where: { id }, data });
  } else {
    const lastEvent = await prisma.event.findFirst({ orderBy: [{ sortOrder: "desc" }, { startsAt: "asc" }] });
    await prisma.event.create({ data: { ...data, sortOrder: (lastEvent?.sortOrder ?? -1) + 1 } });
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
    const remainingEvents = await prisma.event.findMany({ orderBy: [{ sortOrder: "asc" }, { startsAt: "asc" }], select: { id: true } });
    await normalizeEventOrder(remainingEvents.map((event) => event.id));
  }

  revalidatePath("/events");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function moveEventAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const direction = String(formData.get("direction") ?? "");
  const events = await prisma.event.findMany({ orderBy: [{ sortOrder: "asc" }, { startsAt: "asc" }], select: { id: true } });
  const currentIndex = events.findIndex((event) => event.id === id);

  if (currentIndex === -1) {
    redirect("/admin");
  }

  const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
  if (targetIndex < 0 || targetIndex >= events.length) {
    redirect("/admin");
  }

  const reordered = [...events];
  [reordered[currentIndex], reordered[targetIndex]] = [reordered[targetIndex], reordered[currentIndex]];
  await normalizeEventOrder(reordered.map((event) => event.id));

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
    isPublished: true
  };

  if (id) {
    await prisma.endorsement.update({ where: { id }, data });
  } else {
    const lastEndorsement = await prisma.endorsement.findFirst({ orderBy: [{ sortOrder: "desc" }, { createdAt: "desc" }] });
    await prisma.endorsement.create({ data: { ...data, sortOrder: (lastEndorsement?.sortOrder ?? -1) + 1 } });
  }

  revalidatePath("/endorsements");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteEndorsementAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");

  if (id) {
    await prisma.endorsement.delete({ where: { id } });
    const remainingEndorsements = await prisma.endorsement.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }], select: { id: true } });
    await normalizeEndorsementOrder(remainingEndorsements.map((endorsement) => endorsement.id));
  }

  revalidatePath("/endorsements");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function moveEndorsementAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const direction = String(formData.get("direction") ?? "");
  const endorsements = await prisma.endorsement.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }], select: { id: true } });
  const currentIndex = endorsements.findIndex((endorsement) => endorsement.id === id);

  if (currentIndex === -1) {
    redirect("/admin");
  }

  const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
  if (targetIndex < 0 || targetIndex >= endorsements.length) {
    redirect("/admin");
  }

  const reordered = [...endorsements];
  [reordered[currentIndex], reordered[targetIndex]] = [reordered[targetIndex], reordered[currentIndex]];
  await normalizeEndorsementOrder(reordered.map((endorsement) => endorsement.id));

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
