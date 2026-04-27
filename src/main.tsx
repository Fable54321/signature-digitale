import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from '../src/App/000--App/App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ForeignWorkerProvider } from './Contexts/ForeignWorkerContext'
import ContractPage from './App/100--ContractPage/ContractPage'
import Admin from './App/200--Admin/Admin'
import { AuthProvider } from './Contexts/AuthContext'
import ProtectedRoute from './Components/ProtectedRoute'
import VisitorsMainPage from './App/5000--VisitorsSection/100--VisitorsMainPage/VisitorsMainPage'


const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
    <App />
    </ProtectedRoute>
    )
    ,
  
  },
  {
    path: '/contrat',
    element: (
      <ProtectedRoute>
    <ContractPage />
    </ProtectedRoute>
  ),
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
    <Admin />
    </ProtectedRoute>
  ),
  },
  {
    path: '/visiteurs',
    element: (
      <ProtectedRoute>
    <VisitorsMainPage />
    </ProtectedRoute>
  ),
  },

])



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
    <ForeignWorkerProvider>
    <RouterProvider router={router} />
    </ForeignWorkerProvider>
    </AuthProvider>
  </StrictMode>,
)
