import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";

const cookieName = "campaign-admin";

function secret() {
  return process.env.SESSION_SECRET ?? "local-development-session-secret";
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

export async function createAdminSession() {
  const value = `admin.${Date.now()}`;
  const token = `${value}.${sign(value)}`;
  const store = await cookies();
  store.set(cookieName, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8
  });
}

export async function clearAdminSession() {
  const store = await cookies();
  store.delete(cookieName);
}

export async function isAdminAuthenticated() {
  const store = await cookies();
  const token = store.get(cookieName)?.value;
  if (!token) return false;

  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const value = `${parts[0]}.${parts[1]}`;
  const expected = sign(value);
  const provided = parts[2];

  try {
    return timingSafeEqual(Buffer.from(expected), Buffer.from(provided));
  } catch {
    return false;
  }
}

export function validAdminPassword(password: string) {
  const configured = process.env.ADMIN_PASSWORD ?? "change-this-password";
  try {
    return timingSafeEqual(Buffer.from(password), Buffer.from(configured));
  } catch {
    return false;
  }
}

export function validAdminUsername(username: string) {
  const configured = process.env.ADMIN_USERNAME ?? "change-this-username";
  try {
    return timingSafeEqual(Buffer.from(username), Buffer.from(configured));
  } catch {
    return false;
  }
}
