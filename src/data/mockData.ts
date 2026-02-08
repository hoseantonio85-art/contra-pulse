export interface RiskSegment {
  id: string;
  name: string;
  shortName: string;
  value: number;
  color: string;
  icon?: string;
  forecastLoss: number;
  actualLoss: number;
  bottomLabel: string;
  bottomValue: string;
  bottomType?: 'warning' | 'danger' | 'neutral';
  domainStatus: 'red' | 'yellow' | 'green';
  riskLevel: number;
  weekChanges?: number;
}

export const riskSegments: RiskSegment[] = [
  { id: 'clients', name: 'Клиенты и продукты', shortName: 'Клиенты и продукты', value: 557, color: 'hsl(45, 93%, 58%)', icon: '🏛', forecastLoss: 571, actualLoss: 557, bottomLabel: 'Геополитические риски', bottomValue: '92%', bottomType: 'warning', domainStatus: 'yellow', riskLevel: 72, weekChanges: 3 },
  { id: 'processes', name: 'Процессы и контроль', shortName: 'Процессы и контроль', value: 1078, color: 'hsl(217, 71%, 53%)', icon: '📊', forecastLoss: 1199, actualLoss: 1078, bottomLabel: 'Возмещения ущерба клиентам', bottomValue: '72%', bottomType: 'danger', domainStatus: 'red', riskLevel: 85, weekChanges: 5 },
  { id: 'projects', name: 'Проекты и изменения', shortName: 'Проекты и изменения', value: 210, color: 'hsl(330, 65%, 60%)', icon: '🚀', forecastLoss: 211, actualLoss: 210, bottomLabel: 'Возмещения ущерба клиентам', bottomValue: '72%', bottomType: 'danger', domainStatus: 'yellow', riskLevel: 58, weekChanges: 1 },
  { id: 'external', name: 'Внешняя среда', shortName: 'Внешняя среда', value: 90, color: 'hsl(187, 80%, 48%)', icon: '🌐', forecastLoss: 147, actualLoss: 90, bottomLabel: 'Возмещения ущерба клиентам', bottomValue: '72%', bottomType: 'neutral', domainStatus: 'green', riskLevel: 28 },
  { id: 'partners', name: 'Партнёры и поставки', shortName: 'Партнёры и поставки', value: 85, color: 'hsl(152, 69%, 50%)', icon: '🤝', forecastLoss: 114, actualLoss: 85, bottomLabel: 'Возмещения ущерба клиентам', bottomValue: '72%', bottomType: 'neutral', domainStatus: 'yellow', riskLevel: 61, weekChanges: 3 },
  { id: 'personnel', name: 'Персонал и культура', shortName: 'Персонал и культура', value: 125, color: 'hsl(27, 87%, 54%)', icon: '👥', forecastLoss: 1094, actualLoss: 125, bottomLabel: 'Прогноз высокий, мер нет', bottomValue: '', bottomType: 'danger', domainStatus: 'red', riskLevel: 78, weekChanges: 2 },
  { id: 'technology', name: 'Технологии и данные', shortName: 'Технологии и данные', value: 61, color: 'hsl(262, 60%, 68%)', icon: '💻', forecastLoss: 98, actualLoss: 61, bottomLabel: 'Возмещения ущерба клиентам', bottomValue: '72%', bottomType: 'neutral', domainStatus: 'green', riskLevel: 22 },
  { id: 'legislation', name: 'Правовые вопросы', shortName: 'Правовые вопросы', value: 538, color: 'hsl(244, 58%, 68%)', icon: '⚖️', forecastLoss: 761, actualLoss: 538, bottomLabel: 'Возмещения ущерба клиентам', bottomValue: '72%', bottomType: 'neutral', domainStatus: 'yellow', riskLevel: 54, weekChanges: 1 },
];

export interface Counterparty {
  id: string;
  name: string;
  form: string;
  inn?: string;
  status: 'red' | 'yellow' | 'green';
  riskScore: number;
  reason: string;
  reasonLabel: string;
  lastChange: string;
  trend: 'up' | 'down' | 'stable';
  pinned?: boolean;
  aiSummary?: string;
  debtTotal?: number;
  debtOverdue?: number;
  debtAtRisk?: number;
}

