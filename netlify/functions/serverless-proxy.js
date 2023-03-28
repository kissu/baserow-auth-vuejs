// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const axios = require('axios')

const handler = async (event, context) => {
  try {
    if (event.httpMethod === 'POST') {
      console.log('hello from the backend 👋🏻', new Date().toUTCString())
      const { data: jwtTokenObject } = await axios(`${process.env.VITE_BASEROW_BASE_URL}/user/token-auth/`, {
        method: 'POST',
        data: {
          email: process.env.SERVER_SIDE_ONLY_BASEROW_EMAIL,
          password: process.env.SERVER_SIDE_ONLY_BASEROW_PASSWORD,
        },
      })

      const { data: groupsObject } = await axios(`${process.env.VITE_BASEROW_BASE_URL}/groups/`, {
        headers: {
          Authorization: `JWT ${jwtTokenObject.token}`,
        },
      })

      const frontendPayload = JSON.parse(event.body)
      console.log('frontendPayload', frontendPayload)
      const { templateId } = frontendPayload

      const { data: templateAsyncObject } = await axios(
        `${process.env.VITE_BASEROW_BASE_URL}/templates/install/${groupsObject[0].id}/${templateId}/async/`,
        {
          method: 'POST',
          headers: {
            Authorization: `JWT ${jwtTokenObject.token}`,
          },
        },
      )
      console.log('templateAsyncObject', templateAsyncObject)

      return {
        statusCode: 200,
        body: JSON.stringify({ response: templateAsyncObject }),
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'GET, POST, OPTION',
        },
      }
    } else if (event.httpMethod === 'OPTIONS') {
      return {
        statusCode: 200,
        body: 'CORS 🙈',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'GET, POST, OPTION',
        },
      }
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

// eslint-disable-next-line no-undef
module.exports = { handler }
