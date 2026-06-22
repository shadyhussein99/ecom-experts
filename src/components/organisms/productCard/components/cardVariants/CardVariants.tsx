import type { ProductVariant } from '@/types/product'
import { cardVariantsStyles } from './cardVariantsStyles'

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
    <div className={cardVariantsStyles.container}>
      {variants.map((variant) => (
        <button
          key={variant.id}
          onClick={() => onSelect(variant.id)}
          className={cardVariantsStyles.option(
            selectedVariantId === variant.id,
          )}
        >
          {variant.image && (
            <img
              loading="lazy"
              src={variant.image}
              alt={`${variant.color} product`}
              className={cardVariantsStyles.image}
            />
          )}
          {variant.color}
        </button>
      ))}
    </div>
  )
}
