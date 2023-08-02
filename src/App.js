import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js'
import { MainLayout } from 'components/layouts'

Chart.register(CategoryScale)

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<MainLayout />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
