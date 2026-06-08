import { useMemo, useState } from "react";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { Button, ButtonSoft } from "@/components/Button";
import { ErrorText, Helper, Input, Label, Textarea } from "@/components/Field";
import { ApiErr, ApiOk, Attendance, RsvpRecord } from "@/lib/rsvp";
import { clamp, isValidEmail, isValidPhone } from "@/lib/utils";

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
      setErr(String((data as ApiErr | null)?.error ?? "Something went wrong."));
      return;
    }

    setStatus("success");
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
      setErr(String((data as ApiErr | null)?.error ?? "Lookup failed."));
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
    <Section id="rsvp" title="RSVP" eyebrow="We’d love to celebrate with you">
      <Reveal>
        <div className="rounded-[36px] border border-white/45 bg-white/34 p-7 shadow-[0_30px_110px_rgba(58,31,27,0.14)] backdrop-blur-md sm:p-10">
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-6">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  autoComplete="name"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  inputMode="email"
                  autoComplete="email"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="09xx xxx xxxx"
                  inputMode="tel"
                  autoComplete="tel"
                />
                <Helper>
                  Use your email or phone later if you want to edit your RSVP.
                </Helper>
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
              <FieldRow label="Attending">
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
                    Yes
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
                    No
                  </button>
                </div>
              </FieldRow>

              <div>
                <Label htmlFor="guests">Number of Guests</Label>
                <Input
                  id="guests"
                  type="number"
                  min={0}
                  max={12}
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  disabled={attendance === "no"}
                />
                <Helper>Set to 0 if you are not attending.</Helper>
              </div>

              <div>
                <Label htmlFor="message">Message for the Couple</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="A short note…"
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
              {status === "editing" ? "Update RSVP" : "Submit RSVP"}
            </Button>

            <ButtonSoft
              type="button"
              onClick={() => {
                setStatus("lookup");
                setErr(null);
              }}
              className="w-full sm:w-auto"
            >
              Find / Edit RSVP
            </ButtonSoft>
          </div>

          {status === "success" ? (
            <p className="mt-6 font-sans text-sm leading-7 text-ink-muted">
              Thank you. Your RSVP has been saved.
            </p>
          ) : null}

          {status === "lookup" || status === "looking" || status === "notfound" ? (
            <div className="mt-10 rounded-[28px] border border-white/45 bg-white/40 p-6">
              <p className="font-serif text-xl text-ink">Lookup RSVP</p>
              <p className="mt-2 font-sans text-sm leading-7 text-ink-muted">
                Enter your email or phone number, then we’ll load your RSVP so you
                can update it.
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
                  {status === "looking" ? "Searching…" : "Search"}
                </Button>
                <ButtonSoft
                  type="button"
                  onClick={() => {
                    setStatus("idle");
                    setErr(null);
                  }}
                >
                  Close
                </ButtonSoft>
              </div>

              {status === "notfound" ? (
                <p className="mt-4 font-sans text-sm leading-7 text-ink-muted">
                  No RSVP found yet. Please submit a new RSVP above.
                </p>
              ) : null}
            </div>
          ) : null}

          {status === "editing" ? (
            <p className="mt-6 font-sans text-sm leading-7 text-ink-muted">
              You’re editing an existing RSVP. Update any details and press
              “Update RSVP”.
            </p>
          ) : null}
        </div>
      </Reveal>
    </Section>
  );
}
