import { CardStepper } from '@/components/organisms/productCard/components/cardStepper/CardStepper'
import { formatAmount } from '@/lib/formatAmount'
import type { StaticOrderItemModel } from '@/pages/systemBuilder/orderSummary/types'
import { staticOrderItemStyles } from './staticOrderItemStyles'

interface StaticOrderItemProps {
  item: StaticOrderItemModel
}

export const StaticOrderItem = ({ item }: StaticOrderItemProps) => {
  const { title, image, quantity, price, originalPrice, isFree } = item

  return (
    <div className={staticOrderItemStyles.row}>
      <div className={staticOrderItemStyles.iconWrapper}>
        <img
          loading="lazy"
          src={image}
          alt={title}
          className={staticOrderItemStyles.icon}
        />
      </div>

      <p className={staticOrderItemStyles.title}>{title}</p>

      <CardStepper
        quantity={quantity}
        className={staticOrderItemStyles.stepper(isFree)}
        readOnly={isFree}
      />

      <div className={staticOrderItemStyles.priceBlock}>
        {originalPrice !== undefined && (
          <span className={staticOrderItemStyles.originalPrice}>
            ${formatAmount(originalPrice)}
          </span>
        )}
        <span className={staticOrderItemStyles.price}>
          {isFree ? 'FREE' : `$${formatAmount(price ?? 0)}`}
        </span>
      </div>
    </div>
  )
}
