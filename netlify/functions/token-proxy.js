// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
function extractNetlifySiteFromContext(context) {
  const data = context.clientContext.custom.netlify
  // eslint-disable-next-line no-undef
  return JSON.parse(Buffer.from(data, 'base64').toString('utf-8'))
}

const handler = async (event, context) => {
  try {
    const parsedContext = extractNetlifySiteFromContext(context)
    console.log('parsed context 🎯', parsedContext)
    console.log('hello queryStringParameters 👋🏻', event.queryStringParameters)
    const subject = event.queryStringParameters.name || 'World'
    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Hello ${subject}` }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
      // headers: {
      //   'Access-Control-Allow-Origin': '*',
      //   'Access-Control-Allow-Headers': 'Content-Type',
      //   'Access-Control-Allow-Methods': 'GET, POST, OPTION',
      // },
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

// eslint-disable-next-line no-undef
module.exports = { handler }
