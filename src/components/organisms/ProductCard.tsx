import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'
import type { Product } from '@/types/product'
import { Button } from '@/components/atoms/button/Button'
import { cn } from '@/lib/clsx'

interface ProductCardProps {
  product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { title, description, image, variants, sale, price } = product

  const [selectedVariant, setSelectedVariant] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)

  return (
    <div
      className={cn(
        'bg-card flex flex-col gap-6 rounded-3xl border p-6 shadow-sm sm:flex-row sm:items-center sm:gap-8 sm:p-8',
      )}
    >
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
          <div className="flex flex-wrap gap-3">
            {variants.map((variant) => (
              <button
                key={variant.id}
                type="button"
                onClick={() => setSelectedVariant(variant.id)}
                aria-pressed={selectedVariant === variant.id}
                className={cn(
                  'flex cursor-pointer items-center gap-2 rounded-[4px] border px-4 py-2 text-base transition-colors',
                  selectedVariant === variant.id
                    ? 'border-success text-secondary-foreground bg-green-100'
                    : 'border-border bg-background text-foreground hover:bg-grey-200',
                )}
              >
                {variant.icon && (
                  <img
                    src={variant.icon}
                    alt=""
                    className="size-7 object-contain"
                  />
                )}
                {variant.color}
              </button>
            ))}
          </div>
        )}

        <div className="mt-1 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
              className={`${quantity <= 1 ? 'border-grey-300 border-4 bg-white' : 'bg-grey-400'} text-grey-700 hover:bg-grey-500 size-11 cursor-pointer rounded-lg disabled:cursor-not-allowed`}
            >
              <Minus
                className={`${quantity <= 1 ? 'text-grey-300' : 'text-grey-700'} size-5`}
              />
            </Button>
            <span className="w-6 text-center text-xl font-semibold text-neutral-900">
              {quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setQuantity((q) => q + 1)}
              aria-label="Increase quantity"
              className="bg-grey-400 text-grey-700 hover:bg-grey-500 size-11 cursor-pointer rounded-lg disabled:cursor-not-allowed"
            >
              <Plus className="size-5" />
            </Button>
          </div>

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
