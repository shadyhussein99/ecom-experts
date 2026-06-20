import { cn } from '@/lib/clsx'

interface SkeletonProps {
  className?: string
}

export const Skeleton = ({ className }: SkeletonProps) => (
  <div className={cn('bg-grey-300 animate-pulse rounded', className)} />
)
