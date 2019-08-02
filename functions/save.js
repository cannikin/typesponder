exports.handler = (event, context, callback) => {
  if (event.httpMethod != 'POST') {
    return callback(null, {
      statusCode: 404,
      body: ''
    })
  }

  let body = event.body

  console.info(body)

  callback(null, {
    statusCode: 200,
    //headers: { "Content-Type": "application/json" },
    body: body
  })
}
