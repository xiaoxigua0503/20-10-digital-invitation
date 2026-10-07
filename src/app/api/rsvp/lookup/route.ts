import { NextResponse } from "next/server";
import { callAppsScript } from "@/lib/server/appsScriptClient";
import { RsvpLookupRequest } from "@/lib/rsvp";
import { isValidEmail, isValidPhone } from "@/lib/utils";

function badRequest(message: string) {
  return NextResponse.json({ ok: false, error: message }, { status: 400 });
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as RsvpLookupRequest | null;
  if (!body) return badRequest("Invalid JSON body");

  const emailRaw = String(body.email ?? "").trim().toLowerCase();
  const phoneRaw = String(body.phone ?? "").trim();

  const email = emailRaw ? emailRaw : undefined;
  const phone = phoneRaw ? phoneRaw : undefined;

  if (!email && !phone) return badRequest("Vui lòng nhập email hoặc số điện thoại");
  if (email && !isValidEmail(email)) return badRequest("Email không hợp lệ");
  if (phone && !isValidPhone(phone)) return badRequest("Số điện thoại không hợp lệ");

  const result = await callAppsScript<{
    found: boolean;
    record?: {
      timestamp: string;
      name: string;
      email: string;
      phone: string;
      attendance: "yes" | "no";
      guestCount: number;
      message: string;
    };
  }>({
    action: "lookup",
    payload: { email, phone },
  });

  const status = result.ok ? 200 : 502;
  return NextResponse.json(result, { status });
}

