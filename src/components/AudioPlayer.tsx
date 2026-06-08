import { useEffect, useMemo, useRef, useState } from "react";
import { ButtonSoft } from "@/components/Button";
import { cn } from "@/lib/utils";

export function AudioPlayer({
  enabled,
  src,
}: {
  enabled: boolean;
  src: string;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [ready, setReady] = useState(false);
  const [muted, setMuted] = useState(true);
  const [available, setAvailable] = useState(true);

  const label = useMemo(() => {
    if (!enabled) return "Music";
    if (!ready) return "Music";
    return muted ? "Unmute music" : "Mute music";
  }, [enabled, muted, ready]);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;

    const init = async () => {
      try {
        const head = await fetch(src, { method: "HEAD", cache: "no-store" });
        if (!head.ok) {
          if (!cancelled) setAvailable(false);
          return;
        }
      } catch {
        if (!cancelled) setAvailable(false);
        return;
      }

      if (cancelled) return;

      const audio = new Audio(src);
      audio.loop = true;
      audio.preload = "auto";
      audio.muted = true;
      audio.volume = 0.75;
      audioRef.current = audio;

      try {
        await audio.play();
      } catch {
      } finally {
        if (!cancelled) setReady(true);
      }
    };

    init();

    return () => {
      cancelled = true;
      const audio = audioRef.current;
      if (audio) audio.pause();
      audioRef.current = null;
    };
  }, [enabled, src]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = muted;
  }, [muted]);

  if (!enabled || !available) return null;

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <ButtonSoft
        type="button"
        onClick={() => setMuted((m) => !m)}
        className={cn("px-4 py-2 text-xs")}
        aria-label={label}
      >
        {muted ? "Music: Off" : "Music: On"}
      </ButtonSoft>
    </div>
  );
}
