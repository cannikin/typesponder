var AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env("AMAZON_ACCESS_KEY_ID"),
  secretAccessKey: process.env("AMAZON_SECRET_ACCESS_KEY"), 
  region: process.env("AMAZON_DYNAMODB_REGION")
});

var dynamodb = new AWS.DynamoDB();

////////////////////////////////
// Forms
////////////////////////////////

var forms = {
  TableName: "forms",
  KeySchema: [
    { AttributeName: "id", KeyType: "HASH" },  //Partition key
  ],
  AttributeDefinitions: [
    { AttributeName: "id", AttributeType: "S" },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  }
};

dynamodb.createTable(forms, function (err, data) {
  if (err) {
    console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
  } else {
    console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
  }
});

////////////////////////////////
// Users
////////////////////////////////

var users = {
  TableName: "users",
  KeySchema: [
    { AttributeName: "id", KeyType: "HASH" }
  ],
  AttributeDefinitions: [
    { AttributeName: "id", AttributeType: "S" }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  }
};

dynamodb.createTable(users, function (err, data) {
  if (err) {
    console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
  } else {
    console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
  }
});

