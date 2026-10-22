import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Auto-advancing index for a set of slides. A quick tap (or click) on the element that receives `handlers`
 * moves to the next slide; pressing and holding keeps the current one; a mouse hovering over it pauses.
 * Stays still for visitors who prefer reduced motion.
 */
export function useRotation(count: number, delay = 3500) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [held, setHeld] = useState(false);
  const press = useRef<{ x: number; y: number; t: number } | null>(null);
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);

  useEffect(() => {
    if (reduce || hovered || held) return;
    const id = window.setTimeout(next, delay);
    return () => window.clearTimeout(id);
  }, [index, reduce, hovered, held, next, delay]);

  const release = () => {
    press.current = null;
    setHeld(false);
  };

  const handlers = {
    onPointerEnter: (e: PointerEvent) => e.pointerType === "mouse" && setHovered(true),
    onPointerLeave: (e: PointerEvent) => {
      if (e.pointerType === "mouse") setHovered(false);
      release();
    },
    onPointerDown: (e: PointerEvent) => {
      press.current = { x: e.clientX, y: e.clientY, t: e.timeStamp };
      setHeld(true);
    },
    onPointerUp: (e: PointerEvent) => {
      const p = press.current;
      release();
      // A short press that barely moved is a tap; anything longer was a hold.
      if (p && e.timeStamp - p.t < 350 && Math.hypot(e.clientX - p.x, e.clientY - p.y) < 10) next();
    },
    onPointerCancel: release,
    onContextMenu: (e: { preventDefault: () => void }) => e.preventDefault(),
  };

  return { index, setIndex, next, handlers };
}
