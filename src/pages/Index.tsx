import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Sparkles, Loader2 } from 'lucide-react';
import { RiskDonutChart } from '@/components/dashboard/RiskDonutChart';
import { InfoPanel } from '@/components/dashboard/InfoPanel';
import { PartnersDrawer } from '@/components/dashboard/PartnersDrawer';
import { CounterpartiesWidget } from '@/components/dashboard/CounterpartiesWidget';
import { CounterpartyDrawer } from '@/components/counterparties/CounterpartyDrawer';
import type { Counterparty } from '@/data/mockData';

const Index = () => {
  const navigate = useNavigate();
  const [activeSegment, setActiveSegment] = useState<string | null>(null);
  const [partnersDrawerOpen, setPartnersDrawerOpen] = useState(false);
  const [selectedCounterparty, setSelectedCounterparty] = useState<Counterparty | null>(null);

  const handleSegmentClick = (segmentId: string) => {
    setActiveSegment(prev => prev === segmentId ? null : segmentId);
  };

  const goToCounterparties = () => {
    setPartnersDrawerOpen(false);
    navigate('/counterparties');
  };

  return (
    <div className="px-8 py-6 max-w-[1400px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold tracking-tight">
          Привет! Я твой риск-менеджер <span className="text-primary">Норм</span>.
        </h1>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground bg-card rounded-full px-3 py-1.5 border border-border">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            Выявляю риски
            <Loader2 className="w-3 h-3 animate-spin text-primary" />
          </span>
          <button className="relative w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors">
            <Bell className="w-4 h-4 text-muted-foreground" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-primary" />
          </button>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-[1fr,340px] gap-5 mb-6">
        <RiskDonutChart activeSegment={activeSegment} onSegmentClick={handleSegmentClick} />
        <InfoPanel
          selectedSegment={activeSegment}
          onOpenPartnersDrawer={() => setPartnersDrawerOpen(true)}
          onGoToCounterparties={goToCounterparties}
        />
      </div>

      {/* Counterparties widget */}
      <div className="mb-6">
        <CounterpartiesWidget
          onOpenCounterparties={goToCounterparties}
          onOpenChanges={() => { setPartnersDrawerOpen(true); }}
        />
      </div>

      {/* News section */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold mb-4">Я собрал важные изменения в законах и СМИ</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { tag: 'Законодательство · Персональные данные', title: 'Обработка персональных данных', desc: 'Ужесточились требования к обработке персональных данных и существенно выросли штрафы.' },
            { tag: 'Новость · Экономика', title: 'Магазин-склад Самоката закрыт Роспотребнадзором', desc: 'Невский районный суд Петербурга закрыл магазин-склад ООО «Умный Ритейл».' },
            { tag: 'Законодательство · Налоговое право', title: 'Ужесточение требований к обработке данных', desc: 'Ужесточились требования к обработке персональных данных и существенно выросли штрафы.' },
          ].map((item, i) => (
            <div key={i} className="bg-card rounded-xl border border-border p-5 hover:shadow-md transition-shadow cursor-pointer group">
              <div className="text-[10px] text-primary font-medium mb-2">{item.tag}</div>
              <h4 className="text-sm font-semibold mb-2 leading-snug">{item.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">{item.desc}</p>
              <span className="text-xs text-primary font-medium group-hover:underline">Принять меры →</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom action bar */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-card rounded-2xl shadow-lg border border-border px-4 py-2 z-40">
        <button className="flex items-center gap-2 text-xs font-medium text-primary bg-accent rounded-xl px-4 py-2 hover:bg-accent/80 transition-colors">
          Событие <span className="text-primary">+</span>
        </button>
        <button className="flex items-center gap-2 text-xs font-medium text-primary bg-accent rounded-xl px-4 py-2 hover:bg-accent/80 transition-colors">
          Мера <span className="text-primary">+</span>
        </button>
        <button className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center hover:opacity-90 transition-opacity">
          <Sparkles className="w-4 h-4 text-primary-foreground" />
        </button>
      </div>

      {/* Drawers */}
      <PartnersDrawer
        open={partnersDrawerOpen}
        onOpenChange={setPartnersDrawerOpen}
        onSelectCounterparty={(c) => { setPartnersDrawerOpen(false); setSelectedCounterparty(c); }}
        onGoToCounterparties={goToCounterparties}
      />
      <CounterpartyDrawer
        counterparty={selectedCounterparty}
        open={!!selectedCounterparty}
        onOpenChange={(open) => { if (!open) setSelectedCounterparty(null); }}
      />
    </div>
  );
};

export default Index;
