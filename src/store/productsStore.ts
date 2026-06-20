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
  selectedProducts: {
    '1-1': { productID: '1', variantID: '1-1', quantity: 1 },
    '2-1': { productID: '2', variantID: '2-1', quantity: 2 },
    '4': { productID: '4', variantID: null, quantity: 1 },
  },
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
