import { Minus, Plus } from 'lucide-react'
import { Button } from '@/components/atoms/button/Button'

interface CardStepperProps {
  quantity: number
  onChange?: (quantity: number) => void
  className?: string
  readOnly?: boolean
}

export const CardStepper = ({
  quantity,
  onChange,
  className,
  readOnly = false,
}: CardStepperProps) => {
  const buttonClass =
    ' bg-grey-400 text-grey-700 hover:bg-grey-500 size-6 cursor-pointer rounded-sm disabled:cursor-not-allowed'

  const iconClass = 'size-4'

  const handleChange = (next: number) => {
    if (readOnly) return
    onChange?.(next)
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleChange(Math.max(0, quantity - 1))}
        disabled={quantity <= 0}
        aria-label="Decrease quantity"
        className={`${buttonClass} ${quantity <= 0 ? 'border-grey-300 border-2 bg-white' : ''} ${className ?? ''}`}
      >
        <Minus
          className={`${iconClass} ${quantity <= 0 ? 'text-grey-300' : 'text-grey-700'}`}
        />
      </Button>
      <span className="w-6 text-center text-lg font-semibold text-neutral-900">
        {quantity}
      </span>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleChange(quantity + 1)}
        aria-label="Increase quantity"
        className={`${buttonClass} ${className ?? ''}`}
      >
        <Plus className={iconClass} />
      </Button>
    </div>
  )
}
