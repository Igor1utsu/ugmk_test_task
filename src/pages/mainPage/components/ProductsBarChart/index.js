import React, { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'
import { useProcessData } from 'hooks'
import {
  MONTHS,
  factoryACommonDataset,
  factoryBCommonDataset,
} from 'constants/chart'

import './style.css'

const ProductsBarChart = ({ data }) => {
  // Состояние для хранения данных диаграммы
  const [chartData, setChartData] = useState(null)
  // Состояние для хранения значения фильтра продукции
  const [productFilter, setProductFilter] = useState(
    localStorage.getItem('productFilter') || 'all'
  )

  const { factoryAData, factoryBData } = useProcessData({ data, productFilter })

  // Обновление данных диаграммы при изменении пропса data
  useEffect(() => {
    setChartData({
      labels: MONTHS,
      datasets: [
        {
          ...factoryACommonDataset,
          data: factoryAData,
        },
        {
          ...factoryBCommonDataset,
          data: factoryBData,
        },
      ],
    })
  }, [data, factoryAData, factoryBData])

  // Обработчик изменения значения фильтра продукции
  const handleProductFilterChange = (event) => {
    const value = event.target.value
    setProductFilter(value)
    localStorage.setItem('productFilter', value)
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
      {chartData && <Bar data={chartData} />}
    </div>
  )
}

export default ProductsBarChart
