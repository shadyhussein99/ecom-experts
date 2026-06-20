import { create } from 'zustand'
import {
  fetchProducts,
  MOCK_FETCH_CONFIG,
  type MockFetchConfig,
} from '@/mocks/fetchProducts'
import type { ProductsCatalog } from '@/types/product'

// Mocks a backend response for the product catalog: holds the loading/success/error
// state around fetchProducts, which delays and returns src/mocks/products.json.
export type MockResponseStatus = 'idle' | 'loading' | 'success' | 'error'

interface MockProductResponseState {
  data: ProductsCatalog | null
  status: MockResponseStatus
  error: string | null
  loadProducts: (config?: MockFetchConfig) => Promise<void>
}

export const useMockProductResponseStore = create<MockProductResponseState>(
  (set) => ({
    data: null,
    status: 'idle',
    error: null,
    loadProducts: async (config = MOCK_FETCH_CONFIG) => {
      set({ status: 'loading', error: null })
      try {
        const data = await fetchProducts(config)
        set({ data, status: 'success', error: null })
      } catch (error) {
        set({
          data: null,
          status: 'error',
          error: error instanceof Error ? error.message : 'Failed to load products',
        })
      }
    },
  }),
)
