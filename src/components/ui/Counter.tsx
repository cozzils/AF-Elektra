import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  /** Avvia l'animazione quando la sezione che lo contiene è visibile. */
  start?: boolean;
}

/** Contatore animato che parte quando la sezione entra nel viewport. */
export default function Counter({
  value,
  suffix = '',
  prefix = '',
  duration = 1400,
  className = '',
  start = false,
}: CounterProps) {
  const reducedMotion = useReducedMotion();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!start || reducedMotion) return;

    let frame = 0;
    const begin = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - begin) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, reducedMotion, value, duration]);

  const display = reducedMotion ? value : start ? current : 0;

  return (
    <span className={className}>
      <span className="sr-only">
        {prefix}
        {value}
        {suffix}
      </span>
      <span aria-hidden="true">
        {prefix}
        <span className="tabular-nums">{display}</span>
        {suffix}
      </span>
    </span>
  );
}
