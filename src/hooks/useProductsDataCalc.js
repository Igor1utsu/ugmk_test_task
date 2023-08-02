import { useEffect, useState } from 'react'

export const useProductsDataCalc = ({ data, factoryId, monthNumber }) => {
  const [productsType1, setProductsType1] = useState(0)
  const [productsType2, setProductsType2] = useState(0)

  const сalculateQTYProducts = (data) => {
    let type1 = 0
    let type2 = 0

    data?.forEach((d) => {
      if (
        d.factory_id === factoryId &&
        new Date(d.date).getMonth() === monthNumber
      ) {
        type1 += d.product1
        type2 += d.product2
      }
    })

    return { type1, type2 }
  }

  useEffect(() => {
    const { type1, type2 } = сalculateQTYProducts(data)
    setProductsType1(type1)
    setProductsType2(type2)
  }, [data])

  return { productsType1, productsType2 }
}
