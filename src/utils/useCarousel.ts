import { useEffect, useState } from "react";

export function useCarousel(count: number, interval = 5_000) {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(!document.hidden);

  useEffect(() => {
    const visibility = () => setVisible(!document.hidden);
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const preference = () => { if (motion.matches) setPaused(true); };
    document.addEventListener('visibilitychange', visibility);
    motion.addEventListener('change', preference);
    return () => {
      document.removeEventListener('visibilitychange', visibility);
      motion.removeEventListener('change', preference);
    };
  }, []);

  useEffect(() => {
    if (count < 2 || paused || hovered || !visible) return;
    const timer = window.setTimeout(() => setSlide(current => (current + 1) % count), interval);
    return () => window.clearTimeout(timer);
  }, [count, slide, paused, hovered, visible, interval]);

  return { slide, setSlide, paused, setPaused, setHovered };
}
