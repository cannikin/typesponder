const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: 'KEY',
  secretAccessKey: 'SECRET', 
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

const docClient = new AWS.DynamoDB.DocumentClient();
const params = {
  TableName: "forms"
};

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
