import { describe, expect, it } from 'vitest'
import type { Product } from '@/types/product'
import type { productItem } from '@/store/productsStore'
import { resolveOrderItems } from './useOrderItems'

const withVariants: Product = {
  id: '1',
  title: 'Wyze Cam V4',
  description: '',
  variants: [
    { id: '1-1', color: 'White', image: '/white.svg' },
    { id: '1-2', color: 'Black', image: '/black.svg' },
  ],
  sale: { discount: '22%', originalPrice: '35.98' },
  price: '27.98',
  image: '/product-one.png',
}

const noVariants: Product = {
  id: '4',
  title: 'Wyze Duo Cam Doorbell',
  description: '',
  variants: null,
  sale: null,
  price: '69.98',
  image: '/product-four.png',
}

const variantNoIcon: Product = {
  id: '9',
  title: 'No Icon Variant',
  description: '',
  variants: [{ id: '9-1', color: 'White', image: null }],
  sale: null,
  price: '10.00',
  image: '/product-nine.png',
}

describe('resolveOrderItems', () => {
  it('uses the selected variant icon and parses prices for a product with variants', () => {
    const selected: Record<string, productItem> = {
      '1-2': { productID: '1', variantID: '1-2', quantity: 2 },
    }

    expect(resolveOrderItems(selected, [withVariants])).toEqual([
      {
        key: '1-2',
        productID: '1',
        variantID: '1-2',
        title: 'Wyze Cam V4',
        icon: '/black.svg',
        unitPrice: 27.98,
        unitOriginalPrice: 35.98,
        quantity: 2,
      },
    ])
  })

  it('uses the product image and null original price for a product without variants', () => {
    const selected: Record<string, productItem> = {
      '4': { productID: '4', variantID: null, quantity: 1 },
    }

    expect(resolveOrderItems(selected, [noVariants])).toEqual([
      {
        key: '4',
        productID: '4',
        variantID: null,
        title: 'Wyze Duo Cam Doorbell',
        icon: '/product-four.png',
        unitPrice: 69.98,
        unitOriginalPrice: null,
        quantity: 1,
      },
    ])
  })

  it('falls back to the product image when the variant icon is missing', () => {
    const selected: Record<string, productItem> = {
      '9-1': { productID: '9', variantID: '9-1', quantity: 1 },
    }

    expect(resolveOrderItems(selected, [variantNoIcon])[0].icon).toBe(
      '/product-nine.png',
    )
  })

  it('skips selected entries that do not resolve to a product', () => {
    const selected: Record<string, productItem> = {
      x: { productID: 'x', variantID: null, quantity: 1 },
    }

    expect(resolveOrderItems(selected, [withVariants])).toEqual([])
  })
})
