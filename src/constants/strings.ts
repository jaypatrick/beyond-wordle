/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
export class Strings {
  static get GAME_TITLE(): string {
    return `${this.GAME_NAME} ${this.GAME_DESCRIPTION_ADDENDUM}`
  }
  static get GAME_NAME(): string {
    return `${process.env.REACT_APP_WORDLE_GAME_NAME?.toString()!}`
  }
  static get GAME_DESCRIPTION(): string {
    return `${process.env.REACT_APP_WORDLE_GAME_DESCRIPTION?.toString()!}`
  }
  static get GAME_DESCRIPTION_ADDENDUM(): string {
    return `${process.env.REACT_APP_WORDLE_GAME_DESCRIPTION_ADDENDUM?.toString()!}`
  }
  static get WIN_MESSAGES() {
    return ['Great Job!', 'Awesome', 'Well done!']
  }
  static get GAME_COPIED_MESSAGE() {
    return 'Game copied to clipboard'
  }
  static get NOT_ENOUGH_LETTERS_MESSAGE() {
    return 'Not enough letters'
  }
  static get WORD_NOT_FOUND_MESSAGE() {
    return 'Word not found'
  }
  static get HARD_MODE_ALERT_MESSAGE() {
    return 'Hard Mode can only be enabled at the start!'
  }
  static get HARD_MODE_DESCRIPTION() {
    return 'Any revealed hints must be used in subsequent guesses'
  }
  static get HIGH_CONTRAST_MODE_DESCRIPTION() {
    return 'For improved color vision'
  }
  static CORRECT_WORD_MESSAGE = (solution: string) => {
    return `The word was ${solution}`
  }
  static WRONG_SPOT_MESSAGE = (guess: string, position: number) =>
    `Must use ${guess} in position ${position}`

  static NOT_CONTAINED_MESSAGE = (letter: string) =>
    `Guess must contain ${letter}`

  static get ENTER_TEXT() {
    return 'Enter'
  }
  static get DELETE_TEXT() {
    return 'Delete'
  }
  static get STATISTICS_TITLE() {
    return 'Statistics'
  }
  static get GUESS_DISTRIBUTION_TEXT() {
    return 'Guess Distribution'
  }
  static get NEW_WORD_TEXT() {
    return 'New word in'
  }
  static get SHARE_TEXT() {
    return 'Share'
  }
  static get TOTAL_TRIES_TEXT() {
    return 'Total tries'
  }
  static get SUCCESS_RATE_TEXT() {
    return 'Success rate'
  }
  static get CURRENT_STREAK_TEXT() {
    return 'Current streak'
  }
  static get BEST_STREAK_TEXT() {
    return 'Best streak'
  }
  static get GOOGLE_ANALYTICS_ID() {
    return process.env.REACT_APP_WORDLE_GOOGLE_MEASUREMENT_ID!
  }
}
