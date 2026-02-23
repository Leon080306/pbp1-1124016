import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRoutes from './Config/AppRoutes.tsx'
import { BrowserRouter } from 'react-router'
import { CssBaseline } from '@mui/material'
import { Layout } from './Components/Layout.tsx'

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