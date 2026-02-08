import { TrendingUp, TrendingDown, Minus, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Counterparty } from '@/data/mockData';

function StatusDot({ status }: { status: Counterparty['status'] }) {
  const cls = status === 'red' ? 'status-dot-danger' : status === 'yellow' ? 'status-dot-warning' : 'status-dot-success';
  return <span className={cls} />;
}

function StatusLabel({ status }: { status: Counterparty['status'] }) {
  const cls = status === 'red' ? 'status-badge-danger' : status === 'yellow' ? 'status-badge-warning' : 'status-badge-success';
  const label = status === 'red' ? 'Критичный' : status === 'yellow' ? 'Наблюдение' : 'Норма';
  return <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${cls}`}>{label}</span>;
}

function TrendIcon({ trend }: { trend: Counterparty['trend'] }) {
  if (trend === 'up') return <span className="flex items-center gap-1 text-[11px] text-[hsl(var(--status-danger))] font-medium"><TrendingUp className="w-3 h-3" />ухудшился</span>;
  if (trend === 'down') return <span className="flex items-center gap-1 text-[11px] text-[hsl(var(--status-success))] font-medium"><TrendingDown className="w-3 h-3" />улучшился</span>;
  return <span className="flex items-center gap-1 text-[11px] text-muted-foreground"><Minus className="w-3 h-3" />стабильно</span>;
}

interface Props {
  counterparties: Counterparty[];
  onSelect: (c: Counterparty) => void;
}

export function CounterpartyCardGrid({ counterparties, onSelect }: Props) {
  if (counterparties.length === 0) {
    return (
      <div className="text-center py-16 text-sm text-muted-foreground">
        Контрагенты не найдены
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 xl:grid-cols-3 gap-3">
      {counterparties.map(c => (
        <div
          key={c.id}
          className="bg-card rounded-xl border border-border p-4 hover:shadow-md transition-shadow cursor-pointer group"
          onClick={() => onSelect(c)}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <StatusDot status={c.status} />
              <span className="text-xs font-semibold truncate">{c.form} «{c.name}»</span>
            </div>
            <StatusLabel status={c.status} />
          </div>

          {/* AI explanation */}
          <p className="text-[11px] text-muted-foreground leading-relaxed mb-3 line-clamp-2">
            {c.aiSummary || c.reason || 'Существенных изменений не обнаружено.'}
          </p>

          <div className="flex items-center justify-between">
            <TrendIcon trend={c.trend} />
            <Button variant="ghost" size="sm" className="h-7 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
              Открыть <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
