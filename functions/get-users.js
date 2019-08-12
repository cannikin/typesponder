const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.AMAZON_ACCESS_KEY_ID,
  secretAccessKey: process.env.AMAZON_SECRET_ACCESS_KEY,
  region: process.env.AMAZON_DYNAMODB_REGION
});

if (process.env.AMAZON_DYNAMODB_ENDPOINT) {
  AWS.config.update({ endpoint: process.env.AMAZON_DYNAMODB_ENDPOINT })
}

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
