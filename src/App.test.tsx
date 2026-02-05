import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'
import { Strings } from './constants/strings'

describe('App', () => {
  it('renders App component', () => {
    render(<App />)
    const linkElement = screen.getByText(Strings.GAME_TITLE)
    expect(linkElement).toBeTruthy()
  })
})
