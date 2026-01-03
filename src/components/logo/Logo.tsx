import { cn } from '@/lib/utils';
import { useWebsiteConfig } from '@/hooks/useWebsiteConfig';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  withText?: boolean;
  withSlogan?: boolean;
  className?: string;
}

const Logo = ({
  variant = 'dark',
  size = 'md',
  withText = true,
  withSlogan = false,
  className,
}: LogoProps) => {
  const { slogan, logo } = useWebsiteConfig();

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-14 w-14',
    lg: 'h-24 w-24',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  const textColor = variant === 'light' ? 'text-white' : 'text-slate-900';

  const sloganColor = variant === 'light' ? 'text-blue-200' : 'text-slate-500';

  return (
    <div className={cn('flex items-center gap-3 select-none', className)}>
      {/* Logo Icon */}
      <div className={cn('relative flex items-center justify-center shrink-0', sizeClasses[size])}>
        <img src={logo} alt="KEIVerse Logo" className="w-full h-full object-contain" />
      </div>

      {/* Logo Text */}
      <div className="flex flex-col leading-tight">
        {withText && (
          <div
            className={cn(
              'font-heading font-extrabold tracking-tight flex items-baseline',
              textSizes[size],
              textColor,
            )}
          >
            <span className="text-[#483d8b]">KEI</span>
            <span className="text-[#3096d5]">Verse</span>
          </div>
        )}

        {withSlogan && (
          <span
            className={cn('text-[9px] md:text-[11px] font-bold leading-none mt-1', sloganColor)}
          >
            {slogan}
          </span>
        )}
      </div>
    </div>
  );
};

export default Logo;
