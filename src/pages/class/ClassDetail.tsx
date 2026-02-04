import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  ClipboardList,
  FileText,
  Layout,
  Library,
  MessageSquare,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useMemo, useState } from 'react';
import type { ClassItem, ClassItemType } from '@/types/class-item.type';
import { cn } from '@/lib/utils';
import { fetchClassroomByIdThunk } from '@/features/classrooms/classrooms.slice';
import {
  approveEnrollmentThunk,
  fetchEnrollmentsByClassThunk,
  rejectEnrollmentThunk,
} from '@/features/enrollments/enrollments.slice';
import { useAuth } from '@/hooks/useAuth';
import { ClassHeader } from '@/components/classes/ClassHeader';
import { ContentListTab } from '@/components/classes/ContentListTab';
import { ManagementTab } from '@/components/classes/ManagementTab';
import { OverviewTab } from '@/components/classes/OverviewTab';
import { CreateItemModal } from '@/components/modals/CreateClassItemModal';

/* -------------------------------------------------------------------------- */
/*                                    Types                                   */
/* -------------------------------------------------------------------------- */

type TabType = 'overview' | 'assignment' | 'document' | 'forum' | 'survey' | 'quiz' | 'management';

/* -------------------------------------------------------------------------- */
/*                              Tab Configuration                              */
/* -------------------------------------------------------------------------- */

const TAB_CONFIG: Record<
  Exclude<TabType, 'overview' | 'management'>,
  { label: string; type: ClassItemType; icon: React.ElementType }
> = {
  assignment: {
    label: 'Bài tập',
    type: 'ASSIGNMENT',
    icon: FileText,
  },
  document: {
    label: 'Tài liệu',
    type: 'DOCUMENT',
    icon: Library,
  },
  forum: {
    label: 'Diễn đàn',
    type: 'FORUM',
    icon: MessageSquare,
  },
  survey: {
    label: 'Khảo sát',
    type: 'SURVEY',
    icon: ClipboardList,
  },
  quiz: {
    label: 'Quiz',
    type: 'QUIZ',
    icon: Zap,
  },
};

/* -------------------------------------------------------------------------- */
/*                                Mock Seed Data                               */
/* -------------------------------------------------------------------------- */

const MOCK_CLASS_ITEMS: ClassItem[] = [
  {
    id: 'assignment-1',
    classId: 1,
    type: 'ASSIGNMENT',
    title: 'User Research Report',
    createdAt: '2024-03-15T08:00:00.000Z',
    createdBy: { id: 1, fullName: 'Prof. Anderson' },
    detail: {
      description:
        'Thực hiện User Research cho ứng dụng giả định: Persona, Journey Map, 5 pain-points.',
      deadline: '20/03/2024 23:59',
      weight: 15,
      attachments: [
        { name: 'Research_Template.docx', size: '2.4 MB' },
        { name: 'Example_Report_A.pdf', size: '15.1 MB' },
      ],
    },
  },
  {
    id: 'document-1',
    classId: 1,
    type: 'DOCUMENT',
    title: 'Week 1: Intro to UX Principles',
    createdAt: '2024-03-15T09:00:00.000Z',
    createdBy: { id: 1, fullName: 'Prof. Anderson' },
    detail: {
      description: 'Nguyên lý UX, Heuristic Evaluation của Nielsen và mental model.',
      fileType: 'PDF',
      size: '4.2 MB',
      previewUrl: '#',
    },
  },
  {
    id: 'forum-1',
    classId: 1,
    type: 'FORUM',
    title: 'Future of AI in UX Design',
    createdAt: '2024-03-16T10:30:00.000Z',
    createdBy: { id: 2, fullName: 'Alex Nguyen' },
    detail: {
      content: 'AI có thể tự động tạo wireframe từ text. Mọi người nghĩ sao?',
      comments: [
        {
          id: 'c1',
          user: 'Dr. Smith',
          role: 'Giảng viên',
          text: 'AI là công cụ, UX vẫn cần sự thấu cảm.',
          time: '1 giờ trước',
        },
      ],
    },
  },
  {
    id: 'survey-1',
    classId: 1,
    type: 'SURVEY',
    title: 'Course Feedback - Mid-term',
    createdAt: '2024-03-17T08:00:00.000Z',
    createdBy: { id: 0, fullName: 'Hệ thống' },
    detail: {
      description: 'Giúp chúng tôi cải thiện chất lượng giảng dạy.',
    },
  },
];

/* -------------------------------------------------------------------------- */
/*                              Local Storage                                  */
/* -------------------------------------------------------------------------- */

const storageKey = (classId: number) => `class-items:${classId}`;

const loadItems = (classId: number): ClassItem[] => {
  try {
    const raw = localStorage.getItem(storageKey(classId));
    return raw ? (JSON.parse(raw) as ClassItem[]) : [];
  } catch {
    return [];
  }
};

const saveItems = (classId: number, items: ClassItem[]) => {
  localStorage.setItem(storageKey(classId), JSON.stringify(items));
};

