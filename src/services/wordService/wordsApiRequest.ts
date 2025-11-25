import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { Settings } from '../../constants/settings'
import { Data, IApiRequestConfig, ServerError } from './IApiRequestConfig'

enum ResponseType {
  json = 'json',
  arrayBuffer = 'arraybuffer',
  document = 'document',
  text = 'text',
  stream = 'stream',
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
      .request(
        this.requestConfig ??
          (apiRequestConfig as unknown as AxiosRequestConfig),
      )
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
    config: AxiosRequestConfig,
  ): Promise<Data | ServerError> {
    try {
      const response = await axios.get<Data>(
        Settings.REACT_APP_WORDS_API_BASE_URL,
        config,
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
