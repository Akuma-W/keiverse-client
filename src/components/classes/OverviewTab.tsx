import { ChevronRight, ClipboardList, FileText, Library, MessageSquare, Zap } from 'lucide-react';
import React, { useMemo } from 'react';
import type { ClassItem, ClassItemType } from '@/types/class-item.type';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

/* -------------------------------------------------------------------------- */
/*                                   Props                                    */
/* -------------------------------------------------------------------------- */

interface OverviewTabProps {
  items: ClassItem[];
  onItemClick: (item: ClassItem) => void;
}

/* -------------------------------------------------------------------------- */
/*                            Helpers / Mappings                               */
/* -------------------------------------------------------------------------- */

const TYPE_META: Record<
  ClassItemType,
  {
    label: string;
    icon: React.ElementType;
    color: string;
  }
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
  SURVEY: {
    label: 'Khảo sát',
    icon: ClipboardList,
    color: 'bg-purple-500',
  },
  FORUM: {
    label: 'Diễn đàn',
    icon: MessageSquare,
    color: 'bg-pink-500',
  },
};

const getMonthGroup = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleString('vi-VN', {
    month: 'long',
    year: 'numeric',
  });
};

/* -------------------------------------------------------------------------- */
/*                                 Component                                  */
/* -------------------------------------------------------------------------- */

export const OverviewTab: React.FC<OverviewTabProps> = ({ items, onItemClick }) => {
  const groupedItems = useMemo(() => {
    const sorted = [...items].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    const groups: Record<string, ClassItem[]> = {};

    sorted.forEach((item) => {
      const group = getMonthGroup(item.createdAt);
      if (!groups[group]) {
        groups[group] = [];
      }
      groups[group].push(item);
    });

    return groups;
  }, [items]);

  if (!items.length) {
    return (
      <div className="py-20 text-center text-slate-400 text-sm">
        Chưa có nội dung nào trong lớp học
      </div>
    );
  }

  return (
    <div className="space-y-12 max-w-4xl mx-auto animate-in fade-in duration-500">
      {Object.entries(groupedItems).map(([groupName, groupItems]) => (
        <div key={groupName} className="space-y-6">
          {/* Month separator */}
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-100" />
            <span className="px-5 py-2 bg-indigo-50 border border-indigo-100 rounded-full text-[10px] font-black text-indigo-600 uppercase tracking-widest shadow-sm">
              {groupName}
            </span>
            <div className="h-px flex-1 bg-slate-100" />
          </div>

          {/* Items */}
          <div className="grid grid-cols-1 gap-4">
            {groupItems.map((item) => {
              const meta = TYPE_META[item.type];
              if (!meta) return null;
              const Icon = meta.icon;

              return (
                <Card
                  key={item.id}
                  onClick={() => onItemClick(item)}
                  className="group relative flex items-center gap-6 p-6 rounded-4xl bg-white border border-slate-100 hover:border-indigo-200 hover:shadow-2xl transition-all cursor-pointer"
                >
                  {/* Icon */}
                  <div
                    className={cn(
                      'h-14 w-14 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg',
                      meta.color,
                    )}
                  >
                    <Icon className="h-7 w-7" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg font-black text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
                      {item.title}
                    </h4>

                    <div className="flex items-center gap-3 mt-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em]">
                      <span className="text-indigo-500 font-black">{meta.label}</span>
                      <span className="h-1 w-1 bg-slate-200 rounded-full" />
                      <span>{new Date(item.createdAt).toLocaleDateString('vi-VN')}</span>
                      <span className="h-1 w-1 bg-slate-200 rounded-full" />
                      <span>{item.createdBy.fullName}</span>
                    </div>
                  </div>

                  {/* Arrow */}
                  <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                </Card>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
