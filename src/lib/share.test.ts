import { describe, test, expect, vi, beforeEach } from 'vitest'
import { generateEmojiGrid } from './share'

vi.mock('./words', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./words')>()
  return {
    ...actual,
    get solution() {
      return 'ABCDE'
    },
  }
})

describe('generateEmojiGrid', () => {
  test('generates grid for ascii', () => {
    const guesses = ['EDCBA', 'VWXYZ', 'ABCDE']
    const tiles = ['C', 'P', 'A'] // Correct, Present, Absent

    const grid = generateEmojiGrid(guesses, tiles)
    const gridParts = grid.split('\n')
    expect(gridParts[0]).toBe('PPCPP')
    expect(gridParts[1]).toBe('AAAAA')
    expect(gridParts[2]).toBe('CCCCC')
  })
  
  test('generates grid correctly', () => {
    const guesses = ['ABCDE']
    const tiles = ['C', 'P', 'A'] // Correct, Present, Absent

    const grid = generateEmojiGrid(guesses, tiles)
    expect(grid).toBe('CCCCC')
  })
})