export const mockCounterparties: Counterparty[] = [
  { id: '1', name: 'СтройМонтаж', form: 'ООО', inn: '7701234567', status: 'red', riskScore: 87, reason: 'Множественные судебные дела, задолженность по ФССП', reasonLabel: 'Суд / ФССП', lastChange: '05.02.2026', trend: 'up', aiSummary: 'За последние 7 дней зафиксировано 3 новых судебных иска. Общая сумма исковых требований выросла на 45%. Рекомендуется срочная проверка и пересмотр условий сотрудничества.', debtTotal: 4.2, debtOverdue: 1.8, debtAtRisk: 0.9 },
  { id: '2', name: 'ТехноСервис Групп', form: 'АО', inn: '7702345678', status: 'red', riskScore: 82, reason: 'Негативные публикации в СМИ, смена руководства', reasonLabel: 'СМИ', lastChange: '04.02.2026', trend: 'up', aiSummary: 'Обнаружены публикации о финансовых проблемах компании в 5 федеральных СМИ. Смена генерального директора может указывать на внутренний кризис.', debtTotal: 2.8, debtOverdue: 0.5, debtAtRisk: 0.3 },
  { id: '3', name: 'ЛогистикПро', form: 'ООО', inn: '7703456789', status: 'red', riskScore: 79, reason: 'Задержки платежей более 90 дней', reasonLabel: 'Финансы', lastChange: '03.02.2026', trend: 'up', aiSummary: 'Просроченная дебиторская задолженность превысила 15 млн руб. Компания не выходит на связь по урегулированию.', debtTotal: 15.0, debtOverdue: 15.0, debtAtRisk: 12.0 },
  { id: '4', name: 'Альфа-Снаб', form: 'ООО', inn: '7704567890', status: 'red', riskScore: 76, reason: 'Признаки банкротства', reasonLabel: 'Финансы', lastChange: '02.02.2026', trend: 'up', debtTotal: 3.1, debtOverdue: 2.4, debtAtRisk: 1.5 },
  { id: '5', name: 'МегаТрейд', form: 'ЗАО', inn: '7705678901', status: 'red', riskScore: 74, reason: 'Исполнительные производства ФССП', reasonLabel: 'ФССП', lastChange: '01.02.2026', trend: 'stable', debtTotal: 1.9, debtOverdue: 0.8 },
  { id: '6', name: 'ГрандСтрой', form: 'АО', inn: '7706789012', status: 'red', riskScore: 73, reason: 'Налоговые споры', reasonLabel: 'Регуляторы', lastChange: '31.01.2026', trend: 'up', debtTotal: 5.6, debtOverdue: 1.2, debtAtRisk: 0.6 },
  { id: '7', name: 'ИнвестСтрой', form: 'ООО', inn: '7707890123', status: 'yellow', riskScore: 58, reason: 'Снижение выручки, изменение состава учредителей', reasonLabel: 'Финансы', lastChange: '05.02.2026', trend: 'up', debtTotal: 2.1, debtOverdue: 0.3 },
  { id: '8', name: 'ПромЭнерго', form: 'АО', inn: '7708901234', status: 'yellow', riskScore: 55, reason: 'Проверка ФНС', reasonLabel: 'Регуляторы', lastChange: '04.02.2026', trend: 'stable', debtTotal: 1.5 },
  { id: '9', name: 'ГлобалТранс', form: 'ООО', inn: '7709012345', status: 'yellow', riskScore: 52, reason: 'Негатив в отраслевых СМИ', reasonLabel: 'СМИ', lastChange: '03.02.2026', trend: 'down', debtTotal: 0.8 },
  { id: '10', name: 'КомпонентПлюс', form: 'ООО', inn: '7710123456', status: 'yellow', riskScore: 48, reason: 'Судебный иск от третьей стороны', reasonLabel: 'Суд', lastChange: '01.02.2026', trend: 'up', debtTotal: 1.1, debtOverdue: 0.2 },
  { id: '11', name: 'ТрансЛогик', form: 'ООО', inn: '7711234567', status: 'yellow', riskScore: 45, reason: 'Задержка поставок', reasonLabel: 'Договоры', lastChange: '30.01.2026', trend: 'stable', debtTotal: 0.6 },
  { id: '12', name: 'ДатаЦентр', form: 'АО', inn: '7712345678', status: 'green', riskScore: 15, reason: '', reasonLabel: '—', lastChange: '28.01.2026', trend: 'stable' },
  { id: '13', name: 'ЭкоЛогистик', form: 'ООО', inn: '7713456789', status: 'green', riskScore: 12, reason: '', reasonLabel: '—', lastChange: '25.01.2026', trend: 'down' },
  { id: '14', name: 'ПрофИТ', form: 'ООО', inn: '7714567890', status: 'green', riskScore: 8, reason: '', reasonLabel: '—', lastChange: '20.01.2026', trend: 'stable' },
];

export const counterpartySummary = {
  total: 1000,
  red: 24,
  yellow: 87,
  green: 889,
  changesWeek: { worsened: 12, improved: 5 },
  changesMonth: { worsened: 28, improved: 14 },
  topReasons: [
    'Судебные дела / ФССП',
    'Негатив в СМИ',
    'Финансовые просадки / задержки платежей',
  ],
  newProblematic: 7,
  debtTotal: 12.4,
  debtOverdue: 1.7,
  debtAtRisk: 0.9,
  debtOver100Days: 0.4,
};

export interface TimelineEvent {
  id: string;
  date: string;
  type: 'worsened' | 'improved' | 'comment' | 'measure' | 'document';
  title: string;
  description: string;
  counterpartyName?: string;
}

export const recentEvents: TimelineEvent[] = [
  { id: '1', date: '05.02.2026', type: 'worsened', title: 'Ухудшение рейтинга', description: 'Риск-скор вырос с 72 до 87', counterpartyName: 'СтройМонтаж' },
  { id: '2', date: '04.02.2026', type: 'worsened', title: 'Новый негатив в СМИ', description: 'Обнаружены негативные публикации', counterpartyName: 'ТехноСервис Групп' },
  { id: '3', date: '04.02.2026', type: 'improved', title: 'Улучшение рейтинга', description: 'Урегулированы судебные претензии', counterpartyName: 'ГлобалТранс' },
  { id: '4', date: '03.02.2026', type: 'worsened', title: 'Просрочка платежей', description: 'Задолженность превысила 90 дней', counterpartyName: 'ЛогистикПро' },
  { id: '5', date: '03.02.2026', type: 'improved', title: 'Погашение задолженности', description: 'Полностью погасил задолженность', counterpartyName: 'ЭкоЛогистик' },
  { id: '6', date: '02.02.2026', type: 'measure', title: 'Создана мера', description: 'Назначена внеплановая проверка', counterpartyName: 'Альфа-Снаб' },
  { id: '7', date: '01.02.2026', type: 'improved', title: 'Снятие ограничений', description: 'Исполнительное производство прекращено', counterpartyName: 'МегаТрейд' },
];
