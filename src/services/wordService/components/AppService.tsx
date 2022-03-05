import { useEffect, useState } from 'react'
import { Loader } from './Loader'
import { Interceptor } from './Interceptor'

import axios, { AxiosError } from 'axios'
import './styles.css'

type ServerError = {
  error: string
}
type Data = {
  data: string
}

const getData = async (): Promise<Data | ServerError> => {
  try {
    const res = await axios.get<Data>('https://blog-server.gagandeogan.repl.co')
    return res.data
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const serverError = err as AxiosError<ServerError>
      if (serverError && serverError.response) {
        return serverError.response.data
      }
    }
    return { error: 'something went wrong!' }
  }
}

// THIS IS THE CODE NEEDED IN APP.TSX, THIS FILE WAS NAMED APP.TSX, which means it's the default harness for rendering
export default function AppService() {
  const [status, setStatus] = useState<
    'idle' | 'pending' | 'fulfilled' | 'error'
  >('idle')
  const [data, setData] = useState<Data | null>(null)

  useEffect(() => {
    if (status === 'idle') {
      // eslint-disable-next-line @typescript-eslint/no-extra-semi
      ;(async () => {
        setStatus('pending')
        const res = await getData()
        if ('data' in res) {
          setStatus('fulfilled')
          setData(res)
        } else {
          setStatus('error')
        }
      })()
    }
  }, [data, status])

  // THIS IS WHERE YOU CAN INTERCEPT THE REQUEST TO DO ERROR CHECKS/ETC
  return (
    <>
      <Interceptor />
      {(status === 'idle' || status === 'pending') && <Loader />}
      {status === 'error' && <h1>Error</h1>}
      {status === 'fulfilled' && <h1>Data</h1>}
    </>
  )
}
