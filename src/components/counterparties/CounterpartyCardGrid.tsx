import { TrendingUp, TrendingDown, Minus, ArrowRight, Eye, Pin, CheckSquare, Mail } from 'lucide-react';
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

function RiskScoreBar({ score }: { score: number }) {
  const color = score >= 70 ? 'bg-[hsl(var(--status-danger))]' : score >= 40 ? 'bg-[hsl(var(--status-warning))]' : 'bg-[hsl(var(--status-success))]';
  const textColor = score >= 70 ? 'text-[hsl(var(--status-danger))]' : score >= 40 ? 'text-[hsl(var(--status-warning))]' : 'text-[hsl(var(--status-success))]';
  const display = Math.round(score / 10);
  return (
    <div className="flex items-center gap-1.5">
      <div className="h-1 flex-1 rounded-full bg-muted overflow-hidden max-w-[50px]">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${score}%` }} />
      </div>
      <span className={`text-[11px] font-bold ${textColor}`}>{display}/10</span>
    </div>
  );
}

interface Props {
  counterparties: Counterparty[];
  onSelect: (c: Counterparty) => void;
  onCreateTask?: (c: Counterparty) => void;
  onSendNotification?: (c: Counterparty) => void;
}

export function CounterpartyCardGrid({ counterparties, onSelect, onCreateTask, onSendNotification }: Props) {
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
          <p className="text-[11px] text-muted-foreground leading-relaxed mb-2 line-clamp-2">
            {c.aiSummary || c.reason || 'Существенных изменений не обнаружено.'}
          </p>

          {/* Risk score */}
          <div className="mb-2">
            <RiskScoreBar score={c.riskScore} />
          </div>

          {/* Debt KPIs */}
          {(c.debtTotal || c.debtOverdue || c.debtAtRisk) && (
            <div className="flex items-center gap-3 text-[10px] mb-2 bg-background rounded-lg px-2 py-1.5">
              {c.debtTotal && <span className="text-muted-foreground">ДЗ: <strong className="text-foreground">{c.debtTotal} млн</strong></span>}
              {c.debtOverdue && <span className="text-[hsl(var(--status-warning))]">Просрочка: <strong>{c.debtOverdue} млн</strong></span>}
              {c.debtAtRisk && <span className="text-[hsl(var(--status-danger))]">Риск: <strong>{c.debtAtRisk} млн</strong></span>}
            </div>
          )}

          <div className="flex items-center justify-between">
            <TrendIcon trend={c.trend} />
            {/* Quick actions */}
            <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => { e.stopPropagation(); onSelect(c); }}
                className="w-7 h-7 rounded-md hover:bg-muted flex items-center justify-center"
                title="Открыть"
              >
                <Eye className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); }}
                className="w-7 h-7 rounded-md hover:bg-muted flex items-center justify-center"
                title="В фокус"
              >
                <Pin className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onCreateTask?.(c); }}
                className="w-7 h-7 rounded-md hover:bg-muted flex items-center justify-center"
                title="Создать задачу"
              >
                <CheckSquare className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); onSendNotification?.(c); }}
                className="w-7 h-7 rounded-md hover:bg-muted flex items-center justify-center"
                title="Проинформировать"
              >
                <Mail className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
