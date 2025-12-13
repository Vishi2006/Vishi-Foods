import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import Cart from './components/Cart.jsx'
import Items from './components/Items.jsx'
import { CartProvider } from './context/CartContext.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/table/1" replace />
  },
  {
    path: '/table/:tableId',
    element: <Items/>
  },
  {
    path: '/table/:tableId/cart',
    element: <Cart/>
  },
  {
    path: '*',
    element: <div className="flex items-center justify-center h-screen bg-[#0f1323] text-white">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Table Not Found</h1>
        <p className="text-white/50">Please scan a valid QR code</p>
      </div>
    </div>
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>,
)
