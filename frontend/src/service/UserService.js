import axios from "axios"
export const axiosJWT = axios.create()

export const loginUser = async (data) => {
    console.log('hi',`${process.env.REACT_APP_API_URL}/user/sign-in`,data)
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-in`, data)
    .catch(function (error) {
        console.log(error);
      })
    return res.data
}

export const signupUser = async (data) => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-up`, data) 
  return res.data
}

export const getDetailsUser = async (id, access_token) => { 
  const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/get-details/${id}`, { 
    headers: {
      token: `Beare ${access_token}`,
    }
  })
  return res.data
}

export const deleteUser = async (id, access_token, data) => {
  const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/user/delete-user/${id}`, data, { 
    headers: {
      token: `Beare ${access_token}`,
    }
  },)
  return res.data
  }

export const getAllUser = async (access_token) => {
  const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/getAll`, { 
    headers: {
      token: `Beare ${access_token}`,
    }
  },)
  return res.data
}

export const refreshToken = async () => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/refresh-token`,
  {
    withCredentials : true
  }) 
  return res.data
}

export const logoutUser = async () => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/log-out`)
  return res.data
}

export const updateUser = async (id, data,access_token) => {
  const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/user/update-user/${id}`, data,{ 
    headers: {
      token: `Beare ${access_token}`,
    }
  }) 
  return res.data 
}

export const deleteManyUser = async (data, access_token) => {
  const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/user/delete-many`,data, { 
      headers: {
          token: `Beare ${access_token}`,
      }
  })
  return res.data
}