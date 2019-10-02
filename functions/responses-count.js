const Count = require("./helpers/count");

exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      responsesCount: await Count()
    })
  };
};
