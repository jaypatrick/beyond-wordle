import { getGuessStatuses } from './statuses'
import { solutionIndex } from './words'
import { Strings } from '../constants/strings'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getStoredIsHighContrastMode } from './localStorage'
import { Settings } from '../constants/settings'

export const shareStatus = (
  guesses: string[],
  lost: boolean,
  isHardMode: boolean,
  isDarkMode: boolean,
  isHighContrastMode: boolean
) => {
  navigator.clipboard.writeText(
    `${Strings.GAME_TITLE} ${solutionIndex} ${lost ? 'X' : guesses.length}/${
      Settings.MAX_CHALLENGES
    }${isHardMode ? '*' : ''}\n\n` +
      generateEmojiGrid(guesses, getEmojiTiles(isDarkMode, isHighContrastMode))
  )
}

export const generateEmojiGrid = (guesses: string[], tiles: string[]) => {
  return guesses
    .map((guess) => {
      const status = getGuessStatuses(guess)
      return guess
        .split('')
        .map((_, i) => {
          switch (status[i]) {
            case 'correct':
              return tiles[0]
            case 'present':
              return tiles[1]
            default:
              return tiles[2]
          }
        })
        .join('')
    })
    .join('\n')
}

const getEmojiTiles = (isDarkMode: boolean, isHighContrastMode: boolean) => {
  let tiles: string[] = []
  tiles.push(isHighContrastMode ? '🟧' : '🟩')
  tiles.push(isHighContrastMode ? '🟦' : '🟨')
  tiles.push(isDarkMode ? '⬛' : '⬜')
  return tiles
}
