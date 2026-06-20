import { CardStepper } from '@/components/organisms/productCard/components/CardStepper'
import { formatAmount } from '@/lib/formatAmount'
import { useProductsStore } from '@/store/products/productsStore'
import type { OrderItemViewModel } from '../types'

interface OrderItemProps {
  item: OrderItemViewModel
}

export const OrderItem = ({ item }: OrderItemProps) => {
  const {
    title,
    icon,
    unitPrice,
    unitOriginalPrice,
    quantity,
    productID,
    variantID,
  } = item

  const setQuantity = useProductsStore((state) => state.setQuantity)

  const finalTotal = unitPrice * quantity

  const totalBeforeSale =
    unitOriginalPrice !== null ? unitOriginalPrice * quantity : null

  return (
    <div className="flex items-center gap-3 py-2">
      <div className="bg-background flex size-12 shrink-0 items-center justify-center rounded-lg p-1 shadow-sm">
        <img
          loading="lazy"
          src={icon}
          alt={title}
          className="max-h-full w-auto object-contain"
        />
      </div>

      <p className="flex-1 text-sm font-semibold text-neutral-900">{title}</p>

      <CardStepper
        quantity={quantity}
        onChange={(next) => setQuantity({ productID, variantID }, next)}
        className="bg-white"
      />

      <div className="flex flex-col items-end leading-tight">
        {totalBeforeSale !== null && (
          <span className="text-grey-600 text-sm line-through">
            ${formatAmount(totalBeforeSale)}
          </span>
        )}
        <span className="text-primary text-sm font-semibold">
          ${formatAmount(finalTotal)}
        </span>
      </div>
    </div>
  )
}
