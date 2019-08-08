const Photon = require("@generated/photon")
const photon = new Photon({ debug: true })

exports.handler = async (event, context) => {

  let output = []

  const users = await photon.users.findMany({
    include: {
      note: true,
      responses: {
        include: {
          answers: true
        }
      }
    }
  })

  const forms = await photon.forms.findMany({
    include: {
      questions: true
    }
  })

  output = { forms, users }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(output)
  }

}
