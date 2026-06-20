import { create } from 'zustand'

export interface productItem {
  productID: string
  variantID: string | null
  quantity: number
}

interface ProductsState {
  selectedProducts: Record<string, productItem>
  setQuantity: (
    target: { productID: string; variantID: string | null },
    quantity: number,
  ) => void
}

export const useProductsStore = create<ProductsState>((set) => ({
  selectedProducts: {},
  setQuantity: ({ productID, variantID }, quantity) =>
    set((state) => {
      const key = variantID ?? productID
      const selectedProducts = { ...state.selectedProducts }
      if (quantity <= 0) {
        delete selectedProducts[key]
      } else {
        selectedProducts[key] = { productID, variantID, quantity }
      }
      return { selectedProducts }
    }),
}))
