const axios = require('axios')

const handler = async (event, context) => {
  try {
    if (event.httpMethod === 'POST') {
      const { jobNumber } = JSON.parse(event.body)
      console.log('jobNumber', jobNumber)

      const { data: jobCurrentStatus } = await axios(`${process.env.VITE_BASEROW_BASE_URL}/jobs/${jobNumber}/`, {
        method: 'GET',
        headers: {
          Authorization: `JWT ${process.env.SERVER_SIDE_ONLY_JWT_TOKEN}`,
        },
      })

      return {
        statusCode: 200,
        body: JSON.stringify({ response: jobCurrentStatus }),
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
