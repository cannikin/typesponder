// Returns all forms and a limit of 25 users. Pass ?lastUser=123 for the starting point for the next
// 25 users

const AWS = require("./dynamo_connect");
const docClient = new AWS.DynamoDB.DocumentClient();
const PER_PAGE = 25;

exports.handler = (event, context, callback) => {
  const lastUser = event.queryStringParameters.lastUser;

  let userParams = {
    TableName: "users",
    Limit: PER_PAGE,
    ExclusiveStartKey: lastUser ? { id: parseInt(lastUser) } : null
  };

  docClient.scan(userParams, (err, users) => {
    callback(null, {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        users: users.Items,
        lastUser: users.LastEvaluatedKey
      })
    });
  });
};

// If using limit then resultset will return `LastEvaluatedKey`, give that to the next query in the form of `ExclusiveStartKey`
