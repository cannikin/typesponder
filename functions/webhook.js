const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.AMAZON_ACCESS_KEY_ID,
  secretAccessKey: process.env.AMAZON_SECRET_ACCESS_KEY,
  region: process.env.AMAZON_DYNAMODB_REGION
});

if (process.env.AMAZON_DYNAMODB_ENDPOINT) {
  AWS.config.update({ endpoint: process.env.AMAZON_DYNAMODB_ENDPOINT })
}

const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = (event, context, callback) => {

  // only respond to POST
  if (event.httpMethod !== "POST") {
    callback(null, {
      statusCode: 404,
      body: ""
    })
  }

  const response = JSON.parse(event.body).form_response

  console.log(response)

  if (!getEmail()) {
    // no email found, but return 200 so Typeform is happy
    callback(null, {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "No email found, skipping" })
    })
  }

  // parse out some important fields we care about
  const responseId = response.token.toLowerCase()
  const formId = response.form_id
  const createdAt = response.submitted_at
  const email = getEmail()
  const answers = response.answers

  function getEmail() {
    const answer = response.answers.find(f => f.type === "email")
    const hidden = response.hidden

    return (answer || {}).email || (hidden || {}).email
  }

  function formattedAnswers() {
    let output = []

    answers.forEach(answer => {
      let text = ""
      
      switch (answer.type) {
        case "choice":
          text = answer.choice.label
          break
        default:
          text = String(answer[answer.type])
      }

      output.push({
        questionId: answer.field.id,
        text: text
      })
    })

    return output
  }

  // the entire Item that DynamoDB expects
  function formattedResponse() {
    return {
      formId: formId,
      id: responseId,
      answers: formattedAnswers()
    }
  }

  // given a user, adds the latest response to it, otherwise creates a new user with an id 
  // of lastId + 1
  function formattedUser(user, lastId) {
    if (user) {  
      let existingUser = user
      existingUser.responses.push(formattedResponse())
      return existingUser
    } else {
      return {
        id: ++lastId,
        createdAt: createdAt,
        email: email,
        notes: " ",
        responses: [formattedResponse()]
      }
    }
  }

  // actually saves the user to DyanmoDB
  function saveUser(user, lastId, afterSaveCallback) {
    const userData = formattedUser(user, lastId)

    docClient.put({ TableName: "users", Item: userData }, (err, data) => {
      if (err) {
        callback(null, {
          statusCode: 500,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(err)
        })
      } else {
        afterSaveCallback(userData)
      }
    })
  }

  // will only get here if an email address is found in the response
  docClient.scan({ TableName: "users" }, (err, data) => {
    if (err) {
      callback(null, {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(err)
      })
    } else {
      let existingUser = data.Items.find(user => user.email === email)
      let lastId = data.Items.sort((a, b) => {
        if (a.id > b.id) {
          return 1
        } else {
          return -1
        }
      }).pop().id

      saveUser(existingUser, lastId, (user) => {
        callback(null, {
          statusCode: 200,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user)
        })
      })
    }
  })
}
