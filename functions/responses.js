const fetch = require("node-fetch")

exports.handler = async (event, context) => {

  const ACCESS_TOKEN = "AvWBFZmj55JZMitwGFyMcSV5iJYMHmjAgPNv5pWYyZ6t"
  const FORMS = [
    { name: "intro", id: "bv8u0Y", ignoredQuestions: ["FNpSFI70cRum", "xoPkRLGnE7M1"] },
    { name: "existing", id: "VwLtMw", ignoredQuestions: [] }
  ]
  const AUTH_HEADER = {
    "Authorization": `Bearer ${ACCESS_TOKEN}`
  }

  const raw = {
    questions: [],
    answers: []
  }
  let output = []

  async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }

  async function typeformRequest(endpoint) {
    let response = await fetch(endpoint, {
      headers: AUTH_HEADER
    })
    return await response.json()
  }

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

  async function getAnswers() {
    await asyncForEach(FORMS, async form => {
      const data = await typeformRequest(`https://api.typeform.com/forms/${form.id}/responses`)

      data.items.forEach(item => {
        if (item.answers) {
          raw.answers.push({
            id: item.response_id,
            formId: form.id,
            createdAt: item.submitted_at,
            answers: item.answers
          })
        }
      })
    })
  }

  // takes our hashes of questions and answers and formats them for the frontend
  function format() {
    raw.answers.forEach(data => {
      let userAnswers = [],
          email = extractEmail(data.answers),
          form = FORMS.find(f => f.id == data.formId)

      data.answers.forEach(answer => {
        let question = raw.questions.find(q => q.id === answer.field.id)
        if (shouldIncludeQuestion(form, question)) {
          userAnswers.push({ question: question.question, answer: answer[answer.type] })
        }
      })

      let existingUser = output.find(o => o.email === email)

      if (existingUser) {
        // user already found, just append answers
        existingUser.answers.concat(userAnswers)
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
    let emailField = answers.find(a => a.field && a.field.type === 'email')
    return emailField && emailField.email
  }

  await getQuestions();
  await getAnswers();

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(format())
  }



    // .then(() => {
    //   return {
    //     statusCode: 200,
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(output)
    //   }
    // }).catch(error => (
    //   {
    //     statusCode: 500,
    //     body: JSON.stringify({ error: String(error) })
    //   }
    // ))
}
