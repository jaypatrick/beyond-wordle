import { useState, useEffect } from 'react'
import axios from 'axios'

export function Interceptor() {
  const [errorInterceptor, setErrorInterceptor] = useState<number | undefined>(
    undefined,
  )

  const addErrorInterceptor = () => {
    const errorInterceptor = axios.interceptors.response.use(
      (res) => {
        console.log({ res })
        return Promise.resolve(res)
      },
      (error) => {
        console.log(error.response)
        return Promise.reject(error)
      },
    )
    setErrorInterceptor(errorInterceptor)
  }

  const removeErrorInterceptor = () => {
    if (errorInterceptor) {
      axios.interceptors.request.eject(errorInterceptor)
      setErrorInterceptor(undefined)
    }
  }

  useEffect(() => {
    addErrorInterceptor()
    return () => {
      removeErrorInterceptor()
    }
  }, [])

  return <></>
}
