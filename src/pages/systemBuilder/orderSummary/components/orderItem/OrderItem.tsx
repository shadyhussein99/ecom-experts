import { CardStepper } from '@/components/organisms/productCard/components/cardStepper/CardStepper'
import { formatAmount } from '@/lib/formatAmount'
import { useProductsStore } from '@/store/products/productsStore'
import type { OrderItemViewModel } from '@/pages/systemBuilder/orderSummary/types'
import { orderItemStyles } from './orderItemStyles'

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
    <div className={orderItemStyles.row}>
      <div className={orderItemStyles.iconWrapper}>
        <img
          loading="lazy"
          src={icon}
          alt={title}
          className={orderItemStyles.icon}
        />
      </div>

      <p className={orderItemStyles.title}>{title}</p>

      <CardStepper
        quantity={quantity}
        onChange={(next) => setQuantity({ productID, variantID }, next)}
        className={orderItemStyles.stepper}
      />

      <div className={orderItemStyles.priceBlock}>
        {totalBeforeSale !== null && (
          <span className={orderItemStyles.originalPrice}>
            ${formatAmount(totalBeforeSale)}
          </span>
        )}
        <span className={orderItemStyles.finalPrice}>
          ${formatAmount(finalTotal)}
        </span>
      </div>
    </div>
  )
}
