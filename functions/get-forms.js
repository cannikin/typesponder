// Returns all forms and a limit of 25 users. Pass ?lastUser=123 for the starting point for the next
// 25 users

const AWS = require("./dynamo_connect");
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = (_event, _context, callback) => {
  docClient.scan({ TableName: "forms" }, (_err, forms) => {
    callback(null, {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        forms: forms.Items
      })
    });
  });
};

// If using limit then resultset will return `LastEvaluatedKey`, give that to the next query in the form of `ExclusiveStartKey`
