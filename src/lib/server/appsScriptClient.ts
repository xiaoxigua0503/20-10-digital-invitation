import { ApiErr, ApiOk } from "@/lib/rsvp";

export async function callAppsScript<T>({
  action,
  payload,
}: {
  action: string;
  payload: unknown;
}): Promise<ApiOk<T> | ApiErr> {
  const url = process.env.GOOGLE_SCRIPT_URL;
  const token = process.env.GOOGLE_SCRIPT_TOKEN;

  if (!url) return { ok: false, error: "Missing GOOGLE_SCRIPT_URL" };
  if (!token) return { ok: false, error: "Missing GOOGLE_SCRIPT_TOKEN" };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Token": token,
    },
    body: JSON.stringify({ action, payload }),
    cache: "no-store",
  });

  const data = (await res.json().catch(() => null)) as unknown;
  if (!res.ok) {
  const text = await res.text().catch(() => "");
  return {
    ok: false,
    error: `HTTP ${res.status}: ${text}`,
  };
}

if (!data || typeof data !== "object") {
  const text = await res.text().catch(() => "");
  return {
    ok: false,
    error: `Invalid JSON response: ${text}`,
  };
}

  const shape = data as { ok?: unknown; data?: unknown; error?: unknown };
  if (shape.ok === true) return { ok: true, data: shape.data as T };
  return { ok: false, error: String(shape.error ?? "Request failed") };
}

