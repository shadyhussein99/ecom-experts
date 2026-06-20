import { useMemo } from 'react'
import products from '@/mocks/products.json'
import { useProductsStore } from '@/store/products/productsStore'
import type { productItem } from '@/store/products/productsStore'
import type { SectionType } from '../types'

const sectionProductIDs: Partial<Record<SectionType, string[]>> = {
  cameras: products.cameras.map((product) => product.id),
}

export const countSelectedProductsBySection = (
  selectedProducts: Record<string, productItem>,
  sectionProductIDsMap: Partial<
    Record<SectionType, string[]>
  > = sectionProductIDs,
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

  return useMemo(
    () => countSelectedProductsBySection(selectedProducts),
    [selectedProducts],
  )
}
