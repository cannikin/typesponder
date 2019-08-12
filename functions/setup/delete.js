var AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.AMAZON_ACCESS_KEY_ID,
  secretAccessKey: process.env.AMAZON_SECRET_ACCESS_KEY,
  region: process.env.AMAZON_DYNAMODB_REGION
});

if (process.env.AMAZON_DYNAMODB_ENDPOINT) {
  AWS.config.update({ endpoint: process.env.AMAZON_DYNAMODB_ENDPOINT })
}

var docClient = new AWS.DynamoDB.DocumentClient();

docClient.scan({ TableName: "users" }, (err, data) => {
  console.info("users: ", data)
  data.Items.forEach(user => {
    console.info("Deleting user " + user.id)
    docClient.delete({
      TableName: "users",
      Key: {
        id: user.id
      }
    }, (err, data) => {
      console.info(err)
    })
  })
})

docClient.scan({ TableName: "forms" }, (err, data) => {
  console.info("forms: ", data)
  data.Items.forEach(form => {
    console.info("Deleting form " + form.id)
    docClient.delete({
      TableName: "forms",
      Key: {
        id: form.id
      }
    }, (err, data) => {
      console.info(err)
    })
  })
})


// docClient.delete({
//   TableName: "users",
//   Key: {
//     id: "nderitudavid@gmail.com"
//   }
// }, function (err, data) {
//   if (err) {
//     console.error(err)
//   } else {
//     console.info("record destroyed")
//   }
// })
