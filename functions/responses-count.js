const AWS = require('./dynamo_connect')
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {

  docClient.scan({ TableName: "users" }, (err, users) => {
    callback(null, {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ responsesCount: users.Items.reduce((count, user) => count + user.responses.length, 0) })
    })
  })

}
