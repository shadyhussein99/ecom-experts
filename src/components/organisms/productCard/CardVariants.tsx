import type { ProductVariant } from '@/types/product'
import { cn } from '@/lib/clsx'

interface CardVariantsProps {
  variants: ProductVariant[]
  selectedVariantId: string | null
  onSelect: (variantId: string) => void
}

export const CardVariants = ({
  variants,
  selectedVariantId,
  onSelect,
}: CardVariantsProps) => {
  return (
    <div className="flex flex-wrap gap-3">
      {variants.map((variant) => (
        <button
          key={variant.id}
          type="button"
          onClick={() => onSelect(variant.id)}
          aria-pressed={selectedVariantId === variant.id}
          className={cn(
            'flex cursor-pointer items-center gap-2 rounded-[4px] border px-4 py-2 text-base transition-colors',
            selectedVariantId === variant.id
              ? 'border-success text-secondary-foreground bg-green-100'
              : 'border-border bg-background text-foreground hover:bg-grey-200',
          )}
        >
          {variant.icon && (
            <img src={variant.icon} alt="" className="size-7 object-contain" />
          )}
          {variant.color}
        </button>
      ))}
    </div>
  )
}
