// returns a count of how many users there are in DynamoDB

const AWS = require("./dynamo_connect");
const docClient = new AWS.DynamoDB.DocumentClient();

const Count = async () => {
  let done = false,
    lastUser = null,
    count = 0,
    request,
    data,
    params;

  while (!done) {
    params = {
      TableName: "users",
      Select: "COUNT",
      ExclusiveStartKey: lastUser ? { id: parseInt(lastUser) } : null
    };
    request = docClient.scan(params);
    data = await request.promise();
    count += data.Count;

    if (data.LastEvaluatedKey) {
      lastUser = data.LastEvaluatedKey.id;
    } else {
      done = true;
    }
  }

  return count;
};

module.exports = Count;
