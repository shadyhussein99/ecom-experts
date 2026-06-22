import { Skeleton } from '@/components/atoms/Skeleton'
import { productCardSkeletonStyles } from './productCardSkeletonStyles'

export const ProductCardSkeleton = () => (
  <div className={productCardSkeletonStyles.card}>
    <div className={productCardSkeletonStyles.imageColumn}>
      <Skeleton className={productCardSkeletonStyles.image} />
    </div>

    <div className={productCardSkeletonStyles.body}>
      <div className={productCardSkeletonStyles.titleBlock}>
        <Skeleton className={productCardSkeletonStyles.titleLine} />
        <Skeleton className={productCardSkeletonStyles.line} />
        <Skeleton className={productCardSkeletonStyles.lineShort} />
      </div>

      <div className={productCardSkeletonStyles.variantsRow}>
        <Skeleton className={productCardSkeletonStyles.variant} />
        <Skeleton className={productCardSkeletonStyles.variant} />
        <Skeleton className={productCardSkeletonStyles.variant} />
      </div>

      <div className={productCardSkeletonStyles.footer}>
        <Skeleton className={productCardSkeletonStyles.footerLeft} />
        <Skeleton className={productCardSkeletonStyles.footerRight} />
      </div>
    </div>
  </div>
)
