import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
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

export function RiskDonutChart({ activeSegment, onSegmentClick }: RiskDonutChartProps) {
  return (
    <div className="bg-card rounded-xl border border-border shadow-sm animate-fade-in">
      <div className="flex items-center justify-between px-6 pt-5 pb-2">
        <h2 className="text-base font-semibold text-card-foreground">Объекты управления рисками</h2>
      </div>
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
    </div>
  );
}
