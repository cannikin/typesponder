const AWS = require('./dynamo_connect')
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {

  // only respond to POST
  if (event.httpMethod != 'POST') {
    return callback(null, {
      statusCode: 404,
      body: ''
    })
  }

  function respondWith(body) {
    callback(null, {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    })
  }

  const body = JSON.parse(event.body)

  docClient.update({
    TableName: "users",
    Key: {
      id: parseInt(body.id)
    },
    UpdateExpression: "SET notes = :notes",
    ExpressionAttributeValues: {
      ":notes": (body.notes == "" ? " " : body.notes)
    },
    ReturnValues: "ALL_NEW"
  }, (err, data) => {
    if (err) {
      respondWith({ error: err })
    } else {
      respondWith(data.Attributes)
    }
  })

}
