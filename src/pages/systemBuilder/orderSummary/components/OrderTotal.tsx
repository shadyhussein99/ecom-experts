import { toast } from 'sonner'
import satisfaction from '@/assets/general/statisfaction.svg'
import { Button } from '@/components/atoms/button/Button'
import { formatAmount } from '@/lib/formatAmount'
import { useOrderTotals } from '@/pages/systemBuilder/orderSummary/hooks/useOrderTotals'
import { useProductsStore } from '@/store/products/productsStore'

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
      className="size-18 shrink-0 lg:size-20 xl:size-18"
    />
  )

  const lowAsBadge = (
    <span className="bg-primary text-primary-foreground rounded-md px-2.5 py-1 text-xs font-medium">
      as low as $19.19/mo
    </span>
  )

  const priceBlock = (
    <div className="flex items-baseline gap-2">
      <span className="text-grey-600 text-lg line-through">
        ${formatAmount(originalTotal)}
      </span>
      <span className="text-primary text-2xl font-bold">
        ${formatAmount(finalTotal)}
      </span>
    </div>
  )

  return (
    <div className="pt-2">
      <div className="flex items-center justify-between gap-3 lg:hidden xl:flex">
        {satisfactionImg}

        <div className="flex flex-col items-end gap-1.5">
          {lowAsBadge}
          {priceBlock}
        </div>
      </div>

      {/* Displayed only in screen range lg to xl as per design */}
      <div className="hidden lg:block xl:hidden">
        <div className="flex items-center gap-3">
          {satisfactionImg}

          <div>
            <p className="text-lg font-semibold text-neutral-900">
              30-day hassle-free returns
            </p>
            <p className="text-foreground pt-1 text-sm">
              If you're not totally in love with the product, we will refund you
              100%.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 pt-3">
          {lowAsBadge}
          {priceBlock}
        </div>
      </div>

      <p className="text-success pt-4 text-center text-sm font-medium">
        Congrats! You're saving ${formatAmount(savings)} on your security
        bundle!
      </p>

      <Button
        className="mt-3 h-13 w-full text-base font-semibold"
        onClick={() =>
          toast.success(`Order confirmed! Total $${formatAmount(finalTotal)}`)
        }
      >
        Checkout
      </Button>

      <button
        className="text-grey-700 mx-auto mt-4 block cursor-pointer text-sm italic underline underline-offset-2"
        onClick={handleSaveForLater}
      >
        Save my system for later
      </button>
    </div>
  )
}
