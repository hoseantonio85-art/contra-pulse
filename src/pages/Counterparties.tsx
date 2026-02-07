import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Sparkles, ArrowUpDown, TrendingUp, TrendingDown, Minus, Pin, ExternalLink, FileText, MoreHorizontal, CheckSquare, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { mockCounterparties, recentEvents, type Counterparty } from '@/data/mockData';
import { CounterpartyDrawer } from '@/components/counterparties/CounterpartyDrawer';
import { cn } from '@/lib/utils';

function StatusBadge({ status }: { status: Counterparty['status'] }) {
  const cls = status === 'red' ? 'status-badge-danger' : status === 'yellow' ? 'status-badge-warning' : 'status-badge-success';
  const label = status === 'red' ? 'Критичный' : status === 'yellow' ? 'Наблюдение' : 'Норма';
  return <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${cls}`}>{label}</span>;
}

function RiskBar({ score }: { score: number }) {
  const color = score >= 70 ? 'hsl(var(--status-danger))' : score >= 40 ? 'hsl(var(--status-warning))' : 'hsl(var(--status-success))';
  return (
    <div className="flex items-center gap-2">
      <div className="w-12 h-1.5 rounded-full bg-muted overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${score}%`, backgroundColor: color }} />
      </div>
      <span className="text-xs font-medium w-6 text-right">{score}</span>
    </div>
  );
}

function TrendIcon({ trend }: { trend: Counterparty['trend'] }) {
  if (trend === 'up') return <TrendingUp className="w-3.5 h-3.5 text-[hsl(var(--status-danger))]" />;
  if (trend === 'down') return <TrendingDown className="w-3.5 h-3.5 text-[hsl(var(--status-success))]" />;
  return <Minus className="w-3 h-3 text-muted-foreground" />;
}

