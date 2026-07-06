type AlertPayload = {
  type: "volunteer_signup" | "donation_submission" | "page_visit";
  title: string;
  path?: string;
  occurredAt: string;
  data: Record<string, unknown>;
};

function ownerEmail() {
  return process.env.ALERT_OWNER_EMAIL?.trim() || "reneefor35jdc@gmail.com";
}

function webhookUrl() {
  return process.env.ALERT_WEBHOOK_URL?.trim();
}

export function alertsEnabled() {
  return Boolean(webhookUrl());
}

export async function sendAlert(payload: AlertPayload) {
  const url = webhookUrl();
  if (!url) return;

  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...payload,
        recipientEmail: ownerEmail()
      }),
      cache: "no-store"
    });
  } catch {
    // Alerts should never break the user flow.
  }
}
