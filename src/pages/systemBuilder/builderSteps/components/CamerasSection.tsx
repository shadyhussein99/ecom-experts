import { Button } from '@/components/atoms/button/Button'
import products from '@/mocks/products.json'
import { ProductCard } from '@/components/organisms/productCard/ProductCard'
import type { SectionContentProps } from '../types'

export const CamerasSection = ({
  nextSectionType,
  onNext,
}: SectionContentProps) => {
  const cameras = products.cameras
  const isOdd = cameras.length % 2 === 1

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        {cameras.map((camera, index) => {
          const centerLast = isOdd && index === cameras.length - 1

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
