/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { solution } from '../lib/words'

export class Settings {
  static get MAX_WORD_LENGTH() {
    return solution.length
  }
  static get MAX_CHALLENGES() {
    const maxChallengesOffset = parseInt(
      this.REACT_APP_WORDLE_MAX_CHALLENGES || '0',
    )
    return solution.length + (isNaN(maxChallengesOffset) ? 0 : maxChallengesOffset)
  }
  static get REACT_APP_WORDLE_MAX_CHALLENGES() {
    return (
      process.env.REACT_APP_WORDLE_MAX_CHALLENGES?.toString() ||
      import.meta.env.REACT_APP_WORDLE_MAX_CHALLENGES?.toString() ||
      '0'
    )
  }
  static get ALERT_TIME_MS() {
    return 2000
  }
  static get REVEAL_TIME_MS() {
    return 350
  }
  static get GAME_LOST_INFO_DELAY() {
    return (this.MAX_WORD_LENGTH + 1) * this.REVEAL_TIME_MS
  }
  static get WELCOME_INFO_MODAL_MS() {
    return 350
  }

  // WORDSAPI SETTINGS
  static get REACT_APP_WORDS_API_BASE_URL() {
    return process.env.REACT_APP_WORDS_API_BASE_URL?.toString()!
  }
  static get REACT_APP_WORDS_API_REQUEST_ENCODING() {
    return process.env.REACT_APP_WORDS_API_REQUEST_ENCODING?.toString()!
  }
  static get REACT_APP_WORDS_API_XSRF_COOKIE_NAME() {
    return process.env.REACT_APP_WORDS_API_XSRF_COOKIE_NAME?.toString()!
  }
  static get REACT_APP_WORDS_API_MAX_CONTENT_LENGTH() {
    return process.env.REACT_APP_WORDS_API_MAX_CONTENT_LENGTH?.toString()!
  }
  static get REACT_APP_WORDS_API_MAX_BODY_LENGTH() {
    return process.env.REACT_APP_WORDS_API_MAX_BODY_LENGTH?.toString()!
  }
  static get REACT_APP_WORDS_API_MAX_REDIRECTS() {
    return process.env.REACT_APP_WORDS_API_MAX_REDIRECTS?.toString()!
  }
  static get REACT_APP_WORDS_API_HEADER_HOST() {
    return process.env.REACT_APP_WORDS_API_HEADER_HOST?.toString()!
  }
  static get REACT_APP_WORDS_API_HEADER_KEY() {
    return process.env.REACT_APP_WORDS_API_HEADER_KEY?.toString()!
  }
  static get REACT_APP_WORDS_API_HEADER_HOST_LABEL() {
    return process.env.REACT_APP_WORDS_API_HEADER_HOST_LABEL?.toString()!
  }
  static get REACT_APP_WORDS_API_HEADER_DEFAULT_APP_LABEL() {
    return process.env.REACT_APP_WORDS_API_HEADER_DEFAULT_APP_LABEL?.toString()!
  }
  static get REACT_APP_WORDS_API_HEADER_DEFAULT_APP() {
    return process.env.REACT_APP_WORDS_API_HEADER_DEFAULT_APP?.toString()!
  }
  static get REACT_APP_WORDS_API_HEADER_KEY_LABEL() {
    return process.env.REACT_APP_WORDS_API_HEADER_KEY_LABEL?.toString()!
  }
}
