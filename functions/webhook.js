exports.handler = async (event, context) => {

  // only respond to POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 404,
      body: ''
    }
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: event.body
  }

}
