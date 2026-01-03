import { Send, Star } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';

const FeedbackSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 max-w-xl">
        <Card className="shadow-2xl">
          {submitted ? (
            <CardContent className="p-12 text-center space-y-6">
              <Send className="h-12 w-12 mx-auto text-emerald-500" />
              <h3 className="text-2xl font-bold">Cảm ơn bạn!</h3>
              <p className="text-slate-500">Phản hồi đã được ghi nhận.</p>
              <Button onClick={() => setSubmitted(false)} variant="outline">
                Gửi thêm góp ý
              </Button>
            </CardContent>
          ) : (
            <CardContent className="p-10 space-y-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-4"
              >
                <Input placeholder="Họ và tên..." required />
                <div className="flex justify-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      onClick={() => setRating(s)}
                      onMouseEnter={() => setHover(s)}
                      onMouseLeave={() => setHover(0)}
                      className={cn(
                        'cursor-pointer',
                        (hover || rating) >= s ? 'fill-amber-400 text-amber-400' : 'text-slate-300',
                      )}
                    />
                  ))}
                </div>
                <textarea
                  required
                  placeholder="Góp ý của bạn..."
                  className="w-full min-h-[120px] rounded-md border p-3"
                />
                <Button type="submit" className="w-full" variant="secondary">
                  Gửi phản hồi
                </Button>
              </form>
            </CardContent>
          )}
        </Card>
      </div>
    </section>
  );
};

export default FeedbackSection;
