import { cn } from "@/lib/utils";

export function MapEmbed({
  query,
  title,
  className,
}: {
  query: string;
  title: string;
  className?: string;
}) {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(
    query
  )}&output=embed`;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[28px] border border-white/45 bg-white/30 shadow-[0_22px_80px_rgba(58,31,27,0.10)] backdrop-blur-md",
        className
      )}
    >
      <iframe
        title={title}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-[320px] w-full"
      />
    </div>
  );
}

