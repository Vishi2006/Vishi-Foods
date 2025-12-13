import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import { AppProvider } from './context/AppContext'

const App = () => {
  return (
    <AppProvider>
      <div className="bg-[#0f1323] font-display text-white min-h-screen flex">
        <Sidebar />
        <main className="flex-1 ml-64">
          <Outlet />
        </main>
      </div>
    </AppProvider>
  )
}

export default App