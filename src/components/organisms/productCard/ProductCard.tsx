import { useState } from 'react'
import { toast } from 'sonner'
import type { Product } from '@/types/product'
import { cn } from '@/lib/clsx'
import { CardVariants } from './CardVariants'
import { CardStepper } from './CardStepper'

interface ProductCardProps {
  product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { id, title, description, image, variants, sale, price } = product

  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    variants?.length ? null : id,
  )
  const [quantities, setQuantities] = useState<Record<string, number>>({})

  const selectedQuantity = selectedVariantId
    ? (quantities[selectedVariantId] ?? 0)
    : 0
  const totalQuantity = Object.values(quantities).reduce(
    (sum, quantity) => sum + quantity,
    0,
  )

  const setSelectedQuantity = (quantity: number) => {
    if (!selectedVariantId) {
      toast.warning('Please select a color')
      return
    }
    setQuantities((prev) => ({ ...prev, [selectedVariantId]: quantity }))
  }

  return (
    <div
      className={cn(
        'bg-card flex cursor-pointer flex-col gap-6 rounded-3xl border p-6 shadow-sm sm:flex-row sm:items-center sm:gap-8 sm:p-8',
        totalQuantity > 0 && 'border-primary',
      )}
    >
      {/* Image and Sale Badge */}
      <div className="flex max-w-fit shrink-0 flex-col gap-4 px-0 sm:w-2/5">
        {sale && (
          <span className="bg-primary text-primary-foreground w-fit rounded-full px-4 py-1.5 text-base font-semibold">
            Save {sale.discount}
          </span>
        )}
        <div className="flex w-fit flex-1 items-center justify-center">
          <img
            src={image}
            alt={title}
            className="max-h-56 w-auto object-contain sm:max-h-64"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-5">
        {/* Card title and description */}
        <div className="flex flex-col gap-2">
          <h3 className="text-3xl leading-none font-bold text-neutral-900 sm:text-4xl">
            {title}
          </h3>

          <p className="text-foreground text-lg">
            {description}{' '}
            <a
              href="#"
              className="text-primary whitespace-nowrap underline underline-offset-4"
            >
              Learn More
            </a>
          </p>
        </div>

        {variants && (
          <CardVariants
            variants={variants}
            selectedVariantId={selectedVariantId}
            onSelect={setSelectedVariantId}
          />
        )}

        <div className="mt-1 flex items-center justify-between gap-4">
          <CardStepper
            quantity={selectedQuantity}
            onChange={setSelectedQuantity}
          />

          {/* Card price */}
          <div className="flex flex-col items-end leading-tight">
            {sale && (
              <span className="text-danger text-xl line-through sm:text-2xl">
                {sale.originalPrice}
              </span>
            )}
            <span className="text-grey-700 text-xl sm:text-2xl">{price}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
