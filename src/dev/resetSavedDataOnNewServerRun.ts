// To reset the saved data in localStorage when the server restarts during development, we can store a unique identifier for each server run and compare it with the stored identifier in localStorage.
// If they differ, it means the server has restarted, and we can clear the relevant data from localStorage.

import { LOCAL_STORAGE_NAMES } from '@/constants/localStorageNames'

export const resetSavedDataIfNewServerRun = (runId: string): void => {
  try {
    if (localStorage.getItem(LOCAL_STORAGE_NAMES.DEV_SERVER_RUN_ID) === runId) {
      return
    }
    localStorage.removeItem(LOCAL_STORAGE_NAMES.SAVED_PRODUCTS)
    localStorage.setItem(LOCAL_STORAGE_NAMES.DEV_SERVER_RUN_ID, runId)
  } catch {
    return undefined
  }
}
