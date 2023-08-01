import React, { useState, useEffect, useCallback } from 'react'
import { Bar } from 'react-chartjs-2'

import './style.css'

// 12 Месяцев
const MOUTHS = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
]

const ProductsBarChart = ({ data }) => {
  // Состояние для хранения данных диаграммы
  const [chartData, setChartData] = useState({})
  // Состояние для хранения значения фильтра продукции
  const [productFilter, setProductFilter] = useState(
    localStorage.getItem('productFilter') || 'all'
  )

  // Функция для фильтрации данных по продукции
  const filterData = (data, productFilter) => {
    let filteredData = data
    if (productFilter === 'product1') {
      filteredData = data?.map((row) => ({
        ...row,
        product2: null,
        product3: null,
      }))
    } else if (productFilter === 'product2') {
      filteredData = data?.map((row) => ({
        ...row,
        product1: null,
        product3: null,
      }))
    }
    return filteredData
  }
  // Функция для обработки данных
  const processData = useCallback(
    (data) => {
      // Фильтрация данных по продукции
      const filteredData = filterData(data, productFilter)
      // Получение списка месяцев из данных
      const months = [
        ...new Set(
          filteredData
            ?.map((row) => new Date(row.date).getMonth())
            .filter(Boolean)
        ),
      ]
      // Получение данных для фабрики А
      const factoryAData = months?.map((month) => {
        const rows = filteredData.filter(
          (row) =>
            new Date(row.date).getMonth() === month && row.factory_id === 1
        )
        return (
          rows.reduce((acc, row) => acc + row.product1 + row.product2, 0) / 1000
        )
      })
      // Получение данных для фабрики Б
      const factoryBData = months?.map((month) => {
        const rows = filteredData?.filter(
          (row) =>
            new Date(row.date).getMonth() === month && row.factory_id === 2
        )
        return (
          rows.reduce((acc, row) => acc + row.product1 + row.product2, 0) / 1000
        )
      })
      return { months, factoryAData, factoryBData }
    },
    [productFilter]
  )

  // Обновление данных диаграммы при изменении пропса data
  useEffect(() => {
    const { factoryAData, factoryBData } = processData(data)
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
  }, [data, processData])

  // Обработчик изменения значения фильтра продукции
  const handleProductFilterChange = (event) => {
    setProductFilter(event.target.value)
    localStorage.setItem('productFilter', event.target.value)
    const { factoryAData, factoryBData } = processData(data)
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
