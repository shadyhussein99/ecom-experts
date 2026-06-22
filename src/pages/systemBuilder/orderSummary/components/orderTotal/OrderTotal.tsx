import { toast } from 'sonner'
import satisfaction from '@/assets/general/statisfaction.svg'
import { Button } from '@/components/atoms/button/Button'
import { formatAmount } from '@/lib/formatAmount'
import { useOrderTotals } from '@/pages/systemBuilder/orderSummary/hooks/useOrderTotals'
import { useProductsStore } from '@/store/products/productsStore'
import { orderTotalStyles } from './orderTotalStyles'

export const OrderTotal = () => {
  const { originalTotal, finalTotal, savings } = useOrderTotals()
  const saveForLater = useProductsStore((state) => state.saveForLater)

  const handleSaveForLater = () => {
    if (saveForLater()) {
      toast.success('System is saved successfully.')
    } else {
      toast.error("Couldn't save your system. Please try again.")
    }
  }

  // For adaptive design, we need to display the satisfaction image and low as badge in different ways based on screen size. So we create these elements separately and use them in the JSX below.
  const satisfactionImg = (
    <img
      loading="lazy"
      src={satisfaction}
      alt="satisfaction guarantee"
      className={orderTotalStyles.satisfactionImg}
    />
  )

  const lowAsBadge = (
    <span className={orderTotalStyles.lowAsBadge}>as low as $19.19/mo</span>
  )

  const priceBlock = (
    <div className={orderTotalStyles.priceRow}>
      <span className={orderTotalStyles.priceOriginal}>
        ${formatAmount(originalTotal)}
      </span>
      <span className={orderTotalStyles.priceFinal}>
        ${formatAmount(finalTotal)}
      </span>
    </div>
  )

  return (
    <div className={orderTotalStyles.container}>
      <div className={orderTotalStyles.compactRow}>
        {satisfactionImg}

        <div className={orderTotalStyles.compactDetails}>
          {lowAsBadge}
          {priceBlock}
        </div>
      </div>

      {/* Displayed only in screen range lg to xl as per design */}
      <div className={orderTotalStyles.midRange}>
        <div className={orderTotalStyles.midRangeRow}>
          {satisfactionImg}

          <div>
            <p className={orderTotalStyles.returnsTitle}>
              30-day hassle-free returns
            </p>
            <p className={orderTotalStyles.returnsText}>
              If you're not totally in love with the product, we will refund you
              100%.
            </p>
          </div>
        </div>

        <div className={orderTotalStyles.midRangePriceRow}>
          {lowAsBadge}
          {priceBlock}
        </div>
      </div>

      <p className={orderTotalStyles.savings}>
        Congrats! You're saving ${formatAmount(savings)} on your security
        bundle!
      </p>

      <Button
        className={orderTotalStyles.checkoutButton}
        onClick={() =>
          toast.success(`Order confirmed! Total $${formatAmount(finalTotal)}`)
        }
      >
        Checkout
      </Button>

      <button
        className={orderTotalStyles.saveForLater}
        onClick={handleSaveForLater}
      >
        Save my system for later
      </button>
    </div>
  )
}
