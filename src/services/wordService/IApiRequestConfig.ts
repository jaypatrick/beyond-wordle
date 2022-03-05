import { AxiosRequestConfig } from 'axios'

export interface IApiRequestConfig {
  rapidApiAppUrl?: string
  url: string
  method?: RequestVerb
  contentType?: string

  // from the request config section from npmjs.com
  baseURL?: string

  headers?: IApiRequestHeader
  params?: {
    ID?: string
    letterPattern?: string
    pronunciationPattern?: string
    letters?: number
    limit?: number
    page?: number
  }
  // form post data
  data?: IApiRequestData
  timeout?: number
  withCredentials?: boolean
  auth?: IAuthorizationCredentials
  responseType?: ResponseType
  responseEncoding?: string
  xsrfCookieName?: string
  xsrfHeaderName?: string
  maxContentLength?: number
  maxBodyLength?: number
  maxRedirects?: number
  proxy?: IApiRequestProxy
  decompress?: boolean

  onUploadProgress: (progressEvent: (data: any) => void) => void
  onDownloadProgress: (progressEvent: (data: any) => void) => void
}

// MOVE THESE TO NEW FILES AS NEEDED
enum RequestVerb {
  Get = 'GET',
  Post = 'POST',
}

export interface IApiWebRequest {
  apiRequestConfig: IApiRequestConfig
  createRequest(apiRequestConfig?: IApiRequestConfig): Promise<void>
  getWordApiResponse(config: AxiosRequestConfig): Promise<Data | ServerError>
}

export type ServerError = {
  error: string
}
export type Data = {
  data: string
}

export interface IApiRequestHeader {
  key: string
  value: string
}
export interface IApiRequestData {
  key: string
  value: string
}
export interface IAuthorizationCredentials {
  username: string
  password: string
}
export interface IApiRequestProxy {
  protocol: Protocol
  host: string
  port: string
  auth: IAuthorizationCredentials
}

enum Protocol {
  http = 'http',
  https = 'https',
}
