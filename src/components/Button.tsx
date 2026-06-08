import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Button({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm tracking-wide transition-colors",
        "bg-burgundy text-white hover:bg-burgundy/90 active:bg-burgundy/85",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
    />
  );
}

export function ButtonSoft({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm tracking-wide transition-colors",
        "border border-white/40 bg-white/50 text-ink hover:bg-white/70 active:bg-white/60",
        "backdrop-blur-md shadow-[0_18px_55px_rgba(108,22,19,0.10)]",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
    />
  );
}

