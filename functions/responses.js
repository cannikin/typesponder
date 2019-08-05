const fetch = require("node-fetch")

const ACCESS_TOKEN = "AvWBFZmj55JZMitwGFyMcSV5iJYMHmjAgPNv5pWYyZ6t"
const FORMS = [
  { name: "intro", id: "bv8u0Y" },
  //{ name: "existing-start", id: "VwLtMw" }
]

let raw = {
  questions: [],
  answers: []
}

function getQuestions(formId) {
  return fetch(`https://api.typeform.com/forms/${formId}`, {
    headers: {
      "Authorization": `Bearer ${ACCESS_TOKEN}`
    }
  }).then(response => {
    return response.json()
  }).then(data => {
    collectQuestions(formId, data)
  })
}

function collectQuestions(formId, data) {
  let filteredData = []

  data.fields.forEach(field => {
    if (field.type !== 'statement') {
      filteredData.push({ [field.id]: field.title })
    }
  })

  raw.questions.push({ [formId]: filteredData })
}

function getAnswers(formId) {
  return fetch(`https://api.typeform.com/forms/${formId}/responses`, {
    headers: {
      "Authorization": `Bearer ${ACCESS_TOKEN}`
    }
  }).then(response => {
    return response.json()
  }).then(data => {
    collectAnswers(formId, data)
  })
}

function collectAnswers(formId, data) {
  let filteredData = []

  data.items.forEach(item => {
    if (item.answers) {
      filteredData.push({ [item.response_id]: item.answers })
    }
  })

  raw.answers.push({ [formId]: filteredData })
}

// takes our hashes of questions and answers and formats them for the frontend
function format() {
  return new Promise((resolve, reject) => {
    console.info(raw)

    resolve()
  })
}

function getData() {
  return new Promise((resolve, reject) => {
    try {
      FORMS.forEach(form =>
        getQuestions(form.id)
        .then(() => getAnswers(form.id)
          .then(() => format()
            .then(() => resolve())
          )
        )
      )
    } catch(error) { reject(error) }
  })
}


// get answers
// fetch("https://api.typeform.com/forms/bv8u0Y/responses", {
//   headers: {
//     "Authorization": "Bearer AvWBFZmj55JZMitwGFyMcSV5iJYMHmjAgPNv5pWYyZ6t"
//   }
// }).then(response => {
//   return response.json()
// }).then(data => {
//   let filteredData = data.items.filter(d => d.answers)
//   console.info(filteredData.map(d => d.answers))
// }).catch(error => console.error(error))

// const data = [
//   {
//     id: "abcd",
//     email: "rob.cameron@fastmail.com",
//     created_at: new Date(),
//     tags: ['exiting'],
//     answers: [
//       { question: "Name", answer: "Rob Cameron" },
//       { question: "Organization Name", answer: "Cameron Tech" },
//       { question: "Countries your organization operates in", answer: "USA and Canada" },
//       { question: "How would you describe what your organization does to an interested non-expert?", answer: "We make cool stuff" },
//       { question: "What current family planning programming do you have? How does it fit within your overall programming?", answer: "Lorem ipsum dolor amet pitchfork literally craft beer salvia hot chicken. Hoodie master cleanse irony blog chicharrones helvetica pok pok, williamsburg 3 wolf moon mustache kale chips pitchfork edison bulb. Umami chillwave squid cred, trust fund schlitz pug etsy post-ironic retro chartreuse adaptogen coloring book snackwave. Yr la croix sriracha, banjo cred fixie cornhole hammock kickstarter chicharrones.\n\nJianbing la croix aesthetic ugh, raw denim typewriter pork belly coloring book food truck cray. Tumeric narwhal brooklyn, crucifix authentic chicharrones gluten-free mlkshk etsy hot chicken small batch ethical. Helvetica heirloom etsy knausgaard mlkshk. Chicharrones wayfarers authentic, cloud bread synth locavore banjo try-hard poke. Kickstarter raw denim scenester echo park sartorial iPhone, mumblecore locavore keffiyeh hoodie. YOLO tumeric affogato, gochujang banh mi selvage put a bird on it 90's next level swag normcore chia pok pok." }
//     ],
//     notes: "Love this guy!"
//   },
//   {
//     id: "efgh",
//     email: "jack.cameron@icloud.com",
//     created_at: new Date(),
//     tags: ['existing'],
//     answers: [
//       { question: "Name", answer: "Jack Cameron" },
//       { question: "Organization Name", answer: "Transformers Inc." },
//       { question: "Countries your organization operates in", answer: "USA and Canada" },
//       { question: "How would you describe what your organization does to an interested non-expert?", answer: "Spend all dad's money on Transformers" },
//       { question: "What current family planning programming do you have? How does it fit within your overall programming?", answer: "Lorem ipsum dolor amet pitchfork literally craft beer salvia hot chicken. Hoodie master cleanse irony blog chicharrones helvetica pok pok, williamsburg 3 wolf moon mustache kale chips pitchfork edison bulb. Umami chillwave squid cred, trust fund schlitz pug etsy post-ironic retro chartreuse adaptogen coloring book snackwave. Yr la croix sriracha, banjo cred fixie cornhole hammock kickstarter chicharrones.\n\nJianbing la croix aesthetic ugh, raw denim typewriter pork belly coloring book food truck cray. Tumeric narwhal brooklyn, crucifix authentic chicharrones gluten-free mlkshk etsy hot chicken small batch ethical. Helvetica heirloom etsy knausgaard mlkshk. Chicharrones wayfarers authentic, cloud bread synth locavore banjo try-hard poke. Kickstarter raw denim scenester echo park sartorial iPhone, mumblecore locavore keffiyeh hoodie. YOLO tumeric affogato, gochujang banh mi selvage put a bird on it 90's next level swag normcore chia pok pok." }
//     ],
//     notes: null
//   },
//   {
//     id: "jklm",
//     email: "kate.cameron@icloud.com",
//     created_at: new Date(),
//     tags: ['intro'],
//     answers: [
//       { question: "Name", answer: "Kate Cameron" },
//       { question: "Organization Name", answer: "Ponies LLC" },
//       { question: "Countries your organization operates in", answer: "USA and Canada" }
//     ],
//     notes: null
//   }
// ]

exports.handler = async (event, context) => {
  return getData()
    .then(() => {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(raw)
      }
    }).catch(error => (
      {
        statusCode: 500,
        body: JSON.stringify({ error: String(error) })
      }
    ))
}
