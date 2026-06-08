export type Attendance = "yes" | "no";

export type RsvpUpsertRequest = {
  name: string;
  email: string;
  phone: string;
  attendance: Attendance;
  guestCount: number;
  message?: string;
  website?: string;
  startedAt?: number;
};

export type RsvpLookupRequest = {
  email?: string;
  phone?: string;
};

export type RsvpRecord = {
  timestamp: string;
  name: string;
  email: string;
  phone: string;
  attendance: Attendance;
  guestCount: number;
  message: string;
};

export type ApiOk<T> = { ok: true; data: T };
export type ApiErr = { ok: false; error: string };

