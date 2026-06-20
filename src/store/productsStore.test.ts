import { beforeEach, describe, expect, it } from 'vitest'
import { useProductsStore } from '@/store/productsStore'

beforeEach(() => {
  useProductsStore.setState({ selectedProducts: {} })
})

describe('productsStore.setQuantity', () => {
  it('adds an item keyed by variant id', () => {
    useProductsStore
      .getState()
      .setQuantity({ productID: 'p1', variantID: 'v1' }, 2)

    expect(useProductsStore.getState().selectedProducts).toEqual({
      v1: { productID: 'p1', variantID: 'v1', quantity: 2 },
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
