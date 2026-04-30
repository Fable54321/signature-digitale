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
import ChecklistBox from './App/5000--VisitorsSection/100--VisitorsMainPage/101--ChecklistBox/ChecklistBox'
import VisitorsHome from './App/5000--VisitorsSection/100--VisitorsMainPage/1001--VisitorsHome/VisitorsHome'
import DeparturePage from './App/5000--VisitorsSection/100--VisitorsMainPage/102--DeparturePage/DeparturePage'
import { VisitorsProvider } from './App/5000--VisitorsSection/Contexts/VisitorsContext/VisitorsProvider'
import SitesPlan from './App/5000--VisitorsSection/100--VisitorsMainPage/103--SitesPlan/SitesPlan'


const generateToken = () => {
  return crypto.randomUUID();
};


const token = generateToken();    

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
    <VisitorsProvider>
       <VisitorsMainPage token={token} />
    </VisitorsProvider>
  </ProtectedRoute>
  ),
  children : [
    {
      index: true,
      element: (
        <ProtectedRoute>
        <VisitorsHome />
        </ProtectedRoute>
      )
    },
    {
      path: '/visiteurs/arrivee',
      element: (
        <ProtectedRoute>
      <ChecklistBox />
      </ProtectedRoute>
      ),
  },
  {
    path: '/visiteurs/depart',
    element: (
      <ProtectedRoute>
      <DeparturePage />
      </ProtectedRoute>
    ),
  }
]
  },
  {
    path: '/plan-du-site/:token',
    element: <SitesPlan />
  }

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
