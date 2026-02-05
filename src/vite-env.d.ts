/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WORDLE_GAME_NAME?: string
  readonly VITE_WORDLE_GAME_DESCRIPTION?: string
  readonly VITE_WORDLE_GOOGLE_MEASUREMENT_ID?: string
  readonly VITE_PLAUSIBLE_DOMAIN?: string
  readonly VITE_ENABLE_PWA_OFFLINE_MODE?: string
  // Support legacy REACT_APP_ prefix
  readonly REACT_APP_WORDLE_GAME_NAME?: string
  readonly REACT_APP_WORDLE_GAME_DESCRIPTION?: string
  readonly REACT_APP_WORDLE_GAME_DESCRIPTION_ADDENDUM?: string
  readonly REACT_APP_WORDLE_GAME_METATAG?: string
  readonly REACT_APP_WORDLE_LOCALE_STRING?: string
  readonly REACT_APP_WORDLE_MAX_CHALLENGES?: string
  readonly REACT_APP_WORDS_API_BASE_URL?: string
  readonly REACT_APP_WORDS_API_REQUEST_ENCODING?: string
  readonly REACT_APP_WORDS_API_XSRF_COOKIE_NAME?: string
  readonly REACT_APP_WORDS_API_XSRF_HEADER_NAME?: string
  readonly REACT_APP_WORDS_API_MAX_CONTENT_LENGTH?: string
  readonly REACT_APP_WORDS_API_MAX_BODY_LENGTH?: string
  readonly REACT_APP_WORDS_API_MAX_REDIRECTS?: string
  readonly REACT_APP_WORDS_API_HEADER_HOST_LABEL?: string
  readonly REACT_APP_WORDS_API_HEADER_HOST?: string
  readonly REACT_APP_WORDS_API_HEADER_KEY_LABEL?: string
  readonly REACT_APP_WORDS_API_HEADER_KEY?: string
  readonly REACT_APP_WORDS_API_HEADER_DEFAULT_APP_LABEL?: string
  readonly REACT_APP_WORDS_API_HEADER_DEFAULT_APP?: string
  readonly REACT_APP_ENABLE_PWA_OFFLINE_MODE?: string
  readonly REACT_APP_PLAUSIBLE_DOMAIN?: string
  readonly REACT_APP_WORDLE_GOOGLE_MEASUREMENT_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
