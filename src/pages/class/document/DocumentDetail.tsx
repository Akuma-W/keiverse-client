import {
  ChevronLeft,
  Download,
  Edit3,
  ExternalLink,
  Eye,
  FileText,
  Info,
  Save,
  X,
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const DocumentDetail = () => {
  const { classId } = useParams();
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const isTeacher = true;

  const [mockData, setMockData] = useState({
    title: 'Week 1: Intro to UX Principles PDF',
    description:
      'Tài liệu bao quát các nguyên lý cơ bản của UX Design, bao gồm Heuristic Evaluation của Nielsen, mô hình tâm trí của người dùng và các quy tắc thiết kế giao diện phổ biến. Đây là nội dung cốt lõi cho bài thi giữa kỳ.',
    size: '4.2 MB',
    type: 'PDF Document',
    createdAt: '15/03/2024',
    previewUrl: '#',
  });

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
              Classwork / Resources
            </p>
            <h1 className="text-2xl font-heading font-black text-slate-900">{mockData.title}</h1>
          </div>
        </div>
        {isTeacher && (
          <Button
            variant="outline"
            className="rounded-xl border-indigo-100 text-indigo-600 bg-indigo-50 shadow-none hover:bg-indigo-100"
            onClick={() => setIsEditModalOpen(true)}
          >
            <Edit3 className="h-4 w-4 mr-2" /> Chỉnh sửa
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="rounded-[2.5rem] border-slate-100 shadow-xl overflow-hidden bg-white">
            <CardContent className="p-0">
              <div className="h-64 bg-slate-50 flex items-center justify-center relative border-b border-slate-100">
                <FileText className="h-20 w-20 text-indigo-200" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-white/40 backdrop-blur-[1px]">
                  <Button variant="brand" className="rounded-xl shadow-2xl h-12 px-8">
                    <Eye className="h-5 w-5 mr-2" /> Xem trước
                  </Button>
                </div>
              </div>
              <div className="p-10 space-y-8">
                <div>
                  <h3 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-3">
                    <Info className="h-5 w-5 text-indigo-500" /> Mô tả tài liệu
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    {mockData.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="rounded-4xl border-slate-100 shadow-xl overflow-hidden bg-white sticky top-24">
            <div className="h-2 bg-indigo-600"></div>
            <CardContent className="p-8 space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Kích thước
                  </span>
                  <span className="text-sm font-bold text-slate-900">{mockData.size}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Định dạng
                  </span>
                  <span className="text-sm font-bold text-slate-900">{mockData.type}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-50">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Ngày tạo
                  </span>
                  <span className="text-sm font-bold text-slate-900">{mockData.createdAt}</span>
                </div>
              </div>

              <div className="space-y-3 pt-4">
                <Button
                  variant="brand"
                  className="w-full h-12 rounded-xl shadow-lg shadow-indigo-100 font-bold"
                >
                  <Download className="h-5 w-5 mr-2" /> Tải về ngay
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-12 rounded-xl border-slate-100 text-slate-500 font-bold"
                >
                  <ExternalLink className="h-5 w-5 mr-2" /> Liên kết gốc
                </Button>
              </div>
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
            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-indigo-50/30">
              <h2 className="text-xl font-heading font-black text-slate-900">Chỉnh sửa tài liệu</h2>
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
                  <label className="text-[10px] font-black uppercase text-slate-400">
                    Kích thước
                  </label>
                  <Input
                    value={mockData.size}
                    onChange={(e) => setMockData({ ...mockData, size: e.target.value })}
                    className="rounded-xl h-11 bg-slate-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400">
                    Định dạng
                  </label>
                  <Input
                    value={mockData.type}
                    onChange={(e) => setMockData({ ...mockData, type: e.target.value })}
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
                  className="flex-1 h-12 rounded-xl font-black"
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
export default DocumentDetail;
