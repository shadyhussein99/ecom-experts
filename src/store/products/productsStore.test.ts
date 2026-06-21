import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  DEFAULT_SELECTED_PRODUCTS,
  getInitialSelectedProducts,
  useProductsStore,
} from './productsStore'
import { loadSavedSystem } from './systemStorage'

const createMemoryStorage = () => {
  const store = new Map<string, string>()
  return {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => store.set(key, value),
    removeItem: (key: string) => store.delete(key),
  }
}

beforeEach(() => {
  vi.stubGlobal('localStorage', createMemoryStorage())
  useProductsStore.setState({ selectedProducts: {} })
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('productsStore.setQuantity', () => {
  it('adds an item keyed by variant id', () => {
    useProductsStore
      .getState()
      .setQuantity({ productID: 'p1', variantID: 'v1' }, 2)

    expect(useProductsStore.getState().selectedProducts).toEqual({
      v1: { productID: 'p1', variantID: 'v1', quantity: 3 },
    })
  })

  it('keys by product id when the product has no variant', () => {
    useProductsStore
      .getState()
      .setQuantity({ productID: 'p1', variantID: null }, 3)

    expect(useProductsStore.getState().selectedProducts).toEqual({
      p1: { productID: 'p1', variantID: null, quantity: 3 },
    })
  })

  it('overwrites the quantity for an existing key', () => {
    const { setQuantity } = useProductsStore.getState()
    setQuantity({ productID: 'p1', variantID: 'v1' }, 2)
    setQuantity({ productID: 'p1', variantID: 'v1' }, 5)

    expect(useProductsStore.getState().selectedProducts).toEqual({
      v1: { productID: 'p1', variantID: 'v1', quantity: 5 },
    })
  })

  it('removes the item when quantity is zero', () => {
    const { setQuantity } = useProductsStore.getState()
    setQuantity({ productID: 'p1', variantID: 'v1' }, 2)
    setQuantity({ productID: 'p1', variantID: 'v1' }, 0)

    expect(useProductsStore.getState().selectedProducts).toEqual({})
  })
})

describe('getInitialSelectedProducts', () => {
  it('falls back to the default seed when nothing is saved', () => {
    expect(getInitialSelectedProducts()).toEqual(DEFAULT_SELECTED_PRODUCTS)
  })

  it('restores a saved system', () => {
    const saved = {
      v1: { productID: 'p1', variantID: 'v1', quantity: 3 },
    }
    localStorage.setItem('savedProducts', JSON.stringify(saved))

    expect(getInitialSelectedProducts()).toEqual(saved)
  })

  it('restores a saved-but-empty system instead of the default seed', () => {
    localStorage.setItem('savedProducts', JSON.stringify({}))

    expect(getInitialSelectedProducts()).toEqual({})
  })
})

describe('productsStore.saveForLater', () => {
  it('persists the current selection and reports success', () => {
    const { setQuantity, saveForLater } = useProductsStore.getState()
    setQuantity({ productID: 'p1', variantID: 'v1' }, 2)

    expect(saveForLater()).toBe(true)
    expect(loadSavedSystem()).toEqual({
      v1: { productID: 'p1', variantID: 'v1', quantity: 2 },
    })
  })
})
