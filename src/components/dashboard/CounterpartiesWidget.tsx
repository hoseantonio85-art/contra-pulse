import { Users, TrendingUp, TrendingDown, AlertTriangle, ArrowRight, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { counterpartySummary } from '@/data/mockData';

interface CounterpartiesWidgetProps {
  onOpenCounterparties: () => void;
  onOpenRed: () => void;
}

export function CounterpartiesWidget({ onOpenCounterparties, onOpenRed }: CounterpartiesWidgetProps) {
  const s = counterpartySummary;

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-5">
        <Users className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-semibold">Контрагенты</h3>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        <div className="bg-background rounded-lg p-3 text-center">
          <div className="text-2xl font-bold">{s.total}</div>
          <div className="text-[11px] text-muted-foreground">Всего</div>
        </div>
        <div className="bg-background rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-[hsl(var(--status-danger))]">{s.red}</div>
          <div className="text-[11px] text-muted-foreground flex items-center justify-center gap-1">
            <span className="status-dot-danger" /> Высокий риск
          </div>
        </div>
        <div className="bg-background rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-[hsl(var(--status-warning))]">{s.yellow}</div>
          <div className="text-[11px] text-muted-foreground flex items-center justify-center gap-1">
            <span className="status-dot-warning" /> Средний риск
          </div>
        </div>
      </div>

      {/* Reasons + Changes */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div className="bg-background rounded-lg p-3">
          <h4 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Основные причины</h4>
          <div className="space-y-1.5">
            {s.topReasons.slice(0, 3).map((r, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs text-foreground">
                <AlertTriangle className="w-3 h-3 text-[hsl(var(--status-warning))] shrink-0" />
                <span className="truncate">{r}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-background rounded-lg p-3">
          <h4 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">Изменения</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground">За неделю</span>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-xs font-medium">
                  <TrendingUp className="w-3 h-3 text-[hsl(var(--status-danger))]" />+{s.changesWeek.worsened}
                </span>
                <span className="flex items-center gap-1 text-xs font-medium">
                  <TrendingDown className="w-3 h-3 text-[hsl(var(--status-success))]" />+{s.changesWeek.improved}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground">За месяц</span>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-xs font-medium">
                  <TrendingUp className="w-3 h-3 text-[hsl(var(--status-danger))]" />+{s.changesMonth.worsened}
                </span>
                <span className="flex items-center gap-1 text-xs font-medium">
                  <TrendingDown className="w-3 h-3 text-[hsl(var(--status-success))]" />+{s.changesMonth.improved}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="flex gap-3 items-center">
        <Button size="sm" onClick={onOpenCounterparties}>
          <LayoutGrid className="w-3.5 h-3.5 mr-1.5" />
          Открыть список
        </Button>
        <Button variant="outline" size="sm" onClick={onOpenRed}>
          Показать красных
          <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
        </Button>
        <div className="ml-auto bg-muted rounded-lg px-3 py-1.5">
          <span className="text-[10px] text-muted-foreground">Потенциальные потери (скоро)</span>
        </div>
      </div>
    </div>
  );
}
