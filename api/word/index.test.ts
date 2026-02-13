import { httpTrigger } from './index'
import { HttpRequest, InvocationContext } from '@azure/functions'

// Mock context for testing
const mockContext: InvocationContext = {
  log: jest.fn(),
  error: jest.fn(),
} as any

// Helper to create mock request
function createMockRequest(url: string, method: string = 'GET'): HttpRequest {
  const urlObj = new URL(url, 'http://localhost')
  return {
    method,
    url: url,
    query: {
      get: (key: string) => urlObj.searchParams.get(key),
    },
  } as any
}

describe('Word API', () => {
  describe('GET /api/word?action=daily', () => {
    it('should return word of the day', async () => {
      const request = createMockRequest('http://localhost/api/word?action=daily')
      const response = await httpTrigger(request, mockContext)
      
      expect(response.status).toBe(200)
      expect(response.headers?.['Content-Type']).toBe('application/json')
      
      const body = JSON.parse(response.body as string)
      expect(body).toHaveProperty('word')
      expect(body).toHaveProperty('solutionIndex')
      expect(body).toHaveProperty('tomorrow')
      expect(typeof body.word).toBe('string')
      expect(body.word.length).toBe(5)
    })
  })

  describe('GET /api/word?action=random', () => {
    it('should return a random word', async () => {
      const request = createMockRequest('http://localhost/api/word?action=random')
      const response = await httpTrigger(request, mockContext)
      
      expect(response.status).toBe(200)
      expect(response.headers?.['Content-Type']).toBe('application/json')
      
      const body = JSON.parse(response.body as string)
      expect(body).toHaveProperty('word')
      expect(typeof body.word).toBe('string')
      expect(body.word.length).toBe(5)
    })
  })

  describe('GET /api/word?action=validate&word=HELLO', () => {
    it('should validate a valid word', async () => {
      const request = createMockRequest('http://localhost/api/word?action=validate&word=HELLO')
      const response = await httpTrigger(request, mockContext)
      
      expect(response.status).toBe(200)
      expect(response.headers?.['Content-Type']).toBe('application/json')
      
      const body = JSON.parse(response.body as string)
      expect(body).toHaveProperty('valid')
      expect(body).toHaveProperty('message')
      expect(typeof body.valid).toBe('boolean')
    })

    it('should return error for missing word parameter', async () => {
      const request = createMockRequest('http://localhost/api/word?action=validate')
      const response = await httpTrigger(request, mockContext)
      
      expect(response.status).toBe(400)
      const body = JSON.parse(response.body as string)
      expect(body).toHaveProperty('error')
      expect(body.error).toContain('Missing word parameter')
    })
  })

  describe('GET /api/word?action=invalid', () => {
    it('should return error for invalid action', async () => {
      const request = createMockRequest('http://localhost/api/word?action=invalid')
      const response = await httpTrigger(request, mockContext)
      
      expect(response.status).toBe(400)
      const body = JSON.parse(response.body as string)
      expect(body).toHaveProperty('error')
      expect(body.error).toContain('Invalid action')
    })
  })

  describe('GET /api/word (default action)', () => {
    it('should default to daily action', async () => {
      const request = createMockRequest('http://localhost/api/word')
      const response = await httpTrigger(request, mockContext)
      
      expect(response.status).toBe(200)
      const body = JSON.parse(response.body as string)
      expect(body).toHaveProperty('word')
      expect(body).toHaveProperty('solutionIndex')
    })
  })
})
