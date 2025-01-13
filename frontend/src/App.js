import React, { Fragment, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { routes } from './routes'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { isJsonString } from './utils'
import { jwtDecode } from "jwt-decode";
import * as UserService from './service/UserService'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from './redux/slides/userSlide'
import Loading from './components/LoadingComponent/Loading'
export function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user)
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    setIsLoading(true)
    const { storageData, decoded } = handleDecoded();
    if (decoded?.id) {
      //console.log('appjs',decoded)
      handleGetDetailsUser(decoded?.id, storageData);
    }
    setIsLoading(false)
  }, []);

  const handleDecoded = () => {
    //console.log('locla',localStorage)
    let storageData = localStorage.getItem('access_token');
    let decoded = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData);
      //console.log('decodeapp', decoded);//in ra data theo access-token
    }
    return { decoded, storageData };
  };

  UserService.axiosJWT.interceptors.request.use(async (config) => { 
    const currentTime = new Date()
    const { decoded } = handleDecoded()
    //console.log('app axiosjwt',decoded?.exp,currentTime.getTime() / 1000)
    if (decoded?.exp < currentTime.getTime() / 1000) { 
      const data = await UserService.refreshToken() 
      config.headers['token'] = `Beare ${data?.access_token}`
}

    return config;
  }, (err) => {
        return Promise.reject(err)
      })

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser (id, token)
    dispatch(updateUser({...res?.data, access_token: token}))
    console.log('res',res)
    //setIsLoading(false)
  }

  return (
    <div>
      <Loading isPending={isLoading}>
        <Router>
          <Routes> 
            {
              routes.map((route) => {
              const Page = route.page
              const ischeckAuth = !route.isPrivate || user.isAdmin
              const Layout = route.isShowHeader ? DefaultComponent : Fragment
              return (
                <Route key={route.path} path={ischeckAuth ? route.path : undefined} element={
                  <Layout>
                    <Page />
                  </Layout>
                  } />
              )
              })
            }
          </Routes>
        </Router>
      </Loading>
    </div>
  )
}

export default App