const AWS = require("./helpers/dynamo_connect");
const docClient = new AWS.DynamoDB.DocumentClient();
const IGNORE_QUESTION_IDS = ["FNpSFI70cRum", "xoPkRLGnE7M1"];

exports.handler = async (event, _context) => {
  // only respond to POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 404,
      body: ""
    };
  }

  const response = JSON.parse(event.body).form_response;

  console.log(response);

  if (!getEmail()) {
    console.log("No email found, skipping");
    // no email found, but return 200 so Typeform is happy
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "No email found, skipping" })
    };
  }

  // parse out some important fields we care about
  const responseId = response.token.toLowerCase();
  const formId = response.form_id;
  const createdAt = response.submitted_at;
  const email = getEmail();
  const answers = response.answers;

  function getEmail() {
    const answer = response.answers.find(f => f.type === "email");
    const hidden = response.hidden;

    return (answer || {}).email || (hidden || {}).email;
  }

  function formattedAnswers() {
    let output = [];

    answers.forEach(answer => {
      let text = "";

      if (IGNORE_QUESTION_IDS.indexOf(answer.field.id) === -1) {
        switch (answer.type) {
          case "choice":
            text = answer.choice.label;
            break;
          default:
            text = String(answer[answer.type]);
        }

        output.push({
          questionId: answer.field.id,
          text: text
        });
      }
    });

    return output;
  }

  // the entire Item that DynamoDB expects
  function formattedResponse() {
    return {
      formId: formId,
      id: responseId,
      answers: formattedAnswers()
    };
  }

  // given a user, adds the latest response to it, otherwise creates a new user with an id
  // of lastId + 1
  function formattedUser(user, lastId) {
    if (user) {
      let existingUser = user;
      existingUser.responses.push(formattedResponse());
      return existingUser;
    } else {
      return {
        id: ++lastId,
        createdAt: createdAt,
        email: email,
        notes: " ",
        responses: [formattedResponse()]
      };
    }
  }

  // actually saves the user to DyanmoDB
  async function saveUser(user, lastId, afterSaveCallback) {
    const userData = formattedUser(user, lastId);
    const request = docClient.put({ TableName: "users", Item: userData });
    const data = await request.promise();

    return userData;
  }

  async function getExistingUser() {
    const request = docClient.query({
      TableName: "users",
      IndexName: "email-index",
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": getEmail()
      }
    });
    const promise = await request.promise();

    return promise.Items[0];
  }

  async function getLastId() {
    let done = false,
      lastUser = null,
      ids = [],
      request,
      data,
      params;

    while (!done) {
      params = {
        TableName: "users",
        AttributesToGet: ["id"],
        ExclusiveStartKey: lastUser ? { id: parseInt(lastUser) } : null
      };
      request = docClient.scan(params);
      data = await request.promise();
      ids = ids.concat(data.Items.map(item => item.id));

      if (data.LastEvaluatedKey) {
        lastUser = data.LastEvaluatedKey.id;
      } else {
        done = true;
      }
    }

    return ids.sort((a, b) => a - b).pop();
  }

  // will only get here if an email address is found in the response

  const existingUser = await getExistingUser();
  const lastId = await getLastId();
  const user = await saveUser(existingUser, lastId);

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  };

  // DEBUG OUTPUT
  // return {
  //   statusCode: 200,
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ existingUser, lastId })
  // };
};
