import { createStore } from '@reatom/core'
import { reatomContext } from '@reatom/react'
import { FC } from 'react'
export const ReatomProvider: FC = ({children}) => {
  const store = createStore()
  return <reatomContext.Provider value={store}>{children}</reatomContext.Provider>
}