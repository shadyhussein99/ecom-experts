import type { ProductsCatalog } from '@/types/product'
import productsJson from './products.json'

// Mocks a backend response: returns the static products.json through a promise
// after an artificial delay, and can be forced to fail to exercise error states.
export interface MockFetchConfig {
  delayMs: number
  shouldFail: boolean
}

export const MOCK_FETCH_CONFIG: MockFetchConfig = {
  delayMs: 1500,
  shouldFail: false, // switch to true to simulate an error response and test error handling in the UI
}

export function fetchProducts(
  config: MockFetchConfig = MOCK_FETCH_CONFIG,
): Promise<ProductsCatalog> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (config.shouldFail) {
        reject(new Error('Failed to load products'))
        return
      }
      resolve(productsJson as ProductsCatalog)
    }, config.delayMs)
  })
}
