import { cn } from '@/lib/clsx'

export const builderStepsStyles = {
  container: 'flex flex-col',
  section: (isOpen: boolean) =>
    cn(isOpen && 'bg-secondary px-4', 'rounded-lg p-2'),
  stepLabel: 'text-foreground pt-2.5 pb-1 text-xs',
}
