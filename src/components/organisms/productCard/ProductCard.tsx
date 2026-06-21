import type { Product } from '@/types/product'
import { cn } from '@/lib/clsx'
import { useProductCard } from './hooks/useProductCard'
import { CardVariants } from './components/CardVariants'
import { CardStepper } from './components/CardStepper'
import { CardPrice } from './components/CardPrice'

interface ProductCardProps {
  product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { id, title, description, image, variants, sale, price } = product

  const variantsIDs = variants?.map((variant) => variant.id) || []

  const {
    selectedVariantId,
    setSelectedVariantId,
    selectedQuantity,
    totalQuantity,
    setSelectedQuantity,
  } = useProductCard({ productID: id, variantsIDs })

  return (
    <div
      className={cn(
        'bg-card flex flex-col gap-6 rounded-2xl border p-3.5 shadow-sm sm:flex-row sm:items-start sm:gap-2 lg:flex-col lg:items-stretch lg:gap-6 xl:flex-row xl:items-start xl:gap-2',
        totalQuantity > 0 && 'border-primary border-2',
      )}
    >
      {/* Image and Sale Badge */}
      <div className="flex w-full max-w-full shrink-0 flex-col gap-3 px-0 sm:w-2/5 sm:max-w-fit lg:w-full lg:max-w-full xl:w-2/5 xl:max-w-fit">
        {sale && (
          <span className="bg-primary text-primary-foreground w-fit rounded-full px-2 py-0.5 text-xs font-semibold">
            Save {sale.discount}
          </span>
        )}
        <div className="flex w-full flex-1 items-center justify-center sm:w-fit lg:w-full xl:w-fit">
          <img
            loading="lazy"
            src={image}
            alt={title}
            className="max-h-32 w-auto max-w-full object-contain"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3">
        {/* Card title and description */}
        <div className="flex flex-col gap-2">
          <p className="text-lg leading-none font-semibold text-neutral-900">
            {title}
          </p>

          <p className="text-foreground text-sm">
            {description}{' '}
            <a
              href="#"
              className="text-primary font-semibold whitespace-nowrap underline underline-offset-2"
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

        <div className="flex flex-wrap items-center justify-between gap-4">
          <CardStepper
            quantity={selectedQuantity}
            onChange={setSelectedQuantity}
          />

          <CardPrice sale={sale} price={price} />
        </div>
      </div>
    </div>
  )
}
