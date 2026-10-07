import { useMemo, useState } from "react";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { Button, ButtonSoft } from "@/components/Button";
import { ErrorText, Helper, Input, Label, Textarea } from "@/components/Field";
import { ApiErr, ApiOk, Attendance, RsvpRecord } from "@/lib/rsvp";
import { clamp, isValidEmail, isValidPhone } from "@/lib/utils";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

// ISO format for calendar: YYYYMMDDTHHMMSS
const CAL_START = "20261020T010000Z"; // 09:00 Chongqing = 01:00 UTC
const CAL_END   = "20261020T060000Z"; // 14:00 Chongqing = 06:00 UTC
const CAL_TITLE = "20/10 – Nâng cao niềm tin";
const CAL_LOCATION = "Chongqing, Trung Quốc";
const CAL_DESCRIPTION = "Lời mời học sinh Việt Nam tại Chongqing cho ngày 20/10.";

function buildGoogleCalendarUrl() {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: CAL_TITLE,
    dates: `${CAL_START}/${CAL_END}`,
    details: CAL_DESCRIPTION,
    location: CAL_LOCATION,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function downloadIcs() {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//20/10 Invitation//VI",
    "BEGIN:VEVENT",
    `DTSTART:${CAL_START}`,
    `DTEND:${CAL_END}`,
    `SUMMARY:${CAL_TITLE}`,
    `DESCRIPTION:${CAL_DESCRIPTION}`,
    `LOCATION:${CAL_LOCATION}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "20-10-invitation.ics";
  a.click();
  URL.revokeObjectURL(url);
}

type Status =
  | "idle"
  | "submitting"
  | "success"
  | "error"
  | "lookup"
  | "looking"
  | "notfound"
  | "editing";

type LookupResponse =
  | ApiOk<{ found: boolean; record?: RsvpRecord }>
  | ApiErr;

type UpsertResponse = ApiOk<{ upserted: true }> | ApiErr;

function FieldRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="font-sans text-xs tracking-[0.22em] uppercase text-ink-muted">
        {label}
      </p>
      <div className="mt-3">{children}</div>
    </div>
  );
}

export function RsvpSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [err, setErr] = useState<string | null>(null);
  const [startedAt] = useState(() => Date.now());
  const [honeypot, setHoneypot] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [attendance, setAttendance] = useState<Attendance>("yes");
  const [guestCount, setGuestCount] = useState(1);
  const [message, setMessage] = useState("");

  const canSubmit = useMemo(() => {
    if (!name.trim()) return false;
    if (!isValidEmail(email)) return false;
    if (!isValidPhone(phone)) return false;
    if (attendance === "yes" && guestCount <= 0) return false;
    if (attendance === "no" && guestCount !== 0) return false;
    return true;
  }, [attendance, email, guestCount, name, phone]);

  async function submit() {
    const isEditing = status === "editing";
    const confirmResult = await MySwal.fire({
      title: isEditing ? "Cập nhật RSVP?" : "Xác nhận tham dự",
      html: `Bạn có chắc chắn muốn ${isEditing ? "cập nhật" : "gửi"} thư mời không?<br/><br/><b>Tham dự:</b> ${attendance === "yes" ? "Có" : "Không"}<br/><b>Khách:</b> ${guestCount}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: isEditing ? "Vâng, cập nhật" : "Vâng, gửi",
      cancelButtonText: "Hủy",
      customClass: {
        popup: "card-bg-5 rounded-[36px] border border-white/45 shadow-[0_30px_110px_rgba(58,31,27,0.14)] backdrop-blur-md",
        title: "font-serif text-2xl text-ink",
        htmlContainer: "font-sans text-sm leading-7 text-ink-muted",
        confirmButton: "rounded-2xl bg-burgundy px-6 py-3 text-sm tracking-wide text-white font-sans mt-4 mx-2",
        cancelButton: "rounded-2xl border border-white/45 bg-white/55 px-6 py-3 text-sm tracking-wide text-ink-muted backdrop-blur-md hover:bg-white/70 font-sans mt-4 mx-2",
      },
      buttonsStyling: false,
    });

    if (!confirmResult.isConfirmed) {
      return;
    }

    setErr(null);
    setStatus("submitting");

    const payload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      attendance,
      guestCount: clamp(guestCount, 0, 12),
      message: message.trim(),
      website: honeypot,
      startedAt,
    };

    const res = await fetch("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await res.json().catch(() => null)) as UpsertResponse | null;

    if (!data || data.ok !== true) {
      setStatus("error");
      setErr(String((data as ApiErr | null)?.error ?? "Đã xảy ra lỗi. Vui lòng thử lại."));
      return;
    }

    setStatus("success");
    MySwal.fire({
      title: "Cảm ơn bạn!",
      html: (
        <div className="font-sans text-sm leading-7 text-ink-muted">
          <p>RSVP của bạn đã được lưu.</p>
          <p className="text-xs opacity-80 mt-1">
            Xác nhận đã được gửi đến hộp thư email của bạn!<br />
            (Nếu không thấy, hãy kiểm tra thư mục spam.)
          </p>
          {attendance === "yes" && (
            <div className="mt-5 border-t border-black/10 pt-4">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-ink/50 mb-3">
                Lưu ngày sự kiện
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href={buildGoogleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/45 bg-white/55 px-4 py-2.5 text-xs tracking-wide text-ink-muted backdrop-blur-md transition-colors hover:bg-white/70 hover:text-ink"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                  Thêm vào Google Calendar
                </a>
                <button
                  type="button"
                  onClick={downloadIcs}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/45 bg-white/55 px-4 py-2.5 text-xs tracking-wide text-ink-muted backdrop-blur-md transition-colors hover:bg-white/70 hover:text-ink"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                  Tải .ics (Apple / Outlook)
                </button>
              </div>
            </div>
          )}
        </div>
      ),
      icon: "success",
      confirmButtonText: "Close",
      customClass: {
        popup: "card-bg-5 rounded-[36px] border border-white/45 shadow-[0_30px_110px_rgba(58,31,27,0.14)] backdrop-blur-md",
        title: "font-serif text-2xl text-ink",
        htmlContainer: "font-sans text-sm leading-7 text-ink-muted",
        confirmButton: "rounded-2xl bg-burgundy px-6 py-3 text-sm tracking-wide text-white font-sans mt-4",
      },
      buttonsStyling: false,
    });
  }

  async function lookup() {
    setErr(null);
    setStatus("looking");
    const payload = {
      email: email.trim() ? email.trim().toLowerCase() : undefined,
      phone: phone.trim() ? phone.trim() : undefined,
    };

    const res = await fetch("/api/rsvp/lookup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await res.json().catch(() => null)) as LookupResponse | null;

    if (!data || data.ok !== true) {
      setStatus("error");
      setErr(String((data as ApiErr | null)?.error ?? "Không thể tìm RSVP. Vui lòng thử lại."));
      return;
    }

    if (!data.data.found || !data.data.record) {
      setStatus("notfound");
      return;
    }

    const r = data.data.record;
    setName(r.name);
    setEmail(r.email);
    setPhone(r.phone);
    setAttendance(r.attendance);
    setGuestCount(r.guestCount);
    setMessage(r.message);
    setStatus("editing");
  }

  return (
    <Section id="rsvp" title="Đăng ký tham gia" eyebrow="Chúng mình rất mong được gặp bạn đóa!">
      <Reveal>
        <div className="card-bg-5 rounded-[36px] border border-white/45 p-7 shadow-[0_30px_110px_rgba(58,31,27,0.14)] backdrop-blur-md sm:p-10">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-6">
              <div>
                <Label htmlFor="name">Họ và tên đầy đủ của bạn</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nguyễn Văn A"
                  autoComplete="name"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="bạn@example.com"
                  inputMode="email"
                  autoComplete="email"
                />
              </div>

              <div>
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="09xx xxx xxxx"
                  inputMode="tel"
                  autoComplete="tel"
                />
               
              </div>

              <div className="hidden">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-6">
              <FieldRow label="Tham dự">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setAttendance("yes");
                      if (guestCount <= 0) setGuestCount(1);
                    }}
                    className={
                      attendance === "yes"
                        ? "rounded-2xl bg-burgundy px-4 py-4 text-sm tracking-wide text-white"
                        : "rounded-2xl border border-white/45 bg-white/55 px-4 py-4 text-sm tracking-wide text-ink-muted backdrop-blur-md hover:bg-white/70"
                    }
                  >
                    Có
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAttendance("no");
                      setGuestCount(0);
                    }}
                    className={
                      attendance === "no"
                        ? "rounded-2xl bg-burgundy px-4 py-4 text-sm tracking-wide text-white"
                        : "rounded-2xl border border-white/45 bg-white/55 px-4 py-4 text-sm tracking-wide text-ink-muted backdrop-blur-md hover:bg-white/70"
                    }
                  >
                    Không
                  </button>
                </div>
              </FieldRow>

              <div>
                <Label htmlFor="guests">Bạn đi mấy mình vậyy</Label>
                <Input
                  id="guests"
                  type="number"
                  min={0}
                  max={12}
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  disabled={attendance === "no"}
                />
                <Helper>Đặt bằng 0 nếu bạn không tham dự.</Helper>
              </div>

              <div>
                <Label htmlFor="message">Bạn có câu hỏi gì dành cho chúng mình không?</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Bạn thắc mắc điều gì nè..."
                />
              </div>
            </div>
          </div>

          {err ? <ErrorText>{err}</ErrorText> : null}

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              type="button"
              onClick={submit}
              disabled={!canSubmit || status === "submitting" || status === "looking"}
              className="w-full sm:w-auto"
            >
              {status === "editing" ? "Cập nhật RSVP" : "Xác nhận"}
            </Button>

            <ButtonSoft
              type="button"
              onClick={() => {
                setStatus("lookup");
                setErr(null);
              }}
              className="w-full sm:w-auto"
            >
              Tìm / Chỉnh sửa thư mời
            </ButtonSoft>
          </div>

          {status === "success" ? (
            <p className="mt-6 font-sans text-sm leading-7 text-ink-muted text-center">
              Cảm ơn. Thư mời của bạn đã được lưu.
            </p>
          ) : null}

          {status === "lookup" || status === "looking" || status === "notfound" ? (
            <div className="card-bg-2 mt-10 rounded-[28px] border border-white/45 p-6">
              <p className="font-serif text-xl text-ink">Tìm thư mời</p>
              <p className="mt-2 font-sans text-sm leading-7 text-ink-muted">
                Nhập email hoặc số điện thoại để tải thư mời của bạn và chỉnh sửa.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button
                  type="button"
                  onClick={lookup}
                  disabled={
                    status === "looking" ||
                    (!email.trim() && !phone.trim()) ||
                    (Boolean(email.trim()) && !isValidEmail(email)) ||
                    (Boolean(phone.trim()) && !isValidPhone(phone))
                  }
                >
                  {status === "looking" ? "Đang tìm…" : "Tìm"}
                </Button>
                <ButtonSoft
                  type="button"
                  onClick={() => {
                    setStatus("idle");
                    setErr(null);
                  }}
                >
                  Đóng
                </ButtonSoft>
              </div>

              {status === "notfound" ? (
                <p className="mt-4 font-sans text-sm leading-7 text-ink-muted">
                  Chưa có RSVP nào. Vui lòng gửi RSVP mới ở trên.
                </p>
              ) : null}
            </div>
          ) : null}

          {status === "editing" ? (
            <p className="mt-6 font-sans text-sm leading-7 text-ink-muted">
              Bạn đang chỉnh sửa RSVP đã có. Cập nhật mọi thông tin rồi nhấn
              “Cập nhật RSVP”.
            </p>
          ) : null}
        </div>
      </Reveal>
    </Section>
  );
}
