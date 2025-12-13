import React from 'react'
import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <div className="bg-[#0f1323] font-display text-white min-h-screen">
      <Outlet />
    </div>
  )
}

export default App
