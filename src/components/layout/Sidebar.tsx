import { BarChart3, Shield, Users, Target, Layers, FileText, BookOpen, Bell, Settings, Activity } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: BarChart3, path: '/', label: 'Дашборд' },
  { icon: Shield, path: '/risks', label: 'Риски' },
  { icon: Users, path: '/counterparties', label: 'Контрагенты' },
  { icon: Activity, path: '/events', label: 'События' },
  { icon: Target, path: '/measures', label: 'Меры' },
  { icon: Layers, path: '/processes', label: 'Процессы' },
  { icon: BookOpen, path: '/reports', label: 'Отчёты' },
  { icon: FileText, path: '/documents', label: 'Документы' },
];

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="w-[56px] min-h-screen bg-card border-r border-border flex flex-col items-center py-4 gap-0.5 shrink-0">
      <button
        onClick={() => navigate('/')}
        className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center mb-6 hover:opacity-90 transition-opacity"
      >
        <Shield className="w-5 h-5 text-primary-foreground" />
      </button>

      {navItems.map((item) => {
        const isActive = item.path === '/'
          ? location.pathname === '/'
          : location.pathname.startsWith(item.path);
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={cn(
              'w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 relative group',
              isActive
                ? 'bg-accent text-primary'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
            title={item.label}
          >
            <item.icon className="w-[18px] h-[18px]" />
            <span className="absolute left-12 bg-foreground text-background text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
              {item.label}
            </span>
          </button>
        );
      })}

      <div className="mt-auto flex flex-col gap-0.5">
        <button className="w-10 h-10 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors relative">
          <Bell className="w-[18px] h-[18px]" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-primary" />
        </button>
        <button className="w-10 h-10 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
          <Settings className="w-[18px] h-[18px]" />
        </button>
        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-[11px] font-semibold text-muted-foreground mt-2">
          ME
        </div>
      </div>
    </aside>
  );
}
