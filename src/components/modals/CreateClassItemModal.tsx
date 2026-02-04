import { ClipboardList, FileText, Library, MessageSquare, Zap } from 'lucide-react';
import React, { useState } from 'react';
import type { ClassItemType } from '@/types/class-item.type';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

export interface CreateItemPayload {
  title: string;
  description?: string;
  deadline?: string;
  weight?: number;
  isAnonymous?: boolean;
  file?: File | null;
}

interface CreateItemModalProps {
  open: boolean;
  type: ClassItemType;
  onClose: () => void;
  onSubmit: (data: CreateItemPayload) => void;
}

/* -------------------------------------------------------------------------- */
/*                              Helper Config                                 */
/* -------------------------------------------------------------------------- */

const TYPE_CONFIG: Record<
  ClassItemType,
  { label: string; icon: React.ElementType; color: string }
> = {
  ASSIGNMENT: {
    label: 'Bài tập',
    icon: FileText,
    color: 'bg-blue-500',
  },
  DOCUMENT: {
    label: 'Tài liệu',
    icon: Library,
    color: 'bg-emerald-500',
  },
  QUIZ: {
    label: 'Quiz',
    icon: Zap,
    color: 'bg-amber-500',
  },
  FORUM: {
    label: 'Diễn đàn',
    icon: MessageSquare,
    color: 'bg-purple-500',
  },
  SURVEY: {
    label: 'Khảo sát',
    icon: ClipboardList,
    color: 'bg-indigo-500',
  },
};

/* -------------------------------------------------------------------------- */
/*                                Component                                   */
/* -------------------------------------------------------------------------- */

export const CreateItemModal: React.FC<CreateItemModalProps> = ({
  open,
  type,
  onClose,
  onSubmit,
}) => {
  const config = TYPE_CONFIG[type];
  const Icon = config.icon;

  /* ---------------------------------- State --------------------------------- */

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Assignment
  const [deadline, setDeadline] = useState('');
  const [weight, setWeight] = useState<number | ''>('');

  // Forum
  const [isAnonymous, setIsAnonymous] = useState(false);

  // Document
  const [file, setFile] = useState<File | null>(null);

  /* -------------------------------- Handlers -------------------------------- */

  const resetState = () => {
    setTitle('');
    setDescription('');
    setDeadline('');
    setWeight('');
    setIsAnonymous(false);
    setFile(null);
  };

  const handleSubmit = () => {
    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim() || undefined,
      deadline: deadline || undefined,
      weight: typeof weight === 'number' ? weight : undefined,
      isAnonymous,
      file,
    });

    resetState();
    onClose();
  };

  /* ----------------------------------- UI ----------------------------------- */

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg rounded-4xl p-8">
        <DialogHeader className="space-y-4">
          <div className="flex items-center gap-4">
            <div
              className={cn(
                'h-14 w-14 rounded-2xl flex items-center justify-center text-white shadow-lg',
                config.color,
              )}
            >
              <Icon className="h-7 w-7" />
            </div>
            <DialogTitle className="text-xl font-heading font-black">
              Tạo {config.label} mới
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Tiêu đề
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={`Nhập tiêu đề ${config.label.toLowerCase()}`}
              className="rounded-2xl h-12"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Mô tả
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="rounded-2xl min-h-[100px]"
            />
          </div>

          {/* ASSIGNMENT */}
          {type === 'ASSIGNMENT' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Hạn nộp
                </label>
                <Input
                  type="datetime-local"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="rounded-2xl"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Trọng số (%)
                </label>
                <Input
                  type="number"
                  min={0}
                  max={100}
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="rounded-2xl"
                />
              </div>
            </div>
          )}

          {/* DOCUMENT */}
          {type === 'DOCUMENT' && (
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                File tài liệu
              </label>
              <Input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="rounded-2xl"
              />
            </div>
          )}

          {/* FORUM */}
          {type === 'FORUM' && (
            <div className="flex items-center gap-3">
              <Checkbox checked={isAnonymous} onCheckedChange={(v) => setIsAnonymous(Boolean(v))} />
              <span className="text-sm font-medium">Cho phép đăng ẩn danh</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-6">
            <Button variant="ghost" onClick={onClose}>
              Huỷ
            </Button>
            <Button variant="brand" onClick={handleSubmit} disabled={!title.trim()}>
              Tạo {config.label}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
