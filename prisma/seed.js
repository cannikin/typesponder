/* eslint-disable no-console */

const Photon = require("@generated/photon")
const moment = require("moment")

const photon = new Photon()

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

async function main() {

  ////////////////////////
  // Forms, Questions
  ////////////////////////

  const formData = [
    {
      uid: "bv8u0Y",
      name: "Intro",
      tag: "Intro",
      questions: {
        create: [
          {
            uid: "IUWgGhQA3d5t",
            text: "Your name",
            type: "short_text"
          },
          {
            uid: "F2NsnryEDre7",
            text: "Organization name",
            type: "short_text"
          },
          {
            uid: "vyQF0KCqWuay",
            text: "Your position within the organization",
            type: "short_text"
          },
          {
            uid: "rzO4roXJIPzF",
            text: "Organization website (if available)",
            type: "website"
          },
          {
            uid: "P4PPcwnBSztV",
            text: "Your phone",
            type: "phone_number"
          },
          {
            uid: "NLWFHlRalA0H",
            text: "Your email",
            type: "email"
          },
          {
            uid: "l9Hf0HNHcpXp",
            text: "Countries your organization operates in",
            type: "long_text"
          },
          {
            uid: "KjiMOBBtowrg",
            text: "How would you describe what your " +
              "organization does to an interested " +
              "non-expert?",
            type: "long_text"
          },
          {
            uid: "ljjLBQRXGtJ4",
            text: "What current family planning programming do you " +
              "have? How does it fit within your overall " +
              "programming?",
            type: "long_text"
          }
        ]
      }
    },
    {
      uid: "VwLtMw",
      name: "Existing - Start",
      tag: "(E) Start",
      questions: {
        create: [
          {
            uid: "ef7PUrxUVuF6",
            text: "Your name",
            type: "short_text"
          },
          {
            uid: "BLvcKixhgXwY",
            text: "Organization name",
            type: "short_text"
          },
          {
            uid: "nJkvzzaTRuyR",
            text: "Your position in the organization",
            type: "short_text"
          },
          {
            uid: "DueMWKkCwXkK",
            text: "Organization website (if applicable)",
            type: "website"
          },
          {
            uid: "UZJ3kT2XKnxw",
            text: "Your email address",
            type: "email"
          },
          {
            uid: "nQ2sPJbI8A0t",
            text: "Your phone number",
            type: "phone_number"
          },
          {
            uid: "SZI4kzVGK9US",
            text: "Countries your organization operates in",
            type: "long_text"
          },
          {
            uid: "Tk7fJsWeOQlk",
            text: "Number of paid staff and basic list of positions",
            type: "long_text"
          },
          {
            uid: "pjwCtqPhgiNm",
            text: "Last year's operating budget (in US$)",
            type: "short_text"
          },
          {
            uid: "QUdeELUDJNCG",
            text: "Did you attend the youth and family planning workshop in Kampala?",
            type: "yes_no"
          },
          {
            uid: "S5zQK4c6hBB8",
            text: "Has Preston-Werner Ventures staff " +
              "visited your project in the field " +
              "yet?",
            type: "yes_no"
          }
        ]
      }
    },
    {
      uid: "cpVmqA",
      name: "Existing - No Workshop",
      tag: "(E) No Workshop",
      questions: {
        create: [
          {
            uid: "ZPdZviFwfEiL",
            text: "Please provide some programmatic and administrative success stories " +
              "from the past year. What are you most proud of? What ran smoothly?",
            type: "long_text"
          },
          {
            uid: "VLKLoAp6An4l",
            text: "Reflect on your family planning programming from the past " +
              "year—what needed to change from your initial plan? Did you make " +
              "any pivots? Share your learnings about what didn’t exactly go as " +
              "expected",
            type: "long_text"
          },
          {
            uid: "AypWaOhYdIbB",
            text: "What kind of programmatic data did you collect? " +
              "How was it analyzed? What do you think it " +
              "reveals?",
            type: "long_text"
          },
          {
            uid: "RRwjuHE40rfO",
            text: "Are you still serving the same " +
              "population as you were last year? Why or " +
              "why not?",
            type: "long_text"
          },
          {
            uid: "HTHqheB6EWt9",
            text: "What are your programmatic plans for the next year?",
            type: "long_text"
          }
        ]
      }
    },
    {
      uid: "xktNJH",
      name: "Existing - Workshop Only",
      tag: "(E) Workshop",
      questions: {
        create: [
          {
            uid: "sNe3VLpHDCcP",
            text: "What problems with access to family planning " +
              "supplies/information/rights do you have within your community? How " +
              "do you know? What kinds of needs assessment(s) did you complete " +
              "within the community?",
            type: "long_text"
          },
          {
            uid: "c3ybM3GxU4Nq",
            text: "How did you determine that your program(s) will solve the problem(s)?",
            type: "long_text"
          },
          {
            uid: "N1sBjty7wvpt",
            text: "Think about your family planning work this past year. " +
              "What outputs and outcomes did you measure? What does " +
              "the data you collected tell you about your programs? " +
              "Did you collect any data that demonstrated long-term " +
              "impact?",
            type: "long_text"
          },
          {
            uid: "lyqpDgzI1wGn",
            text: "Please provide some programmatic and administrative success stories " +
              "from the past year. What are you most proud of? What ran smoothly?",
            type: "long_text"
          },
          {
            uid: "oXK32WyupvUY",
            text: "Reflect on your family planning programming from the past year -- " +
              "what needed to change from your initial plan? Did you make any " +
              "pivots? Share your learnings about what didn’t exactly go as " +
              "expected.",
            type: "long_text"
          },
          {
            uid: "BFldc3neFc0a",
            text: "Are you still serving the same " +
              "population as you were last year? Why or " +
              "why not?",
            type: "long_text"
          },
          {
            uid: "QIbXLy35GgmW",
            text: "After the youth and family planning workshop in July, " +
              "did you conduct any minimum viable product or other " +
              "testing within your community? If so, what did you " +
              "learn and how is it informing your next steps in " +
              "programming?",
            type: "long_text"
          },
          {
            uid: "lL3nJ0NApk3y",
            text: "What are your programmatic plans for the next year?",
            type: "long_text"
          }
        ]
      }
    },
    {
      uid: "VVnEvV",
      name: "Existing - Visit",
      tag: "(E) Visit",
      questions: {
        create: [
          {
            uid: "sk1CRJeeBXJr",
            text: "Please provide some programmatic and administrative " +
              "success stories from the past year. What are you most " +
              "proud of?",
            type: "long_text"
          },
          {
            uid: "XVDlikpcmbeY",
            text: "Reflect on your family planning programming from the past " +
              "year—what needed to change from your initial plan? Did you make " +
              "any pivots? Share your learnings about what didn’t exactly go as " +
              "expected.",
            type: "long_text"
          },
          {
            uid: "alRPoVYjPmXr",
            text: "What kind of programmatic data did you collect? " +
              "How was it analyzed? What do you think it " +
              "reveals?",
            type: "long_text"
          },
          {
            uid: "fQ8B0UswnzR8",
            text: "Are you still serving the same " +
              "population as you were last year? Why or " +
              "why not?",
            type: "long_text"
          },
          {
            uid: "QVmaNtu5iNeL",
            text: "After the youth and family planning workshop in July, what minimum " +
              "viable product or other testing did you do within your community? " +
              "What did you learn and how is it informing your next steps in " +
              "programming?",
            type: "long_text"
          },
          {
            uid: "jOCNquIXHnX8",
            text: "What are your programmatic plans for the next year?",
            type: "long_text"
          }
        ]
      }
    },
    {
      uid: "s1Vr4F",
      name: "Big Picture",
      tag: "(E) Big Picture",
      questions: {
        create: [
          {
            uid: "VgdgS9p7HsKI",
            text: "What opportunities do you see to deepen " +
              "or expand your work over the next decade?",
            type: "long_text"
          },
          {
            uid: "ufIHU8ORFXCI",
            text: "At a macro level, what, if any, major changes to the economic, " +
              "political, or social sectors have affected your work in the past " +
              "year?",
            type: "long_text"
          },
          {
            uid: "R5ylXdat0uyo",
            text: "What keeps you up at night? What are you worried about and why?",
            type: "long_text"
          },
          {
            uid: "lPuhym6rAiIt",
            text: "How can Preston-Werner Ventures be most " +
              "useful - both to you and to the sector as a " +
              "whole?",
            type: "long_text"
          }
        ]
      }
    },
    {
      uid: "MlQjwT",
      name: "Existing - Finances",
      tag: "(E) Finances",
      questions: {
        create: [
          {
            uid: "fYaIaZ4CeQu2",
            text: "Finances",
            type: "statement"
          },
          {
            uid: "HsDNZfI7eNQ3",
            text: "What did the organization spend more money on than you " +
              "anticipated? Less money? Do you plan to budget any " +
              "differently in the future after this past year’s " +
              "experience?",
            type: "long_text"
          },
          {
            uid: "hR0H0eopLSYI",
            text: "Have your funding sources changed? What are your expected family " +
              "planning funding sources for 2020? If possible, please give us a " +
              "breakdown of your current family planning funding sources out of " +
              "100%.",
            type: "long_text"
          },
          {
            uid: "jI2zWZT6YDDk",
            text: "Are you applying for:",
            type: "multiple_choice"
          }
        ]
      }
    },
    {
      uid: "aOvsHK",
      name: "Existing - Existing Program",
      tag: "(E) Existing Program",
      questions: {
        create: [
          {
            uid: "SqJNNzxW8LRh",
            text: "Existing Programming",
            type: "statement"
          },
          {
            uid: "FJpp271GfBfw",
            text: "If you receive a grant from us, but you do not " +
              "receive intended funding from other partners, " +
              "what would you do? How would our grant be put to " +
              "use?",
            type: "long_text"
          },
          {
            uid: "N77nudlIxXAw",
            text: "Last year’s annual report",
            type: "file_upload"
          },
          {
            uid: "ZgJQqEDgXgcT",
            text: "Last year’s financial report",
            type: "file_upload"
          },
          {
            uid: "geXhlyq5PTvd",
            text: "This year’s organizational budget",
            type: "file_upload"
          }
        ]
      }
    },
    {
      uid: "dfU7O3",
      name: "Existing - New Programming",
      tag: "(E) New Program",
      questions: {
        create: [
          {
            uid: "IJLiELZ0HLSk",
            text: "What new program or focus area are you planning?",
            type: "long_text"
          },
          {
            uid: "KjmcvlUm1Qvf",
            text: "How do you know it is the correct next step? Have you " +
              "talked with your clients/others in the community? " +
              "What kind of research have you done to determine " +
              "this?",
            type: "long_text"
          },
          {
            uid: "DMPrTEuX3Duj",
            text: "How will you ensure that your original programming is not " +
              "compromised in adding on new responsibilities for your " +
              "staff?",
            type: "long_text"
          },
          {
            uid: "GXtyRFl6AvXv",
            text: "What, if any, other funding have you already secured for this new " +
              "project? If you receive a grant from us, but you do not receive " +
              "intended funding from other partners, what would you do? Would it " +
              "affect the proposed project? How would our grant be put to use?",
            type: "long_text"
          },
          {
            uid: "AQfjCHHCTwnJ",
            text: "Are there any previous experiences or projects " +
              "you’d like to share with us to shed further " +
              "light on your ability to undertake this new " +
              "project?",
            type: "long_text"
          },
          {
            uid: "QAs8EQnotHnA",
            text: "Last year’s annual report\n",
            type: "file_upload"
          },
          {
            uid: "OFzYJcNX5fM0",
            text: "Last year’s financial report",
            type: "file_upload"
          },
          {
            uid: "UoUkT7stDYnL",
            text: "This year’s organizational budget",
            type: "file_upload"
          },
          {
            uid: "x1F4uAFbyqPI",
            text: "A basic budget of expenses specific to the proposed project",
            type: "file_upload"
          }
        ]
      }
    },
    {
      uid: "vuL4pI",
      name: "New - Start",
      tag: "(N) Start",
      questions: {
        create: [
          {
            uid: 'QLvCL7dN8vsp',
            text: 'When was your organization founded?',
            type: 'long_text'
          },
          {
            uid: 'emsscfAphSSV',
            text: 'Number of paid staff and basic list of positions',
            type: 'long_text'
          },
          {
            uid: 'Rn9WI8PEHqVp',
            text: "Last year's operating budget (in US$)",
            type: 'short_text'
          }
        ]
      }
    },
    {
      uid: "SO6tIV",
      name: "New - Activities & Learnings",
      tag: "(N) Learnings",
      questions: {
        create: [
          {
            uid: 'qhrjx9k7T6Bt',
            text: 'What problems with access to family planning ' +
              'supplies/information/rights do you have within your community? How ' +
              'do you know? What kinds of needs assessment(s) did you complete ' +
              'within the community?',
            type: 'long_text'
          },
          {
            uid: 'kibn5mcbBoMC',
            text: 'How did you determine that your program(s) will solve the problem(s)?',
            type: 'long_text'
          },
          {
            uid: 'kv7iSIaOoB3s',
            text: 'Who do you serve with your family planning programs?',
            type: 'long_text'
          },
          {
            uid: 'OwRHvlXETUmi',
            text: 'How and why did you decide to focus on your ' +
              'current beneficiaries in your family planning ' +
              'work?',
            type: 'long_text'
          },
          {
            uid: 'jnHoRFGHXxJ5',
            text: 'Who in your organization is responsible for ' +
              'collecting data and tracking progress toward your ' +
              'family planning goals? What does their work look ' +
              'like?',
            type: 'long_text'
          },
          {
            uid: 'CNXMKGgkWXgt',
            text: 'What assumptions did you have to assess on the ' +
              'road to achieving your expected program results?',
            type: 'long_text'
          },
          {
            uid: 'pQrfUOlz3afp',
            text: 'Please provide an example of a family planning program you had ' +
              'for at least one year. What outputs and outcomes did you ' +
              'measure? Did you collect any data that demonstrated long-term ' +
              'impact?',
            type: 'long_text'
          },
          {
            uid: 'RnBWaWC0zPw0',
            text: 'How do you know that your family ' +
              'planning intervention(s) is/are ' +
              'working?',
            type: 'long_text'
          }
        ]
      }
    },
    {
      uid: "aWm1bg",
      name: "New - Big Picture",
      tag: "(N) Big Picture",
      questions: {
        create: [
          {
            uid: 'eSIWwC2aEuQs',
            text: 'What other organizations provide family planning ' +
              'programs in your region and/or community? How does your ' +
              'work differ from theirs? How do you fit in the overall ' +
              'system?',
            type: 'long_text'
          },
          {
            uid: 'MniBe2bTzlMW',
            text: 'What organizations or entities do you collaborate with and ' +
              'how? What is the desired impact of these collaborations?',
            type: 'long_text'
          },
          {
            uid: 'idptfRe7NRoA',
            text: 'What risks does your organization face in trying to complete its work?',
            type: 'long_text'
          },
          {
            uid: 'gC2KYZLv2Hzy',
            text: 'What are two internal challenges you face? Provide ' +
              'an example of something that went wrong recently ' +
              'within the organization and how the team dealt with ' +
              'it.',
            type: 'long_text'
          }
        ]
      }
    },
    {
      uid: "W3k3ee",
      name: "New - Finances",
      tag: "(N) Finances",
      questions: {
        create: [
          {
            uid: 'Uc3KLCL2YZPm',
            text: 'What are your current funding sources for your family planning ' +
              'programming and for how long do they last? If possible, please give ' +
              'us a breakdown of your current family planning funding sources out of ' +
              '100%. ',
            type: 'long_text'
          },
          {
            uid: 'oBApp6ei1caq',
            text: 'What are your expected funding sources for 2020?',
            type: 'long_text'
          },
          {
            uid: 'Ko76Dg9rHfwA',
            text: 'If you receive a grant from us, but you do not ' +
              'receive intended funding from other partners, ' +
              'what would you do? How would our grant be put to ' +
              'use?',
            type: 'long_text'
          }
        ]
      }
    },
    {
      uid: "XB0CzI",
      name: "New - Attachments",
      tag: "(N) Attachments",
      questions: {
        create: [
          {
            uid: 'MFo1M8WmkmD3',
            text: 'Proof of organizational legal status.',
            type: 'file_upload'
          },
          {
            uid: 'L5IkZsyjEJXV',
            text: 'This year’s organizational budget',
            type: 'file_upload'
          },
          {
            uid: 'WwcFNrO2qGJh',
            text: 'Last year’s organizational budget',
            type: 'file_upload'
          },
          {
            uid: 'Ze0sOlvvzQ9s',
            text: 'References - please provide two (2) names and contact information\n',
            type: 'file_upload'
          },
          {
            uid: 'NHwTAUtpQAj5',
            text: 'Organizational chart',
            type: 'file_upload'
          },
          {
            uid: 'HpVfkfcsy6f4',
            text: 'Last year’s annual report',
            type: 'file_upload'
          },
          {
            uid: 'MwBqBSJlQHqc',
            text: 'Business plan',
            type: 'file_upload'
          },
          {
            uid: 'Th9Xkq2MJhgG',
            text: 'Policies you may have for child protection, ethics, etc.',
            type: 'file_upload'
          },
          {
            uid: 'fk5nKuBu191W',
            text: 'Any external evaluations or studies',
            type: 'file_upload'
          },
          {
            uid: 'F7QUUFHaJK6c',
            text: 'Other materials that you would like to ' +
              'share with us (videos, art, ' +
              'testimonials).',
            type: 'file_upload'
          }
        ]
      }
    }
  ]

  const forms = []

  await asyncForEach(formData, async form => {
    const currentForm = await photon.forms.findMany({
      where: {
        uid: form.uid
      }
    })
    
    // only create if they don"t already exist, a Rails-like .firstOrCreate() would be handy here
    if (!currentForm.length) {
      forms.push(await photon.forms.create({
        data: form
      }))
    }
  })

  console.info(`Created ${forms.length} forms:`)
  console.dir(forms)

  ///////////////////////////////
  // Users, Responses, Answers
  ///////////////////////////////

  const userData = [
    {
      "email": "nderitudavid@gmail.com",
      "responses": [
        {
          "uid": "tv9bh14cqzqilhy8tv9bhh4krdeh6to0",
          "createdAt": "2019-08-08T13:29:27Z",
          "answers": [
            {
              "question_uid": "IUWgGhQA3d5t",
              "text": "David Nderitu"
            },
            {
              "question_uid": "F2NsnryEDre7",
              "text": "Imarisha CBO"
            },
            {
              "question_uid": "vyQF0KCqWuay",
              "text": "Executive Director"
            },
            {
              "question_uid": "rzO4roXJIPzF",
              "text": "https://www.imarisha.org"
            },
            {
              "question_uid": "P4PPcwnBSztV",
              "text": "+254723935597"
            },
            {
              "question_uid": "NLWFHlRalA0H",
              "text": "nderitudavid@gmail.com"
            },
            {
              "question_uid": "l9Hf0HNHcpXp",
              "text": "Kenya"
            },
            {
              "question_uid": "KjiMOBBtowrg",
              "text": "Imarisha is a Kiswahili word meaning to make better.  We envision empowered Kenya communities driving sustainable development while our mission is to facilitate adoption of innovative practices and approaches among marginalized communities for sustainable development."
            },
            {
              "question_uid": "ljjLBQRXGtJ4",
              "text": "Imarisha CBO is currently running a project whose goal is to have Sexual and Reproductive Health (SRH) and other livelihoods needs of adolescents living with HIV/AIDS addressed in Nyeri County in Kenya. The project acknowledges that discussion of SRH issues between parents/guardians and adolescents face myriad socio-cultural challenges. The project takes note of the rising number of HIV positive adolescents and the inadequate programming for them which may trigger increased HIV infections in Kenya if the issue is not addressed. We are equipping adolescents living with requisite skills to champion for adolescents living with HIV health and other livelihoods needs. We are empowering and encouraging HIV-positive young people to freely discuss the SRH issues not only with parents/ guardians but also with other service providers by strengthening support groups and peer groups for HIV positive adolescents. The project has trained 22 champions on peer education, leadership and management and advocacy. Additionally, the project has conducted Systemic Child Counseling training to 23 school teachers aiming at equipping the trained counselors with the counseling skills and empower them to diversify the context. "
            }
          ]
        }
      ]
    },
    {
      "email": "jamesgondwe@cydmalawi.org",
      "responses": [
        {
          "uid": "4rdvi15b6k298w1lslg34rdh0934tklk",
          "createdAt": "2019-08-05T17:46:38Z",
          "answers": [
            {
              "question_uid": "IUWgGhQA3d5t",
              "text": "James Gondwe"
            },
            {
              "question_uid": "F2NsnryEDre7",
              "text": "Centre for Youth and Development"
            },
            {
              "question_uid": "vyQF0KCqWuay",
              "text": "Executive Director"
            },
            {
              "question_uid": "rzO4roXJIPzF",
              "text": "https://www.cydmalawi.org"
            },
            {
              "question_uid": "P4PPcwnBSztV",
              "text": "+265999940260"
            },
            {
              "question_uid": "NLWFHlRalA0H",
              "text": "jamesgondwe@cydmalawi.org"
            },
            {
              "question_uid": "l9Hf0HNHcpXp",
              "text": "Malawi"
            },
            {
              "question_uid": "KjiMOBBtowrg",
              "text": "We are a local Non-Governmental organization that works with Government and communities to improve lives for children, youth and women to create a conducive environment for them to develop to their fullest potential. We effect changes in sectors of education, sustainable livelihoods and health."
            },
            {
              "question_uid": "ljjLBQRXGtJ4",
              "text": "Our family planning program is called \"Community-based Integrated family planning Promotion (CIFPP)\" and is embedded in our strategic plan and aims at enabling people to have access to information, products and services. \n\nOur model revolves around “Community-Health workers (CHW)” who are based in communities but are linked to health facilities.  Our model builds the capacity of CWH and provides them with tools to ensure that family planning services are provided effectively. Apart from training, we also provide push bicycles for mobility and materials for raising awareness. We also conduct social mobilization through the use of Theatre for Development by training youth on theatre and Family planning. \n\nWe also work on Health governance in relation to family at facility level but also at district level. Our work at facility level is with the Health Advisory committee, by providing them with training on social accountability specifically Community Score Card. They facilitate these sessions with health facility staff and community members to rank service delivery and develop plans for improvement. At district level we work with the District Health Technical Committee to lobby for provision of contraceptives and improved service delivery in the district specifically hard to reach areas. \n\nFamily planning contributes to health family's, health children, youth and women allowing them to access education and other opportunities and reach their fullest potential. \n"
            }
          ]
        }
      ]
    }
  ]

  const users = []

  await asyncForEach(userData, async user => {
    const currentUser = await photon.users.findMany({
      where: {
        email: user.email
      }
    })

    // only create if they don't already exist, a Rails-like .firstOrCreate() would be handy here
    if (!currentUser.length) {
      users.push(await photon.users.create({
        data: {
          email: user.email
        }
      }))

      // responses 
      await asyncForEach(user.responses, async response => {
        await photon.responses.create({
          data: {
            uid: response.uid,
            createdAt: moment(response.createdAt).toDate(),
            user: {
              connect: {
                email: user.email
              }
            }
          }
        })

        // answers
        await asyncForEach(response.answers, async answer => {
          await photon.answers.create({
            data: {
              text: answer.text,
              question: {
                connect: {
                  uid: answer.question_uid
                }
              },
              response: {
                connect: {
                  uid: response.uid
                }
              }
            }
          })
        })

      })

    }
  })

  console.info(`Created ${users.length} users:`)
  console.dir(users)

}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await photon.disconnect()
  })
