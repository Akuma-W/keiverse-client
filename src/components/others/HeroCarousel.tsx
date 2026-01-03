import Autoplay from 'embla-carousel-autoplay';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';

interface Banner {
  tag: string;
  title: string;
  desc: string;
  image: string;
  color: string;
}

interface HeroCarouselProps {
  banners: Banner[];
}

const HeroCarousel = ({ banners }: HeroCarouselProps) => {
  return (
    <section className="relative bg-slate-900">
      <Carousel opts={{ loop: true }} plugins={[Autoplay({ delay: 6000 })]} className="w-full">
        <CarouselContent>
          {banners.map((banner, idx) => (
            <CarouselItem key={idx}>
              <div className="relative h-[600px]">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 h-full flex items-center">
                  <div className="container mx-auto px-6 max-w-3xl space-y-6">
                    <span
                      className={cn(
                        'inline-block px-4 py-1.5 rounded-full text-xs font-bold text-white bg-linear-to-r shadow-lg',
                        banner.color,
                      )}
                    >
                      {banner.tag}
                    </span>
                    <h1 className="text-5xl md:text-6xl font-extrabold text-white">
                      {banner.title}
                    </h1>
                    <p className="text-xl text-slate-200">{banner.desc}</p>
                    <div className="flex gap-4 pt-4">
                      <Button size="lg" variant="default">
                        Bắt đầu hành trình
                      </Button>
                      <Button size="lg" variant="secondary" className="text-white border-white/30">
                        Xem demo
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-6" />
        <CarouselNext className="right-6" />
      </Carousel>
    </section>
  );
};

export default HeroCarousel;
