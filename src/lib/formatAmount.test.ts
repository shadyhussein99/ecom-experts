import { describe, expect, it } from 'vitest'
import { formatAmount } from '@/lib/formatAmount'

describe('formatAmount', () => {
  it('keeps two decimal places for whole numbers', () => {
    expect(formatAmount(56)).toBe('56.00')
  })

  it('leaves existing two decimals unchanged', () => {
    expect(formatAmount(27.98)).toBe('27.98')
  })

  it('pads a single decimal to two places', () => {
    expect(formatAmount(55.9)).toBe('55.90')
  })

  it('rounds to the nearest two decimals', () => {
    expect(formatAmount(55.956)).toBe('55.96')
    expect(formatAmount(55.954)).toBe('55.95')
  })
})
