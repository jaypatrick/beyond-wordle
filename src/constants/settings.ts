import { solution } from '../lib/words'

export class Settings {
  static get MAX_WORD_LENGTH() {
    return solution.length
  }
  static get MAX_CHALLENGES() {
    return solution.length + 3
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
}
