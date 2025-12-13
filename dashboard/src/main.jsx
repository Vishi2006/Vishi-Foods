import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import OrderManagement from './components/Order.jsx'
import History from './components/History.jsx'
import Inventory from './components/Inventory.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <OrderManagement />
      },
      {
        path: 'history',
        element: <History />
      },
      {
        path: 'inventory',
        element: <Inventory />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
