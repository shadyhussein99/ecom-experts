import { cn } from '@/lib/clsx'

export const productCardStyles = {
  container: (isSelected: boolean) =>
    cn(
      'bg-card flex flex-col gap-6 rounded-2xl border p-3.5 shadow-sm sm:flex-row sm:items-start sm:gap-2 lg:flex-col lg:items-stretch lg:gap-6 xl:flex-row xl:items-start xl:gap-2',
      isSelected && 'border-primary border-2',
    ),
  imageColumn:
    'flex w-full max-w-full shrink-0 flex-col gap-3 px-0 sm:w-2/5 sm:max-w-fit lg:w-full lg:max-w-full xl:w-2/5 xl:max-w-fit',
  saleBadge:
    'bg-primary text-primary-foreground w-fit rounded-full px-2 py-0.5 text-xs font-semibold',
  imageWrapper:
    'flex w-full flex-1 items-center justify-center sm:w-fit lg:w-full xl:w-fit',
  image: 'max-h-32 w-auto max-w-full object-contain',
  body: 'flex flex-1 flex-col gap-3',
  titleBlock: 'flex flex-col gap-2',
  title: 'text-lg leading-none font-semibold text-neutral-900',
  description: 'text-foreground text-sm',
  learnMore:
    'text-primary font-semibold whitespace-nowrap underline underline-offset-2',
  footer: 'flex flex-wrap items-center justify-between gap-4',
}
