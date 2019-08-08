const Photon = require('@generated/photon')

const photon = new Photon()

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

async function main() {

  ////////////////////////
  // Forms
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
            uid: 'ef7PUrxUVuF6',
            text: 'Your name',
            type: 'short_text'
          },
          {
            uid: 'BLvcKixhgXwY',
            text: 'Organization name',
            type: 'short_text'
          },
          {
            uid: 'nJkvzzaTRuyR',
            text: 'Your position in the organization',
            type: 'short_text'
          },
          {
            uid: 'DueMWKkCwXkK',
            text: 'Organization website (if applicable)',
            type: 'website'
          },
          {
            uid: 'UZJ3kT2XKnxw',
            text: 'Your email address',
            type: 'email'
          },
          {
            uid: 'nQ2sPJbI8A0t',
            text: 'Your phone number',
            type: 'phone_number'
          },
          {
            uid: 'SZI4kzVGK9US',
            text: 'Countries your organization operates in',
            type: 'long_text'
          },
          {
            uid: 'Tk7fJsWeOQlk',
            text: 'Number of paid staff and basic list of positions',
            type: 'long_text'
          },
          {
            uid: 'pjwCtqPhgiNm',
            text: "Last year's operating budget (in US$)",
            type: 'short_text'
          },
          {
            uid: 'QUdeELUDJNCG',
            text: 'Did you attend the youth and family planning workshop in Kampala?',
            type: 'yes_no'
          },
          {
            uid: 'S5zQK4c6hBB8',
            text: 'Has Preston-Werner Ventures staff ' +
              'visited your project in the field ' +
              'yet?',
            type: 'yes_no'
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
            uid: 'TDmnhyN2DXIg',
            text: 'Program Activities & Learnings',
            type: 'statement'
          },
          {
            uid: 'ZPdZviFwfEiL',
            text: 'Please provide some programmatic and administrative success stories ' +
              'from the past year. What are you most proud of? What ran smoothly?',
            type: 'long_text'
          },
          {
            uid: 'VLKLoAp6An4l',
            text: 'Reflect on your family planning programming from the past ' +
              'year—what needed to change from your initial plan? Did you make ' +
              'any pivots? Share your learnings about what didn’t exactly go as ' +
              'expected',
            type: 'long_text'
          },
          {
            uid: 'AypWaOhYdIbB',
            text: 'What kind of programmatic data did you collect? ' +
              'How was it analyzed? What do you think it ' +
              'reveals?',
            type: 'long_text'
          },
          {
            uid: 'RRwjuHE40rfO',
            text: 'Are you still serving the same ' +
              'population as you were last year? Why or ' +
              'why not?',
            type: 'long_text'
          },
          {
            uid: 'HTHqheB6EWt9',
            text: 'What are your programmatic plans for the next year?',
            type: 'long_text'
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
            uid: 'Cb8gc6pGsTm6',
            text: 'Program Activities & Learnings',
            type: 'statement'
          },
          {
            uid: 'sNe3VLpHDCcP',
            text: 'What problems with access to family planning ' +
              'supplies/information/rights do you have within your community? How ' +
              'do you know? What kinds of needs assessment(s) did you complete ' +
              'within the community?',
            type: 'long_text'
          },
          {
            uid: 'c3ybM3GxU4Nq',
            text: 'How did you determine that your program(s) will solve the problem(s)?',
            type: 'long_text'
          },
          {
            uid: 'N1sBjty7wvpt',
            text: 'Think about your family planning work this past year. ' +
              'What outputs and outcomes did you measure? What does ' +
              'the data you collected tell you about your programs? ' +
              'Did you collect any data that demonstrated long-term ' +
              'impact?',
            type: 'long_text'
          },
          {
            uid: 'lyqpDgzI1wGn',
            text: 'Please provide some programmatic and administrative success stories ' +
              'from the past year. What are you most proud of? What ran smoothly?',
            type: 'long_text'
          },
          {
            uid: 'oXK32WyupvUY',
            text: 'Reflect on your family planning programming from the past year -- ' +
              'what needed to change from your initial plan? Did you make any ' +
              'pivots? Share your learnings about what didn’t exactly go as ' +
              'expected.',
            type: 'long_text'
          },
          {
            uid: 'BFldc3neFc0a',
            text: 'Are you still serving the same ' +
              'population as you were last year? Why or ' +
              'why not?',
            type: 'long_text'
          },
          {
            uid: 'QIbXLy35GgmW',
            text: 'After the youth and family planning workshop in July, ' +
              'did you conduct any minimum viable product or other ' +
              'testing within your community? If so, what did you ' +
              'learn and how is it informing your next steps in ' +
              'programming?',
            type: 'long_text'
          },
          {
            uid: 'lL3nJ0NApk3y',
            text: 'What are your programmatic plans for the next year?',
            type: 'long_text'
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
            uid: 'X2iyNNHsENJY',
            text: 'Program Activities & Learnings',
            type: 'statement'
          },
          {
            uid: 'sk1CRJeeBXJr',
            text: 'Please provide some programmatic and administrative ' +
              'success stories from the past year. What are you most ' +
              'proud of?',
            type: 'long_text'
          },
          {
            uid: 'XVDlikpcmbeY',
            text: 'Reflect on your family planning programming from the past ' +
              'year—what needed to change from your initial plan? Did you make ' +
              'any pivots? Share your learnings about what didn’t exactly go as ' +
              'expected.',
            type: 'long_text'
          },
          {
            uid: 'alRPoVYjPmXr',
            text: 'What kind of programmatic data did you collect? ' +
              'How was it analyzed? What do you think it ' +
              'reveals?',
            type: 'long_text'
          },
          {
            uid: 'fQ8B0UswnzR8',
            text: 'Are you still serving the same ' +
              'population as you were last year? Why or ' +
              'why not?',
            type: 'long_text'
          },
          {
            uid: 'QVmaNtu5iNeL',
            text: 'After the youth and family planning workshop in July, what minimum ' +
              'viable product or other testing did you do within your community? ' +
              'What did you learn and how is it informing your next steps in ' +
              'programming?',
            type: 'long_text'
          },
          {
            uid: 'jOCNquIXHnX8',
            text: 'What are your programmatic plans for the next year?',
            type: 'long_text'
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
            uid: 'YxGKX63w4L8c',
            text: 'Big Picture',
            type: 'statement'
          },
          {
            uid: 'VgdgS9p7HsKI',
            text: 'What opportunities do you see to deepen ' +
              'or expand your work over the next decade?',
            type: 'long_text'
          },
          {
            uid: 'ufIHU8ORFXCI',
            text: 'At a macro level, what, if any, major changes to the economic, ' +
              'political, or social sectors have affected your work in the past ' +
              'year?',
            type: 'long_text'
          },
          {
            uid: 'R5ylXdat0uyo',
            text: 'What keeps you up at night? What are you worried about and why?',
            type: 'long_text'
          },
          {
            uid: 'lPuhym6rAiIt',
            text: 'How can Preston-Werner Ventures be most ' +
              'useful - both to you and to the sector as a ' +
              'whole?',
            type: 'long_text'
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
            uid: 'fYaIaZ4CeQu2',
            text: 'Finances',
            type: 'statement'
          },
          {
            uid: 'HsDNZfI7eNQ3',
            text: 'What did the organization spend more money on than you ' +
              'anticipated? Less money? Do you plan to budget any ' +
              'differently in the future after this past year’s ' +
              'experience?',
            type: 'long_text'
          },
          {
            uid: 'hR0H0eopLSYI',
            text: 'Have your funding sources changed? What are your expected family ' +
              'planning funding sources for 2020? If possible, please give us a ' +
              'breakdown of your current family planning funding sources out of ' +
              '100%.',
            type: 'long_text'
          },
          {
            uid: 'jI2zWZT6YDDk',
            text: 'Are you applying for:',
            type: 'multiple_choice'
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
            uid: 'SqJNNzxW8LRh',
            text: 'Existing Programming',
            type: 'statement'
          },
          {
            uid: 'FJpp271GfBfw',
            text: 'If you receive a grant from us, but you do not ' +
              'receive intended funding from other partners, ' +
              'what would you do? How would our grant be put to ' +
              'use?',
            type: 'long_text'
          },
          {
            uid: 'N77nudlIxXAw',
            text: 'Last year’s annual report',
            type: 'file_upload'
          },
          {
            uid: 'ZgJQqEDgXgcT',
            text: 'Last year’s financial report',
            type: 'file_upload'
          },
          {
            uid: 'geXhlyq5PTvd',
            text: 'This year’s organizational budget',
            type: 'file_upload'
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
            uid: 'IJLiELZ0HLSk',
            text: 'What new program or focus area are you planning?',
            type: 'long_text'
          },
          {
            uid: 'KjmcvlUm1Qvf',
            text: 'How do you know it is the correct next step? Have you ' +
              'talked with your clients/others in the community? ' +
              'What kind of research have you done to determine ' +
              'this?',
            type: 'long_text'
          },
          {
            uid: 'DMPrTEuX3Duj',
            text: 'How will you ensure that your original programming is not ' +
              'compromised in adding on new responsibilities for your ' +
              'staff?',
            type: 'long_text'
          },
          {
            uid: 'GXtyRFl6AvXv',
            text: 'What, if any, other funding have you already secured for this new ' +
              'project? If you receive a grant from us, but you do not receive ' +
              'intended funding from other partners, what would you do? Would it ' +
              'affect the proposed project? How would our grant be put to use?',
            type: 'long_text'
          },
          {
            uid: 'AQfjCHHCTwnJ',
            text: 'Are there any previous experiences or projects ' +
              'you’d like to share with us to shed further ' +
              'light on your ability to undertake this new ' +
              'project?',
            type: 'long_text'
          },
          {
            uid: 'QAs8EQnotHnA',
            text: 'Last year’s annual report\n',
            type: 'file_upload'
          },
          {
            uid: 'OFzYJcNX5fM0',
            text: 'Last year’s financial report',
            type: 'file_upload'
          },
          {
            uid: 'UoUkT7stDYnL',
            text: 'This year’s organizational budget',
            type: 'file_upload'
          },
          {
            uid: 'x1F4uAFbyqPI',
            text: 'A basic budget of expenses specific to the proposed project',
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
    
    // only create if they don't already exist, a Rails-like .firstOrCreate() would be handy here
    if (!currentForm.length) {
      forms.push(await photon.forms.create({
        data: form
      }))
    }
  })

  console.info(`Created ${forms.length} forms:`)
  console.dir(forms)

}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await photon.disconnect()
  })
