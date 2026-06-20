import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { loadSavedSystem, persistSavedSystem } from './systemStorage'
import { LOCAL_STORAGE_NAMES } from '@/constants/localStorageNames'

const createMemoryStorage = () => {
  const store = new Map<string, string>()
  return {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => store.set(key, value),
    removeItem: (key: string) => store.delete(key),
    clear: () => store.clear(),
  }
}

beforeEach(() => {
  vi.stubGlobal('localStorage', createMemoryStorage())
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('systemStorage', () => {
  it('round-trips a saved system', () => {
    const products = {
      '1-1': { productID: '1', variantID: '1-1', quantity: 1 },
      '2-1': { productID: '2', variantID: '2-1', quantity: 2 },
    }

    expect(persistSavedSystem(products)).toBe(true)
    expect(loadSavedSystem()).toEqual(products)
  })

  it('returns null when nothing has been saved', () => {
    expect(loadSavedSystem()).toBeNull()
  })

  it('restores a saved-but-empty system as an empty record, not null', () => {
    persistSavedSystem({})

    expect(loadSavedSystem()).toEqual({})
  })

  it('returns null when localStorage is unavailable', () => {
    vi.stubGlobal('localStorage', undefined)

    expect(loadSavedSystem()).toBeNull()
  })

  it('returns null when the stored value is not valid JSON', () => {
    localStorage.setItem(LOCAL_STORAGE_NAMES.SAVED_PRODUCTS, '{not json')

    expect(loadSavedSystem()).toBeNull()
  })

  it('returns null when the stored root is not an object', () => {
    localStorage.setItem(LOCAL_STORAGE_NAMES.SAVED_PRODUCTS, '"a string"')

    expect(loadSavedSystem()).toBeNull()
  })

  it('drops malformed entries and keeps the valid ones', () => {
    localStorage.setItem(
      LOCAL_STORAGE_NAMES.SAVED_PRODUCTS,
      JSON.stringify({
        '1-1': { productID: '1', variantID: '1-1', quantity: 1 },
        missingProductID: { variantID: 'x', quantity: 2 },
        zeroQuantity: { productID: '3', variantID: null, quantity: 0 },
        notAnObject: 'nope',
      }),
    )

    expect(loadSavedSystem()).toEqual({
      '1-1': { productID: '1', variantID: '1-1', quantity: 1 },
    })
  })

  it('keeps entries with a null variantID', () => {
    const products = {
      '3': { productID: '3', variantID: null, quantity: 4 },
    }
    persistSavedSystem(products)

    expect(loadSavedSystem()).toEqual(products)
  })

  it('returns false when writing to storage throws', () => {
    vi.stubGlobal('localStorage', {
      getItem: () => null,
      setItem: () => {
        throw new Error('failed to write to local storage')
      },
      removeItem: () => {},
    })

    expect(
      persistSavedSystem({
        a: { productID: 'a', variantID: null, quantity: 1 },
      }),
    ).toBe(false)
  })
})
