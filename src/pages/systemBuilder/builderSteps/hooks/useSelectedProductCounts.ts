import { useMemo } from 'react'
import { useProductsStore } from '@/store/products/productsStore'
import type { productItem } from '@/store/products/productsStore'
import { useMockProductResponseStore } from '@/store/mockProductResponse/mockProductResponseStore'
import type { SectionType } from '../types'

export const countSelectedProductsBySection = (
  selectedProducts: Record<string, productItem>,
  sectionProductIDsMap: Partial<Record<SectionType, string[]>>,
): Partial<Record<SectionType, number>> => {
  const selectedProductIDs = new Set(
    Object.values(selectedProducts).map((item) => item.productID),
  )

  return Object.fromEntries(
    Object.entries(sectionProductIDsMap).map(([type, ids]) => [
      type,
      ids.filter((id) => selectedProductIDs.has(id)).length,
    ]),
  ) as Partial<Record<SectionType, number>>
}

export const useSelectedProductCounts = (): Partial<
  Record<SectionType, number>
> => {
  const selectedProducts = useProductsStore((state) => state.selectedProducts)
  const cameras = useMockProductResponseStore((state) => state.data?.cameras)

  return useMemo(() => {
    const sectionProductIDsMap: Partial<Record<SectionType, string[]>> = {
      cameras: (cameras ?? []).map((product) => product.id),
    }

    return countSelectedProductsBySection(selectedProducts, sectionProductIDsMap)
  }, [selectedProducts, cameras])
}
