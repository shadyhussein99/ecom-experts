import { CardStepper } from '@/components/organisms/productCard/components/CardStepper'
import { formatAmount } from '@/lib/formatAmount'
import type { StaticOrderItemModel } from '../../types'

interface StaticOrderItemProps {
  item: StaticOrderItemModel
}

export const StaticOrderItem = ({ item }: StaticOrderItemProps) => {
  const { title, image, quantity, price, originalPrice, isFree } = item

  return (
    <div className="flex items-center gap-3 py-2">
      <div className="bg-background flex size-12 shrink-0 items-center justify-center rounded-lg p-1 shadow-sm">
        <img
          loading="lazy"
          src={image}
          alt={title}
          className="max-h-full w-auto object-contain"
        />
      </div>

      <p className="flex-1 text-sm font-semibold text-neutral-900">{title}</p>

      <CardStepper
        quantity={quantity}
        className={`${isFree ? 'bg-grey-400 border-grey-500 cursor-not-allowed border-2' : 'bg-white'}`}
        readOnly={isFree}
      />

      <div className="flex flex-col items-end leading-tight">
        {originalPrice !== undefined && (
          <span className="text-grey-600 text-sm line-through">
            ${formatAmount(originalPrice)}
          </span>
        )}
        <span className="text-primary text-sm font-semibold">
          {isFree ? 'FREE' : `$${formatAmount(price ?? 0)}`}
        </span>
      </div>
    </div>
  )
}
