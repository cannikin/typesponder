const fetch = require("node-fetch")

const ACCESS_TOKEN = "AvWBFZmj55JZMitwGFyMcSV5iJYMHmjAgPNv5pWYyZ6t"
const FORMS = [
  { name: "intro", id: "bv8u0Y", ignoredQuestions: ["FNpSFI70cRum", "xoPkRLGnE7M1"] },

  { name: "e-start", id: "VwLtMw", ignoredQuestions: [] },
  { name: "e-no_workshop", id: "cpVmqA", ignoredQuestions: [] },
  { name: "e-workshop", id: "xktNJH", ignoredQuestions: [] },
  { name: "e-visit", id: "VVnEvV", ignoredQuestions: [] },
  { name: "e-big_picture", id: "s1Vr4F", ignoredQuestions: [] },
  { name: "e-finances", id: "MlQjwT", ignoredQuestions: [] },
  { name: "e-existing_program", id: "aOvsHK", ignoredQuestions: [] },
  { name: "e-new_program", id: "dfU7O3", ignoredQuestions: [] },

  { name: "n-start", id: "vuL4pI", ignoredQuestions: [] },
  { name: "n-activities", id: "SO6tIV", ignoredQuestions: [] },
  { name: "n-big_picture", id: "aWm1bg", ignoredQuestions: [] },
  { name: "n-finances", id: "W3k3ee", ignoredQuestions: [] },
  { name: "n-attachments", id: "XB0CzI", ignoredQuestions: [] }
]
const AUTH_HEADER = {
  "Authorization": `Bearer ${ACCESS_TOKEN}`
}

exports.handler = async (event, context) => {

  const raw = {
    questions: [],
    answers: []
  }
  let output = []

  // custom version of forEach that respects promises
  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  // API request for typeform, returns json
  async function typeformRequest(endpoint) {
    let response = await fetch(endpoint, {
      headers: AUTH_HEADER
    })
    return await response.json()
  }

  // gets all questions across all forms
  async function getQuestions() {
    await asyncForEach(FORMS, async form => {
      const data = await typeformRequest(`https://api.typeform.com/forms/${form.id}`)

      data.fields.forEach(field => {
        if (field.type !== 'statement') {
          raw.questions.push({ id: field.id, formId: form.id, question: field.title })
        }
      })
    })
  }

  // gets all responses across all forms
  async function getAnswers() {
    await asyncForEach(FORMS, async form => {
      const data = await typeformRequest(`https://api.typeform.com/forms/${form.id}/responses`)

      data.items.forEach(item => {
        if (item.answers) {
          raw.answers.push({
            id: item.response_id,
            formId: form.id,
            createdAt: item.submitted_at,
            answers: Object.assign(item.answers, item.hidden)
          })
        }
      })
    })
  }

  // formats questions and answers in a nice format for the frontend
  function format() {
    raw.answers.forEach(data => {
      let userAnswers = [],
          email = extractEmail(data.answers),
          form = FORMS.find(f => f.id === data.formId)

      data.answers.forEach(answer => {
        if (answer.field) {
          let question = raw.questions.find(q => q.id === answer.field.id)
          if (shouldIncludeQuestion(form, question)) {
            userAnswers.push({ question: question.question, answer: answer[answer.type] })
          }
        }
      })

      let existingUser = output.find(o => o.email === email)

      if (existingUser) {
        // user already found, just append answers
        existingUser.tags.push(form.name)
        existingUser.answers = existingUser.answers.concat(userAnswers)
      } else {
        // user doesn't exist, add to output along with answers
        output.push({
          id: data.id,
          email: email,
          createdAt: data.createdAt,
          tags: [form.name],
          answers: userAnswers
        })
      }
    })

    return output.filter(o => o.email)
  }

  function shouldIncludeQuestion(form, question) {
    return form.ignoredQuestions.indexOf(question.id) === -1
  }

  function extractEmail(answers) {
    if (answers.email) {
      return answers.email
    } else {
      let emailField = answers.find(a => a.field && a.field.type === 'email')
      return emailField && emailField.email
    }
  }

  await getQuestions();
  await getAnswers();
  output = format()

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(output)
  }

}
