import { Button } from '@/components/atoms/button/Button'
import { ProductCard } from '@/components/organisms/productCard/ProductCard'
import { ProductCardSkeleton } from '@/components/organisms/productCard/components/ProductCardSkeleton'
import { useMockProductResponseStore } from '@/store/mockProductResponse/mockProductResponseStore'
import type { SectionContentProps } from '../types'

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
    <div className="flex flex-col items-center justify-center gap-4 py-8">
      <p className="text-foreground text-center">
        Couldn't load products. Please try again.
      </p>
      <Button variant="outline" onClick={() => loadProducts()}>
        Try again
      </Button>
    </div>
  )

  const renderSkeletons = () => (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
      {Array.from({ length: SKELETON_COUNT }, (_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  )

  const renderCameras = () => {
    const items = cameras ?? []
    const isOdd = items.length % 2 === 1

    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
          {items.map((camera, index) => {
            const centerLast = isOdd && index === items.length - 1

            return centerLast ? (
              <div
                key={camera.id}
                className="sm:col-span-2 sm:w-[calc(50%-0.5rem)] sm:justify-self-center"
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
