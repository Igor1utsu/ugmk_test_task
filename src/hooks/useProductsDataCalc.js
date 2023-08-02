import { useEffect, useState } from 'react'

export const useProductsDataCalc = ({ data, factoryId, monthNumber }) => {
  const [productsType1, setProductsType1] = useState(0)
  const [productsType2, setProductsType2] = useState(0)

  const сalculateVolumeProducts = (data) => {
    let productType1 = 0
    let productType2 = 0

    data?.forEach((item) => {
      if (
        item.factory_id === factoryId &&
        new Date(item.date).getMonth() === monthNumber - 1
      ) {
        productType1 += item.product1
        productType2 += item.product2
      }
    })

    return { productType1, productType2 }
  }

  useEffect(() => {
    const { productType1, productType2 } = сalculateVolumeProducts(data)
    setProductsType1(productType1)
    setProductsType2(productType2)
  }, [data])

  return { productsType1, productsType2 }
}
