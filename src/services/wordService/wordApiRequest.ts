import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosRequestHeaders,
} from 'axios'
import { Settings } from '../../constants/settings'

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
type ServerError = {
  error: string
}
type Data = {
  data: string
}
enum RequestVerb {
  Get = 'GET',
  Post = 'POST',
}
enum Protocol {
  http = 'http',
  https = 'https',
}

enum ResponseType {
  json = 'json',
  arrayBuffer = 'arraybuffer',
  document = 'document',
  text = 'text',
  stream = 'stream',
}
export interface IApiWebRequest {
  apiRequestConfig: IApiRequestConfig
  createRequest(apiRequestConfig?: IApiRequestConfig): Promise<void>
  getWordApiResponse(config: AxiosRequestConfig): Promise<Data | ServerError>
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

export class WordsApiRequest {
  // _apiResponse: IApiResponse
  private requestConfig: AxiosRequestConfig

  constructor(public apiRequestConfig: IApiRequestConfig) {
    // set up some sensible defaults to build the request
    this.requestConfig = {
      baseURL: apiRequestConfig.baseURL,
      url: apiRequestConfig.url,
      method: apiRequestConfig.method,
    }
  }

  // candidate #1
  public async createRequest(apiRequestConfig?: IApiRequestConfig) {
    axios
      .request(this.requestConfig ?? (apiRequestConfig as AxiosRequestConfig))
      .then(function (response) {
        console.log(response.data)
      })
      .catch(function (error) {
        console.error(error)
      })
  }

  // CANDIDATE #2
  // this is part of the chunk of code at
  // https://hashnode.com/post/how-to-use-axios-with-typescript-ckqi62md803s28us1baqyaj4u
  public async getWordApiResponse(
    config: AxiosRequestConfig
  ): Promise<Data | ServerError> {
    try {
      const response = await axios.get<Data>(
        Settings.REACT_APP_WORDS_API_BASE_URL,
        config
      )
      return response.data
    } catch (requestError) {
      if (axios.isAxiosError(requestError)) {
        const serverError = requestError as AxiosError<ServerError>
        if (serverError && serverError.response) {
          this.handleAxiosError(requestError)
          return serverError.response.data
        }
      }
      this.handleUnexpectedError(requestError as Error)
      return { error: 'An error occurred' }
    }
  }

  private handleAxiosError(error: AxiosError) {
    console.error(`${error.message} ${error.toJSON}`)
  }
  private handleUnexpectedError(error: Error) {
    console.error(error.message)
  }
}
