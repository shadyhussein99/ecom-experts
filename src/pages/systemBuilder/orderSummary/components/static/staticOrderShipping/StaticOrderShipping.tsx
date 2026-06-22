import shipping from '@/assets/general/shipping.svg'
import { formatAmount } from '@/lib/formatAmount'
import { SHIPPING_PRICING } from '@/pages/systemBuilder/orderSummary/staticSections'
import { staticOrderShippingStyles } from './staticOrderShippingStyles'

export const StaticOrderShipping = () => {
  return (
    <div className={staticOrderShippingStyles.row}>
      <div className={staticOrderShippingStyles.iconWrapper}>
        <img
          loading="lazy"
          src={shipping}
          alt="Fast Shipping"
          className={staticOrderShippingStyles.icon}
        />
      </div>

      <p className={staticOrderShippingStyles.title}>Fast Shipping</p>

      <div className={staticOrderShippingStyles.priceBlock}>
        <span className={staticOrderShippingStyles.originalPrice}>
          ${formatAmount(SHIPPING_PRICING.originalPrice)}
        </span>
        <span className={staticOrderShippingStyles.price}>
          {SHIPPING_PRICING.price === 0
            ? 'FREE'
            : `$${formatAmount(SHIPPING_PRICING.price)}`}
        </span>
      </div>
    </div>
  )
}
