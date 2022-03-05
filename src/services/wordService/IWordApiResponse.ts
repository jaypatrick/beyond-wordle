import {
  IApiRequestHeader,
  IApiRequestConfig,
  IApiWebRequest,
} from './IApiRequestConfig'

export {}

// SAME SHAPE (For NOW) of the
export interface IWordApiResponse {
  // `data` is the response that was provided by the server
  data: Record<string, unknown>

  // `status` is the HTTP status code from the server response
  status: string

  // `statusText` is the HTTP status message from the server response
  statusText: string

  // `headers` the HTTP headers that the server responded with
  // All header names are lower cased and can be accessed using the bracket notation.
  // Example: `response.headers['content-type']`
  headers: IApiRequestHeader

  // `config` is the config that was provided to `axios` for the request
  config: IApiRequestConfig

  // `request` is the request that generated this response
  // It is the last ClientRequest instance in node.js (in redirects)
  // and an XMLHttpRequest instance in the browser
  request: IApiWebRequest
}
