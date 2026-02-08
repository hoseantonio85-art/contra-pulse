import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import type { Counterparty } from '@/data/mockData';

interface Props {
  counterparty: Counterparty | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SendNotificationModal({ counterparty, open, onOpenChange }: Props) {
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const handleOpen = () => {
    if (counterparty) {
      setSubject(`Уведомление о рисках: ${counterparty.form} «${counterparty.name}»`);
      setBody(`Добрый день!\n\nИнформируем вас об изменении статуса контрагента ${counterparty.form} «${counterparty.name}».\n\nТекущий статус: ${counterparty.status === 'red' ? 'Критичный' : counterparty.status === 'yellow' ? 'Наблюдение' : 'Норма'}\nРиск-скор: ${counterparty.riskScore}/100\n${counterparty.reason ? `Причина: ${counterparty.reason}` : ''}\n\nПросим принять необходимые меры.`);
    }
  };

  // Trigger auto-fill when opening
  if (open && counterparty && !subject) handleOpen();

  const handleSend = () => {
    toast({ title: 'Письмо отправлено', description: 'Уведомление успешно отправлено.' });
    setRecipient(''); setSubject(''); setBody('');
    onOpenChange(false);
  };

  if (!counterparty) return null;

  return (
    <Sheet open={open} onOpenChange={(v) => { if (!v) { setRecipient(''); setSubject(''); setBody(''); } onOpenChange(v); }}>
      <SheetContent side="right" className="w-[500px] sm:w-[500px]">
        <SheetHeader className="pb-4">
          <SheetTitle>Отправить уведомление</SheetTitle>
        </SheetHeader>
        <div className="space-y-4">
          <div>
            <Label className="text-xs mb-1.5 block">Кому</Label>
            <Select value={recipient} onValueChange={setRecipient}>
              <SelectTrigger><SelectValue placeholder="Выберите получателя" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="responsible">Ответственный менеджер</SelectItem>
                <SelectItem value="cfo">Финансовый директор</SelectItem>
                <SelectItem value="risk_manager">Риск-менеджер</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs mb-1.5 block">Тема</Label>
            <Input value={subject} onChange={e => setSubject(e.target.value)} />
          </div>
          <div>
            <Label className="text-xs mb-1.5 block">Текст письма</Label>
            <Textarea value={body} onChange={e => setBody(e.target.value)} rows={10} />
          </div>
          <div className="flex gap-2 justify-end pt-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Отмена</Button>
            <Button onClick={handleSend}>Отправить</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
