import axios from 'axios'

axios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 404) {
      throw new Error(`${err.config.url} not found`)
    }
    throw err
  },
)

// Automatically sets the authorization header because
// of the request interceptor
const err = await axios.get('https://httpbin.org/status/404').then(
  () => null,
  (err) => err,
)
