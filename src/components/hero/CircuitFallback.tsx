/**
 * Fallback leggero della scena 3D: stessa scheda PCB, in SVG con prospettiva
 * CSS. Usato su mobile, con prefers-reduced-motion attivo o se WebGL non è
 * disponibile.
 */
export default function CircuitFallback() {
  return (
    <div className="relative flex h-full min-h-[320px] items-center justify-center" aria-hidden="true">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[62%] w-[70%] rounded-full bg-[#15803D]/25 blur-[80px]" />
      </div>

      <div className="animate-float relative w-full max-w-[560px]">
        <div
          className="relative mx-auto"
          style={{ perspective: '1100px' }}
        >
          <div
            className="relative overflow-hidden rounded-[22px] border border-[#6EF59B]/30 bg-[#0A2417] shadow-[0_50px_120px_-30px_rgba(0,0,0,0.9),0_0_60px_-10px_rgba(21,128,61,0.55)]"
            style={{ transform: 'rotateX(52deg) rotateZ(-34deg)', transformStyle: 'preserve-3d' }}
          >
            <svg viewBox="0 0 520 380" className="block h-auto w-full">
              <defs>
                <linearGradient id="boardGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#0C3320" />
                  <stop offset="100%" stopColor="#071C11" />
                </linearGradient>
                <filter id="traceGlow" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="2.4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <rect x="6" y="6" width="508" height="368" rx="18" fill="url(#boardGrad)" stroke="#1E4A31" />
              <rect x="22" y="22" width="476" height="336" rx="12" fill="none" stroke="#173B27" strokeDasharray="2 6" />

              {/* Piste */}
              <g fill="none" stroke="#2FD46A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.55" filter="url(#traceGlow)">
                <path d="M50 90 H150 L190 130 H300 L340 90 H470" />
                <path d="M50 170 H130 L170 210 H260 L300 170 H390 L430 210 H470" />
                <path d="M50 260 H120 L160 220 H250 L290 260 H400 L440 300 H470" />
                <path d="M120 320 V270 L165 225 V160" />
                <path d="M420 70 V120 L380 160 V250" />
                <path d="M240 50 V95 L280 135 V200 L250 230 V330" />
              </g>

              {/* Piste animate */}
              <g fill="none" stroke="#C9FFDB" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="pcb-trace-flow">
                <path d="M50 90 H150 L190 130 H300 L340 90 H470" />
                <path d="M50 170 H130 L170 210 H260 L300 170 H390 L430 210 H470" />
                <path d="M50 260 H120 L160 220 H250 L290 260 H400 L440 300 H470" />
                <path d="M120 320 V270 L165 225 V160" />
                <path d="M420 70 V120 L380 160 V250" />
                <path d="M240 50 V95 L280 135 V200 L250 230 V330" />
              </g>

              {/* Pad */}
              <g fill="#C9A45C" opacity="0.9">
                {[[50, 90], [470, 90], [50, 170], [470, 170], [50, 260], [470, 260], [120, 320], [420, 70], [240, 50]].map(([x, y]) => (
                  <circle key={`${x}-${y}`} cx={x} cy={y} r="5" />
                ))}
              </g>

              {/* Chip */}
              <g>
                <rect x="205" y="120" width="92" height="66" rx="7" fill="#141C17" stroke="#3A4A3F" />
                <rect x="219" y="134" width="64" height="38" rx="3" fill="#0E1511" />
                <g fill="#C9A45C">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <rect key={i} x={205 + i * 15} y="112" width="7" height="8" rx="1.5" />
                  ))}
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <rect key={i} x={205 + i * 15} y="186" width="7" height="8" rx="1.5" />
                  ))}
                </g>
              </g>

              <g>
                <rect x="345" y="215" width="60" height="44" rx="6" fill="#141C17" stroke="#3A4A3F" />
                <rect x="354" y="224" width="42" height="26" rx="3" fill="#0E1511" />
              </g>

              <g>
                <rect x="120" y="238" width="42" height="30" rx="5" fill="#141C17" stroke="#3A4A3F" />
                <rect x="128" y="245" width="26" height="16" rx="2" fill="#0E1511" />
              </g>

              {/* Elettrolitico */}
              <circle cx="440" cy="300" r="20" fill="#1B2420" stroke="#3A4A3F" />
              <circle cx="440" cy="300" r="13" fill="none" stroke="#C9A45C" opacity="0.5" />

              {/* Serigrafia */}
              <g fill="#7FA58E" fontFamily="JetBrains Mono, monospace" fontSize="9" opacity="0.65">
                <text x="34" y="352">AF-ELEKTRA · PCB-01</text>
                <text x="380" y="58">REV 2.6</text>
              </g>
            </svg>

            {/* Scanning luminoso */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="animate-scan h-16 w-full bg-gradient-to-b from-transparent via-[#6EF59B]/10 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
