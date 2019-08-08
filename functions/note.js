const Photon = require("@generated/photon")
const photon = new Photon({ debug: true })

exports.handler = async (event, context) => {

  const data = JSON.parse(event.body)

  console.info(`id: ${data.id}`)
  console.info(`text: ${data.text}`)

  // only respond to POST
  if (event.httpMethod != 'POST') {
    return callback(null, {
      statusCode: 404,
      body: ''
    })
  }

  const updatedNote = await photon.notes.update({
    where: {
      id: parseInt(data.id)
    },
    data: {
      text: data.text
    }
  })
  
  return {
    statusCode: 200,
    body: JSON.stringify(updatedNote)
  }
}
