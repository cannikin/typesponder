const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.AMAZON_ACCESS_KEY_ID,
  secretAccessKey: process.env.AMAZON_SECRET_ACCESS_KEY,
  region: process.env.AMAZON_DYNAMODB_REGION
});

const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {

  function docClientAsync(params) {
    return new Promise((resolve, reject) => {
      docClient.scan(params, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  const users = (await docClientAsync({ TableName: "users" })).Items
  const forms = (await docClientAsync({ TableName: "forms"})).Items

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ forms, users })
  }
}
