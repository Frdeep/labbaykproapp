import { cn } from '@/lib/utils';

type StatusPillProps = {
  children: React.ReactNode;
  tone?: 'gold' | 'ivory' | 'muted' | 'success' | 'error';
  className?: string;
};

const toneClasses: Record<NonNullable<StatusPillProps['tone']>, string> = {
  gold:    'bg-gold-100 text-gold-700 border-gold-300',
  ivory:   'bg-ivory-100 text-ink-700 border-ink-200',
  muted:   'bg-ink-100 text-ink-500 border-ink-200',
  success: 'bg-ivory-100 text-state-success border-state-success/20',
  error:   'bg-ivory-100 text-state-error border-state-error/20',
};

export function StatusPill({
  children,
  tone = 'gold',
  className,
}: StatusPillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1',
        'px-2.5 py-0.5 rounded-pill',
        'text-[11px] font-semibold tracking-wide',
        'border',
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
