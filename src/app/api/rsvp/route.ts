import { NextResponse } from "next/server";
import { callAppsScript } from "@/lib/server/appsScriptClient";
import { sendRsvpConfirmation } from "@/lib/server/email";
import { RsvpUpsertRequest } from "@/lib/rsvp";
import { clamp, isValidEmail, isValidPhone } from "@/lib/utils";

function badRequest(message: string) {
  return NextResponse.json({ ok: false, error: message }, { status: 400 });
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as RsvpUpsertRequest | null;
  if (!body) return badRequest("Invalid JSON body");

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const phone = String(body.phone ?? "").trim();
  const attendance = body.attendance === "no" ? "no" : "yes";
  const guestCountRaw = Number(body.guestCount);
  const guestCount = Number.isFinite(guestCountRaw)
    ? clamp(Math.floor(guestCountRaw), 0, 12)
    : 0;
  const message = String(body.message ?? "").trim();
  const website = String(body.website ?? "").trim();
  const startedAt = Number(body.startedAt ?? 0);

  if (website) return badRequest("Phát hiện dấu hiệu spam");
  if (!name) return badRequest("Vui lòng nhập họ tên");
  if (!email || !isValidEmail(email)) return badRequest("Email không hợp lệ");
  if (!phone || !isValidPhone(phone)) return badRequest("Số điện thoại không hợp lệ");
  if (attendance === "yes" && guestCount <= 0)
    return badRequest("Số khách phải ít nhất 1");
  if (attendance === "no") {
    if (guestCount !== 0) return badRequest("Số khách phải bằng 0 nếu không tham dự");
  }
  if (startedAt && Date.now() - startedAt < 1200) return badRequest("Vui lòng thử lại");

  const result = await callAppsScript<{ upserted: true }>({
    action: "upsert",
    payload: { name, email, phone, attendance, guestCount, message },
  });

  if (result.ok) {
    try {
      await sendRsvpConfirmation(email, name, attendance, guestCount);
    } catch (err) {
      console.error("Failed to send confirmation email:", err);
      // We still return success to the client even if the email fails.
    }
  }

  const status = result.ok ? 200 : 502;
  return NextResponse.json(result, { status });
}

