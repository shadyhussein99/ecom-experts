import { cn } from '@/lib/clsx'

export const accordionStyles = {
  root: (isOpen: boolean) =>
    cn('border-foreground border-t-[0.5px]', !isOpen && 'border-b-[0.5px]'),
  trigger: (isOpen: boolean) =>
    cn(
      'flex w-full cursor-pointer items-center gap-4 pt-3 text-left',
      isOpen ? 'pb-6' : 'pb-3',
    ),
  icon: 'size-5 object-contain',
  title: 'flex-1 text-xl font-semibold',
  count: (isOpen: boolean) => cn(!isOpen && 'sm:hidden'),
  countSkeleton: 'h-4 w-16',
  countText: 'text-primary text-base font-medium whitespace-nowrap',
  chevron: (isOpen: boolean) =>
    cn(
      'size-3 object-contain transition-transform duration-200',
      isOpen && 'rotate-180',
    ),
  panel: (isOpen: boolean) =>
    cn(
      'grid transition-[grid-template-rows] duration-200 ease-out',
      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
    ),
  panelInner: 'overflow-hidden',
  panelContent: 'pb-5',
}
