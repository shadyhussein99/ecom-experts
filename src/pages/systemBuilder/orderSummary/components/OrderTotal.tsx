import { toast } from 'sonner'
import satisfaction from '@/assets/general/statisfaction.svg'
import { Button } from '@/components/atoms/button/Button'
import { formatAmount } from '@/lib/formatAmount'
import { useOrderTotals } from '@/pages/systemBuilder/orderSummary/hooks/useOrderTotals'
import { useProductsStore } from '@/store/productsStore'

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

  return (
    <div className="pt-2">
      <div className="flex items-center justify-between gap-3">
        <img
          loading="lazy"
          src={satisfaction}
          alt="100% Wyze satisfaction guarantee"
          className="size-18 shrink-0"
        />

        <div className="flex flex-col items-end gap-1.5">
          <span className="bg-primary text-primary-foreground rounded-md px-2.5 py-1 text-xs font-medium">
            as low as $19.19/mo
          </span>

          <div className="flex items-baseline gap-2">
            <span className="text-grey-600 text-lg line-through">
              ${formatAmount(originalTotal)}
            </span>
            <span className="text-primary text-2xl font-bold">
              ${formatAmount(finalTotal)}
            </span>
          </div>
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
