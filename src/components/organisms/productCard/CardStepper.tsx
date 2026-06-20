import { Minus, Plus } from 'lucide-react'
import { Button } from '@/components/atoms/button/Button'

interface CardStepperProps {
  quantity: number
  onChange: (quantity: number) => void
}

export const CardStepper = ({ quantity, onChange }: CardStepperProps) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onChange(Math.max(0, quantity - 1))}
        disabled={quantity <= 0}
        aria-label="Decrease quantity"
        className={`${quantity <= 0 ? 'border-grey-300 border-3 bg-white' : 'bg-grey-400'} text-grey-700 hover:bg-grey-500 size-7 cursor-pointer rounded-md disabled:cursor-not-allowed`}
      >
        <Minus
          className={`${quantity <= 0 ? 'text-grey-300' : 'text-grey-700'} size-5`}
        />
      </Button>
      <span className="w-6 text-center text-lg font-semibold text-neutral-900">
        {quantity}
      </span>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onChange(quantity + 1)}
        aria-label="Increase quantity"
        className="bg-grey-400 text-grey-700 hover:bg-grey-500 size-7 cursor-pointer rounded-md disabled:cursor-not-allowed"
      >
        <Plus className="size-5" />
      </Button>
    </div>
  )
}
