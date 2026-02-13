# Word API

Backend API service for fetching and validating words for the Beyond Wordle game.

## Overview

This API provides endpoints for:
- Fetching random words for game play
- Validating word guesses
- Getting word database statistics

## Technology Stack

- TypeScript
- Azure Functions
- In-memory word storage

## API Endpoints

### GET /api/word?action=random

Fetches a random word from the answer word list.

**Response:**
```json
{
  "word": "WATER",
  "timestamp": "2026-02-13T06:00:00.000Z"
}
```

### GET /api/word?action=data

Returns statistics about the word database.

**Response:**
```json
{
  "answerCount": 50,
  "validGuessCount": 50
}
```

### POST /api/word

Validates whether a word is a valid guess.

**Request Body:**
```json
{
  "word": "water"
}
```

**Response:**
```json
{
  "word": "water",
  "isValid": true
}
```

## Development

### Build

```bash
npm run build
```

### Run Locally

```bash
npm start
```

### Watch Mode

```bash
npm run watch
```

## Architecture

- `word/index.ts` - Azure Function HTTP trigger handler
- `word/wordData.ts` - In-memory word database with utility functions
- `word/function.json` - Azure Function configuration

## Future Enhancements

- Add persistent database storage (e.g., Azure Cosmos DB, SQL)
- Add support for multiple word lengths
- Add support for different languages/dictionaries
- Add rate limiting
- Add authentication for certain endpoints
