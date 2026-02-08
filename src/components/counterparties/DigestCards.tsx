import { Users, AlertTriangle, TrendingUp, Eye } from 'lucide-react';
import { counterpartySummary } from '@/data/mockData';

export function DigestCards() {
  const s = counterpartySummary;
  const items = [
    { label: 'Всего контрагентов', value: s.total, icon: Users, color: 'text-foreground' },
    { label: 'Ухудшились за период', value: s.changesWeek.worsened, icon: TrendingUp, color: 'text-[hsl(var(--status-danger))]' },
    { label: 'Под наблюдением', value: s.yellow, icon: Eye, color: 'text-[hsl(var(--status-warning))]' },
    { label: 'Новые проблемные', value: s.newProblematic, icon: AlertTriangle, color: 'text-[hsl(var(--status-danger))]' },
  ];

  return (
    <div className="grid grid-cols-4 gap-3 mb-5">
      {items.map((item, i) => (
        <div key={i} className="bg-card rounded-xl border border-border p-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-background flex items-center justify-center shrink-0">
            <item.icon className={`w-4 h-4 ${item.color}`} />
          </div>
          <div>
            <div className={`text-xl font-bold ${item.color}`}>{item.value}</div>
            <div className="text-[10px] text-muted-foreground leading-tight">{item.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
