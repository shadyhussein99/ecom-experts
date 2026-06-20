import { resetSavedDataIfNewServerRun } from '@/dev/resetSavedDataOnNewServerRun'

declare const __DEV_SERVER_RUN_ID__: string

if (import.meta.env.DEV) {
  resetSavedDataIfNewServerRun(__DEV_SERVER_RUN_ID__)
}
