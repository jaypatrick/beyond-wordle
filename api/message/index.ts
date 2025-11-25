import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from '@azure/functions'

export async function httpTrigger(
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  context.log('HTTP trigger function processed a request.')
  let name = request.query.get('name')
  
  if (!name) {
    try {
      const body = await request.text()
      if (body) {
        const parsed = JSON.parse(body)
        name = parsed.name
      }
    } catch {
      // Body parsing failed, name remains null
    }
  }
  
  const responseMessage = name
    ? 'Hello, ' +
      name +
      '. This HTTP triggered function executed successfully.'
    : 'This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.'

  return { body: responseMessage }
}

app.http('message', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler: httpTrigger,
})