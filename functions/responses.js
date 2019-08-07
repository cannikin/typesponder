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

  // output = [
  //   {
  //     "id": "4rdvi15b6k298w1lslg34rdh0934tklk",
  //     "email": "jamesgondwe@cydmalawi.org",
  //     "createdAt": "2019-08-05T17:46:38Z",
  //     "tags": [
  //       "intro"
  //     ],
  //     "answers": [
  //       {
  //         "question": "Your name",
  //         "answer": "James Gondwe"
  //       },
  //       {
  //         "question": "Organization name",
  //         "answer": "Centre for Youth and Development"
  //       },
  //       {
  //         "question": "Your position within the organization",
  //         "answer": "Executive Director"
  //       },
  //       {
  //         "question": "Organization website (if available)",
  //         "answer": "https://www.cydmalawi.org"
  //       },
  //       {
  //         "question": "Your phone",
  //         "answer": "+265999940260"
  //       },
  //       {
  //         "question": "Your email",
  //         "answer": "jamesgondwe@cydmalawi.org"
  //       },
  //       {
  //         "question": "Countries your organization operates in",
  //         "answer": "Malawi"
  //       },
  //       {
  //         "question": "How would you describe what your organization does to an interested non-expert?",
  //         "answer": "We are a local Non-Governmental organization that works with Government and communities to improve lives for children, youth and women to create a conducive environment for them to develop to their fullest potential. We effect changes in sectors of education, sustainable livelihoods and health."
  //       },
  //       {
  //         "question": "What current family planning programming do you have? How does it fit within your overall programming?",
  //         "answer": "Our family planning program is called \"Community-based Integrated family planning Promotion (CIFPP)\" and is embedded in our strategic plan and aims at enabling people to have access to information, products and services. \n\nOur model revolves around “Community-Health workers (CHW)” who are based in communities but are linked to health facilities.  Our model builds the capacity of CWH and provides them with tools to ensure that family planning services are provided effectively. Apart from training, we also provide push bicycles for mobility and materials for raising awareness. We also conduct social mobilization through the use of Theatre for Development by training youth on theatre and Family planning. \n\nWe also work on Health governance in relation to family at facility level but also at district level. Our work at facility level is with the Health Advisory committee, by providing them with training on social accountability specifically Community Score Card. They facilitate these sessions with health facility staff and community members to rank service delivery and develop plans for improvement. At district level we work with the District Health Technical Committee to lobby for provision of contraceptives and improved service delivery in the district specifically hard to reach areas. \n\nFamily planning contributes to health family's, health children, youth and women allowing them to access education and other opportunities and reach their fullest potential. \n"
  //       }
  //     ]
  //   },
  //   {
  //     "id": "mlz8kqbgq6gp31i12jlmlz8kqjcwyo1i",
  //     "email": "tprestonwerner@gmail.com",
  //     "createdAt": "2019-08-01T20:58:00Z",
  //     "tags": [
  //       "intro",
  //       "existing-start"
  //     ],
  //     "answers": [
  //       {
  //         "question": "Your name",
  //         "answer": "goog"
  //       },
  //       {
  //         "question": "Organization name",
  //         "answer": "fah"
  //       },
  //       {
  //         "question": "Your position within the organization",
  //         "answer": "la"
  //       },
  //       {
  //         "question": "Organization website (if available)",
  //         "answer": "https://www.prestonwernerventures.com"
  //       },
  //       {
  //         "question": "Your phone",
  //         "answer": "+14152384980"
  //       },
  //       {
  //         "question": "Your email",
  //         "answer": "tprestonwerner@gmail.com"
  //       },
  //       {
  //         "question": "Countries your organization operates in",
  //         "answer": "fjfjfj"
  //       },
  //       {
  //         "question": "How would you describe what your organization does to an interested non-expert?",
  //         "answer": "goog"
  //       },
  //       {
  //         "question": "What current family planning programming do you have? How does it fit within your overall programming?",
  //         "answer": "so much"
  //       },
  //       {
  //         "question": "Your name",
  //         "answer": "cool"
  //       },
  //       {
  //         "question": "Organization name",
  //         "answer": "got it"
  //       },
  //       {
  //         "question": "Your position in the organization",
  //         "answer": "hello"
  //       },
  //       {
  //         "question": "Your email address",
  //         "answer": "tprestonwerner@gmail.com"
  //       },
  //       {
  //         "question": "Your phone number",
  //         "answer": "+14152384980"
  //       },
  //       {
  //         "question": "Countries your organization operates in",
  //         "answer": "zambia"
  //       },
  //       {
  //         "question": "Number of paid staff and basic list of positions",
  //         "answer": "3"
  //       },
  //       {
  //         "question": "Last year's operating budget (in US$)",
  //         "answer": "fm"
  //       },
  //       {
  //         "question": "Did you attend the youth and family planning workshop in Kampala?",
  //         "answer": true
  //       },
  //       {
  //         "question": "Has Preston-Werner Ventures staff visited your project in the field yet?",
  //         "answer": true
  //       }
  //     ]
  //   },
  //   {
  //     "id": "tdp2k3kyxtm9ix2p6vj1zakb4etdp2k3",
  //     "email": "rob.cameron@fastmail.com",
  //     "createdAt": "2019-08-01T20:37:37Z",
  //     "tags": [
  //       "intro"
  //     ],
  //     "answers": [
  //       {
  //         "question": "Your name",
  //         "answer": "Rob Cameron"
  //       },
  //       {
  //         "question": "Organization name",
  //         "answer": "Cameron Tech"
  //       },
  //       {
  //         "question": "Your position within the organization",
  //         "answer": "Owner"
  //       },
  //       {
  //         "question": "Organization website (if available)",
  //         "answer": "https://camerontech.io"
  //       },
  //       {
  //         "question": "Your phone",
  //         "answer": "+17606725123"
  //       },
  //       {
  //         "question": "Your email",
  //         "answer": "rob.cameron@fastmail.com"
  //       },
  //       {
  //         "question": "Countries your organization operates in",
  //         "answer": "USA, Canada"
  //       },
  //       {
  //         "question": "How would you describe what your organization does to an interested non-expert?",
  //         "answer": "We make cool stuff"
  //       },
  //       {
  //         "question": "What current family planning programming do you have? How does it fit within your overall programming?",
  //         "answer": "None, sorry!"
  //       }
  //     ]
  //   },
  //   {
  //     "id": "jywc3ewq9ua7a4t4a0jywc3e88rlbnlz",
  //     "email": "theresa@cooldude.com",
  //     "createdAt": "2019-08-01T20:46:29Z",
  //     "tags": [
  //       "existing-start",
  //       "existing-workshop",
  //       "existing-big_picture",
  //       "existing-finances"
  //     ],
  //     "answers": [
  //       {
  //         "question": "Your name",
  //         "answer": "My name"
  //       },
  //       {
  //         "question": "Organization name",
  //         "answer": "My org"
  //       },
  //       {
  //         "question": "Your position in the organization",
  //         "answer": "Boss"
  //       },
  //       {
  //         "question": "Organization website (if applicable)",
  //         "answer": "https://www.cooldude.com"
  //       },
  //       {
  //         "question": "Your email address",
  //         "answer": "theresa@cooldude.com"
  //       },
  //       {
  //         "question": "Your phone number",
  //         "answer": "+13143455678"
  //       },
  //       {
  //         "question": "Countries your organization operates in",
  //         "answer": "America"
  //       },
  //       {
  //         "question": "Number of paid staff and basic list of positions",
  //         "answer": "3"
  //       },
  //       {
  //         "question": "Last year's operating budget (in US$)",
  //         "answer": "3M"
  //       },
  //       {
  //         "question": "Did you attend the youth and family planning workshop in Kampala?",
  //         "answer": true
  //       },
  //       {
  //         "question": "Has Preston-Werner Ventures staff visited your project in the field yet?",
  //         "answer": false
  //       },
  //       {
  //         "question": "What problems with access to family planning supplies/information/rights do you have within your community? How do you know? What kinds of needs assessment(s) did you complete within the community?",
  //         "answer": "ducing both our individual carbon footprint and the “number of feet” through culturally-sensitive programming is a cost effective strategy to mitigate climate change. Through our Every Human Counts program, we focus on increasing access to voluntary family planning in developing economies and in the Global North. \n\nWe are in a learning phase at our foundation, and we view our grantees as guides who will show us what approaches to girls’ and women’s reproductive care and education work best in their communities. Our current portfolio of projects represent for-profit, social impact investing and philanthropic investing. We have focused on working with grantees who are willing to teach us about the challenges of program implementation--what works and what doesn’t--so that we can develop as a sympathetic, collaborative partner. \n\n[show grantee orgs and link to their websites]\n\nFor the 2019-2020 grant cycle, Preston-Werner Ventures is seeking to fund family planning-focused projects, especially those involving community health workers. We also will consider proposals to provide financial support for grassroots NGOs and internationally-oriented nonprofits that inform public discourse about the public health need for family planning, as well as activist organizations that build movements and bolster government support for implementation of family planning programming. \n\nIn the future, w\n"
  //       },
  //       {
  //         "question": "How did you determine that your program(s) will solve the problem(s)?",
  //         "answer": "ducing both our individual carbon footprint and the “number of feet” through culturally-sensitive programming is a cost effective strategy to mitigate climate change. Through our Every Human Counts program, we focus on increasing access to voluntary family planning in developing economies and in the Global North. \n\nWe are in a learning phase at our foundation, and we view our grantees as guides who will show us what approaches to girls’ and women’s reproductive care and education work best in their communities. Our current portfolio of projects represent for-profit, social impact investing and philanthropic investing. We have focused on working with grantees who are willing to teach us about the challenges of program implementation--what works and what doesn’t--so that we can develop as a sympathetic, collaborative partner. \n\n[show grantee orgs and link to their websites]\n\nFor the 2019-2020 grant cycle, Preston-Werner Ventures is seeking to fund family planning-focused projects, especially those involving community health workers. We also will consider proposals to provide financial support for grassroots NGOs and internationally-oriented nonprofits that inform public discourse about the public health need for family planning, as well as activist organizations that build movements and bolster government support for implementation of family planning programming. \n\nIn the future, w\n"
  //       },
  //       {
  //         "question": "Think about your family planning work this past year. What outputs and outcomes did you measure? What does the data you collected tell you about your programs? Did you collect any data that demonstrated long-term impact?",
  //         "answer": "ducing both our individual carbon footprint and the “number of feet” through culturally-sensitive programming is a cost effective strategy to mitigate climate change. Through our Every Human Counts program, we focus on increasing access to voluntary family planning in developing economies and in the Global North. \n\nWe are in a learning phase at our foundation, and we view our grantees as guides who will show us what approaches to girls’ and women’s reproductive care and education work best in their communities. Our current portfolio of projects represent for-profit, social impact investing and philanthropic investing. We have focused on working with grantees who are willing to teach us about the challenges of program implementation--what works and what doesn’t--so that we can develop as a sympathetic, collaborative partner. \n\n[show grantee orgs and link to their websites]\n\nFor the 2019-2020 grant cycle, Preston-Werner Ventures is seeking to fund family planning-focused projects, especially those involving community health workers. We also will consider proposals to provide financial support for grassroots NGOs and internationally-oriented nonprofits that inform public discourse about the public health need for family planning, as well as activist organizations that build movements and bolster government support for implementation of family planning programming. \n\nIn the future, w\n"
  //       },
  //       {
  //         "question": "Please provide some programmatic and administrative success stories from the past year. What are you most proud of? What ran smoothly?",
  //         "answer": "ducing both our individual carbon footprint and the “number of feet” through culturally-sensitive programming is a cost effective strategy to mitigate climate change. Through our Every Human Counts program, we focus on increasing access to voluntary family planning in developing economies and in the Global North. \n\nWe are in a learning phase at our foundation, and we view our grantees as guides who will show us what approaches to girls’ and women’s reproductive care and education work best in their communities. Our current portfolio of projects represent for-profit, social impact investing and philanthropic investing. We have focused on working with grantees who are willing to teach us about the challenges of program implementation--what works and what doesn’t--so that we can develop as a sympathetic, collaborative partner. \n\n[show grantee orgs and link to their websites]\n\nFor the 2019-2020 grant cycle, Preston-Werner Ventures is seeking to fund family planning-focused projects, especially those involving community health workers. We also will consider proposals to provide financial support for grassroots NGOs and internationally-oriented nonprofits that inform public discourse about the public health need for family planning, as well as activist organizations that build movements and bolster government support for implementation of family planning programming. \n\nIn the future, w\n"
  //       },
  //       {
  //         "question": "Reflect on your family planning programming from the past year -- what needed to change from your initial plan? Did you make any pivots? Share your learnings about what didn’t exactly go as expected.",
  //         "answer": "ducing both our individual carbon footprint and the “number of feet” through culturally-sensitive programming is a cost effective strategy to mitigate climate change. Through our Every Human Counts program, we focus on increasing access to voluntary family planning in developing economies and in the Global North. \n\nWe are in a learning phase at our foundation, and we view our grantees as guides who will show us what approaches to girls’ and women’s reproductive care and education work best in their communities. Our current portfolio of projects represent for-profit, social impact investing and philanthropic investing. We have focused on working with grantees who are willing to teach us about the challenges of program implementation--what works and what doesn’t--so that we can develop as a sympathetic, collaborative partner. \n\n[show grantee orgs and link to their websites]\n\nFor the 2019-2020 grant cycle, Preston-Werner Ventures is seeking to fund family planning-focused projects, especially those involving community health workers. We also will consider proposals to provide financial support for grassroots NGOs and internationally-oriented nonprofits that inform public discourse about the public health need for family planning, as well as activist organizations that build movements and bolster government support for implementation of family planning programming. \n\nIn the future, w\n"
  //       },
  //       {
  //         "question": "Are you still serving the same population as you were last year? Why or why not?",
  //         "answer": "ducing both our individual carbon footprint and the “number of feet” through culturally-sensitive programming is a cost effective strategy to mitigate climate change. Through our Every Human Counts program, we focus on increasing access to voluntary family planning in developing economies and in the Global North. \n\nWe are in a learning phase at our foundation, and we view our grantees as guides who will show us what approaches to girls’ and women’s reproductive care and education work best in their communities. Our current portfolio of projects represent for-profit, social impact investing and philanthropic investing. We have focused on working with grantees who are willing to teach us about the challenges of program implementation--what works and what doesn’t--so that we can develop as a sympathetic, collaborative partner. \n\n[show grantee orgs and link to their websites]\n\nFor the 2019-2020 grant cycle, Preston-Werner Ventures is seeking to fund family planning-focused projects, especially those involving community health workers. We also will consider proposals to provide financial support for grassroots NGOs and internationally-oriented nonprofits that inform public discourse about the public health need for family planning, as well as activist organizations that build movements and bolster government support for implementation of family planning programming. \n\nIn the future, w\n\nffff"
  //       },
  //       {
  //         "question": "After the youth and family planning workshop in July, did you conduct any minimum viable product or other testing within your community? If so, what did you learn and how is it informing your next steps in programming?",
  //         "answer": "ducing both our individual carbon footprint and the “number of feet” through culturally-sensitive programming is a cost effective strategy to mitigate climate change. Through our Every Human Counts program, we focus on increasing access to voluntary family planning in developing economies and in the Global North. \n\nWe are in a learning phase at our foundation, and we view our grantees as guides who will show us what approaches to girls’ and women’s reproductive care and education work best in their communities. Our current portfolio of projects represent for-profit, social impact investing and philanthropic investing. We have focused on working with grantees who are willing to teach us about the challenges of program implementation--what works and what doesn’t--so that we can develop as a sympathetic, collaborative partner. \n\n[show grantee orgs and link to their websites]\n\nFor the 2019-2020 grant cycle, Preston-Werner Ventures is seeking to fund family planning-focused projects, especially those involving community health workers. We also will consider proposals to provide financial support for grassroots NGOs and internationally-oriented nonprofits that inform public discourse about the public health need for family planning, as well as activist organizations that build movements and bolster government support for implementation of family planning programming. \n\nIn the future, w\n"
  //       },
  //       {
  //         "question": "What are your programmatic plans for the next year?",
  //         "answer": "ducing both our individual carbon footprint and the “number of feet” through culturally-sensitive programming is a cost effective strategy to mitigate climate change. Through our Every Human Counts program, we focus on increasing access to voluntary family planning in developing economies and in the Global North. \n\nWe are in a learning phase at our foundation, and we view our grantees as guides who will show us what approaches to girls’ and women’s reproductive care and education work best in their communities. Our current portfolio of projects represent for-profit, social impact investing and philanthropic investing. We have focused on working with grantees who are willing to teach us about the challenges of program implementation--what works and what doesn’t--so that we can develop as a sympathetic, collaborative partner. \n\n[show grantee orgs and link to their websites]\n\nFor the 2019-2020 grant cycle, Preston-Werner Ventures is seeking to fund family planning-focused projects, especially those involving community health workers. We also will consider proposals to provide financial support for grassroots NGOs and internationally-oriented nonprofits that inform public discourse about the public health need for family planning, as well as activist organizations that build movements and bolster government support for implementation of family planning programming. \n\nIn the future, w\n"
  //       },
  //       {
  //         "question": "What opportunities do you see to deepen or expand your work over the next decade?",
  //         "answer": "ducing both our individual carbon footprint and the “number of feet” through culturally-sensitive programming is a cost effective strategy to mitigate climate change. Through our Every Human Counts program, we focus on increasing access to voluntary family planning in developing economies and in the Global North. \n\nWe are in a learning phase at our foundation, and we view our grantees as guides who will show us what approaches to girls’ and women’s reproductive care and education work best in their communities. Our current portfolio of projects represent for-profit, social impact investing and philanthropic investing. We have focused on working with grantees who are willing to teach us about the challenges of program implementation--what works and what doesn’t--so that we can develop as a sympathetic, collaborative partner. \n\n[show grantee orgs and link to their websites]\n\nFor the 2019-2020 grant cycle, Preston-Werner Ventures is seeking to fund family planning-focused projects, especially those involving community health workers. We also will consider proposals to provide financial support for grassroots NGOs and internationally-oriented nonprofits that inform public discourse about the public health need for family planning, as well as activist organizations that build movements and bolster government support for implementation of family planning programming. \n\nIn the future, w\n"
  //       },
  //       {
  //         "question": "At a macro level, what, if any, major changes to the economic, political, or social sectors have affected your work in the past year?",
  //         "answer": "ducing both our individual carbon footprint and the “number of feet” through culturally-sensitive programming is a cost effective strategy to mitigate climate change. Through our Every Human Counts program, we focus on increasing access to voluntary family planning in developing economies and in the Global North. \n\nWe are in a learning phase at our foundation, and we view our grantees as guides who will show us what approaches to girls’ and women’s reproductive care and education work best in their communities. Our current portfolio of projects represent for-profit, social impact investing and philanthropic investing. We have focused on working with grantees who are willing to teach us about the challenges of program implementation--what works and what doesn’t--so that we can develop as a sympathetic, collaborative partner. \n\n[show grantee orgs and link to their websites]\n\nFor the 2019-2020 grant cycle, Preston-Werner Ventures is seeking to fund family planning-focused projects, especially those involving community health workers. We also will consider proposals to provide financial support for grassroots NGOs and internationally-oriented nonprofits that inform public discourse about the public health need for family planning, as well as activist organizations that build movements and bolster government support for implementation of family planning programming. \n\nIn the future, w\n"
  //       },
  //       {
  //         "question": "What keeps you up at night? What are you worried about and why?",
  //         "answer": "ducing both our individual carbon footprint and the “number of feet” through culturally-sensitive programming is a cost effective strategy to mitigate climate change. Through our Every Human Counts program, we focus on increasing access to voluntary family planning in developing economies and in the Global North. \n\nWe are in a learning phase at our foundation, and we view our grantees as guides who will show us what approaches to girls’ and women’s reproductive care and education work best in their communities. Our current portfolio of projects represent for-profit, social impact investing and philanthropic investing. We have focused on working with grantees who are willing to teach us about the challenges of program implementation--what works and what doesn’t--so that we can develop as a sympathetic, collaborative partner. \n\n[show grantee orgs and link to their websites]\n\nFor the 2019-2020 grant cycle, Preston-Werner Ventures is seeking to fund family planning-focused projects, especially those involving community health workers. We also will consider proposals to provide financial support for grassroots NGOs and internationally-oriented nonprofits that inform public discourse about the public health need for family planning, as well as activist organizations that build movements and bolster government support for implementation of family planning programming. \n\nIn the future, w\n"
  //       },
  //       {
  //         "question": "How can Preston-Werner Ventures be most useful - both to you and to the sector as a whole?",
  //         "answer": "ducing both our individual carbon footprint and the “number of feet” through culturally-sensitive programming is a cost effective strategy to mitigate climate change. Through our Every Human Counts program, we focus on increasing access to voluntary family planning in developing economies and in the Global North. \n\nWe are in a learning phase at our foundation, and we view our grantees as guides who will show us what approaches to girls’ and women’s reproductive care and education work best in their communities. Our current portfolio of projects represent for-profit, social impact investing and philanthropic investing. We have focused on working with grantees who are willing to teach us about the challenges of program implementation--what works and what doesn’t--so that we can develop as a sympathetic, collaborative partner. \n\n[show grantee orgs and link to their websites]\n\nFor the 2019-2020 grant cycle, Preston-Werner Ventures is seeking to fund family planning-focused projects, especially those involving community health workers. We also will consider proposals to provide financial support for grassroots NGOs and internationally-oriented nonprofits that inform public discourse about the public health need for family planning, as well as activist organizations that build movements and bolster government support for implementation of family planning programming. \n\nIn the future, w\n"
  //       },
  //       {
  //         "question": "What did the organization spend more money on than you anticipated? Less money? Do you plan to budget any differently in the future after this past year’s experience?",
  //         "answer": "ducing both our individual carbon footprint and the “number of feet” through culturally-sensitive programming is a cost effective strategy to mitigate climate change. Through our Every Human Counts program, we focus on increasing access to voluntary family planning in developing economies and in the Global North. \n\nWe are in a learning phase at our foundation, and we view our grantees as guides who will show us what approaches to girls’ and women’s reproductive care and education work best in their communities. Our current portfolio of projects represent for-profit, social impact investing and philanthropic investing. We have focused on working with grantees who are willing to teach us about the challenges of program implementation--what works and what doesn’t--so that we can develop as a sympathetic, collaborative partner. \n\n[show grantee orgs and link to their websites]\n\nFor the 2019-2020 grant cycle, Preston-Werner Ventures is seeking to fund family planning-focused projects, especially those involving community health workers. We also will consider proposals to provide financial support for grassroots NGOs and internationally-oriented nonprofits that inform public discourse about the public health need for family planning, as well as activist organizations that build movements and bolster government support for implementation of family planning programming. \n\nIn the future, w\n"
  //       },
  //       {
  //         "question": "Have your funding sources changed? What are your expected family planning funding sources for 2020? If possible, please give us a breakdown of your current family planning funding sources out of 100%.",
  //         "answer": "ducing both our individual carbon footprint and the “number of feet” through culturally-sensitive programming is a cost effective strategy to mitigate climate change. Through our Every Human Counts program, we focus on increasing access to voluntary family planning in developing economies and in the Global North. \n\nWe are in a learning phase at our foundation, and we view our grantees as guides who will show us what approaches to girls’ and women’s reproductive care and education work best in their communities. Our current portfolio of projects represent for-profit, social impact investing and philanthropic investing. We have focused on working with grantees who are willing to teach us about the challenges of program implementation--what works and what doesn’t--so that we can develop as a sympathetic, collaborative partner. \n\n[show grantee orgs and link to their websites]\n\nFor the 2019-2020 grant cycle, Preston-Werner Ventures is seeking to fund family planning-focused projects, especially those involving community health workers. We also will consider proposals to provide financial support for grassroots NGOs and internationally-oriented nonprofits that inform public discourse about the public health need for family planning, as well as activist organizations that build movements and bolster government support for implementation of family planning programming. \n\nIn the future, w\n"
  //       },
  //       {
  //         "question": "Are you applying for:",
  //         "answer": {
  //           "label": "Funding for existing, proven programming"
  //         }
  //       }
  //     ]
  //   }
  // ]

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(output)
  }

}
