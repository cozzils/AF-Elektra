import { Component, Suspense, lazy, useEffect, useRef, useState, type ReactNode } from 'react';
import { useReducedMotion } from 'framer-motion';
import CircuitFallback from './CircuitFallback';

const HeroScene = lazy(() => import('./HeroScene'));

class SceneBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/**
 * Carica la scena WebGL solo su desktop, con motion consentito e quando è
 * visibile. Negli altri casi usa il fallback SVG.
 */
export default function HeroVisual() {
  const reducedMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  const [active, setActive] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = window.matchMedia('(min-width: 900px)');
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting && !document.hidden),
      { threshold: 0.05 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const showScene = isDesktop && reducedMotion !== true;

  return (
    <div ref={ref} className="relative h-full w-full">
      {showScene ? (
        <SceneBoundary fallback={<CircuitFallback />}>
          <Suspense fallback={<CircuitFallback />}>
            <HeroScene active={active} />
          </Suspense>
        </SceneBoundary>
      ) : (
        <CircuitFallback />
      )}
    </div>
  );
}
