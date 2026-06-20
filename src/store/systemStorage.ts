import type { productItem } from '@/store/productsStore'
import { LOCAL_STORAGE_NAMES } from '@/constants/localStorageNames'

type SavedProducts = Record<string, productItem>

const getStorage = (): Storage | null => {
  try {
    return typeof localStorage === 'undefined' ? null : localStorage
  } catch {
    return null
  }
}

const isValidEntry = (value: unknown): value is productItem => {
  if (typeof value !== 'object' || value === null) return false
  const entry = value as Record<string, unknown>
  return (
    typeof entry.productID === 'string' &&
    (entry.variantID === null || typeof entry.variantID === 'string') &&
    typeof entry.quantity === 'number' &&
    entry.quantity > 0
  )
}

export const loadSavedSystem = (): SavedProducts | null => {
  const storage = getStorage()
  if (!storage) return null

  const raw = storage.getItem(LOCAL_STORAGE_NAMES.SAVED_PRODUCTS)
  if (raw === null) return null

  try {
    const parsed: unknown = JSON.parse(raw)
    if (typeof parsed !== 'object' || parsed === null) return null

    const result: SavedProducts = {}
    for (const [key, value] of Object.entries(parsed)) {
      if (isValidEntry(value)) result[key] = value
    }
    return result
  } catch {
    return null
  }
}

export const persistSavedSystem = (products: SavedProducts): boolean => {
  const storage = getStorage()
  if (!storage) return false

  try {
    storage.setItem(
      LOCAL_STORAGE_NAMES.SAVED_PRODUCTS,
      JSON.stringify(products),
    )
    return true
  } catch {
    return false
  }
}
