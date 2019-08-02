exports.handler = (event, context, callback) => {

  // only respond to POST
  if (event.httpMethod != 'POST') {
    return callback(null, {
      statusCode: 404,
      body: ''
    })
  }

  console.info(event.body)

  callback(null, {
    statusCode: 200,
    body: event.body
  })
}
