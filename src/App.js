import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainLayout } from 'components/layouts'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
