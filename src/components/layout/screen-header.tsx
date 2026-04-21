'use client';

import { cn } from '@/lib/utils';

interface ScreenHeaderProps {
  leftAction?: React.ReactNode;
  title?: string | React.ReactNode;
  rightAction?: React.ReactNode;
  transparent?: boolean;
  className?: string;
}

export function ScreenHeader({ leftAction, title, rightAction, transparent, className }: ScreenHeaderProps) {
  return (
    <header
      className={cn(
        'sticky top-0 z-40 flex items-center justify-between h-14 px-5',
        transparent
          ? 'bg-transparent'
          : 'bg-ivory-50/80 backdrop-blur-2xl border-b border-ink-100/30',
        className
      )}
    >
      {/* Left */}
      <div className="flex items-center min-w-[40px]">
        {leftAction}
      </div>

      {/* Title */}
      <div className="flex-1 text-center">
        {typeof title === 'string' ? (
          <h1 className="text-h2 text-ink-900 truncate">{title}</h1>
        ) : (
          title
        )}
      </div>

      {/* Right */}
      <div className="flex items-center min-w-[40px] justify-end">
        {rightAction}
      </div>
    </header>
  );
}
