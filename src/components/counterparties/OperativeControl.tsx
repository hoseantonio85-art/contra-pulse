import { AlertTriangle, ArrowRight } from 'lucide-react';
import { mockCounterparties, type Counterparty } from '@/data/mockData';

interface Props {
  onSelect: (c: Counterparty) => void;
}

export function OperativeControl({ onSelect }: Props) {
  const items = mockCounterparties
    .filter(c => c.status === 'red' || (c.status === 'yellow' && c.trend === 'up'))
    .sort((a, b) => b.riskScore - a.riskScore)
    .slice(0, 4);

  if (items.length === 0) return null;

  return (
    <div className="mb-5 bg-[hsl(var(--status-danger-bg))] rounded-xl border-l-4 border-l-[hsl(var(--status-danger))] border border-[hsl(var(--status-danger)/0.15)] p-4">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="w-4 h-4 text-[hsl(var(--status-danger))]" />
        <h3 className="text-sm font-semibold">На оперативном контроле</h3>
        <span className="text-[10px] text-muted-foreground ml-auto">{items.length} контрагентов</span>
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-2">
        {items.map(c => (
          <button
            key={c.id}
            onClick={() => onSelect(c)}
            className="bg-card/80 rounded-lg p-3 text-left hover:bg-card transition-colors"
          >
            <div className="flex items-center gap-1.5 mb-1">
              <span className={c.status === 'red' ? 'status-dot-danger' : 'status-dot-warning'} />
              <span className="text-xs font-medium truncate">{c.form} «{c.name}»</span>
            </div>
            <div className="text-[10px] text-muted-foreground mb-1 truncate">{c.reasonLabel}</div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[hsl(var(--status-danger))]">{Math.round(c.riskScore / 10)}/10</span>
              <ArrowRight className="w-3 h-3 text-muted-foreground" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
