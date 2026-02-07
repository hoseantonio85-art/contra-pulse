import { Users, TrendingUp, TrendingDown, AlertTriangle, ArrowRight, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { counterpartySummary } from '@/data/mockData';

interface CounterpartiesWidgetProps {
  onOpenCounterparties: () => void;
  onOpenChanges: () => void;
}

export function CounterpartiesWidget({ onOpenCounterparties, onOpenChanges }: CounterpartiesWidgetProps) {
  const s = counterpartySummary;

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-5">
        <Users className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-semibold">Контрагенты — кратко</h3>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-5">
        <div className="text-center">
          <div className="text-2xl font-bold">{s.total}</div>
          <div className="text-[11px] text-muted-foreground">Всего</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-[hsl(var(--status-danger))]">{s.red}</div>
          <div className="text-[11px] text-muted-foreground flex items-center justify-center gap-1"><span className="status-dot-danger" /> Критичных</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-[hsl(var(--status-warning))]">{s.yellow}</div>
          <div className="text-[11px] text-muted-foreground flex items-center justify-center gap-1"><span className="status-dot-warning" /> Наблюдение</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-[hsl(var(--status-success))]">{s.green}</div>
          <div className="text-[11px] text-muted-foreground flex items-center justify-center gap-1"><span className="status-dot-success" /> Норма</div>
        </div>
      </div>

      <div className="flex items-center gap-6 mb-5">
        <div className="flex items-center gap-4 bg-background rounded-lg px-4 py-2.5">
          <span className="text-xs font-medium text-muted-foreground">За 7 дней:</span>
          <span className="flex items-center gap-1 text-xs font-medium">
            <TrendingUp className="w-3.5 h-3.5 text-[hsl(var(--status-danger))]" />
            ухудшилось +{s.changesWeek.worsened}
          </span>
          <span className="flex items-center gap-1 text-xs font-medium">
            <TrendingDown className="w-3.5 h-3.5 text-[hsl(var(--status-success))]" />
            улучшилось +{s.changesWeek.improved}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <AlertTriangle className="w-3.5 h-3.5 text-[hsl(var(--status-warning))]" />
          Топ причин: {s.topReasons.join(' · ')}
        </div>
      </div>

      <div className="flex gap-3 items-center">
        <Button size="sm" onClick={onOpenCounterparties}>
          Открыть контрагентов
          <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
        </Button>
        <Button variant="outline" size="sm" onClick={onOpenChanges}>
          <Activity className="w-3.5 h-3.5 mr-1.5" />
          Посмотреть изменения
        </Button>

        <div className="ml-auto bg-muted rounded-lg px-3 py-1.5">
          <span className="text-[10px] text-muted-foreground">Потенциальные потери (скоро)</span>
        </div>
      </div>
    </div>
  );
}
