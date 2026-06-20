import { useMemo } from 'react'
import {
  PLAN_PRICING,
  SHIPPING_PRICING,
  STATIC_SECTIONS,
} from '../staticSections'
import type { OrderItemViewModel } from '../types'
import { useOrderItems } from './useOrderItems'

interface OrderTotals {
  originalTotal: number
  finalTotal: number
  savings: number
}

interface PriceLine {
  original: number
  final: number
}

export const computeOrderTotals = (
  cameras: OrderItemViewModel[],
): OrderTotals => {
  const cameraLines: PriceLine[] = cameras.map(
    ({ unitPrice, unitOriginalPrice, quantity }) => ({
      original: (unitOriginalPrice ?? unitPrice) * quantity,
      final: unitPrice * quantity,
    }),
  )

  const staticLines: PriceLine[] = STATIC_SECTIONS.flatMap(({ items }) =>
    items.map(({ price = 0, originalPrice, isFree }) => ({
      original: originalPrice ?? price,
      final: isFree ? 0 : price,
    })),
  )

  const extraLines: PriceLine[] = [PLAN_PRICING, SHIPPING_PRICING].map(
    ({ originalPrice, price }) => ({ original: originalPrice, final: price }),
  )

  const lines = [...cameraLines, ...staticLines, ...extraLines]

  const originalTotal = lines.reduce((sum, line) => sum + line.original, 0)
  const finalTotal = lines.reduce((sum, line) => sum + line.final, 0)

  return { originalTotal, finalTotal, savings: originalTotal - finalTotal }
}

export const useOrderTotals = (): OrderTotals => {
  const cameras = useOrderItems()

  return useMemo(() => computeOrderTotals(cameras), [cameras])
}
