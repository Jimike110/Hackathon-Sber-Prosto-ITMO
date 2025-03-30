// app/ui/containers/store-provide/index.tsx
'use client'
import {type ReactNode} from 'react'
import {Provider} from 'react-redux'
import {store, persistor} from '@/app/store'
import {PersistGate} from 'redux-persist/integration/react'

interface Props {
  readonly children: ReactNode
}

export function StoreProvider({ children }: Props) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  )
}
