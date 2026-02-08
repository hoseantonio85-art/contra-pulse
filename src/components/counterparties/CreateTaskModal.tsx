import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
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

export function CreateTaskModal({ counterparty, open, onOpenChange }: Props) {
  const [taskType, setTaskType] = useState('');
  const [responsible, setResponsible] = useState('');
  const [deadline, setDeadline] = useState('');
  const [comment, setComment] = useState('');

  const handleCreate = () => {
    toast({ title: 'Задача создана', description: 'Задача создана и отправлена ответственному.' });
    setTaskType(''); setResponsible(''); setDeadline(''); setComment('');
    onOpenChange(false);
  };

  if (!counterparty) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Создать задачу</DialogTitle>
          <DialogDescription>По контрагенту {counterparty.form} «{counterparty.name}»</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label className="text-xs mb-1.5 block">Тип задачи</Label>
            <Select value={taskType} onValueChange={setTaskType}>
              <SelectTrigger><SelectValue placeholder="Выберите тип" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="check_contract">Проверить договор</SelectItem>
                <SelectItem value="request_docs">Запросить документы</SelectItem>
                <SelectItem value="contact">Связаться с ответственным</SelectItem>
                <SelectItem value="check_court">Проверить судебные дела</SelectItem>
                <SelectItem value="other">Другое</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs mb-1.5 block">Ответственный</Label>
            <Select value={responsible} onValueChange={setResponsible}>
              <SelectTrigger><SelectValue placeholder="Выберите сотрудника" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ivanov">Иванов А.П.</SelectItem>
                <SelectItem value="petrova">Петрова М.С.</SelectItem>
                <SelectItem value="sidorov">Сидоров К.Н.</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs mb-1.5 block">Срок выполнения</Label>
            <Input type="date" value={deadline} onChange={e => setDeadline(e.target.value)} />
          </div>
          <div>
            <Label className="text-xs mb-1.5 block">Комментарий</Label>
            <Textarea placeholder="Дополнительная информация..." value={comment} onChange={e => setComment(e.target.value)} rows={3} />
          </div>
          <div className="flex gap-2 justify-end pt-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Отмена</Button>
            <Button onClick={handleCreate}>Создать задачу</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
