import { Skeleton } from '@/components/atoms/Skeleton'
import { orderItemSkeletonStyles } from './orderItemSkeletonStyles'

export const OrderItemSkeleton = () => (
  <div className={orderItemSkeletonStyles.row}>
    <Skeleton className={orderItemSkeletonStyles.avatar} />

    <div className={orderItemSkeletonStyles.titleWrapper}>
      <Skeleton className={orderItemSkeletonStyles.title} />
    </div>

    <Skeleton className={orderItemSkeletonStyles.stepper} />
    <Skeleton className={orderItemSkeletonStyles.price} />
  </div>
)
