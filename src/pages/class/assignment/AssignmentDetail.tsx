import {
  Calendar,
  CheckCircle2,
  ChevronLeft,
  Clock,
  Edit3,
  ExternalLink,
  FileText,
  Paperclip,
  Save,
  Send,
  Upload,
  X,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const AssignmentDetail = () => {
  // const { classId, id } = useParams();
  const { classId } = useParams();
  const navigate = useNavigate();
  const [showSubmission, setShowSubmission] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const isTeacher = true;

  const [mockData, setMockData] = useState({
    title: 'User Research Report',
    description:
      'Sinh viên cần thực hiện một cuộc nghiên cứu người dùng (User Research) cho một ứng dụng di động giả định. Bạn cần xác định chân dung người dùng (Persona), xây dựng bản đồ hành trình (Journey Map) và liệt kê ít nhất 5 vấn đề cốt lõi mà người dùng đang gặp phải.',
    createdAt: '15/03/2024',
    deadline: '20/03/2024 (23:59)',
    weight: '15%',
    attachments: [
      { name: 'Research_Template.docx', size: '2.4 MB' },
      { name: 'Example_Report_A.pdf', size: '15.1 MB' },
    ],
  });

  const handleUpdateAssignment = (newData: any) => {
    setMockData({ ...mockData, ...newData });
    setIsEditModalOpen(false);
  };

  return (
    <div className="space-y-8 pb-20 animate-in fade-in duration-500 max-w-5xl mx-auto">
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
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Classwork / Assignment
            </p>
            <h1 className="text-2xl font-heading font-black text-slate-900">{mockData.title}</h1>
          </div>
        </div>
        {isTeacher && (
          <Button
            variant="outline"
            className="rounded-xl border-emerald-100 text-emerald-600 bg-emerald-50 shadow-none hover:bg-emerald-100"
            onClick={() => setIsEditModalOpen(true)}
          >
            <Edit3 className="h-4 w-4 mr-2" /> Chỉnh sửa
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="rounded-[2.5rem] border-slate-100 shadow-xl overflow-hidden">
            <CardContent className="p-8 md:p-10 space-y-8">
              <div className="flex flex-wrap items-center gap-6 pb-6 border-b border-slate-50">
                <div className="flex items-center gap-2 text-slate-500 font-bold text-xs uppercase tracking-wider">
                  <Calendar className="h-4 w-4 text-indigo-500" />
                  Đăng ngày: {mockData.createdAt}
                </div>
                <div className="flex items-center gap-2 text-rose-500 font-bold text-xs uppercase tracking-wider">
                  <Clock className="h-4 w-4" />
                  Hạn: {mockData.deadline}
                </div>
                <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
                  <FileText className="h-4 w-4" />
                  Trọng số: {mockData.weight}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-black text-slate-900 mb-4">Mô tả bài tập</h3>
                <p className="text-slate-600 leading-relaxed font-medium">{mockData.description}</p>
              </div>

              <div className="space-y-4 pt-6 border-t border-slate-50">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Tài liệu đính kèm
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {mockData.attachments.map((file, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                          <Paperclip className="h-5 w-5 text-indigo-500" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                            {file.name}
                          </p>
                          <p className="text-[10px] text-slate-400 font-medium">{file.size}</p>
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-slate-300 group-hover:text-indigo-400" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="rounded-4xl border-slate-100 shadow-xl sticky top-24 overflow-hidden bg-white">
            <CardContent className="p-8 space-y-6">
              {!showSubmission ? (
                <div className="space-y-6 text-center py-4">
                  <div className="h-20 w-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto text-indigo-500">
                    <FileText className="h-10 w-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-black text-slate-900">Bài làm của bạn</h3>
                    <p className="text-xs text-slate-400 font-medium">
                      Vui lòng nộp bài trước thời hạn để được tính điểm.
                    </p>
                  </div>
                  <Button
                    variant="brand"
                    className="w-full h-12 rounded-xl shadow-lg"
                    onClick={() => setShowSubmission(true)}
                  >
                    <Send className="h-4 w-4 mr-2" /> Nộp bài ngay
                  </Button>
                </div>
              ) : (
                <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-slate-900">Nộp bài mới</h3>
                    <button
                      className="text-[10px] font-black uppercase text-slate-400 hover:text-slate-900"
                      onClick={() => setShowSubmission(false)}
                    >
                      Quay lại
                    </button>
                  </div>
                  {!isSubmitted ? (
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-slate-100 rounded-2xl p-8 text-center bg-slate-50 hover:bg-white hover:border-indigo-200 transition-all cursor-pointer group">
                        <Upload className="h-10 w-10 text-slate-300 mx-auto mb-3 group-hover:text-indigo-500" />
                        <p className="text-xs font-bold text-slate-500">Kéo thả file vào đây</p>
                      </div>
                      <textarea
                        placeholder="Nội dung hoặc link bài làm..."
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-xs min-h-[100px] outline-none"
                      />
                      <Button
                        variant="brand"
                        className="w-full h-12 rounded-xl"
                        onClick={() => setIsSubmitted(true)}
                      >
                        Xác nhận nộp bài
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6 py-4 text-center">
                      <div className="h-16 w-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
                        <CheckCircle2 className="h-8 w-8" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-black text-slate-900">Đã nộp bài thành công!</p>
                        <p className="text-[10px] text-slate-400 font-medium">
                          Bạn có thể hủy nộp để chỉnh sửa nếu chưa hết hạn.
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full h-10 rounded-xl border-slate-100 text-rose-500 font-bold"
                        onClick={() => setIsSubmitted(false)}
                      >
                        Hủy nộp bài
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setIsEditModalOpen(false)}
          />
          <Card className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border-none">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-emerald-50/30">
              <h2 className="text-xl font-heading font-black text-slate-900">Chỉnh sửa bài tập</h2>
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
                <label className="text-[10px] font-black uppercase text-slate-400">Mô tả</label>
                <textarea
                  value={mockData.description}
                  onChange={(e) => setMockData({ ...mockData, description: e.target.value })}
                  className="w-full min-h-[120px] bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400">Hạn nộp</label>
                  <Input
                    value={mockData.deadline}
                    onChange={(e) => setMockData({ ...mockData, deadline: e.target.value })}
                    className="rounded-xl h-11 bg-slate-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400">
                    Trọng số
                  </label>
                  <Input
                    value={mockData.weight}
                    onChange={(e) => setMockData({ ...mockData, weight: e.target.value })}
                    className="rounded-xl h-11 bg-slate-50"
                  />
                </div>
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
                  className="flex-1 h-12 rounded-xl font-black bg-emerald-600"
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

export default AssignmentDetail;
