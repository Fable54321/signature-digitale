import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from '../src/App/000--App/App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ForeignWorkerProvider } from './Contexts/ForeignWorkerContext'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  
  }
])



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ForeignWorkerProvider>
    <RouterProvider router={router} />
    </ForeignWorkerProvider>
  </StrictMode>,
)
