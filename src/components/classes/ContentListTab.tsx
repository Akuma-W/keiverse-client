import { ClipboardList, Edit3, FileText, Library, MessageSquare, Plus, Zap } from 'lucide-react';
import React from 'react';
import type { ClassItem, ClassItemType } from '@/types/class-item.type';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

/* -------------------------------------------------------------------------- */
/*                                   Props                                    */
/* -------------------------------------------------------------------------- */

interface ContentListTabProps {
  items: ClassItem[];
  type: ClassItemType;
  title: string;
  isTeacher: boolean;
  onItemClick: (item: ClassItem) => void;
  onAdd: () => void;
  onEdit: (e: React.MouseEvent, item: ClassItem) => void;
}

/* -------------------------------------------------------------------------- */
/*                              Type Metadata                                 */
/* -------------------------------------------------------------------------- */

const TYPE_META: Record<
  ClassItemType,
  {
    icon: React.ElementType;
    color: string;
  }
> = {
  ASSIGNMENT: { icon: FileText, color: 'bg-blue-500' },
  DOCUMENT: { icon: Library, color: 'bg-emerald-500' },
  QUIZ: { icon: Zap, color: 'bg-amber-500' },
  SURVEY: { icon: ClipboardList, color: 'bg-purple-500' },
  FORUM: { icon: MessageSquare, color: 'bg-pink-500' },
};

/* -------------------------------------------------------------------------- */
/*                                 Component                                  */
/* -------------------------------------------------------------------------- */

export const ContentListTab: React.FC<ContentListTabProps> = ({
  items,
  type,
  title,
  isTeacher,
  onItemClick,
  onAdd,
  onEdit,
}) => {
  const meta = TYPE_META[type];
  const Icon = meta.icon;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-heading font-black text-slate-900">{title}</h2>

        {isTeacher && (
          <Button
            variant="brand"
            size="sm"
            className="rounded-xl px-5 font-black text-[10px] uppercase tracking-widest h-10"
            onClick={onAdd}
          >
            <Plus className="h-4 w-4 mr-1.5" />
            Tạo {title.toLowerCase()}
          </Button>
        )}
      </div>

      {/* List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item) => (
          <Card
            key={item.id}
            onClick={() => onItemClick(item)}
            className="border-slate-100 hover:shadow-2xl transition-all rounded-4xl group overflow-hidden bg-white cursor-pointer relative"
          >
            <CardContent className="p-8">
              {/* Edit */}
              {isTeacher && (
                <button
                  className="absolute top-6 right-6 p-2 rounded-full bg-slate-50 text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 z-10 transition-all"
                  onClick={(e) => onEdit(e, item)}
                >
                  <Edit3 className="h-4 w-4" />
                </button>
              )}

              {/* Icon */}
              <div
                className={cn(
                  'h-16 w-16 rounded-2xl flex items-center justify-center text-white shadow-lg mb-6 group-hover:scale-110 transition-transform',
                  meta.color,
                )}
              >
                <Icon className="h-8 w-8" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                {item.title}
              </h3>

              {/* Meta */}
              <div className="space-y-3 mt-6">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-4 pt-4 border-t border-slate-50">
                  {item.createdBy.fullName} • {new Date(item.createdAt).toLocaleDateString('vi-VN')}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {items.length === 0 && (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-100 rounded-4xl">
            <p className="text-slate-400 font-bold italic">Chưa có nội dung nào trong mục này...</p>
          </div>
        )}
      </div>
    </div>
  );
};
