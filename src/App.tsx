import { Router } from '@/router'
import { AuthProvider } from '@/assets/isAuthContext'
import { Provider } from 'react-redux'
import { store } from '@/services/store'

export function App() {
  // Todo удалить Auth Provider
  return (
    <AuthProvider>
      <Provider store={store}>
        <Router />
      </Provider>
    </AuthProvider>
  )
}
