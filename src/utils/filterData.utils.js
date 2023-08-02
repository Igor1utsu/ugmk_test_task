/**
 * Функция для фильтрации данных по продукции
 */
export const filterData = (data, productFilter) => {
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
