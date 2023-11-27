import { Provider } from 'react-redux'

import { Router } from '@/router'
import { store } from '@/services/decks/store'

export function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  )
}
