import { Button } from '@/components/atoms/button/Button'
import { ProductCard } from '@/components/organisms/productCard/ProductCard'
import { ProductCardSkeleton } from '@/components/organisms/productCard/components/productCardSkeleton/ProductCardSkeleton'
import { useMockProductResponseStore } from '@/store/mockProductResponse/mockProductResponseStore'
import type { SectionContentProps } from '@/pages/systemBuilder/builderSteps/types'
import { camerasSectionStyles } from './camerasSectionStyles'

const SKELETON_COUNT = 4

export const CamerasSection = ({
  nextSectionType,
  onNext,
}: SectionContentProps) => {
  const status = useMockProductResponseStore((state) => state.status)
  const cameras = useMockProductResponseStore((state) => state.data?.cameras)
  const loadProducts = useMockProductResponseStore(
    (state) => state.loadProducts,
  )

  const renderError = () => (
    <div className={camerasSectionStyles.errorWrapper}>
      <p className={camerasSectionStyles.errorText}>
        Couldn't load products. Please try again.
      </p>
      <Button variant="outline" onClick={() => loadProducts()}>
        Try again
      </Button>
    </div>
  )

  const renderSkeletons = () => (
    <div className={camerasSectionStyles.skeletonGrid}>
      {Array.from({ length: SKELETON_COUNT }, (_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  )

  const renderCameras = () => {
    const items = cameras ?? []
    const isOdd = items.length % 2 === 1

    return (
      <div className={camerasSectionStyles.content}>
        <div className={camerasSectionStyles.grid}>
          {items.map((camera, index) => {
            const centerLast = isOdd && index === items.length - 1

            return centerLast ? (
              <div
                key={camera.id}
                className={camerasSectionStyles.centeredLast}
              >
                <ProductCard product={camera} />
              </div>
            ) : (
              <ProductCard key={camera.id} product={camera} />
            )
          })}
        </div>
        <Button variant={'outline'} onClick={onNext}>
          Next: Choose your {nextSectionType}
        </Button>
      </div>
    )
  }

  const renderContent = () => {
    if (status === 'error') return renderError()
    if (status !== 'success') return renderSkeletons()
    return renderCameras()
  }

  return renderContent()
}
