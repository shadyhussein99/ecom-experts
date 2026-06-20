import satisfaction from '@/assets/general/statisfaction.svg'
import { Button } from '@/components/atoms/button/Button'

export const OrderTotal = () => {
  return (
    <div className="pt-2">
      <div className="flex items-center justify-between gap-3">
        <img
          src={satisfaction}
          alt="100% Wyze satisfaction guarantee"
          className="size-18 shrink-0"
        />

        <div className="flex flex-col items-end gap-1.5">
          <span className="bg-primary text-primary-foreground rounded-md px-2.5 py-1 text-xs font-medium">
            as low as $19.19/mo
          </span>

          <div className="flex items-baseline gap-2">
            <span className="text-grey-600 text-lg line-through">$238.81</span>
            <span className="text-primary text-2xl font-bold">$187.89</span>
          </div>
        </div>
      </div>

      <p className="text-success pt-4 text-center text-sm font-medium">
        Congrats! You're saving $50.92 on your security bundle!
      </p>

      <Button className="mt-3 h-13 w-full text-base font-semibold">
        Checkout
      </Button>

      <button
        type="button"
        className="text-grey-700 mx-auto mt-4 block text-sm italic underline underline-offset-2"
      >
        Save my system for later
      </button>
    </div>
  )
}
