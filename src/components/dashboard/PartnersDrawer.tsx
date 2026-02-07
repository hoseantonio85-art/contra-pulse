import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, TrendingUp, TrendingDown, ExternalLink, Download, FileText, Minus } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { mockCounterparties, recentEvents, counterpartySummary, type Counterparty } from '@/data/mockData';

const trendData7d = [
  { day: 'Пн', value: 10 }, { day: 'Вт', value: 11 }, { day: 'Ср', value: 10 },
  { day: 'Чт', value: 12 }, { day: 'Пт', value: 11 }, { day: 'Сб', value: 12 }, { day: 'Вс', value: 12 },
];
const trendData30d = [
  { day: '1', value: 8 }, { day: '5', value: 9 }, { day: '10', value: 10 }, { day: '15', value: 9 },
  { day: '20', value: 11 }, { day: '25', value: 12 }, { day: '30', value: 12 },
];

function StatusBadge({ status }: { status: Counterparty['status'] }) {
  const cls = status === 'red' ? 'status-badge-danger' : status === 'yellow' ? 'status-badge-warning' : 'status-badge-success';
  const label = status === 'red' ? 'Критичный' : status === 'yellow' ? 'Наблюдение' : 'Норма';
  return <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${cls}`}>{label}</span>;
}

interface PartnersDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectCounterparty: (c: Counterparty) => void;
  onGoToCounterparties: () => void;
}

export function PartnersDrawer({ open, onOpenChange, onSelectCounterparty, onGoToCounterparties }: PartnersDrawerProps) {
  const [period, setPeriod] = useState<'7d' | '30d'>('7d');
  const s = counterpartySummary;
  const criticals = mockCounterparties.filter(c => c.status === 'red').slice(0, 6);
  const data = period === '7d' ? trendData7d : trendData30d;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[560px] sm:w-[560px] overflow-y-auto">
        <SheetHeader className="pb-4">
          <SheetTitle className="text-lg">Контрагенты — обзор</SheetTitle>
        </SheetHeader>

        <div className="space-y-6">
          {/* Distribution */}
          <div className="flex gap-3">
            <div className="flex-1 bg-background rounded-lg p-3 text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <span className="status-dot-danger" /><span className="text-sm font-bold">{s.red}</span>
              </div>
              <div className="text-[10px] text-muted-foreground">Критичных</div>
            </div>
            <div className="flex-1 bg-background rounded-lg p-3 text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <span className="status-dot-warning" /><span className="text-sm font-bold">{s.yellow}</span>
              </div>
              <div className="text-[10px] text-muted-foreground">Наблюдение</div>
            </div>
            <div className="flex-1 bg-background rounded-lg p-3 text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <span className="status-dot-success" /><span className="text-sm font-bold">{s.green}</span>
              </div>
              <div className="text-[10px] text-muted-foreground">Норма</div>
            </div>
          </div>

          {/* Trend chart */}
          <div className="bg-background rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-semibold">Тренд риска</h4>
              <div className="flex gap-1">
                <button onClick={() => setPeriod('7d')} className={`text-[10px] px-2 py-0.5 rounded-full transition-colors ${period === '7d' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'}`}>7 дней</button>
                <button onClick={() => setPeriod('30d')} className={`text-[10px] px-2 py-0.5 rounded-full transition-colors ${period === '30d' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'}`}>30 дней</button>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={120}>
              <LineChart data={data}>
                <XAxis dataKey="day" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                <Line type="monotone" dataKey="value" stroke="hsl(var(--status-danger))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Critical counterparties */}
          <div>
            <h4 className="text-xs font-semibold mb-3">Критичные контрагенты</h4>
            <div className="space-y-1.5">
              {criticals.map(c => (
                <button
                  key={c.id}
                  onClick={() => onSelectCounterparty(c)}
                  className="w-full flex items-center gap-3 bg-background hover:bg-muted/60 rounded-lg p-3 transition-colors text-left"
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium truncate">{c.form} «{c.name}»</div>
                    <div className="text-[10px] text-muted-foreground">{c.reasonLabel}</div>
                  </div>
                  <StatusBadge status={c.status} />
                  <span className="text-[10px] text-muted-foreground whitespace-nowrap">{c.lastChange}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Recent events */}
          <div>
            <h4 className="text-xs font-semibold mb-3">Последние изменения</h4>
            <div className="space-y-2">
              {recentEvents.slice(0, 5).map(e => (
                <div key={e.id} className="flex items-start gap-2.5 bg-background rounded-lg p-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${e.type === 'worsened' ? 'bg-[hsl(var(--status-danger-bg))]' : e.type === 'improved' ? 'bg-[hsl(var(--status-success-bg))]' : 'bg-muted'}`}>
                    {e.type === 'worsened' ? <TrendingUp className="w-3 h-3 text-[hsl(var(--status-danger))]" /> : e.type === 'improved' ? <TrendingDown className="w-3 h-3 text-[hsl(var(--status-success))]" /> : <Minus className="w-3 h-3 text-muted-foreground" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium">{e.counterpartyName}: {e.title}</div>
                    <div className="text-[10px] text-muted-foreground">{e.description}</div>
                  </div>
                  <span className="text-[10px] text-muted-foreground whitespace-nowrap">{e.date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button className="flex-1" size="sm" onClick={onGoToCounterparties}>
              <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
              Открыть сервис
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-3.5 h-3.5 mr-1.5" />
              Экспорт
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="w-3.5 h-3.5 mr-1.5" />
              Задача
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
