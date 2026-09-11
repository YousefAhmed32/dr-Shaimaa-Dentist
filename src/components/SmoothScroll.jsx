import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, touchMultiplier: 1.05 });
    let frame;
    const raf = (time) => { lenis.raf(time); frame = requestAnimationFrame(raf); };
    frame = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(frame); lenis.destroy(); };
  }, []);
  return null;
}
