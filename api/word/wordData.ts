// In-memory word database for the Wordle game
// This will serve as our TypeScript-based persistence layer

export interface WordData {
  answers: string[]
  validGuesses: string[]
}

// Sample answer words - these are the words that can be solutions
export const ANSWER_WORDS = [
  'which',
  'there',
  'their',
  'about',
  'would',
  'these',
  'other',
  'words',
  'could',
  'write',
  'first',
  'water',
  'after',
  'where',
  'right',
  'think',
  'three',
  'years',
  'place',
  'sound',
  'great',
  'again',
  'still',
  'every',
  'small',
  'found',
  'those',
  'never',
  'under',
  'might',
  'while',
  'house',
  'world',
  'below',
  'asked',
  'going',
  'large',
  'until',
  'along',
  'shall',
  'being',
  'often',
  'earth',
  'began',
  'since',
  'study',
  'night',
  'light',
  'above',
]

// Valid guesses - includes answer words plus additional valid words
export const VALID_GUESSES = [
  'aahed',
  'aalii',
  'aargh',
  'aarti',
  'abaca',
  'abaci',
  'aback',
  'abacs',
  'abaft',
  'abaka',
  'abamp',
  'aband',
  'abase',
  'abash',
  'abask',
  'abate',
  'abaya',
  'abbas',
  'abbed',
  'abbes',
  'abbey',
  'abbot',
  'abcee',
  'abeam',
  'abear',
  'abele',
  'abers',
  'abets',
  'abhor',
  'abide',
  'abies',
  'abled',
  'abler',
  'ables',
  'ablet',
  'ablow',
  'abmho',
  'abode',
  'abohm',
  'aboil',
  'aboma',
  'aboon',
  'abord',
  'abore',
  'abort',
  'about',
  'above',
]

export const getWordData = (): WordData => {
  return {
    answers: ANSWER_WORDS,
    validGuesses: VALID_GUESSES,
  }
}

export const isValidGuess = (word: string): boolean => {
  const lowerWord = word.toLowerCase()
  return (
    ANSWER_WORDS.includes(lowerWord) || VALID_GUESSES.includes(lowerWord)
  )
}

export const getRandomWord = (): string => {
  const randomIndex = Math.floor(Math.random() * ANSWER_WORDS.length)
  return ANSWER_WORDS[randomIndex]
}
