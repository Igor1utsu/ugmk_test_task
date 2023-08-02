import React, { useEffect, useState } from 'react'
import { productsAPI } from 'api'
import { Header } from 'components/ux'
import { ProductsBarChart } from './components'

const MainPage = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    productsAPI.getAll().then((data) => {
      setProducts(data)
    })
  }, [])

  return (
    <div className="container">
      <Header title={'MainPage'} />

      <main className="content">
        <ProductsBarChart data={products} />
      </main>
    </div>
  )
}

export default MainPage
