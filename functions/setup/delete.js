var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
  accessKeyId: 'KEY',
  secretAccessKey: 'SECRET',
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

docClient.delete({
  TableName: "users",
  Key: {
    id: "nderitudavid@gmail.com"
  }
}, function (err, data) {
  if (err) {
    console.error(err)
  } else {
    console.info("record destroyed")
  }
})
