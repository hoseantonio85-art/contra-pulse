import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  Sparkles, Shield, Scale, Newspaper, Banknote, FileText, Clock, TrendingUp, TrendingDown,
  CheckCircle2, ThumbsDown, Pin, Plus, AlertTriangle, ExternalLink, Minus, CheckSquare, Mail
} from 'lucide-react';
import { recentEvents, type Counterparty } from '@/data/mockData';

function StatusBadge({ status }: { status: Counterparty['status'] }) {
  const cls = status === 'red' ? 'status-badge-danger' : status === 'yellow' ? 'status-badge-warning' : 'status-badge-success';
  const label = status === 'red' ? 'Критичный' : status === 'yellow' ? 'Наблюдение' : 'Норма';
  return <span className={`text-[11px] px-2.5 py-1 rounded-full font-medium ${cls}`}>{label}</span>;
}

function RiskScore({ score }: { score: number }) {
  const color = score >= 70 ? 'hsl(var(--status-danger))' : score >= 40 ? 'hsl(var(--status-warning))' : 'hsl(var(--status-success))';
  return (
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center" style={{ borderColor: color }}>
        <span className="text-sm font-bold" style={{ color }}>{score}</span>
      </div>
    </div>
  );
}

interface CounterpartyDrawerProps {
  counterparty: Counterparty | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateTask?: (c: Counterparty) => void;
  onSendNotification?: (c: Counterparty) => void;
}

