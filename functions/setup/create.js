const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.AMAZON_ACCESS_KEY_ID,
  secretAccessKey: process.env.AMAZON_SECRET_ACCESS_KEY,
  region: process.env.AMAZON_DYNAMODB_REGION
});

if (process.env.AMAZON_DYNAMODB_ENDPOINT) {
  AWS.config.update({ endpoint: process.env.AMAZON_DYNAMODB_ENDPOINT });
}

const dynamodb = new AWS.DynamoDB();

////////////////////////////////
// Forms
////////////////////////////////

const forms = {
  TableName: "forms",
  KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
  AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  }
};

// dynamodb.deleteTable({ TableName: "forms" }, (err, data) => {
dynamodb.createTable(forms, function(err, data) {
  if (err) {
    console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
  } else {
    console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
  }
});
// });

////////////////////////////////
// Users
////////////////////////////////

const users = {
  TableName: "users",
  KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
  AttributeDefinitions: [
    { AttributeName: "id", AttributeType: "N" },
    { AttributeName: "email", AttributeType: "S" }
  ],
  GlobalSecondaryIndexes: [
    {
      IndexName: "email-index",
      KeySchema: [
        {
          AttributeName: "email",
          KeyType: "HASH"
        }
      ],
      Projection: {
        ProjectionType: "ALL"
      },
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
      }
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  }
};

// dynamodb.deleteTable({ TableName: "users" }, (err, data) => {
dynamodb.createTable(users, function(err, data) {
  if (err) {
    console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
  } else {
    console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
  }
});
// });
