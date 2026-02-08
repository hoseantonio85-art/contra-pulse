import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { counterpartySummary, mockCounterparties, type Counterparty } from '@/data/mockData';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const segments = [
  { name: 'Критичные', value: counterpartySummary.red, color: 'hsl(var(--status-danger))', status: 'red' as const },
  { name: 'Наблюдение', value: counterpartySummary.yellow, color: 'hsl(var(--status-warning))', status: 'yellow' as const },
  { name: 'Норма', value: counterpartySummary.green, color: 'hsl(var(--status-success))', status: 'green' as const },
];

interface Props {
  onSelectCounterparty: (c: Counterparty) => void;
}

export function RiskDiagram({ onSelectCounterparty }: Props) {
  const [activeGroup, setActiveGroup] = useState<'red' | 'yellow' | 'green' | null>(null);

  const groupList = activeGroup
    ? mockCounterparties.filter(c => c.status === activeGroup).slice(0, 10)
    : [];

  return (
    <div className="grid grid-cols-[1fr,1fr] gap-6">
      {/* Chart */}
      <div className="bg-card rounded-xl border border-border p-6 flex flex-col items-center">
        <h4 className="text-xs font-semibold mb-4 self-start">Распределение по риску</h4>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={segments}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
              cursor="pointer"
              onClick={(_, index) => setActiveGroup(segments[index].status)}
            >
              {segments.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.color}
                  opacity={activeGroup && activeGroup !== entry.status ? 0.3 : 1}
                  stroke="none"
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid hsl(var(--border))' }}
              formatter={(value: number, name: string) => [`${value} контрагентов`, name]}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Legend */}
        <div className="flex gap-5 mt-2">
          {segments.map(s => (
            <button
              key={s.status}
              onClick={() => setActiveGroup(activeGroup === s.status ? null : s.status)}
              className={`flex items-center gap-1.5 text-xs transition-opacity ${activeGroup && activeGroup !== s.status ? 'opacity-40' : ''}`}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
              <span className="font-medium">{s.name}</span>
              <span className="text-muted-foreground">({s.value})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Group detail */}
      <div className="bg-card rounded-xl border border-border p-6">
        {activeGroup ? (
          <>
            <h4 className="text-xs font-semibold mb-3">
              {activeGroup === 'red' ? '🔴 Критичные' : activeGroup === 'yellow' ? '🟡 Наблюдение' : '🟢 Норма'}
              <span className="text-muted-foreground font-normal ml-1">({segments.find(s => s.status === activeGroup)?.value})</span>
            </h4>
            <div className="space-y-1.5">
              {groupList.map(c => (
                <button
                  key={c.id}
                  onClick={() => onSelectCounterparty(c)}
                  className="w-full flex items-center gap-3 bg-background hover:bg-muted/50 rounded-lg p-3 transition-colors text-left"
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium truncate">{c.form} «{c.name}»</div>
                    <div className="text-[10px] text-muted-foreground">{c.reasonLabel}</div>
                  </div>
                  <span className="text-xs font-medium tabular-nums">{c.riskScore}</span>
                  <ArrowRight className="w-3 h-3 text-muted-foreground shrink-0" />
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground">
            <p className="text-sm">Кликните на сектор диаграммы</p>
            <p className="text-xs mt-1">чтобы увидеть список контрагентов</p>
          </div>
        )}
      </div>
    </div>
  );
}
