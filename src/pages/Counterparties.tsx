import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Sparkles, X, LayoutGrid, BarChart3 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockCounterparties, type Counterparty } from '@/data/mockData';
import { CounterpartyDrawer } from '@/components/counterparties/CounterpartyDrawer';
import { DigestCards } from '@/components/counterparties/DigestCards';
import { CounterpartyCardGrid } from '@/components/counterparties/CounterpartyCardGrid';

import { RiskDiagram } from '@/components/counterparties/RiskDiagram';

const Counterparties = () => {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('critical');
  const [selectedCounterparty, setSelectedCounterparty] = useState<Counterparty | null>(null);
  const [showAiBanner, setShowAiBanner] = useState(true);
  const [viewMode, setViewMode] = useState<'cards' | 'diagram'>('cards');

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
          <Button variant="outline" size="sm">Действия</Button>
          <Button variant="outline" size="sm">
            <Sparkles className="w-3.5 h-3.5 mr-1.5 text-primary" />
            AI-инсайты
          </Button>
        </div>
      </div>

      {/* Digest */}
      <DigestCards />

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

      {/* Tabs + View toggle */}
      <div className="flex items-center justify-between mb-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">Все</TabsTrigger>
            <TabsTrigger value="critical">🔴 Критичные</TabsTrigger>
            <TabsTrigger value="observation">🟡 Наблюдение</TabsTrigger>
            <TabsTrigger value="changes">Изменения</TabsTrigger>
            <TabsTrigger value="focus">Мой фокус</TabsTrigger>
            <TabsTrigger value="blacklist">Чёрный список</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* View mode toggle */}
        <div className="flex items-center bg-muted rounded-lg p-0.5">
          <button
            onClick={() => setViewMode('cards')}
            className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${viewMode === 'cards' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            Карточки
          </button>
          <button
            onClick={() => setViewMode('diagram')}
            className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${viewMode === 'diagram' ? 'bg-card shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            Диаграмма
          </button>
        </div>
      </div>

      {/* Content */}
      {viewMode === 'diagram' ? (
        <RiskDiagram onSelectCounterparty={setSelectedCounterparty} />
      ) : (
        <CounterpartyCardGrid counterparties={filtered} onSelect={setSelectedCounterparty} />
      )}

      {/* Drawer */}
      <CounterpartyDrawer
        counterparty={selectedCounterparty}
        open={!!selectedCounterparty}
        onOpenChange={(open) => { if (!open) setSelectedCounterparty(null); }}
      />
    </div>
  );
};

export default Counterparties;
