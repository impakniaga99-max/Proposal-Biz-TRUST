import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import type { BudgetRow, MofassItem } from '../data/proposalData';

/* ── 1. Interactive M.O.F.A.S.S Hexagonal Hub Infographic ─────────────────── */
interface MofassDiagramProps {
  items: MofassItem[];
  title: string;
  hint: string;
  outcomesLabel: string;
  centerLabel: string;
}

export function MofassDiagram({
  items,
  title,
  hint,
  outcomesLabel,
  centerLabel,
}: MofassDiagramProps) {
  const [selectedKey, setSelectedKey] = useState<string>(items[0]?.key ?? 'M');
  const active = items.find((item) => item.key === selectedKey) ?? items[0];

  // 6 evenly spaced radial positions on a 400x360 viewBox around (200, 180)
  const cx = 200;
  const cy = 180;
  const radius = 122;

  return (
    <div className="bg-[#F4EFE6] border border-[#E2D9C5] rounded-2xl p-5 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#E2D9C5] pb-4 mb-6">
        <div>
          <h3 className="font-display text-lg sm:text-xl font-semibold text-[#1C1917]">{title}</h3>
          <p className="text-xs text-[#57534E] mt-1">{hint}</p>
        </div>
        <span className="font-mono-num text-xs text-[#0F5149] font-medium shrink-0">
          6 / 6 M.O.F.A.S.S
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* SVG Radial Hub */}
        <div className="lg:col-span-6 flex justify-center">
          <svg
            viewBox="0 0 400 360"
            className="w-full max-w-[380px] h-auto select-none"
            role="img"
            aria-label={title}
          >
            {/* Outer architectural dashed ring */}
            <circle
              cx={cx}
              cy={cy}
              r={radius}
              fill="none"
              stroke="#D6CEBE"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <circle
              cx={cx}
              cy={cy}
              r={68}
              fill="none"
              stroke="#E2D9C5"
              strokeWidth="1"
            />

            {/* Connecting spokes */}
            {items.map((item, idx) => {
              const angle = ((idx * 60 - 90) * Math.PI) / 180;
              const nx = cx + radius * Math.cos(angle);
              const ny = cy + radius * Math.sin(angle);
              const isSelected = item.key === active.key;
              return (
                <line
                  key={`spoke-${item.key}`}
                  x1={cx}
                  y1={cy}
                  x2={nx}
                  y2={ny}
                  stroke={isSelected ? item.color : '#D6CEBE'}
                  strokeWidth={isSelected ? 2.5 : 1.25}
                  className="transition-colors duration-200"
                />
              );
            })}

            {/* Center Enterprise Node */}
            <circle cx={cx} cy={cy} r={46} fill="#1C1917" />
            <circle cx={cx} cy={cy} r={42} fill="none" stroke="#9A6B2F" strokeWidth="1" strokeOpacity="0.6" />
            <text
              x={cx}
              y={cy - 4}
              textAnchor="middle"
              fill="#FBF9F5"
              fontSize="11"
              fontWeight="700"
              letterSpacing="1.5"
            >
              BIZ TRUST
            </text>
            <text
              x={cx}
              y={cy + 12}
              textAnchor="middle"
              fill="#D6CEBE"
              fontSize="9"
              fontWeight="500"
            >
              {centerLabel}
            </text>

            {/* 6 Pillar Nodes */}
            {items.map((item, idx) => {
              const angle = ((idx * 60 - 90) * Math.PI) / 180;
              const nx = cx + radius * Math.cos(angle);
              const ny = cy + radius * Math.sin(angle);
              const isSelected = item.key === active.key;
              const labelY = ny + (ny < cy ? -38 : 44);

              return (
                <g
                  key={item.key}
                  onClick={() => setSelectedKey(item.key)}
                  className="cursor-pointer"
                  role="button"
                  tabIndex={0}
                  aria-label={item.title}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedKey(item.key);
                    }
                  }}
                >
                  {isSelected && (
                    <circle
                      cx={nx}
                      cy={ny}
                      r={32}
                      fill={item.color}
                      fillOpacity="0.14"
                    />
                  )}
                  <circle
                    cx={nx}
                    cy={ny}
                    r={25}
                    fill={isSelected ? item.color : '#FBF9F5'}
                    stroke={isSelected ? item.color : '#C5BBA7'}
                    strokeWidth="1.75"
                    className="transition-colors duration-200"
                  />
                  <text
                    x={nx}
                    y={ny + 6}
                    textAnchor="middle"
                    fill={isSelected ? '#FFFFFF' : '#1C1917'}
                    fontSize="16"
                    fontWeight="700"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {item.letter}
                  </text>
                  <text
                    x={nx}
                    y={labelY}
                    textAnchor="middle"
                    fill={isSelected ? '#1C1917' : '#57534E'}
                    fontSize="10"
                    fontWeight={isSelected ? '700' : '500'}
                  >
                    {item.title.split(' ')[0]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Active Pillar Detail Panel */}
        <div className="lg:col-span-6 space-y-5">
          {/* Quick Selector Strip */}
          <div className="flex flex-wrap gap-1.5">
            {items.map((item) => {
              const isSelected = item.key === active.key;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setSelectedKey(item.key)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#0F5149] ${
                    isSelected
                      ? 'bg-[#0F5149] text-white border-[#0F5149]'
                      : 'bg-[#FBF9F5] text-[#44403C] border-[#D6CEBE] hover:border-[#0F5149]'
                  }`}
                >
                  {item.letter} · {item.title.split('(')[0].trim()}
                </button>
              );
            })}
          </div>

          <div className="bg-[#FBF9F5] border border-[#E2D9C5] rounded-xl p-6 space-y-4">
            <div className="flex items-start justify-between gap-4 border-b border-[#E2D9C5] pb-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-[#9A6B2F]">
                  {active.subtitle}
                </p>
                <h4 className="font-display text-xl font-semibold text-[#1C1917] mt-0.5">
                  {active.title}
                </h4>
              </div>
              <span
                className="w-10 h-10 rounded-lg flex items-center justify-center font-display text-lg font-bold text-white shrink-0"
                style={{ backgroundColor: active.color }}
              >
                {active.letter}
              </span>
            </div>

            <p className="text-sm text-[#44403C] leading-relaxed">{active.description}</p>

            <div className="pt-2 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#0F5149]">
                {outcomesLabel}
              </p>
              <ul className="space-y-2">
                {active.outcomes.map((out) => (
                  <li key={out} className="flex items-start gap-2 text-xs text-[#292524]">
                    <CheckCircle2 className="w-4 h-4 text-[#0F5149] shrink-0 mt-0.5" />
                    <span>{out}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 2. 8-Axis Dashboard Maturity Radar Infographic (Section 12.2) ─────────── */
interface DashboardRadarSvgProps {
  aspects: string[];
  title: string;
}

export function DashboardRadarSvg({ aspects, title }: DashboardRadarSvgProps) {
  const cx = 190;
  const cy = 175;
  const maxR = 105;
  // Illustrative target maturity profile (Month 1 baseline vs Month 6 target)
  const baselineVals = [0.38, 0.42, 0.45, 0.35, 0.28, 0.44, 0.4, 0.3];
  const targetVals = [0.85, 0.82, 0.88, 0.84, 0.78, 0.8, 0.86, 0.82];

  const getPoints = (vals: number[]) =>
    vals
      .map((val, i) => {
        const angle = ((i * 45 - 90) * Math.PI) / 180;
        const x = cx + maxR * val * Math.cos(angle);
        const y = cy + maxR * val * Math.sin(angle);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');

  return (
    <div className="bg-[#FBF9F5] border border-[#E2D9C5] rounded-xl p-5 flex flex-col items-center">
      <svg
        viewBox="0 0 380 350"
        className="w-full max-w-[360px] h-auto"
        role="img"
        aria-label={title}
      >
        {/* Concentric octagons */}
        {[0.25, 0.5, 0.75, 1].map((scale) => {
          const pts = Array.from({ length: 8 }, (_, i) => {
            const angle = ((i * 45 - 90) * Math.PI) / 180;
            return `${(cx + maxR * scale * Math.cos(angle)).toFixed(1)},${(
              cy +
              maxR * scale * Math.sin(angle)
            ).toFixed(1)}`;
          }).join(' ');
          return (
            <polygon
              key={scale}
              points={pts}
              fill="none"
              stroke="#E2D9C5"
              strokeWidth="1"
            />
          );
        })}

        {/* Axis spokes + numeric index labels */}
        {aspects.map((aspect, i) => {
          const angle = ((i * 45 - 90) * Math.PI) / 180;
          const x2 = cx + maxR * Math.cos(angle);
          const y2 = cy + maxR * Math.sin(angle);
          const lx = cx + (maxR + 24) * Math.cos(angle);
          const ly = cy + (maxR + 22) * Math.sin(angle);
          const shortTitle = aspect.split('—')[0].trim();

          return (
            <g key={aspect}>
              <line x1={cx} y1={cy} x2={x2} y2={y2} stroke="#D6CEBE" strokeWidth="1" />
              <circle cx={lx} cy={ly} r={11} fill="#F4EFE6" stroke="#D6CEBE" strokeWidth="1" />
              <text
                x={lx}
                y={ly + 3.5}
                textAnchor="middle"
                fill="#1C1917"
                fontSize="10"
                fontWeight="700"
                className="font-mono-num"
              >
                {i + 1}
              </text>
              <title>{shortTitle}</title>
            </g>
          );
        })}

        {/* Baseline Polygon (Month 1) */}
        <polygon
          points={getPoints(baselineVals)}
          fill="#9A6B2F"
          fillOpacity="0.18"
          stroke="#9A6B2F"
          strokeWidth="1.75"
          strokeDasharray="4 3"
        />

        {/* Target Maturity Polygon (Month 6) */}
        <polygon
          points={getPoints(targetVals)}
          fill="#0F5149"
          fillOpacity="0.22"
          stroke="#0F5149"
          strokeWidth="2.25"
        />

        {/* Legend inside SVG footer */}
        <g transform="translate(70, 326)">
          <rect x="0" y="-8" width="12" height="12" rx="2" fill="#9A6B2F" fillOpacity="0.35" stroke="#9A6B2F" strokeWidth="1.5" />
          <text x="18" y="2" fontSize="10" fill="#57534E" fontWeight="600">
            Pra / Baseline (M1)
          </text>
          <rect x="135" y="-8" width="12" height="12" rx="2" fill="#0F5149" fillOpacity="0.35" stroke="#0F5149" strokeWidth="1.5" />
          <text x="153" y="2" fontSize="10" fill="#1C1917" fontWeight="600">
            Pasca / Target (M6)
          </text>
        </g>
      </svg>
    </div>
  );
}

/* ── 3. Budget Allocation Donut + Proportional Bar Infographic (Section 16.0) ─ */
interface BudgetChartSvgProps {
  rows: BudgetRow[];
  title: string;
  subtotal: string;
}

export function BudgetChartSvg({ rows, title, subtotal }: BudgetChartSvgProps) {
  const [hoveredNo, setHoveredNo] = useState<number | null>(null);
  const total = rows.reduce((sum, r) => sum + r.amount, 0);

  const radius = 72;
  const circumference = 2 * Math.PI * radius;

  // Compute SVG stroke-dasharray segments cleanly
  let cumulative = 0;
  const segments = rows.map((row) => {
    const fraction = row.amount / total;
    const dashLength = fraction * circumference;
    const offset = -cumulative * circumference;
    cumulative += fraction;
    return { ...row, dashLength, offset };
  });

  const activeRow = rows.find((r) => r.no === hoveredNo) ?? rows[4]; // Default highlight largest slice (Coaching 43%)

  return (
    <div className="bg-[#F4EFE6] border border-[#E2D9C5] rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-[#E2D9C5] pb-3">
        <h4 className="font-display text-base sm:text-lg font-semibold text-[#1C1917]">{title}</h4>
        <span className="font-mono-num text-xs font-semibold text-[#0F5149]">{subtotal}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Donut Chart */}
        <div className="md:col-span-5 flex justify-center">
          <svg viewBox="0 0 210 210" className="w-48 h-48" role="img" aria-label={title}>
            <g transform="rotate(-90 105 105)">
              {segments.map((seg) => {
                const isActive = activeRow?.no === seg.no;
                return (
                  <circle
                    key={seg.no}
                    cx="105"
                    cy="105"
                    r={radius}
                    fill="transparent"
                    stroke={seg.color}
                    strokeWidth={isActive ? 26 : 21}
                    strokeDasharray={`${seg.dashLength} ${circumference}`}
                    strokeDashoffset={seg.offset}
                    className="cursor-pointer transition-all duration-200"
                    onMouseEnter={() => setHoveredNo(seg.no)}
                    onClick={() => setHoveredNo(seg.no)}
                  />
                );
              })}
            </g>
            <text
              x="105"
              y="98"
              textAnchor="middle"
              fill="#1C1917"
              fontSize="20"
              fontWeight="700"
              className="font-mono-num"
            >
              {activeRow.percent}%
            </text>
            <text
              x="105"
              y="117"
              textAnchor="middle"
              fill="#57534E"
              fontSize="10"
              fontWeight="600"
              className="font-mono-num"
            >
              RM {activeRow.amount.toLocaleString('en-MY')}
            </text>
            <text
              x="105"
              y="132"
              textAnchor="middle"
              fill="#0F5149"
              fontSize="9"
              fontWeight="700"
            >
              #{activeRow.no}
            </text>
          </svg>
        </div>

        {/* Horizontal Proportional Bars */}
        <div className="md:col-span-7 space-y-3">
          {rows.map((row) => {
            const isActive = activeRow?.no === row.no;
            return (
              <div
                key={row.no}
                onMouseEnter={() => setHoveredNo(row.no)}
                onClick={() => setHoveredNo(row.no)}
                className={`p-2 rounded-lg transition-colors cursor-pointer ${
                  isActive ? 'bg-[#FBF9F5] border border-[#D6CEBE]' : 'border border-transparent'
                }`}
              >
                <div className="flex items-center justify-between gap-3 text-xs mb-1.5">
                  <span className="font-medium text-[#292524] truncate">
                    <span className="font-mono-num text-[#57534E] mr-1.5">0{row.no}.</span>
                    {row.item}
                  </span>
                  <span className="font-mono-num font-semibold text-[#1C1917] shrink-0">
                    {row.percent}%
                  </span>
                </div>
                <div className="w-full h-2 bg-[#E2D9C5] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{ width: `${row.percent}%`, backgroundColor: row.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
