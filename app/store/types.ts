// app/store/types.ts
import {ThunkDispatch, UnknownAction} from '@reduxjs/toolkit'

export type CreateStoreReturn = ReturnType<typeof import('./index').createStore>

export type AppState = ReturnType<CreateStoreReturn['getState']>
export type AppDispatch = ThunkDispatch<AppState, undefined, UnknownAction>
