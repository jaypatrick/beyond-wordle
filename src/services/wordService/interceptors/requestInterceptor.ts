import axios, { InternalAxiosRequestConfig, AxiosError } from 'axios'
import { wordsRequestParameters } from '../wordsRequestParameters'

// Prints "get https://httpbin.org/get"
await axios.get('https://httpbin.org/get')

// Prints "post https://httpbin.org/post"
await axios.post('https://httpbin.org/post', {})

axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // do something with config
    console.log(`${config.method} ${config.url}`)
    return Promise.resolve(config)
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)
