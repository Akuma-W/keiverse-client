import { Settings } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';

interface ClassHeaderProps {
  classCode: string;
  semester: string;
  title: string;
  teacherName: string;
  isTeacher: boolean;
}

export const ClassHeader: React.FC<ClassHeaderProps> = ({
  classCode,
  semester,
  title,
  teacherName,
  isTeacher,
}) => {
  return (
    <div className="relative h-44 rounded-[2.5rem] overflow-hidden group shadow-xl shadow-indigo-100/30">
      <div className="absolute inset-0 bg-linear-to-r from-indigo-600 via-indigo-500 to-indigo-700"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-widest text-white border border-white/10">
            {classCode}
          </span>
          <span className="text-indigo-100 text-[10px] font-bold uppercase tracking-wider">
            {semester}
          </span>
        </div>
        <h1 className="text-2xl md:text-4xl font-heading font-black text-white tracking-tight">
          {title}
        </h1>
        <p className="text-indigo-100 text-sm mt-1 font-medium flex items-center gap-2">
          Giảng viên:{' '}
          <span className="text-white font-bold underline underline-offset-4 decoration-white/30">
            {teacherName}
          </span>
        </p>
      </div>
      {isTeacher && (
        <div className="absolute top-6 right-6 flex gap-2">
          <Button
            variant="outline"
            className="bg-white/10 border-white/20 text-white backdrop-blur-md rounded-xl hover:bg-white/20"
          >
            <Settings className="h-4 w-4 mr-2" /> Thiết lập lớp
          </Button>
        </div>
      )}
    </div>
  );
};
