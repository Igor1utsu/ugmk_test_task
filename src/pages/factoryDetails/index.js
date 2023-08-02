import React, { useEffect, useState } from 'react'
import { productsAPI } from 'api'
import { Header } from 'components/ux'
import { ProductsPieChart } from './components'

const FactoryDetails = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    productsAPI.getAll().then((data) => {
      setProducts(data)
    })
  }, [])

  return (
    <div className="container">
      <Header title="Factory Details" />
      <main className="content">
        <ProductsPieChart data={products} />
      </main>
    </div>
  )
}

export default FactoryDetails
