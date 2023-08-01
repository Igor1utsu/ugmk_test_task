import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { FactoryDetails, MainPage } from 'pages'

const MainLayout = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}></Route>
      <Route path="details/:id/:month" element={<FactoryDetails />}></Route>
    </Routes>
  )
}

export default MainLayout
