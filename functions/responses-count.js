const AWS = require("./dynamo_connect");
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {
  docClient.scan({ TableName: "users", Select: "COUNT" }, (err, result) => {
    callback(null, {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        responsesCount: result.Count
      })
    });
  });
};
