import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from '@azure/functions'
import { WORDS } from './wordlist'
import { VALID_GUESSES } from './validGuesses'

// Type definitions for API responses
interface WordOfDayResponse {
  word: string
  solutionIndex: number
  tomorrow: number
}

interface RandomWordResponse {
  word: string
}

interface ValidateWordResponse {
  valid: boolean
  message?: string
}

// Helper function to get word of the day
function getWordOfDay(): WordOfDayResponse {
  // January 1, 2022 Game Epoch
  const epochMs = new Date(2022, 0).valueOf()
  const now = Date.now()
  const msInDay = 86400000
  const index = Math.floor((now - epochMs) / msInDay)
  const nextday = (index + 1) * msInDay + epochMs

  return {
    word: WORDS[index % WORDS.length].toUpperCase(),
    solutionIndex: index,
    tomorrow: nextday,
  }
}

// Helper function to get a random word
function getRandomWord(): RandomWordResponse {
  const randomIndex = Math.floor(Math.random() * WORDS.length)
  return {
    word: WORDS[randomIndex].toUpperCase(),
  }
}

// Helper function to validate a word
function validateWord(word: string): ValidateWordResponse {
  const lowerWord = word.toLowerCase()
  const isValid = 
    WORDS.includes(lowerWord) || 
    VALID_GUESSES.includes(lowerWord)
  
  return {
    valid: isValid,
    message: isValid ? 'Word is valid' : 'Word not in word list',
  }
}

// Main HTTP trigger handler
export async function httpTrigger(
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  context.log(`HTTP trigger function processing: ${request.method} ${request.url}`)
  
  try {
    // Get the action from query parameters
    const action = request.query.get('action') || 'daily'
    
    // Handle different actions
    switch (action) {
      case 'daily': {
        const response = getWordOfDay()
        return {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(response),
        }
      }
      
      case 'random': {
        const response = getRandomWord()
        return {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(response),
        }
      }
      
      case 'validate': {
        const word = request.query.get('word')
        
        if (!word) {
          return {
            status: 400,
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              error: 'Missing word parameter',
            }),
          }
        }
        
        const response = validateWord(word)
        return {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(response),
        }
      }
      
      default: {
        return {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            error: 'Invalid action. Supported actions: daily, random, validate',
          }),
        }
      }
    }
  } catch (error) {
    context.error('Error processing request:', error)
    return {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: 'Internal server error',
      }),
    }
  }
}

app.http('word', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: httpTrigger,
})
