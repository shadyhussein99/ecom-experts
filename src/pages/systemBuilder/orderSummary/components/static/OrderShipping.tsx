import shipping from '@/assets/general/shipping.svg'
import { formatAmount } from '@/lib/formatAmount'
import { SHIPPING_PRICING } from '@/pages/systemBuilder/orderSummary/staticSections'

export const OrderShipping = () => {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="bg-background flex size-12 shrink-0 items-center justify-center rounded-lg p-1 shadow-sm">
        <img
          loading="lazy"
          src={shipping}
          alt="Fast Shipping"
          className="max-h-full w-auto object-contain"
        />
      </div>

      <p className="flex-1 text-sm font-semibold text-neutral-900">
        Fast Shipping
      </p>

      <div className="flex flex-col items-end leading-tight">
        <span className="text-grey-600 text-sm line-through">
          ${formatAmount(SHIPPING_PRICING.originalPrice)}
        </span>
        <span className="text-primary text-sm font-semibold">
          {SHIPPING_PRICING.price === 0
            ? 'FREE'
            : `$${formatAmount(SHIPPING_PRICING.price)}`}
        </span>
      </div>
    </div>
  )
}
