import { Skeleton } from '@/components/atoms/Skeleton'

export const ProductCardSkeleton = () => (
  <div className="bg-card flex flex-col gap-6 rounded-2xl border p-3.5 shadow-sm sm:flex-row sm:items-start sm:gap-2">
    <div className="shrink-0 sm:w-2/5">
      <Skeleton className="h-36 w-full rounded-xl sm:h-48" />
    </div>

    <div className="flex flex-1 flex-col gap-3">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      <div className="flex gap-2">
        <Skeleton className="size-6 h-6 w-12" />
        <Skeleton className="size-6 h-6 w-12" />
        <Skeleton className="size-6 h-6 w-12" />
      </div>

      <div className="flex items-center justify-between gap-4">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-16" />
      </div>
    </div>
  </div>
)
