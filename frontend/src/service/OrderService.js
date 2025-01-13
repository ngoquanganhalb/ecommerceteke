import axios from "axios"
import { axiosJWT } from "./UserService"
// export const createProduct = async (data) => {
//   const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/create`, data) 
//   return res.data
// }

export const createOrder = async (data, access_token) => {
  const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/order/create`, data, { 
      headers: {
          token: `Beare ${access_token}`,
      }
  })   
  return res.data 
}

