import { useNavigate } from 'react-router-dom';
import type { Classroom } from '@/types/classrooms.type';
import { cn, generateGradient } from '@/lib/utils';
import { Card } from '../ui/card';

const ClassGrid = ({
  title,
  classes,
  emptyText,
}: {
  title: string;
  classes: Classroom[];
  emptyText: string;
}) => {
  const navigate = useNavigate();
  if (classes.length === 0) {
    return <div className="py-10 text-center text-slate-500 italic">{emptyText}</div>;
  }

  return (
    <>
      <h2 className="text-lg font-black text-slate-900 mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {classes.map((cls) => (
          <Card
            key={cls.id}
            className="overflow-hidden p-2 group cursor-pointer border-slate-100 hover:border-indigo-200 hover:shadow-2xl transition-all rounded-4xl bg-white"
            onClick={() => navigate(`/class/${cls.id}`)}
          >
            <div
              className={cn(
                'h-36 text-white relative transition-all rounded-4xl',
                generateGradient(cls.title),
              )}
            >
              <div className="absolute top-6 right-6 bg-black/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase">
                {cls.code}
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="font-heading font-extrabold text-xl">{cls.title}</h3>
                <p className="text-sm opacity-80 mt-1 font-medium">
                  GV: <b>{cls.teacher.fullName}</b>
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};

export default ClassGrid;
