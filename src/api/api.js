import axiosInstance from 'api/axiosInstance'
import { FETCH_PRODUCTS } from 'constants/endpoints'

export const productsAPI = {
  getAll: async () => {
    try {
      const { data } = await axiosInstance.get(FETCH_PRODUCTS)
      return data
    } catch (error) {
      throw new Error(error)
    }
  },
}
