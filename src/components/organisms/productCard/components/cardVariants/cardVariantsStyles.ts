import { cn } from '@/lib/clsx'

export const cardVariantsStyles = {
  container: 'flex flex-wrap gap-2',
  option: (isSelected: boolean) =>
    cn(
      'flex cursor-pointer items-center gap-2 rounded-[4px] border px-2 py-0.5 text-xs transition-colors',
      isSelected
        ? 'border-success text-secondary-foreground bg-green-100'
        : 'border-border bg-background text-foreground hover:bg-grey-200',
    ),
  image: 'size-7 object-contain',
}
