import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { LayoutGrid, PieChart as PieIcon, TrendingUp } from 'lucide-react';
import { riskSegments } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface RiskDonutChartProps {
  activeSegment: string | null;
  onSegmentClick: (segmentId: string) => void;
}

const RADIAN = Math.PI / 180;

const renderLabel = (props: any) => {
  const { cx, cy, midAngle, outerRadius, index } = props;
  const seg = riskSegments[index];
  const radius = outerRadius + 50;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const textAnchor = x > cx ? 'start' : 'end';

  return (
    <g>
      <text x={x} y={y - 6} textAnchor={textAnchor} dominantBaseline="central"
        style={{ fill: 'hsl(var(--foreground))', fontSize: 11, fontWeight: 500, fontFamily: 'Manrope' }}>
        {seg.shortName}
      </text>
      <text x={x} y={y + 10} textAnchor={textAnchor} dominantBaseline="central"
        style={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10, fontFamily: 'Manrope' }}>
        {seg.value} млн/₽
      </text>
    </g>
  );
};

function statusStyles(status: 'red' | 'yellow' | 'green') {
  if (status === 'red') return {
    bg: 'bg-[hsl(var(--status-danger-bg))]',
    border: 'border-[hsl(var(--status-danger)/0.2)]',
    bar: 'bg-[hsl(var(--status-danger))]',
    badge: 'status-badge-danger',
    label: 'Критично',
    iconColor: 'text-[hsl(var(--status-danger))]',
  };
  if (status === 'yellow') return {
    bg: 'bg-[hsl(var(--status-warning-bg))]',
    border: 'border-[hsl(var(--status-warning)/0.2)]',
    bar: 'bg-[hsl(var(--status-warning))]',
    badge: 'status-badge-warning',
    label: 'Внимание',
    iconColor: 'text-[hsl(var(--status-warning))]',
  };
  return {
    bg: 'bg-[hsl(var(--status-success-bg))]',
    border: 'border-[hsl(var(--status-success)/0.2)]',
    bar: 'bg-[hsl(var(--status-success))]',
    badge: 'status-badge-success',
    label: 'Норма',
    iconColor: 'text-[hsl(var(--status-success))]',
  };
}

function SegmentCards({ activeSegment, onSegmentClick }: RiskDonutChartProps) {
  return (
    <div className="grid grid-cols-3 gap-3 px-5 pb-5">
      {riskSegments.map((seg) => {
        const isActive = activeSegment === seg.id;
        const st = statusStyles(seg.domainStatus);
        return (
          <div
            key={seg.id}
            onClick={() => onSegmentClick(seg.id)}
            className={cn(
              "relative rounded-xl border p-4 cursor-pointer transition-all hover:shadow-md overflow-hidden",
              isActive ? `${st.bg} ${st.border} shadow-sm ring-1 ring-primary/20` : `${st.bg} ${st.border}`
            )}
          >
            {/* Left accent bar */}
            <div className={cn("absolute left-0 top-0 bottom-0 w-1 rounded-l-xl", st.bar)} />

            <div className="pl-2">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-base">{seg.icon}</span>
                  <h4 className="text-sm font-semibold leading-snug">{seg.shortName}</h4>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${st.badge}`}>{st.label}</span>
              </div>

              {/* KPIs */}
              <div className="space-y-1.5 mb-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Прогноз потерь</span>
                  <span className="font-medium">{seg.forecastLoss} млн/₽</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Факт потерь</span>
                  <span className="font-medium">{seg.actualLoss} млн/₽</span>
                </div>
              </div>

              {/* Risk level bar */}
              <div className="mb-2">
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="text-muted-foreground">Уровень риска</span>
                  <span className={cn("font-semibold", st.iconColor)}>{seg.riskLevel}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className={cn("h-full rounded-full transition-all", st.bar)} style={{ width: `${seg.riskLevel}%` }} />
                </div>
              </div>

              {/* Bottom row: signal + changes */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-[11px] min-w-0">
                  <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", st.bar)} />
                  <span className={cn("truncate", st.iconColor)}>{seg.bottomLabel}</span>
                </div>
                {seg.weekChanges && seg.weekChanges > 0 && (
                  <span className="flex items-center gap-1 text-[10px] text-[hsl(var(--status-danger))] font-medium whitespace-nowrap shrink-0">
                    <TrendingUp className="w-3 h-3" />+{seg.weekChanges} за 7д
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DiagramView({ activeSegment, onSegmentClick }: RiskDonutChartProps) {
  return (
    <>
      <div className="px-4">
        <ResponsiveContainer width="100%" height={380}>
          <PieChart>
            <Pie data={riskSegments} cx="50%" cy="50%" innerRadius={80} outerRadius={125}
              startAngle={90} endAngle={-270} paddingAngle={2} dataKey="value"
              label={renderLabel} labelLine={false}
              onClick={(_, index) => onSegmentClick(riskSegments[index].id)}
              style={{ cursor: 'pointer' }}>
              {riskSegments.map((entry) => (
                <Cell key={entry.id} fill={entry.color} stroke="none"
                  opacity={activeSegment === null || activeSegment === entry.id ? 1 : 0.3}
                  style={{ transition: 'opacity 0.3s ease', cursor: 'pointer' }} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-center gap-6 pb-5 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[hsl(var(--status-danger))]" />Прямые потери</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />Лимит</span>
        <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full border border-muted-foreground/30 bg-transparent" />Прогноз</span>
      </div>
    </>
  );
}

export function RiskDonutChart({ activeSegment, onSegmentClick }: RiskDonutChartProps) {
  const [viewMode, setViewMode] = useState<'cards' | 'diagram'>('cards');

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm animate-fade-in">
      <div className="flex items-center justify-between px-6 pt-5 pb-4">
        <h2 className="text-base font-semibold text-card-foreground">Объекты управления рисками</h2>
        <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5">
          <button onClick={() => setViewMode('cards')}
            className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
              viewMode === 'cards' ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}>
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => setViewMode('diagram')}
            className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
              viewMode === 'diagram' ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground")}>
            <PieIcon className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {viewMode === 'cards' ? (
        <SegmentCards activeSegment={activeSegment} onSegmentClick={onSegmentClick} />
      ) : (
        <DiagramView activeSegment={activeSegment} onSegmentClick={onSegmentClick} />
      )}
    </div>
  );
}
