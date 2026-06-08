import { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Label({
  children,
  htmlFor,
}: {
  children: string;
  htmlFor: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-xs tracking-[0.22em] uppercase text-ink-muted"
    >
      {children}
    </label>
  );
}

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "mt-2 w-full rounded-2xl border border-white/45 bg-white/60 px-4 py-3 text-sm text-ink",
        "shadow-[0_18px_60px_rgba(58,31,27,0.08)] backdrop-blur-md outline-none",
        "placeholder:text-ink-muted/60 focus:border-burgundy/40 focus:ring-2 focus:ring-burgundy/15",
        className
      )}
    />
  );
}

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "mt-2 min-h-28 w-full resize-y rounded-2xl border border-white/45 bg-white/60 px-4 py-3 text-sm text-ink",
        "shadow-[0_18px_60px_rgba(58,31,27,0.08)] backdrop-blur-md outline-none",
        "placeholder:text-ink-muted/60 focus:border-burgundy/40 focus:ring-2 focus:ring-burgundy/15",
        className
      )}
    />
  );
}

export function Helper({ children }: { children: string }) {
  return <p className="mt-2 text-xs leading-5 text-ink-muted/80">{children}</p>;
}

export function ErrorText({ children }: { children: string }) {
  return (
    <p className="mt-2 text-xs leading-5 text-burgundy/90">{children}</p>
  );
}

