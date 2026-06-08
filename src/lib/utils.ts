export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function clamp(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max);
}

export function toE164Like(raw: string) {
  const digits = raw.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return digits;
  return digits;
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isValidPhone(phone: string) {
  const digits = phone.replace(/[^\d]/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

