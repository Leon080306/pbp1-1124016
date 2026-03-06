import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRoutes from './config/AppRoutes.tsx'
import { BrowserRouter } from 'react-router'
import { CssBaseline } from '@mui/material'
import { Layout } from './components/Layout.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssBaseline />
    <BrowserRouter>
      <Layout>
        <AppRoutes />
      </Layout>
    </BrowserRouter>
  </StrictMode>
)