const Counterparties = () => {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('critical');
  const [selectedCounterparty, setSelectedCounterparty] = useState<Counterparty | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showAiBanner, setShowAiBanner] = useState(true);

  const filtered = useMemo(() => {
    let list = mockCounterparties;
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(c => c.name.toLowerCase().includes(q) || c.form.toLowerCase().includes(q));
    }
    switch (activeTab) {
      case 'critical': return list.filter(c => c.status === 'red');
      case 'observation': return list.filter(c => c.status === 'yellow');
      case 'changes': return list.filter(c => c.trend !== 'stable');
      case 'focus': return list.filter(c => c.pinned);
      default: return list;
    }
  }, [search, activeTab]);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const selectAll = () => {
    if (selectedIds.size === filtered.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filtered.map(c => c.id)));
    }
  };

  return (
    <div className="px-8 py-6 max-w-[1400px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold tracking-tight">Контрагенты</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <SlidersHorizontal className="w-3.5 h-3.5 mr-1.5" />
            Фильтры
          </Button>
          <Button variant="outline" size="sm">
            Действия
          </Button>
          <Button variant="outline" size="sm">
            <Sparkles className="w-3.5 h-3.5 mr-1.5 text-primary" />
            AI-инсайты
          </Button>
        </div>
      </div>

      {/* AI banner */}
      {showAiBanner && (
        <div className="bg-accent/60 border border-primary/10 rounded-xl p-4 mb-5 flex items-center gap-3 animate-fade-in">
          <Sparkles className="w-4 h-4 text-primary shrink-0" />
          <p className="text-xs leading-relaxed flex-1">
            <span className="font-medium">AI обнаружил 7 контрагентов с нетипичным ухудшением.</span>
            {' '}Показатели ухудшились на 30%+ за последние 7 дней без видимых внешних причин.
          </p>
          <Button size="sm" variant="outline" className="shrink-0">Посмотреть</Button>
          <button onClick={() => setShowAiBanner(false)} className="text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Поиск по названию, ИНН, ID..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-9 h-9 text-sm"
        />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">Все</TabsTrigger>
          <TabsTrigger value="critical">🔴 Критичные</TabsTrigger>
          <TabsTrigger value="observation">🟡 Наблюдение</TabsTrigger>
          <TabsTrigger value="changes">Изменения</TabsTrigger>
          <TabsTrigger value="focus">Мой фокус</TabsTrigger>
          <TabsTrigger value="blacklist">Чёрный список</TabsTrigger>
        </TabsList>

        {/* Bulk actions bar */}
        {selectedIds.size > 0 && (
          <div className="bg-primary/5 border border-primary/10 rounded-lg px-4 py-2 mb-3 flex items-center gap-3 animate-fade-in">
            <span className="text-xs font-medium">Выбрано: {selectedIds.size}</span>
            <Button size="sm" variant="outline" className="h-7 text-xs">
              <CheckSquare className="w-3 h-3 mr-1" /> Отметить проверенными
            </Button>
            <Button size="sm" variant="outline" className="h-7 text-xs">Назначить ответственного</Button>
            <Button size="sm" variant="outline" className="h-7 text-xs">Экспортировать</Button>
            <Button size="sm" variant="outline" className="h-7 text-xs">
              <Sparkles className="w-3 h-3 mr-1" /> Повторная проверка AI
            </Button>
            <button onClick={() => setSelectedIds(new Set())} className="ml-auto text-muted-foreground hover:text-foreground">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Table */}
        <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[32px,1fr,90px,80px,100px,120px,60px] gap-3 px-4 py-2.5 border-b border-border text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
            <div className="flex items-center">
              <Checkbox checked={selectedIds.size === filtered.length && filtered.length > 0} onCheckedChange={selectAll} />
            </div>
            <div className="flex items-center gap-1 cursor-pointer hover:text-foreground">Компания <ArrowUpDown className="w-3 h-3" /></div>
            <div>Статус</div>
            <div className="flex items-center gap-1 cursor-pointer hover:text-foreground">Скор <ArrowUpDown className="w-3 h-3" /></div>
            <div>Причина</div>
            <div>Изменение</div>
            <div></div>
          </div>

          {/* Table body */}
          {filtered.length === 0 ? (
            <div className="px-4 py-12 text-center text-sm text-muted-foreground">
              {activeTab === 'focus' ? 'Нет закреплённых контрагентов. Добавьте контрагентов в фокус.' : 'Контрагенты не найдены'}
            </div>
          ) : (
            filtered.map(c => (
              <div
                key={c.id}
                className={cn(
                  'grid grid-cols-[32px,1fr,90px,80px,100px,120px,60px] gap-3 px-4 py-3 border-b border-border/50 hover:bg-muted/30 transition-colors cursor-pointer items-center',
                  selectedIds.has(c.id) && 'bg-primary/5'
                )}
                onClick={() => setSelectedCounterparty(c)}
              >
                <div className="flex items-center" onClick={e => { e.stopPropagation(); toggleSelect(c.id); }}>
                  <Checkbox checked={selectedIds.has(c.id)} />
                </div>
                <div>
                  <div className="text-xs font-medium">{c.form} «{c.name}»</div>
                </div>
                <div><StatusBadge status={c.status} /></div>
                <div><RiskBar score={c.riskScore} /></div>
                <div className="text-[11px] text-muted-foreground truncate">{c.reasonLabel}</div>
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <TrendIcon trend={c.trend} />
                  {c.lastChange}
                </div>
                <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                  <button className="w-6 h-6 rounded flex items-center justify-center hover:bg-muted transition-colors" title="Закрепить">
                    <Pin className="w-3 h-3 text-muted-foreground" />
                  </button>
                  <button className="w-6 h-6 rounded flex items-center justify-center hover:bg-muted transition-colors" title="Ещё">
                    <MoreHorizontal className="w-3 h-3 text-muted-foreground" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </Tabs>

      {/* Counterparty drawer */}
      <CounterpartyDrawer
        counterparty={selectedCounterparty}
        open={!!selectedCounterparty}
        onOpenChange={(open) => { if (!open) setSelectedCounterparty(null); }}
      />
    </div>
  );
};

export default Counterparties;
