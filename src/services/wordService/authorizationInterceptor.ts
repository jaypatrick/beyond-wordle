import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios'

axios.interceptors.request.use((req) => {
  // `req` is the Axios request config, so you can modify
  // the `headers`.
  return Promise.resolve(req)
})
// Automatically sets the authorization header because
// of the request interceptor
