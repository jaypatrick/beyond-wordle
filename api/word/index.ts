import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from '@azure/functions'
import { getRandomWord, isValidGuess, getWordData } from './wordData'

export async function httpTrigger(
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  context.log('Word API: Processing request')

  const method = request.method
  const action = request.query.get('action')

  try {
    // GET request - fetch a random word or get word data
    if (method === 'GET') {
      if (action === 'random') {
        const word = getRandomWord()
        return {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            word: word.toUpperCase(),
            timestamp: new Date().toISOString(),
          }),
        }
      } else if (action === 'data') {
        const wordData = getWordData()
        return {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            answerCount: wordData.answers.length,
            validGuessCount: wordData.validGuesses.length,
          }),
        }
      } else {
        return {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            error:
              'Invalid action. Use ?action=random to get a random word or ?action=data to get word statistics.',
          }),
        }
      }
    }

    // POST request - validate a guess
    if (method === 'POST') {
      const body = await request.text()
      if (!body) {
        return {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            error: 'Request body is required for validation',
          }),
        }
      }

      const parsed = JSON.parse(body)
      const word = parsed.word

      if (!word || typeof word !== 'string') {
        return {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            error: 'Word parameter is required in request body',
          }),
        }
      }

      const isValid = isValidGuess(word)
      return {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          word: word.toLowerCase(),
          isValid,
        }),
      }
    }

    return {
      status: 405,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: 'Method not allowed. Use GET or POST.',
      }),
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
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
    }
  }
}

app.http('word', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler: httpTrigger,
})
