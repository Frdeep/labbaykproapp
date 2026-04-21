import { cn } from '@/lib/utils';
import React from 'react';

type Props = {
  context: string;
  ratio?: '1/1' | '3/4' | '4/5' | '4/3' | '16/9' | '16/10';
  rounded?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  className?: string;
  tone?: 'ivory' | 'sand' | 'gold' | 'ritual';
};

const ratioClass: Record<NonNullable<Props['ratio']>, string> = {
  '1/1':   'aspect-square',
  '3/4':   'aspect-3/4',
  '4/5':   'aspect-4/5',
  '4/3':   'aspect-4/3',
  '16/9':  'aspect-video',
  '16/10': 'aspect-16/10',
};

const roundedClass: Record<NonNullable<Props['rounded']>, string> = {
  none: '',
  xs:   'rounded-xs',
  sm:   'rounded-sm',
  md:   'rounded-md',
  lg:   'rounded-lg',
  xl:   'rounded-xl',
  '2xl':'rounded-2xl',
  full: 'rounded-full',
};

const toneGradient: Record<NonNullable<Props['tone']>, string> = {
  ivory:  'from-ivory-100 to-sand-200',
  sand:   'from-sand-100 to-sand-300',
  gold:   'from-gold-100 to-gold-300',
  ritual: 'from-night-700 to-night-900',
};

export const PlaceholderImage = React.memo(function PlaceholderImage({
  context,
  ratio = '4/5',
  rounded = 'xl',
  className,
  tone = 'ivory',
}: Props) {
  const isRitual = tone === 'ritual';

  return (
    <div
      data-placeholder={context}
      className={cn(
        'relative w-full overflow-hidden flex items-center justify-center',
        'bg-gradient-to-br',
        ratioClass[ratio],
        roundedClass[rounded],
        toneGradient[tone],
        className,
      )}
    >
      {/* Watermark glow */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{ background: 'var(--lb-grad-watermark)' }}
      />

      {/* Badge contextuel */}
      <div className="relative z-10 text-center px-3">
        <div className={cn(
          'w-10 h-10 mx-auto mb-2 rounded-full flex items-center justify-center',
          isRitual ? 'bg-night-700' : 'bg-gold-100',
        )}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke={isRitual ? 'var(--lb-gold-500)' : 'var(--lb-gold-600)'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
          </svg>
        </div>
        <p className={cn(
          'text-[10px] uppercase tracking-[0.14em] font-semibold',
          isRitual ? 'text-gold-300' : 'text-gold-700',
        )}>
          {context}
        </p>
      </div>
    </div>
  );
});
