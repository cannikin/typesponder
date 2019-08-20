const AWS = require('./dynamo_connect')
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {

  docClient.scan({ TableName: "users" }, (err, users) => {
    docClient.scan({ TableName: "forms" }, (err, forms) => {
      callback(null , {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ forms: forms.Items, users: users.Items })
      })
    })
  })

}
