import { CheckCircle2, ChevronLeft, Edit3, Save, Users, X } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const MOCK_RESPONDENTS = [
  { id: '1', name: 'Alex Nguyen', time: '10/03/2024' },
  { id: '2', name: 'Bao Tran', time: '11/03/2024' },
  { id: '3', name: 'Cuong Pham', time: '12/03/2024' },
  { id: '4', name: 'Diem My', time: '14/03/2024' },
];

export const SurveyDetail = () => {
  const { classId } = useParams();
  const navigate = useNavigate();
  const [isDone, setIsDone] = useState(false);
  const [isSurveying, setIsSurveying] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const isTeacher = true;

  const [mockData, setMockData] = useState({
    title: 'Course Feedback - Mid-term',
    description: 'Vui lòng điền đầy đủ thông tin để giúp chúng tôi cải thiện chất lượng giảng dạy.',
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white border border-slate-100 shadow-sm"
            onClick={() => navigate(`/class/${classId}`)}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Classwork / Survey
            </p>
            <h1 className="text-2xl font-heading font-black text-slate-900">{mockData.title}</h1>
          </div>
        </div>
        <div className="flex gap-2">
          {isTeacher && (
            <Button
              variant="outline"
              className="rounded-xl border-slate-100 text-slate-500"
              onClick={() => setIsEditModalOpen(true)}
            >
              <Edit3 className="h-4 w-4 mr-2" /> Chỉnh sửa
            </Button>
          )}
          {isDone ? (
            <div className="bg-emerald-50 text-emerald-600 px-6 py-2 rounded-xl text-xs font-black uppercase border border-emerald-100 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" /> Đã hoàn thành
            </div>
          ) : (
            !isSurveying && (
              <Button
                variant="brand"
                className="rounded-xl h-11 px-8 shadow-lg shadow-indigo-100 font-black uppercase text-xs"
                onClick={() => setIsSurveying(true)}
              >
                Thực hiện khảo sát
              </Button>
            )
          )}
        </div>
      </div>

      {!isSurveying ? (
        <div className="space-y-6">
          <Card className="rounded-[2.5rem] border-slate-100 shadow-xl overflow-hidden bg-white">
            <div className="p-8 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-3">
                <Users className="h-5 w-5 text-indigo-500" /> Danh sách người đã tham gia (
                {MOCK_RESPONDENTS.length})
              </h3>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Sắp xếp theo thời gian
              </span>
            </div>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-50">
                    <th className="px-8 py-4 text-[9px] font-black uppercase tracking-widest text-slate-400">
                      Học viên
                    </th>
                    <th className="px-8 py-4 text-[9px] font-black uppercase tracking-widest text-slate-400 text-right">
                      Ngày thực hiện
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {MOCK_RESPONDENTS.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-[10px]">
                            {r.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </div>
                          <span className="text-sm font-bold text-slate-800">{r.name}</span>
                        </div>
                      </td>
                      <td className="px-8 py-4 text-right text-xs font-bold text-slate-400">
                        {r.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
          <Card className="rounded-[2.5rem] border-slate-100 shadow-xl overflow-hidden bg-white">
            <CardContent className="p-10 space-y-10">
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-900">Nội dung khảo sát học kỳ</h3>
                  <p className="text-sm text-slate-500">{mockData.description}</p>
                </div>
                <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-4">
                    <p className="text-sm font-bold text-slate-800">
                      1. Bạn cảm thấy như thế nào về nhịp độ của môn học?
                    </p>
                    <div className="flex gap-2">
                      {['Quá chậm', 'Bình thường', 'Hơi nhanh', 'Rất nhanh'].map((opt) => (
                        <button
                          key={opt}
                          className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-600 hover:border-indigo-400 hover:text-indigo-600 transition-all"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                  <textarea
                    placeholder="Ý kiến đóng góp khác..."
                    className="w-full min-h-[120px] bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm outline-none focus:border-indigo-400"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between pt-8 border-t border-slate-50">
                <Button
                  variant="ghost"
                  className="font-bold text-slate-400"
                  onClick={() => setIsSurveying(false)}
                >
                  Hủy bỏ
                </Button>
                <Button
                  variant="brand"
                  className="rounded-xl px-10 font-black shadow-lg shadow-indigo-100"
                  onClick={() => {
                    setIsDone(true);
                    setIsSurveying(false);
                  }}
                >
                  Gửi khảo sát
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsEditModalOpen(false)}
          />
          <Card className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border-none">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-purple-50/30">
              <h2 className="text-xl font-heading font-black text-slate-900">Chỉnh sửa khảo sát</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsEditModalOpen(false)}
                className="rounded-full"
              >
                <X className="h-5 w-5 text-slate-400" />
              </Button>
            </div>
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Tiêu đề</label>
                <Input
                  value={mockData.title}
                  onChange={(e) => setMockData({ ...mockData, title: e.target.value })}
                  className="rounded-xl h-12 bg-slate-50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400">
                  Mô tả ngắn
                </label>
                <textarea
                  value={mockData.description}
                  onChange={(e) => setMockData({ ...mockData, description: e.target.value })}
                  className="w-full min-h-[100px] bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm outline-none"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  variant="ghost"
                  className="flex-1 h-12 rounded-xl"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Hủy
                </Button>
                <Button
                  variant="brand"
                  className="flex-1 h-12 rounded-xl font-black bg-purple-600 shadow-purple-100"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  <Save className="h-4 w-4 mr-2" /> Lưu
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SurveyDetail;