/* -------------------------------------------------------------------------- */
/*                                Component                                   */
/* -------------------------------------------------------------------------- */

const ClassDetail: React.FC = () => {
  const { classId } = useParams<{ classId: string }>();
  const numericClassId = Number(classId);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, userRole } = useAuth();

  const classroom = useAppSelector((s) => s.classrooms.current);
  const enrollments = useAppSelector((s) => s.enrollments.list);
  const classLoading = useAppSelector((s) => s.classrooms.loading);
  const enrollmentLoading = useAppSelector((s) => s.enrollments.loading);

  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [items, setItems] = useState<ClassItem[]>([]);
  const [createType, setCreateType] = useState<ClassItemType | null>(null);

  /* ------------------------------- Init Data -------------------------------- */

  useEffect(() => {
    if (!numericClassId) return;

    dispatch(fetchClassroomByIdThunk(numericClassId));
    dispatch(fetchEnrollmentsByClassThunk({ classId: numericClassId }));

    const stored = loadItems(numericClassId);
    if (stored.length > 0) {
      setItems(stored);
    } else {
      setItems(MOCK_CLASS_ITEMS);
      saveItems(numericClassId, MOCK_CLASS_ITEMS);
    }
  }, [numericClassId, dispatch]);

  /* -------------------------------- Derived --------------------------------- */

  const isTeacher = userRole === 'teacher';

  const filteredItems = useMemo(() => {
    if (activeTab === 'overview' || activeTab === 'management') return items;
    return items.filter((i) => i.type === TAB_CONFIG[activeTab].type);
  }, [items, activeTab]);

  /* -------------------------------- Handlers -------------------------------- */

  const handleCreateItem = (type: ClassItemType, data: { title: string; description?: string }) => {
    if (!user) return;

    const newItem: ClassItem = {
      id: crypto.randomUUID(),
      classId: numericClassId,
      type,
      title: data.title,
      createdAt: new Date().toISOString(),
      createdBy: { id: user.id, fullName: user.fullName },
      detail: { description: data.description ?? '' },
    };

    setItems((prev) => {
      const next = [newItem, ...prev];
      saveItems(numericClassId, next);
      return next;
    });

    setCreateType(null);
  };

  /* ---------------------------------- Guard --------------------------------- */

  if (classLoading || enrollmentLoading) {
    return <div className="py-20 text-center text-slate-500">Đang tải lớp học…</div>;
  }

  if (!classroom) {
    return <div className="py-20 text-center text-red-500">Không tìm thấy lớp học</div>;
  }

  /* ----------------------------------- UI ----------------------------------- */

  const navTabs: { id: TabType; label: string; icon: React.ElementType }[] = [
    { id: 'overview', label: 'Tổng quan', icon: Layout },
    ...(
      Object.entries(TAB_CONFIG) as [
        Exclude<TabType, 'overview' | 'management'>,
        (typeof TAB_CONFIG)[Exclude<TabType, 'overview' | 'management'>],
      ][]
    ).map(([key, value]) => ({
      id: key,
      label: value.label,
      icon: value.icon,
    })),
    { id: 'management', label: 'Quản lý', icon: ShieldCheck },
  ];

  return (
    <div className="space-y-6 pb-20">
      <ClassHeader
        classCode={classroom.code}
        semester={`${classroom.termStart} - ${classroom.termEnd}`}
        title={classroom.title}
        teacherName={classroom.teacher.fullName}
        isTeacher={isTeacher}
      />

      {/* Tabs */}
      <div className="flex gap-1 p-1.5 bg-white border rounded-3xl sticky top-20 z-10">
        {navTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold uppercase',
              activeTab === tab.id
                ? 'bg-indigo-600 text-white'
                : 'text-slate-500 hover:bg-slate-50',
            )}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <OverviewTab
          items={items}
          onItemClick={(i) => navigate(`/class/${classId}/${i.type.toLowerCase()}/${i.id}`)}
        />
      )}

      {activeTab === 'management' && (
        <ManagementTab
          isTeacher={isTeacher}
          enrollments={enrollments}
          onApprove={(id) => dispatch(approveEnrollmentThunk(id))}
          onReject={(id) => dispatch(rejectEnrollmentThunk(id))}
        />
      )}

      {activeTab !== 'overview' && activeTab !== 'management' && (
        <ContentListTab
          items={filteredItems}
          type={TAB_CONFIG[activeTab].type}
          title={TAB_CONFIG[activeTab].label}
          isTeacher={isTeacher}
          onAdd={() => setCreateType(TAB_CONFIG[activeTab].type)}
          onItemClick={(i) => navigate(`/class/${classId}/${i.type.toLowerCase()}/${i.id}`)}
          onEdit={() => {}}
        />
      )}

      {createType && (
        <CreateItemModal
          open
          type={createType}
          onClose={() => setCreateType(null)}
          onSubmit={(data) => handleCreateItem(createType, data)}
        />
      )}
    </div>
  );
};

export default ClassDetail;
