import { Skeleton } from '@/components/atoms/Skeleton'

export const OrderItemSkeleton = () => (
  <div className="flex items-center gap-3 py-2">
    <Skeleton className="size-12 shrink-0 rounded-lg" />

    <div className="flex-1">
      <Skeleton className="h-4 w-2/3" />
    </div>

    <Skeleton className="h-6 w-20" />
    <Skeleton className="h-4 w-12" />
  </div>
)
