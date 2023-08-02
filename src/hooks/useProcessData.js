import { useEffect, useState } from 'react'
import { filterData } from 'utils'

export const useProcessData = ({ data, productFilter }) => {
  const [factoryAData, setFactoryAData] = useState([])
  const [factoryBData, setFactoryBData] = useState([])

  const processData = (data) => {
    // Фильтрация данных по продукции
    const filteredData = filterData(data, productFilter)
    // Получение списка месяцев из данных
    const months = [
      ...new Set(
        filteredData
          ?.map((row) => new Date(row.date).getMonth())
          .filter(Boolean) // фильтруем т.к в данных в поле date может прийти null
      ),
    ]
    // Получение данных для фабрики А
    const factoryAData = months?.map((month) => {
      const rows = filteredData.filter(
        (row) => new Date(row.date).getMonth() === month && row.factory_id === 1
      )
      return (
        rows.reduce((acc, row) => acc + row.product1 + row.product2, 0) / 1000
      )
    })
    // Получение данных для фабрики Б
    const factoryBData = months?.map((month) => {
      const rows = filteredData?.filter(
        (row) => new Date(row.date).getMonth() === month && row.factory_id === 2
      )
      return (
        rows.reduce((acc, row) => acc + row.product1 + row.product2, 0) / 1000
      )
    })
    return { months, factoryAData, factoryBData }
  }

  useEffect(() => {
    const { factoryAData, factoryBData } = processData(data)
    setFactoryAData(factoryAData)
    setFactoryBData(factoryBData)
  }, [data, productFilter])

  return { factoryAData, factoryBData }
}
