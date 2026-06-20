import { useMemo } from 'react'
import products from '@/mocks/products.json'
import { useProductsStore } from '@/store/products/productsStore'
import type { productItem } from '@/store/products/productsStore'
import type { Product } from '@/types/product'
import type { OrderItemViewModel } from '../types'

// Resolves the selected products in the store to a format suitable for display in the order summary, including details like title, icon, price and quantity.
export const resolveOrderItems = (
  selectedProducts: Record<string, productItem>,
  productsToResolve: Product[],
): OrderItemViewModel[] => {
  const productByID = new Map(
    productsToResolve.map((product) => [product.id, product]),
  )

  return Object.values(selectedProducts).reduce<OrderItemViewModel[]>(
    (items, { productID, variantID, quantity }) => {
      const product = productByID.get(productID)
      if (!product) return items

      const variant = variantID
        ? product.variants?.find((v) => v.id === variantID)
        : undefined

      items.push({
        key: variantID ?? productID,
        productID,
        variantID,
        title: product.title,
        icon: variant?.image ?? product.image,
        unitPrice: Number(product.price),
        unitOriginalPrice: product.sale
          ? Number(product.sale.originalPrice)
          : null,
        quantity,
      })
      return items
    },
    [],
  )
}

export const useOrderItems = (): OrderItemViewModel[] => {
  const selectedProducts = useProductsStore((state) => state.selectedProducts)

  return useMemo(
    () => resolveOrderItems(selectedProducts, products.cameras),
    [selectedProducts],
  )
}
