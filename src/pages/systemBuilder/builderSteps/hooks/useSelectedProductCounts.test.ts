import { describe, expect, it } from 'vitest'
import type { productItem } from '@/store/products/productsStore'
import type { SectionType } from '../types'
import { countSelectedProductsBySection } from './useSelectedProductCounts'

const sectionMap: Partial<Record<SectionType, string[]>> = {
  cameras: ['1', '2', '3'],
  sensors: ['10', '11'],
}

describe('countSelectedProductsBySection', () => {
  it('counts distinct selected products per section', () => {
    const selected: Record<string, productItem> = {
      '1-1': { productID: '1', variantID: '1-1', quantity: 1 },
      '2-1': { productID: '2', variantID: '2-1', quantity: 2 },
      '10': { productID: '10', variantID: null, quantity: 1 },
    }

    expect(countSelectedProductsBySection(selected, sectionMap)).toEqual({
      cameras: 2,
      sensors: 1,
    })
  })

  it('counts a product once when several of its variants are selected', () => {
    const selected: Record<string, productItem> = {
      '1-1': { productID: '1', variantID: '1-1', quantity: 1 },
      '1-2': { productID: '1', variantID: '1-2', quantity: 3 },
      '1-3': { productID: '1', variantID: '1-3', quantity: 1 },
    }

    expect(countSelectedProductsBySection(selected, sectionMap)).toEqual({
      cameras: 1,
      sensors: 0,
    })
  })

  it('returns zero for sections with nothing selected', () => {
    expect(countSelectedProductsBySection({}, sectionMap)).toEqual({
      cameras: 0,
      sensors: 0,
    })
  })
})
