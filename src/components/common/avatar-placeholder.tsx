import { cn } from '@/lib/utils';
import { User } from 'lucide-react';

type AvatarPlaceholderProps = {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  initials?: string;
  className?: string;
};

const sizeClasses: Record<NonNullable<AvatarPlaceholderProps['size']>, string> = {
  sm: 'w-8 h-8 text-[11px]',
  md: 'w-10 h-10 text-[13px]',
  lg: 'w-14 h-14 text-[16px]',
  xl: 'w-20 h-20 text-[20px]',
};

const iconSizes: Record<NonNullable<AvatarPlaceholderProps['size']>, number> = {
  sm: 14,
  md: 16,
  lg: 22,
  xl: 28,
};

export function AvatarPlaceholder({
  size = 'md',
  initials,
  className,
}: AvatarPlaceholderProps) {
  return (
    <div
      className={cn(
        'rounded-full flex items-center justify-center',
        'bg-gradient-to-br from-sand-100 to-sand-300',
        'text-gold-700 font-semibold',
        sizeClasses[size],
        className,
      )}
    >
      {initials ? (
        <span>{initials}</span>
      ) : (
        <User size={iconSizes[size]} strokeWidth={1.5} />
      )}
    </div>
  );
}
