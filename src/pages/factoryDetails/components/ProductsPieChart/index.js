import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Pie } from 'react-chartjs-2'
import { useProductsDataCalc } from 'hooks'
import { MONTHS, FACTORIES, productsCommonDataset } from 'constants/chart'

import './style.css'

const ProductsPieChart = ({ data }) => {
  const { id, month } = useParams()

  const factoryId = Number(id)
  const monthNumber = Number(month)
  const factoryText = FACTORIES[factoryId - 1]
  const monthText = MONTHS[monthNumber - 1].toLowerCase()

  const [chartData, setChartData] = useState(null)

  const { productsType1, productsType2 } = useProductsDataCalc({
    data,
    factoryId,
    monthNumber,
  })

  const options = {
    plugins: {
      title: {
        display: true,
        text: `Производство продукции на ${factoryText} за ${monthText}`,
      },
    },
  }

  useEffect(() => {
    setChartData({
      labels: ['Продукт 1', 'Продукт 2'],
      datasets: [
        {
          ...productsCommonDataset,
          data: [productsType1, productsType2],
        },
      ],
    })
  }, [productsType1, productsType2])

  return (
    <div className="product-pie-wrapper">
      {chartData && <Pie data={chartData} options={options} />}
    </div>
  )
}

export default ProductsPieChart
