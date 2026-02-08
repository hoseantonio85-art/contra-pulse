import { ArrowRight, TrendingDown, TrendingUp, AlertTriangle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { counterpartySummary } from '@/data/mockData';

interface InfoPanelProps {
  selectedSegment: string | null;
  onOpenPartnersDrawer: () => void;
  onGoToCounterparties: () => void;
}

function DefaultPanel() {
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-primary" />
        <h3 className="text-sm font-semibold">Что происходит</h3>
        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground ml-auto" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-background rounded-lg p-3">
          <div className="text-[11px] text-muted-foreground mb-1">Общие потери</div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold">5.1</span>
            <span className="text-xs text-muted-foreground">млн/₽</span>
            <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full bg-[hsl(var(--status-danger-bg))] text-[hsl(var(--status-danger-foreground))] font-medium">85%</span>
          </div>
        </div>
        <div className="bg-background rounded-lg p-3">
          <div className="text-[11px] text-muted-foreground mb-1">Потенциальные потери</div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold">6.2</span>
            <span className="text-xs text-muted-foreground">млн/₽</span>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-semibold">Зоны внимания</h4>
          <span className="text-[10px] text-muted-foreground">30 дней</span>
        </div>
        <div className="space-y-2">
          {['Массовые сбои в системе онлайн-расчётов', 'Увеличение судебных исков по поставщикам', 'Задержки в обработке данных клиентов'].map((item, i) => (
            <div key={i} className="bg-background rounded-lg p-3 flex items-start gap-2">
              <div className="flex-1">
                <div className="text-[10px] text-muted-foreground mb-0.5">ИТ и Непрерывность</div>
                <div className="text-xs font-medium leading-tight">{item}</div>
              </div>
              <span className="text-[9px] px-1.5 py-0.5 rounded status-badge-danger font-medium whitespace-nowrap">Лимит исчерпан</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-background rounded-lg p-3">
        <div className="text-xs font-semibold mb-1">Высокие риски без мер</div>
        <div className="text-lg font-bold">6 <span className="text-sm font-normal text-muted-foreground">из 18</span></div>
        <div className="text-[11px] text-muted-foreground">11% высоких рисков не имеют эффективных мер</div>
      </div>
    </div>
  );
}

function PartnersPanel({ onOpenDrawer, onGoToCounterparties }: { onOpenDrawer: () => void; onGoToCounterparties: () => void }) {
  const s = counterpartySummary;
  return (
    <div className="space-y-4 animate-slide-in-right">
      <h3 className="text-sm font-semibold">Партнёры и поставки</h3>

      <div className="bg-accent/60 rounded-lg p-3 border border-primary/10">
        <div className="flex items-start gap-2">
          <Sparkles className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
          <p className="text-xs leading-relaxed text-accent-foreground">
            Обнаружено ухудшение у 3 контрагентов за последнюю неделю. Основные причины — судебные дела и финансовые проблемы. Рекомендуется проверить красную зону.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="bg-background rounded-lg p-3 text-center">
          <div className="text-xl font-bold">{s.total}</div>
          <div className="text-[10px] text-muted-foreground">Всего</div>
        </div>
        <div className="bg-background rounded-lg p-3 text-center">
          <div className="text-xl font-bold text-[hsl(var(--status-danger))]">{s.red}</div>
          <div className="text-[10px] text-muted-foreground">🔴 Красных</div>
        </div>
        <div className="bg-background rounded-lg p-3 text-center">
          <div className="text-xl font-bold text-[hsl(var(--status-warning))]">{s.yellow}</div>
          <div className="text-[10px] text-muted-foreground">🟡 Жёлтых</div>
        </div>
      </div>

      <div className="bg-background rounded-lg p-3">
        <h4 className="text-xs font-semibold mb-2">Топ причин ухудшений</h4>
        <div className="space-y-1.5">
          {s.topReasons.slice(0, 2).map((r, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
              <AlertTriangle className="w-3 h-3 text-[hsl(var(--status-warning))]" />
              {r}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-background rounded-lg p-3">
        <h4 className="text-xs font-semibold mb-2">Изменения за 7 дней</h4>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-xs">
            <TrendingUp className="w-3.5 h-3.5 text-[hsl(var(--status-danger))]" />
            <span className="font-medium">ухудшилось +{s.changesWeek.worsened}</span>
          </span>
          <span className="flex items-center gap-1 text-xs">
            <TrendingDown className="w-3.5 h-3.5 text-[hsl(var(--status-success))]" />
            <span className="font-medium">улучшилось +{s.changesWeek.improved}</span>
          </span>
        </div>
      </div>

      <div className="space-y-2 pt-1">
        <Button className="w-full" size="sm" onClick={onOpenDrawer}>
          Открыть детали
        </Button>
        <Button variant="outline" className="w-full" size="sm" onClick={onGoToCounterparties}>
          Перейти в Контрагентов
          <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
        </Button>
      </div>
    </div>
  );
}

export function InfoPanel({ selectedSegment, onOpenPartnersDrawer, onGoToCounterparties }: InfoPanelProps) {
  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-5 h-fit">
      {selectedSegment === 'partners' ? (
        <PartnersPanel onOpenDrawer={onOpenPartnersDrawer} onGoToCounterparties={onGoToCounterparties} />
      ) : (
        <DefaultPanel />
      )}
    </div>
  );
}
