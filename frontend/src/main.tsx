import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Resume from './components/Resume'
import PdfRenderer from './components/PdfRenderer'
import NotFound from './components/NotFound'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/resume/michael-likouris/', element: <Resume /> },
  { path: '/pdf/michael-likouris', element: <PdfRenderer />},
  { path: '*', element: <NotFound /> }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
