/* Core */
import { createAsyncThunk } from '@reduxjs/toolkit'
import { ReduxDispatch, ReduxState } from './store'

/* Instruments */

/**
 * ? A utility function to create a typed Async Thunk Actions.
 */
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: ReduxState
  dispatch: ReduxDispatch
  rejectValue: string
}>()