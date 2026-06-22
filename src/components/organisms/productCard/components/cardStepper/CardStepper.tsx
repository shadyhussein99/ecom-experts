import { Minus, Plus } from 'lucide-react'
import { Button } from '@/components/atoms/button/Button'
import { cardStepperStyles } from './cardStepperStyles'

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
  const handleChange = (next: number) => {
    if (readOnly) return
    onChange?.(next)
  }

  return (
    <div className={cardStepperStyles.container}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleChange(Math.max(0, quantity - 1))}
        disabled={quantity <= 0}
        aria-label="Decrease quantity"
        className={cardStepperStyles.button(quantity <= 0, className)}
      >
        <Minus className={cardStepperStyles.decreaseIcon(quantity <= 0)} />
      </Button>
      <span className={cardStepperStyles.value}>{quantity}</span>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleChange(quantity + 1)}
        aria-label="Increase quantity"
        className={cardStepperStyles.button(false, className)}
      >
        <Plus className={cardStepperStyles.icon} />
      </Button>
    </div>
  )
}
