/** Decorative DNA-helix illustration drawn as SVG. Purely visual. */
export function Helix({ className = '' }: { className?: string }) {
  const height = 620;
  const step = 8;
  const points: { y: number; a: number; b: number; depth: number }[] = [];

  for (let y = 0; y <= height; y += step) {
    const phase = y / 46;
    points.push({ y, a: 200 + 80 * Math.sin(phase), b: 200 - 80 * Math.sin(phase), depth: Math.cos(phase) });
  }

  const strand = (key: 'a' | 'b') => points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[key].toFixed(1)} ${p.y}`).join(' ');
  const rungs = points.filter((_, i) => i % 4 === 0);

  return (
    <svg viewBox={`0 0 400 ${height}`} className={className} aria-hidden="true" fill="none" preserveAspectRatio="xMidYMid slice">
      {rungs.map((p) => (
        <line key={p.y} x1={p.a} y1={p.y} x2={p.b} y2={p.y} stroke="#e3b878" strokeOpacity={0.12 + 0.28 * Math.abs(p.depth)} strokeWidth="1.5" />
      ))}
      <path d={strand('a')} stroke="#ffffff" strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round" />
      <path d={strand('b')} stroke="#e3b878" strokeOpacity="0.55" strokeWidth="2" strokeLinecap="round" />
      {rungs.map((p) => (
        <g key={`n${p.y}`}>
          <circle cx={p.a} cy={p.y} r={3 + 1.5 * p.depth} fill="#ffffff" fillOpacity="0.5" />
          <circle cx={p.b} cy={p.y} r={3 - 1.5 * p.depth} fill="#e3b878" fillOpacity="0.7" />
        </g>
      ))}
    </svg>
  );
}
