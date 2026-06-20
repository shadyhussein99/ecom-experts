import { describe, expect, it } from 'vitest'
import type { OrderItemViewModel } from '../types'
import { computeOrderTotals } from './useOrderTotals'

const camera = (
  overrides: Partial<OrderItemViewModel>,
): OrderItemViewModel => ({
  key: 'k',
  productID: 'p',
  variantID: null,
  title: 'Camera',
  icon: 'icon.svg',
  unitPrice: 0,
  unitOriginalPrice: null,
  quantity: 1,
  ...overrides,
})

describe('computeOrderTotals', () => {
  it('sums the static sections, plan and shipping when there are no cameras', () => {
    const { originalTotal, finalTotal, savings } = computeOrderTotals([])

    expect(originalTotal).toBeCloseTo(150.84, 2)
    expect(finalTotal).toBeCloseTo(111.93, 2)
    expect(savings).toBeCloseTo(38.91, 2)
  })

  it('adds each camera line as unit price times quantity to the final total', () => {
    const base = computeOrderTotals([])
    const totals = computeOrderTotals([camera({ unitPrice: 10, quantity: 3 })])

    expect(totals.finalTotal - base.finalTotal).toBeCloseTo(30, 2)
  })

  it('uses the original unit price for the original total when on sale', () => {
    const base = computeOrderTotals([])
    const totals = computeOrderTotals([
      camera({ unitPrice: 10, unitOriginalPrice: 16, quantity: 2 }),
    ])

    expect(totals.originalTotal - base.originalTotal).toBeCloseTo(32, 2)
    expect(totals.finalTotal - base.finalTotal).toBeCloseTo(20, 2)
  })

  it('falls back to the unit price for the original total when not on sale', () => {
    const base = computeOrderTotals([])
    const totals = computeOrderTotals([
      camera({ unitPrice: 12, unitOriginalPrice: null, quantity: 1 }),
    ])

    expect(totals.originalTotal - base.originalTotal).toBeCloseTo(12, 2)
  })

  it('reports savings as original total minus final total', () => {
    const totals = computeOrderTotals([
      camera({ unitPrice: 10, unitOriginalPrice: 25, quantity: 2 }),
    ])

    expect(totals.savings).toBeCloseTo(
      totals.originalTotal - totals.finalTotal,
      2,
    )
  })
})