export function CounterpartyDrawer({ counterparty, open, onOpenChange, onCreateTask, onSendNotification }: CounterpartyDrawerProps) {
  const [disagreeOpen, setDisagreeOpen] = useState(false);
  const [disagreeReason, setDisagreeReason] = useState('');
  const [disagreeComment, setDisagreeComment] = useState('');

  if (!counterparty) return null;
  const c = counterparty;

  const signals = [
    { icon: Scale, label: 'Судебные дела / ФССП', value: c.status === 'red' ? '3 активных' : c.status === 'yellow' ? '1 дело' : 'Нет', danger: c.status === 'red' },
    { icon: Banknote, label: 'Финансовые признаки', value: c.riskScore >= 60 ? 'Просрочки' : 'Норма', danger: c.riskScore >= 60 },
    { icon: Newspaper, label: 'Упоминания в СМИ', value: c.reasonLabel.includes('СМИ') ? '5 негативных' : 'Нейтрально', danger: c.reasonLabel.includes('СМИ') },
    { icon: FileText, label: 'Проблемы по договорам', value: 'Не выявлено', danger: false },
    { icon: Clock, label: 'Последняя проверка', value: c.lastChange, danger: false },
  ];

  const timeline = recentEvents.filter(e => e.counterpartyName === c.name).length > 0
    ? recentEvents.filter(e => e.counterpartyName === c.name)
    : recentEvents.slice(0, 3);

  const relatedRisks = [
    { id: '1', name: 'Риск неисполнения обязательств контрагентом', level: 'Высокий' },
    { id: '2', name: 'Риск мошенничества в закупках', level: 'Средний' },
    { id: '3', name: 'Риск утечки данных через подрядчика', level: 'Низкий' },
  ];

  const documents = [
    { name: 'Финансовая отчётность 2025', status: 'processed' as const },
    { name: 'Выписка ЕГРЮЛ', status: 'processed' as const },
    { name: 'Аудиторское заключение', status: 'processing' as const },
  ];

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="right" className="w-[600px] sm:w-[600px] overflow-y-auto">
          <SheetHeader className="pb-3">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <SheetTitle className="text-lg mb-1">{c.form} «{c.name}»</SheetTitle>
                {c.inn && <div className="text-[11px] text-muted-foreground mb-1.5">ИНН: {c.inn}</div>}
                <div className="flex items-center gap-2">
                  <StatusBadge status={c.status} />
                  <RiskScore score={c.riskScore} />
                </div>
              </div>
            </div>
          </SheetHeader>

          {/* Debt KPIs */}
          {(c.debtTotal || c.debtOverdue || c.debtAtRisk) && (
            <div className="grid grid-cols-3 gap-2 mb-4">
              {c.debtTotal && (
                <div className="bg-background rounded-lg p-3 text-center">
                  <div className="text-lg font-bold">{c.debtTotal}</div>
                  <div className="text-[10px] text-muted-foreground">ДЗ, млн ₽</div>
                </div>
              )}
              {c.debtOverdue && (
                <div className="bg-[hsl(var(--status-warning-bg))] rounded-lg p-3 text-center border border-[hsl(var(--status-warning)/0.15)]">
                  <div className="text-lg font-bold text-[hsl(var(--status-warning))]">{c.debtOverdue}</div>
                  <div className="text-[10px] text-muted-foreground">Просрочка, млн ₽</div>
                </div>
              )}
              {c.debtAtRisk && (
                <div className="bg-[hsl(var(--status-danger-bg))] rounded-lg p-3 text-center border border-[hsl(var(--status-danger)/0.15)]">
                  <div className="text-lg font-bold text-[hsl(var(--status-danger))]">{c.debtAtRisk}</div>
                  <div className="text-[10px] text-muted-foreground">Риск, млн ₽</div>
                </div>
              )}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Button size="sm"><Plus className="w-3.5 h-3.5 mr-1" />Создать меры</Button>
            <Button size="sm" variant="outline"><CheckCircle2 className="w-3.5 h-3.5 mr-1" />Проверено</Button>
            <Button size="sm" variant="outline" onClick={() => setDisagreeOpen(true)}>
              <ThumbsDown className="w-3.5 h-3.5 mr-1" />Не согласен с AI
            </Button>
            <Button size="sm" variant="outline"><Pin className="w-3.5 h-3.5 mr-1" />В фокус</Button>
            {onCreateTask && (
              <Button size="sm" variant="outline" onClick={() => onCreateTask(c)}>
                <CheckSquare className="w-3.5 h-3.5 mr-1" />Задача
              </Button>
            )}
            {onSendNotification && (
              <Button size="sm" variant="outline" onClick={() => onSendNotification(c)}>
                <Mail className="w-3.5 h-3.5 mr-1" />Письмо
              </Button>
            )}
          </div>

          <div className="space-y-6">
            {/* AI Summary */}
            <div className="bg-accent/60 rounded-lg p-4 border border-primary/10">
              <div className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-semibold mb-1">AI-резюме</h4>
                  <p className="text-xs leading-relaxed text-accent-foreground">
                    {c.aiSummary || `Контрагент ${c.name} находится в зоне ${c.status === 'red' ? 'критического' : c.status === 'yellow' ? 'повышенного' : 'нормального'} внимания. ${c.reason || 'Существенных изменений не обнаружено.'}`}
                  </p>
                </div>
              </div>
            </div>

            {/* Key signals */}
            <div>
              <h4 className="text-xs font-semibold mb-3">Ключевые сигналы</h4>
              <div className="grid grid-cols-2 gap-2">
                {signals.map((s, i) => (
                  <div key={i} className={`rounded-lg p-3 border ${s.danger ? 'bg-[hsl(var(--status-danger-bg))] border-[hsl(var(--status-danger)/0.15)]' : 'bg-background border-border'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <s.icon className={`w-3.5 h-3.5 ${s.danger ? 'text-[hsl(var(--status-danger))]' : 'text-muted-foreground'}`} />
                      <span className="text-[10px] text-muted-foreground">{s.label}</span>
                    </div>
                    <div className="text-xs font-medium">{s.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Timeline */}
            <div>
              <h4 className="text-xs font-semibold mb-3">История / Таймлайн</h4>
              <div className="space-y-3">
                {timeline.map(e => (
                  <div key={e.id} className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${e.type === 'worsened' ? 'bg-[hsl(var(--status-danger-bg))]' : e.type === 'improved' ? 'bg-[hsl(var(--status-success-bg))]' : 'bg-muted'}`}>
                      {e.type === 'worsened' ? <TrendingUp className="w-3 h-3 text-[hsl(var(--status-danger))]" /> :
                       e.type === 'improved' ? <TrendingDown className="w-3 h-3 text-[hsl(var(--status-success))]" /> :
                       <Minus className="w-3 h-3 text-muted-foreground" />}
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-medium">{e.title}</div>
                      <div className="text-[10px] text-muted-foreground">{e.description}</div>
                    </div>
                    <span className="text-[10px] text-muted-foreground">{e.date}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Related risks */}
            <div>
              <h4 className="text-xs font-semibold mb-3">Связанные риски</h4>
              <div className="space-y-1.5">
                {relatedRisks.map(r => (
                  <button key={r.id} className="w-full flex items-center gap-2 bg-background hover:bg-muted/50 rounded-lg p-3 transition-colors text-left">
                    <Shield className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-xs flex-1">{r.name}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${r.level === 'Высокий' ? 'status-badge-danger' : r.level === 'Средний' ? 'status-badge-warning' : 'status-badge-success'}`}>{r.level}</span>
                    <ExternalLink className="w-3 h-3 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Documents */}
            <div>
              <h4 className="text-xs font-semibold mb-3">Документы</h4>
              <div className="space-y-1.5">
                {documents.map((d, i) => (
                  <div key={i} className="flex items-center gap-2 bg-background rounded-lg p-3">
                    <FileText className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-xs flex-1">{d.name}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${d.status === 'processed' ? 'status-badge-success' : 'status-badge-warning'}`}>
                      {d.status === 'processed' ? 'Обработан' : 'В процессе'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Disagree Modal */}
      <Dialog open={disagreeOpen} onOpenChange={setDisagreeOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Не согласен с оценкой AI</DialogTitle>
            <DialogDescription>
              Укажите причину несогласия с текущей оценкой контрагента «{c.name}»
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <RadioGroup value={disagreeReason} onValueChange={setDisagreeReason}>
              {[
                { value: 'outdated', label: 'Данные устарели' },
                { value: 'false_positive', label: 'Ложное срабатывание' },
                { value: 'missing_docs', label: 'Не хватает документов' },
                { value: 'temporary', label: 'Временная ситуация' },
              ].map(opt => (
                <div key={opt.value} className="flex items-center gap-2">
                  <RadioGroupItem value={opt.value} id={opt.value} />
                  <Label htmlFor={opt.value} className="text-sm">{opt.label}</Label>
                </div>
              ))}
            </RadioGroup>
            <Textarea placeholder="Комментарий (необязательно)..." value={disagreeComment} onChange={e => setDisagreeComment(e.target.value)} rows={3} />
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setDisagreeOpen(false)}>Отмена</Button>
              <Button onClick={() => { setDisagreeOpen(false); setDisagreeReason(''); setDisagreeComment(''); }}>
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />Отправить на переанализ
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
