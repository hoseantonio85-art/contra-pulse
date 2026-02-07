export interface RiskSegment {
  id: string;
  name: string;
  shortName: string;
  value: number;
  color: string;
}

export const riskSegments: RiskSegment[] = [
  { id: 'legislation', name: 'Законодательство и регуляторы', shortName: 'Законодательство', value: 538, color: 'hsl(244, 58%, 68%)' },
  { id: 'external', name: 'Внешняя среда', shortName: 'Внешняя среда', value: 90, color: 'hsl(187, 80%, 48%)' },
  { id: 'clients', name: 'Клиенты и продукты', shortName: 'Клиенты', value: 557, color: 'hsl(45, 93%, 58%)' },
  { id: 'partners', name: 'Партнёры и поставки', shortName: 'Партнёры', value: 85, color: 'hsl(152, 69%, 50%)' },
  { id: 'processes', name: 'Процессы и контроль', shortName: 'Процессы', value: 1078, color: 'hsl(217, 71%, 53%)' },
  { id: 'personnel', name: 'Персонал и культура', shortName: 'Персонал', value: 125, color: 'hsl(27, 87%, 54%)' },
  { id: 'projects', name: 'Проекты и изменения', shortName: 'Проекты', value: 210, color: 'hsl(330, 65%, 60%)' },
  { id: 'technology', name: 'Технологии и данные', shortName: 'Технологии', value: 61, color: 'hsl(262, 60%, 68%)' },
];

export interface Counterparty {
  id: string;
  name: string;
  form: string;
  status: 'red' | 'yellow' | 'green';
  riskScore: number;
  reason: string;
  reasonLabel: string;
  lastChange: string;
  trend: 'up' | 'down' | 'stable';
  pinned?: boolean;
  aiSummary?: string;
}

export const mockCounterparties: Counterparty[] = [
  { id: '1', name: 'СтройМонтаж', form: 'ООО', status: 'red', riskScore: 87, reason: 'Множественные судебные дела, задолженность по ФССП', reasonLabel: 'Суд / ФССП', lastChange: '05.02.2026', trend: 'up', aiSummary: 'За последние 7 дней зафиксировано 3 новых судебных иска. Общая сумма исковых требований выросла на 45%. Рекомендуется срочная проверка и пересмотр условий сотрудничества.' },
  { id: '2', name: 'ТехноСервис Групп', form: 'АО', status: 'red', riskScore: 82, reason: 'Негативные публикации в СМИ, смена руководства', reasonLabel: 'СМИ', lastChange: '04.02.2026', trend: 'up', aiSummary: 'Обнаружены публикации о финансовых проблемах компании в 5 федеральных СМИ. Смена генерального директора может указывать на внутренний кризис.' },
  { id: '3', name: 'ЛогистикПро', form: 'ООО', status: 'red', riskScore: 79, reason: 'Задержки платежей более 90 дней', reasonLabel: 'Финансы', lastChange: '03.02.2026', trend: 'up', aiSummary: 'Просроченная дебиторская задолженность превысила 15 млн руб. Компания не выходит на связь по урегулированию.' },
  { id: '4', name: 'Альфа-Снаб', form: 'ООО', status: 'red', riskScore: 76, reason: 'Признаки банкротства', reasonLabel: 'Финансы', lastChange: '02.02.2026', trend: 'up' },
  { id: '5', name: 'МегаТрейд', form: 'ЗАО', status: 'red', riskScore: 74, reason: 'Исполнительные производства ФССП', reasonLabel: 'ФССП', lastChange: '01.02.2026', trend: 'stable' },
  { id: '6', name: 'ГрандСтрой', form: 'АО', status: 'red', riskScore: 73, reason: 'Налоговые споры', reasonLabel: 'Регуляторы', lastChange: '31.01.2026', trend: 'up' },
  { id: '7', name: 'ИнвестСтрой', form: 'ООО', status: 'yellow', riskScore: 58, reason: 'Снижение выручки, изменение состава учредителей', reasonLabel: 'Финансы', lastChange: '05.02.2026', trend: 'up' },
  { id: '8', name: 'ПромЭнерго', form: 'АО', status: 'yellow', riskScore: 55, reason: 'Проверка ФНС', reasonLabel: 'Регуляторы', lastChange: '04.02.2026', trend: 'stable' },
  { id: '9', name: 'ГлобалТранс', form: 'ООО', status: 'yellow', riskScore: 52, reason: 'Негатив в отраслевых СМИ', reasonLabel: 'СМИ', lastChange: '03.02.2026', trend: 'down' },
  { id: '10', name: 'КомпонентПлюс', form: 'ООО', status: 'yellow', riskScore: 48, reason: 'Судебный иск от третьей стороны', reasonLabel: 'Суд', lastChange: '01.02.2026', trend: 'up' },
  { id: '11', name: 'ТрансЛогик', form: 'ООО', status: 'yellow', riskScore: 45, reason: 'Задержка поставок', reasonLabel: 'Договоры', lastChange: '30.01.2026', trend: 'stable' },
  { id: '12', name: 'ДатаЦентр', form: 'АО', status: 'green', riskScore: 15, reason: '', reasonLabel: '—', lastChange: '28.01.2026', trend: 'stable' },
  { id: '13', name: 'ЭкоЛогистик', form: 'ООО', status: 'green', riskScore: 12, reason: '', reasonLabel: '—', lastChange: '25.01.2026', trend: 'down' },
  { id: '14', name: 'ПрофИТ', form: 'ООО', status: 'green', riskScore: 8, reason: '', reasonLabel: '—', lastChange: '20.01.2026', trend: 'stable' },
];

export const counterpartySummary = {
  total: 1000,
  red: 12,
  yellow: 34,
  green: 954,
  changesWeek: { worsened: 3, improved: 5 },
  topReasons: [
    'Судебные дела / ФССП',
    'Негатив в СМИ',
    'Финансовые просадки / задержки платежей',
  ],
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
