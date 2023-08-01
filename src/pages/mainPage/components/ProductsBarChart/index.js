import React, { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import { useProcessData } from 'hooks'
import { MOUTHS } from 'constants/chart'

import './style.css'

const ProductsBarChart = ({ data }) => {
  // Состояние для хранения данных диаграммы
  const [chartData, setChartData] = useState({})
  // Состояние для хранения значения фильтра продукции
  const [productFilter, setProductFilter] = useState(
    localStorage.getItem('productFilter') || 'all'
  )

  const { factoryAData, factoryBData } = useProcessData({ data, productFilter })

  // Обновление данных диаграммы при изменении пропса data
  useEffect(() => {
    setChartData({
      labels: MOUTHS,
      datasets: [
        {
          label: 'Фабрика А',
          data: factoryAData,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
        {
          label: 'Фабрика Б',
          data: factoryBData,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    })
  }, [data, factoryAData, factoryBData ])

  // Обработчик изменения значения фильтра продукции
  const handleProductFilterChange = (event) => {
    setProductFilter(event.target.value)
    localStorage.setItem('productFilter', event.target.value)
    setChartData({
      ...chartData,
      datasets: [
        { ...chartData.datasets[0], data: factoryAData },
        { ...chartData.datasets[1], data: factoryBData },
      ],
    })
  }

  return (
    <div className="products-bar-wrapper">
      <div>
        <label htmlFor="product-filter">Фильтр продукции:</label>
        <select value={productFilter} onChange={handleProductFilterChange}>
          <option value="all">Все</option>
          <option value="product1">Продукт 1</option>
          <option value="product2">Продукт 2</option>
        </select>
      </div>
      {chartData?.datasets?.length && <Bar data={chartData} />}
    </div>
  )
}

export default ProductsBarChart
