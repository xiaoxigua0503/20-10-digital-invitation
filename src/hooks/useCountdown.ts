import { useEffect, useMemo, useState } from "react";

function toParts(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  return { days, hours, minutes, seconds };
}

export function useCountdown(targetIso: string) {
  const target = useMemo(() => new Date(targetIso).getTime(), [targetIso]);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const raf = window.requestAnimationFrame(() => setNow(Date.now()));
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => {
      window.cancelAnimationFrame(raf);
      window.clearInterval(id);
    };
  }, []);

  const diff = now === null ? 0 : Math.max(0, target - now);
  return { ...toParts(diff), done: diff <= 0, ready: now !== null };
}
