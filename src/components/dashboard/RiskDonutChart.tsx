import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { LayoutGrid, PieChart as PieIcon } from 'lucide-react';
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
      <text
        x={x}
        y={y - 6}
        textAnchor={textAnchor}
        dominantBaseline="central"
        style={{ fill: 'hsl(var(--foreground))', fontSize: 11, fontWeight: 500, fontFamily: 'Manrope' }}
      >
        {seg.shortName}
      </text>
      <text
        x={x}
        y={y + 10}
        textAnchor={textAnchor}
        dominantBaseline="central"
        style={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10, fontFamily: 'Manrope' }}
      >
        {seg.value} млн/₽
      </text>
    </g>
  );
};

function SegmentCards({ activeSegment, onSegmentClick }: RiskDonutChartProps) {
  return (
    <div className="grid grid-cols-3 gap-3 px-5 pb-5">
      {riskSegments.map((seg) => {
        const isActive = activeSegment === seg.id;
        return (
          <div
            key={seg.id}
            onClick={() => onSegmentClick(seg.id)}
            className={cn(
              "bg-background rounded-xl border p-4 cursor-pointer transition-all hover:shadow-md",
              isActive ? "border-primary/40 shadow-sm ring-1 ring-primary/20" : "border-border"
            )}
          >
            <div className="text-base mb-3">{seg.icon}</div>
            <h4 className="text-sm font-semibold mb-3 leading-snug">{seg.shortName}</h4>
            <div className="space-y-1.5 mb-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Прогноз потерь</span>
                <span className="font-medium">{seg.forecastLoss} млн/₽</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Фактические потери</span>
                <span className="font-medium">{seg.actualLoss} млн/₽</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[11px]">
              <span className={cn(
                "w-1.5 h-1.5 rounded-full",
                seg.bottomType === 'danger' ? "bg-[hsl(var(--status-danger))]" :
                seg.bottomType === 'warning' ? "bg-[hsl(var(--status-warning))]" :
                "bg-muted-foreground/40"
              )} />
              <span className={cn(
                seg.bottomType === 'danger' ? "text-[hsl(var(--status-danger))]" :
                seg.bottomType === 'warning' ? "text-[hsl(var(--status-warning))]" :
                "text-muted-foreground"
              )}>
                {seg.bottomLabel}
              </span>
              {seg.bottomValue && (
                <span className="ml-auto font-medium text-muted-foreground">{seg.bottomValue}</span>
              )}
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
            <Pie
              data={riskSegments}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={125}
              startAngle={90}
              endAngle={-270}
              paddingAngle={2}
              dataKey="value"
              label={renderLabel}
              labelLine={false}
              onClick={(_, index) => onSegmentClick(riskSegments[index].id)}
              style={{ cursor: 'pointer' }}
            >
              {riskSegments.map((entry) => (
                <Cell
                  key={entry.id}
                  fill={entry.color}
                  stroke="none"
                  opacity={activeSegment === null || activeSegment === entry.id ? 1 : 0.3}
                  style={{ transition: 'opacity 0.3s ease', cursor: 'pointer' }}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-center gap-6 pb-5 text-[11px] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[hsl(var(--status-danger))]" />
          Прямые потери
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30" />
          Лимит
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full border border-muted-foreground/30 bg-transparent" />
          Прогноз
        </span>
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
          <button
            onClick={() => setViewMode('cards')}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
              viewMode === 'cards'
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setViewMode('diagram')}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
              viewMode === 'diagram'
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
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
