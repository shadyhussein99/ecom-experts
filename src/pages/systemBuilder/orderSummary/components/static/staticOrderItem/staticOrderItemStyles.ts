import { cn } from '@/lib/clsx'

export const staticOrderItemStyles = {
  row: 'flex items-center gap-3 py-2',
  iconWrapper:
    'bg-background flex size-12 shrink-0 items-center justify-center rounded-lg p-1 shadow-sm',
  icon: 'max-h-full w-auto object-contain',
  title: 'flex-1 text-sm font-semibold text-neutral-900',
  stepper: (isFree?: boolean) =>
    cn(
      isFree
        ? 'bg-grey-400 border-grey-500 cursor-not-allowed border-2'
        : 'bg-white',
    ),
  priceBlock: 'flex flex-col items-end leading-tight',
  originalPrice: 'text-grey-600 text-sm line-through',
  price: 'text-primary text-sm font-semibold',
}
