import axios, { AxiosError, AxiosResponse } from 'axios'

// Prints "post https://httpbin.org/post" followed by "{ answer: 42 }"
await axios.post('https://httpbin.org/post', { answer: 42 })

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    // triggered by any response codes within the 2xx range
    // do something with response data
    console.log(response.data.json)
    return Promise.resolve(response)
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)
