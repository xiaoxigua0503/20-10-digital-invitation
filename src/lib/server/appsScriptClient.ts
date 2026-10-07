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

  const endpoint = new URL(url);
  endpoint.searchParams.set("token", token);

  const res = await fetch(endpoint.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ action, payload }),
    cache: "no-store",
  });

  const responseText = await res.text();

console.log("Apps Script HTTP status:", res.status);
console.log("Apps Script response:", responseText);

let data: unknown = null;

try {
  data = JSON.parse(responseText);
} catch {
  return {
    ok: false,
    error: `Invalid JSON response (HTTP ${res.status}): ${responseText.slice(0, 300)}`,
  };
}

if (!data || typeof data !== "object") {
  return { ok: false, error: `Invalid JSON response (HTTP ${res.status})` };
}

  const shape = data as { ok?: unknown; data?: unknown; error?: unknown };
  if (!res.ok) {
    return {
      ok: false,
      error: `HTTP ${res.status}: ${String(shape.error ?? "Request failed")}`,
    };
  }

  if (shape.ok === true) return { ok: true, data: shape.data as T };
  return { ok: false, error: String(shape.error ?? "Request failed") };
}
