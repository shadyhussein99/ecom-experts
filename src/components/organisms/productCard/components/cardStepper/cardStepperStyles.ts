import { cn } from '@/lib/clsx'

export const cardStepperStyles = {
  container: 'flex items-center gap-2',
  button: (disabled: boolean, className?: string) =>
    cn(
      'bg-grey-400 text-grey-700 hover:bg-grey-500 size-6 cursor-pointer rounded-sm disabled:cursor-not-allowed',
      disabled && 'border-grey-300 border-2 bg-white',
      className,
    ),
  icon: 'size-4',
  decreaseIcon: (disabled: boolean) =>
    cn('size-4', disabled ? 'text-grey-300' : 'text-grey-700'),
  value: 'w-6 text-center text-lg font-semibold text-neutral-900',
}
