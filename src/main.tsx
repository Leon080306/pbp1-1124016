import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRoutes from './config/AppRoutes.tsx'
import { BrowserRouter } from 'react-router'
import { CssBaseline } from '@mui/material'
import { Layout } from './components/Layout.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssBaseline />
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <AppRoutes />
        </Layout>
      </BrowserRouter>
    </Provider>
  </StrictMode>
)