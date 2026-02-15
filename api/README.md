# Word API

Backend API service for the Beyond Wordle game, built with Azure Functions and TypeScript.

## Features

This API provides word fetching capabilities for the game:

- **Daily Word**: Get the word of the day based on a deterministic algorithm
- **Random Word**: Fetch a random word from the word list
- **Word Validation**: Validate if a guessed word is in the valid word list

## API Endpoints

### GET /api/word?action=daily

Returns the word of the day.

**Response:**
```json
{
  "word": "HELLO",
  "solutionIndex": 123,
  "tomorrow": 1707868800000
}
```

- `word`: The daily word in uppercase
- `solutionIndex`: Index of the current day since epoch (Jan 1, 2022)
- `tomorrow`: Timestamp in milliseconds for the next day's word

### GET /api/word?action=random

Returns a random word from the word list.

**Response:**
```json
{
  "word": "WORLD"
}
```

### GET /api/word?action=validate&word=HELLO

Validates if a word is in the valid word list.

**Query Parameters:**
- `word`: The word to validate (case-insensitive)

**Response:**
```json
{
  "valid": true,
  "message": "Word is valid"
}
```

**Error Response (missing word):**
```json
{
  "error": "Missing word parameter"
}
```

## Development

### Prerequisites

- Node.js 18+
- Azure Functions Core Tools (for local testing)

### Install Dependencies

```bash
cd api
npm install
```

### Build

```bash
npm run build
```

This compiles TypeScript files to JavaScript in the `dist/` directory.

### Run Locally

```bash
npm start
```

The API will be available at `http://localhost:7071/api/word`

### Testing

The API includes unit tests for all endpoints:

```bash
npm test
```

## Deployment

The API is designed to be deployed as an Azure Function App or Azure Static Web Apps API.

### Azure Static Web Apps

When deploying with Azure Static Web Apps, the API will automatically be available at `/api/word`.

### Standalone Azure Functions

Deploy using the Azure Functions CLI or Azure Portal.

## Word Lists

The API uses two word lists:

1. **wordlist.ts**: Primary word list used for daily and random words (~2,300 words)
2. **validGuesses.ts**: Extended list of valid guesses (~10,000+ words)

Both lists are imported from the frontend constants to ensure consistency.

## Architecture

- **TypeScript**: Strongly typed codebase
- **Azure Functions v4**: Modern programming model
- **Stateless**: No database required, uses deterministic algorithm for daily words
- **CORS Enabled**: Accessible from frontend applications

## Future Enhancements

Potential features for future development:

- Persistence layer (TypeScript database)
- User statistics tracking
- Custom word lists
- Multi-language support
- Word difficulty ratings
