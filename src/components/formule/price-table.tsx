import { cn } from '@/lib/utils';

interface PriceTableProps {
  priceSix?: number | null;
  priceQuad?: number | null;
  priceTriple?: number | null;
  priceDouble?: number | null;
  className?: string;
}

const roomLabels: Record<string, string> = {
  six: 'Chambre 6 pers.',
  quad: 'Chambre 4 pers.',
  triple: 'Chambre 3 pers.',
  double: 'Chambre 2 pers.',
};

export function PriceTable({ priceSix, priceQuad, priceTriple, priceDouble, className }: PriceTableProps) {
  const rows = [
    { key: 'six', price: priceSix, label: roomLabels.six },
    { key: 'quad', price: priceQuad, label: roomLabels.quad },
    { key: 'triple', price: priceTriple, label: roomLabels.triple },
    { key: 'double', price: priceDouble, label: roomLabels.double },
  ].filter(r => r.price !== null && r.price !== undefined);

  if (rows.length === 0) {
    return (
      <div className={cn('rounded-2xl bg-beige-900/5 p-4 text-center', className)}>
        <p className="text-body text-ink-400">Prix sur demande — Contactez-nous</p>
      </div>
    );
  }

  return (
    <div className={cn('rounded-2xl overflow-hidden border border-ink-100', className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-beige-900">
        <span className="text-caption text-gold-300">Type de chambre</span>
        <span className="text-caption text-gold-300">Prix / pers.</span>
      </div>

      {/* Rows */}
      {rows.map((row, i) => (
        <div
          key={row.key}
          className={cn(
            'flex items-center justify-between px-4 py-3',
            i % 2 === 0 ? 'bg-white' : 'bg-ivory-50'
          )}
        >
          <span className="text-body text-ink-700">{row.label}</span>
          <span className="text-body font-semibold text-beige-900 tabular">
            {row.price!.toLocaleString('fr-FR')} €
          </span>
        </div>
      ))}
    </div>
  );
}
