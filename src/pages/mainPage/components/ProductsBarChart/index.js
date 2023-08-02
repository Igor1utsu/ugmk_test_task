import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bar, getElementAtEvent } from 'react-chartjs-2'
import { useProcessData } from 'hooks'
import {
  MONTHS,
  factoryACommonDataset,
  factoryBCommonDataset,
} from 'constants/chart'

import './style.css'

const ProductsBarChart = ({ data }) => {
  const navigate = useNavigate()

  const chartRef = useRef()

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

  const handleClickItem = (event) => {
    const elem = getElementAtEvent(chartRef.current, event)

    const barIndex = elem[0]?.index
    const stackIndex = elem[0]?.datasetIndex

    if (typeof barIndex !== 'undefined' && typeof stackIndex !== 'undefined') {
      const monthNum = barIndex + 1
      const factoryId = stackIndex === 0 ? 1 : 2

      navigate(`/details/${factoryId}/${monthNum}`)
    }
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
      {chartData && (
        <Bar data={chartData} ref={chartRef} onClick={handleClickItem} />
      )}
    </div>
  )
}

export default ProductsBarChart
