import { create } from 'zustand'
import { loadSavedSystem, persistSavedSystem } from '@/store/systemStorage'

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
  saveForLater: () => boolean
}

export const DEFAULT_SELECTED_PRODUCTS: Record<string, productItem> = {
  '1-1': { productID: '1', variantID: '1-1', quantity: 1 },
  '2-1': { productID: '2', variantID: '2-1', quantity: 2 },
}

export const getInitialSelectedProducts = (): Record<string, productItem> =>
  loadSavedSystem() ?? DEFAULT_SELECTED_PRODUCTS

export const useProductsStore = create<ProductsState>((set, get) => ({
  selectedProducts: getInitialSelectedProducts(),
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
  saveForLater: () => persistSavedSystem(get().selectedProducts),
}))
