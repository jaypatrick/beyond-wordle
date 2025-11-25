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
  const name =
    request.query.get('name') || (await request.text()).includes('name')
      ? JSON.parse(await request.text()).name
      : null
  const responseMessage = name
    ? 'Hello, ' +
      name +
      '. This HTTP triggered function executed successfully.'
    : 'This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.'

  return { body: responseMessage }
}

app.http('word', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler: httpTrigger,
})
