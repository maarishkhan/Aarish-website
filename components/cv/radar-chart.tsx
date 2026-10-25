export type RadarAxis = { label: string; value: number; max: number };

const SIZE = { width: 360, height: 230 };
const CENTER = { x: 180, y: 115 };
const RADIUS = 72;
const RINGS = [0.25, 0.5, 0.75, 1];

function point(index: number, total: number, scale: number) {
  const angle = -Math.PI / 2 + (index / total) * Math.PI * 2;

  return { x: CENTER.x + Math.cos(angle) * RADIUS * scale, y: CENTER.y + Math.sin(angle) * RADIUS * scale, cos: Math.cos(angle) };
}

const toPoints = (points: { x: number; y: number }[]) => points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');

/** Radar chart of counted figures (not ratings). Each axis is the count divided by a fixed target, capped at 1. */
export function RadarChart({ axes }: { axes: RadarAxis[] }) {
  const total = axes.length;
  const shape = axes.map((axis, index) => point(index, total, Math.max(0.06, Math.min(axis.value / axis.max, 1))));

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-8 print:gap-4">
      <svg
        viewBox={`0 0 ${SIZE.width} ${SIZE.height}`}
        role="img"
        aria-label={`Profile summary: ${axes.map((axis) => `${axis.label} ${axis.value}`).join(', ')}`}
        className="h-auto w-full max-w-[22rem] shrink-0 print:max-w-[17rem]"
      >
        {RINGS.map((ring) => (
          <polygon key={ring} points={toPoints(axes.map((_, index) => point(index, total, ring)))} fill="none" stroke="#cbd5e1" strokeWidth={ring === 1 ? 1 : 0.6} />
        ))}
        {axes.map((axis, index) => {
          const edge = point(index, total, 1);

          return <line key={axis.label} x1={CENTER.x} y1={CENTER.y} x2={edge.x} y2={edge.y} stroke="#cbd5e1" strokeWidth={0.6} />;
        })}
        <polygon points={toPoints(shape)} fill="#13314d" fillOpacity={0.22} stroke="#13314d" strokeWidth={2} strokeLinejoin="round" />
        {shape.map((p, index) => (
          <circle key={axes[index].label} cx={p.x} cy={p.y} r={3} fill="#bb7728" />
        ))}
        {axes.map((axis, index) => {
          const label = point(index, total, 1.2);
          const anchor = Math.abs(label.cos) < 0.2 ? 'middle' : label.cos > 0 ? 'start' : 'end';

          return (
            <text key={axis.label} x={label.x} y={label.y + 4} textAnchor={anchor} className="fill-slate-600" fontSize={12} fontWeight={600}>
              {axis.label}
            </text>
          );
        })}
      </svg>

      <dl className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-1 print:gap-y-1.5">
        {axes.map((axis) => (
          <div key={axis.label} className="flex items-baseline gap-3">
            <dd className="w-8 text-right font-serif text-2xl font-bold text-brand-dark print:text-lg">{axis.value}</dd>
            <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">{axis.label}</dt>
          </div>
        ))}
      </dl>
    </div>
  );
}
