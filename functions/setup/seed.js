const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.AMAZON_ACCESS_KEY_ID,
  secretAccessKey: process.env.AMAZON_SECRET_ACCESS_KEY,
  region: process.env.AMAZON_DYNAMODB_REGION
});

if (process.env.AMAZON_DYNAMODB_ENDPOINT) {
  AWS.config.update({ endpoint: process.env.AMAZON_DYNAMODB_ENDPOINT })
}

const docClient = new AWS.DynamoDB.DocumentClient();

const forms = [
  {
    id: "bv8u0Y",
    name: "Intro",
    tag: "Intro",
    questions: [
      {
        id: "IUWgGhQA3d5t",
        text: "Your name",
        type: "short_text"
      },
      {
        id: "F2NsnryEDre7",
        text: "Organization name",
        type: "short_text"
      },
      {
        id: "vyQF0KCqWuay",
        text: "Your position within the organization",
        type: "short_text"
      },
      {
        id: "rzO4roXJIPzF",
        text: "Organization website (if available)",
        type: "website"
      },
      {
        id: "P4PPcwnBSztV",
        text: "Your phone",
        type: "phone_number"
      },
      {
        id: "NLWFHlRalA0H",
        text: "Your email",
        type: "email"
      },
      {
        id: "l9Hf0HNHcpXp",
        text: "Countries your organization operates in",
        type: "long_text"
      },
      {
        id: "KjiMOBBtowrg",
        text: "How would you describe what your organization does to an interested non-expert?",
        type: "long_text"
      },
      {
        id: "ljjLBQRXGtJ4",
        text: "What current family planning programming do you have? How does it fit within your overall programming?",
        type: "long_text"
      }
    ]
  },
  {
    id: "VwLtMw",
    name: "Existing - Start",
    tag: "(E) Start",
    questions: [
      {
        id: "ef7PUrxUVuF6",
        text: "Your name",
        type: "short_text"
      },
      {
        id: "BLvcKixhgXwY",
        text: "Organization name",
        type: "short_text"
      },
      {
        id: "nJkvzzaTRuyR",
        text: "Your position in the organization",
        type: "short_text"
      },
      {
        id: "DueMWKkCwXkK",
        text: "Organization website (if applicable)",
        type: "website"
      },
      {
        id: "UZJ3kT2XKnxw",
        text: "Your email address",
        type: "email"
      },
      {
        id: "nQ2sPJbI8A0t",
        text: "Your phone number",
        type: "phone_number"
      },
      {
        id: "SZI4kzVGK9US",
        text: "Countries your organization operates in",
        type: "long_text"
      },
      {
        id: "Tk7fJsWeOQlk",
        text: "Number of paid staff and basic list of positions",
        type: "long_text"
      },
      {
        id: "pjwCtqPhgiNm",
        text: "Last year's operating budget (in US$)",
        type: "short_text"
      },
      {
        id: "QUdeELUDJNCG",
        text: "Did you attend the youth and family planning workshop in Kampala?",
        type: "yes_no"
      },
      {
        id: "S5zQK4c6hBB8",
        text: "Has Preston-Werner Ventures staff visited your project in the field yet?",
        type: "yes_no"
      }
    ]
  },
  {
    id: "cpVmqA",
    name: "Existing - No Workshop",
    tag: "(E) No Workshop",
    questions: [
      {
        id: "ZPdZviFwfEiL",
        text: "Please provide some programmatic and administrative success stories from the past year. What are you most proud of? What ran smoothly?",
        type: "long_text"
      },
      {
        id: "VLKLoAp6An4l",
        text: "Reflect on your family planning programming from the past year—what needed to change from your initial plan? Did you make any pivots? Share your learnings about what didn’t exactly go as expected",
        type: "long_text"
      },
      {
        id: "AypWaOhYdIbB",
        text: "What kind of programmatic data did you collect? How was it analyzed? What do you think it reveals?",
        type: "long_text"
      },
      {
        id: "RRwjuHE40rfO",
        text: "Are you still serving the same population as you were last year? Why or why not?",
        type: "long_text"
      },
      {
        id: "HTHqheB6EWt9",
        text: "What are your programmatic plans for the next year?",
        type: "long_text"
      }
    ]
  },
  {
    id: "xktNJH",
    name: "Existing - Workshop Only",
    tag: "(E) Workshop",
    questions: [
      {
        id: "sNe3VLpHDCcP",
        text: "What problems with access to family planning supplies/information/rights do you have within your community? How do you know? What kinds of needs assessment(s) did you complete within the community?",
        type: "long_text"
      },
      {
        id: "c3ybM3GxU4Nq",
        text: "How did you determine that your program(s) will solve the problem(s)?",
        type: "long_text"
      },
      {
        id: "N1sBjty7wvpt",
        text: "Think about your family planning work this past year. What outputs and outcomes did you measure? What does the data you collected tell you about your programs? Did you collect any data that demonstrated long-term impact?",
        type: "long_text"
      },
      {
        id: "lyqpDgzI1wGn",
        text: "Please provide some programmatic and administrative success stories from the past year. What are you most proud of? What ran smoothly?",
        type: "long_text"
      },
      {
        id: "oXK32WyupvUY",
        text: "Reflect on your family planning programming from the past year -- what needed to change from your initial plan? Did you make any pivots? Share your learnings about what didn’t exactly go as expected.",
        type: "long_text"
      },
      {
        id: "BFldc3neFc0a",
        text: "Are you still serving the same population as you were last year? Why or why not?",
        type: "long_text"
      },
      {
        id: "QIbXLy35GgmW",
        text: "After the youth and family planning workshop in July, did you conduct any minimum viable product or other testing within your community? If so, what did you learn and how is it informing your next steps in programming?",
        type: "long_text"
      },
      {
        id: "lL3nJ0NApk3y",
        text: "What are your programmatic plans for the next year?",
        type: "long_text"
      }
    ]
  },
  {
    id: "VVnEvV",
    name: "Existing - Visit",
    tag: "(E) Visit",
    questions: [
      {
        id: "sk1CRJeeBXJr",
        text: "Please provide some programmatic and administrative success stories from the past year. What are you most proud of?",
        type: "long_text"
      },
      {
        id: "XVDlikpcmbeY",
        text: "Reflect on your family planning programming from the past year—what needed to change from your initial plan? Did you make any pivots? Share your learnings about what didn’t exactly go as expected.",
        type: "long_text"
      },
      {
        id: "alRPoVYjPmXr",
        text: "What kind of programmatic data did you collect? How was it analyzed? What do you think it reveals?",
        type: "long_text"
      },
      {
        id: "fQ8B0UswnzR8",
        text: "Are you still serving the same population as you were last year? Why or why not?",
        type: "long_text"
      },
      {
        id: "QVmaNtu5iNeL",
        text: "After the youth and family planning workshop in July, what minimum viable product or other testing did you do within your community? What did you learn and how is it informing your next steps in programming?",
        type: "long_text"
      },
      {
        id: "jOCNquIXHnX8",
        text: "What are your programmatic plans for the next year?",
        type: "long_text"
      }
    ]
  },
  {
    id: "s1Vr4F",
    name: "Big Picture",
    tag: "(E) Big Picture",
    questions: [
      {
        id: "VgdgS9p7HsKI",
        text: "What opportunities do you see to deepen or expand your work over the next decade?",
        type: "long_text"
      },
      {
        id: "ufIHU8ORFXCI",
        text: "At a macro level, what, if any, major changes to the economic, political, or social sectors have affected your work in the past year?",
        type: "long_text"
      },
      {
        id: "R5ylXdat0uyo",
        text: "What keeps you up at night? What are you worried about and why?",
        type: "long_text"
      },
      {
        id: "lPuhym6rAiIt",
        text: "How can Preston-Werner Ventures be most useful - both to you and to the sector as a whole?",
        type: "long_text"
      }
    ]
  },
  {
    id: "MlQjwT",
    name: "Existing - Finances",
    tag: "(E) Finances",
    questions: [
      {
        id: "fYaIaZ4CeQu2",
        text: "Finances",
        type: "statement"
      },
      {
        id: "HsDNZfI7eNQ3",
        text: "What did the organization spend more money on than you anticipated? Less money? Do you plan to budget any differently in the future after this past year’s experience?",
        type: "long_text"
      },
      {
        id: "hR0H0eopLSYI",
        text: "Have your funding sources changed? What are your expected family planning funding sources for 2020? If possible, please give us a breakdown of your current family planning funding sources out of 100%.",
        type: "long_text"
      },
      {
        id: "jI2zWZT6YDDk",
        text: "Are you applying for:",
        type: "multiple_choice"
      }
    ]
  },
  {
    id: "aOvsHK",
    name: "Existing - Existing Program",
    tag: "(E) Existing Program",
    questions: [
      {
        id: "SqJNNzxW8LRh",
        text: "Existing Programming",
        type: "statement"
      },
      {
        id: "FJpp271GfBfw",
        text: "If you receive a grant from us, but you do not receive intended funding from other partners, what would you do? How would our grant be put to use?",
        type: "long_text"
      },
      {
        id: "N77nudlIxXAw",
        text: "Last year’s annual report",
        type: "file_upload"
      },
      {
        id: "ZgJQqEDgXgcT",
        text: "Last year’s financial report",
        type: "file_upload"
      },
      {
        id: "geXhlyq5PTvd",
        text: "This year’s organizational budget",
        type: "file_upload"
      }
    ]
  },
  {
    id: "dfU7O3",
    name: "Existing - New Programming",
    tag: "(E) New Program",
    questions: [
      {
        id: "IJLiELZ0HLSk",
        text: "What new program or focus area are you planning?",
        type: "long_text"
      },
      {
        id: "KjmcvlUm1Qvf",
        text: "How do you know it is the correct next step? Have you talked with your clients/others in the community? What kind of research have you done to determine this?",
        type: "long_text"
      },
      {
        id: "DMPrTEuX3Duj",
        text: "How will you ensure that your original programming is not compromised in adding on new responsibilities for your staff?",
        type: "long_text"
      },
      {
        id: "GXtyRFl6AvXv",
        text: "What, if any, other funding have you already secured for this new project? If you receive a grant from us, but you do not receive intended funding from other partners, what would you do? Would it affect the proposed project? How would our grant be put to use?",
        type: "long_text"
      },
      {
        id: "AQfjCHHCTwnJ",
        text: "Are there any previous experiences or projects you’d like to share with us to shed further light on your ability to undertake this new project?",
        type: "long_text"
      },
      {
        id: "QAs8EQnotHnA",
        text: "Last year’s annual report\n",
        type: "file_upload"
      },
      {
        id: "OFzYJcNX5fM0",
        text: "Last year’s financial report",
        type: "file_upload"
      },
      {
        id: "UoUkT7stDYnL",
        text: "This year’s organizational budget",
        type: "file_upload"
      },
      {
        id: "x1F4uAFbyqPI",
        text: "A basic budget of expenses specific to the proposed project",
        type: "file_upload"
      }
    ]
  },
  {
    id: "vuL4pI",
    name: "New - Start",
    tag: "(N) Start",
    questions: [
      {
        id: "QLvCL7dN8vsp",
        text: "When was your organization founded?",
        type: "long_text"
      },
      {
        id: "emsscfAphSSV",
        text: "Number of paid staff and basic list of positions",
        type: "long_text"
      },
      {
        id: "Rn9WI8PEHqVp",
        text: "Last year's operating budget (in US$)",
        type: "short_text"
      }
    ]
  },
  {
    id: "SO6tIV",
    name: "New - Activities & Learnings",
    tag: "(N) Learnings",
    questions: [
      {
        id: "qhrjx9k7T6Bt",
        text: "What problems with access to family planning supplies/information/rights do you have within your community? How do you know? What kinds of needs assessment(s) did you complete within the community?",
        type: "long_text"
      },
      {
        id: "kibn5mcbBoMC",
        text: "How did you determine that your program(s) will solve the problem(s)?",
        type: "long_text"
      },
      {
        id: "kv7iSIaOoB3s",
        text: "Who do you serve with your family planning programs?",
        type: "long_text"
      },
      {
        id: "OwRHvlXETUmi",
        text: "How and why did you decide to focus on your current beneficiaries in your family planning work?",
        type: "long_text"
      },
      {
        id: "jnHoRFGHXxJ5",
        text: "Who in your organization is responsible for collecting data and tracking progress toward your family planning goals? What does their work look like?",
        type: "long_text"
      },
      {
        id: "CNXMKGgkWXgt",
        text: "What assumptions did you have to assess on the road to achieving your expected program results?",
        type: "long_text"
      },
      {
        id: "pQrfUOlz3afp",
        text: "Please provide an example of a family planning program you had for at least one year. What outputs and outcomes did you measure? Did you collect any data that demonstrated long-term impact?",
        type: "long_text"
      },
      {
        id: "RnBWaWC0zPw0",
        text: "How do you know that your family planning intervention(s) is/are working?",
        type: "long_text"
      }
    ]
  },
  {
    id: "aWm1bg",
    name: "New - Big Picture",
    tag: "(N) Big Picture",
    questions: [
      {
        id: "eSIWwC2aEuQs",
        text: "What other organizations provide family planning programs in your region and/or community? How does your work differ from theirs? How do you fit in the overall system?",
        type: "long_text"
      },
      {
        id: "MniBe2bTzlMW",
        text: "What organizations or entities do you collaborate with and how? What is the desired impact of these collaborations?",
        type: "long_text"
      },
      {
        id: "idptfRe7NRoA",
        text: "What risks does your organization face in trying to complete its work?",
        type: "long_text"
      },
      {
        id: "gC2KYZLv2Hzy",
        text: "What are two internal challenges you face? Provide an example of something that went wrong recently within the organization and how the team dealt with it.",
        type: "long_text"
      }
    ]
  },
  {
    id: "W3k3ee",
    name: "New - Finances",
    tag: "(N) Finances",
    questions: [
      {
        id: "Uc3KLCL2YZPm",
        text: "What are your current funding sources for your family planning programming and for how long do they last? If possible, please give us a breakdown of your current family planning funding sources out of 100%. ",
        type: "long_text"
      },
      {
        id: "oBApp6ei1caq",
        text: "What are your expected funding sources for 2020?",
        type: "long_text"
      },
      {
        id: "Ko76Dg9rHfwA",
        text: "If you receive a grant from us, but you do not receive intended funding from other partners, what would you do? How would our grant be put to use?",
        type: "long_text"
      }
    ]
  },
  {
    id: "XB0CzI",
    name: "New - Attachments",
    tag: "(N) Attachments",
    questions: [
      {
        id: "MFo1M8WmkmD3",
        text: "Proof of organizational legal status.",
        type: "file_upload"
      },
      {
        id: "L5IkZsyjEJXV",
        text: "This year’s organizational budget",
        type: "file_upload"
      },
      {
        id: "WwcFNrO2qGJh",
        text: "Last year’s organizational budget",
        type: "file_upload"
      },
      {
        id: "Ze0sOlvvzQ9s",
        text: "References - please provide two (2) names and contact information\n",
        type: "file_upload"
      },
      {
        id: "NHwTAUtpQAj5",
        text: "Organizational chart",
        type: "file_upload"
      },
      {
        id: "HpVfkfcsy6f4",
        text: "Last year’s annual report",
        type: "file_upload"
      },
      {
        id: "MwBqBSJlQHqc",
        text: "Business plan",
        type: "file_upload"
      },
      {
        id: "Th9Xkq2MJhgG",
        text: "Policies you may have for child protection, ethics, etc.",
        type: "file_upload"
      },
      {
        id: "fk5nKuBu191W",
        text: "Any external evaluations or studies",
        type: "file_upload"
      },
      {
        id: "F7QUUFHaJK6c",
        text: "Other materials that you would like to share with us (videos, art, testimonials).",
        type: "file_upload"
      }
    ]
  }
]

forms.forEach(form => {
  docClient.put({ TableName: "forms", Item: form }, function (err, data) {
    if (err) {
      console.error("Unable to add form. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("PutItem succeeded: forms");
    }
  })
})

const users = [
  {
    TableName: "users",
    Item: {
      id: "1",
      email: "nderitudavid@gmail.com",
      createdAt: "2019-08-08T13:29:27Z",
      notes: "Notes here!",
      responses: [
        {
          id: "4rdvi15b6k298w1lslg34rdh0934tklk",
          formId: "bv8u0Y",
          answers: [
            {
              questionId: "IUWgGhQA3d5t",
              text: "David Nderitu"
            },
            {
              questionId: "F2NsnryEDre7",
              text: "Imarisha CBO"
            },
            {
              questionId: "vyQF0KCqWuay",
              text: "Executive Director"
            },
            {
              questionId: "rzO4roXJIPzF",
              text: "https://www.imarisha.org"
            },
            {
              questionId: "P4PPcwnBSztV",
              text: "+254723935597"
            },
            {
              questionId: "NLWFHlRalA0H",
              text: "nderitudavid@gmail.com"
            },
            {
              questionId: "l9Hf0HNHcpXp",
              text: "Kenya"
            },
            {
              questionId: "KjiMOBBtowrg",
              text: "Imarisha is a Kiswahili word meaning to make better.  We envision empowered Kenya communities driving sustainable development while our mission is to facilitate adoption of innovative practices and approaches among marginalized communities for sustainable development."
            },
            {
              questionId: "ljjLBQRXGtJ4",
              text: "Imarisha CBO is currently running a project whose goal is to have Sexual and Reproductive Health (SRH) and other livelihoods needs of adolescents living with HIV/AIDS addressed in Nyeri County in Kenya. The project acknowledges that discussion of SRH issues between parents/guardians and adolescents face myriad socio-cultural challenges. The project takes note of the rising number of HIV positive adolescents and the inadequate programming for them which may trigger increased HIV infections in Kenya if the issue is not addressed. We are equipping adolescents living with requisite skills to champion for adolescents living with HIV health and other livelihoods needs. We are empowering and encouraging HIV-positive young people to freely discuss the SRH issues not only with parents/ guardians but also with other service providers by strengthening support groups and peer groups for HIV positive adolescents. The project has trained 22 champions on peer education, leadership and management and advocacy. Additionally, the project has conducted Systemic Child Counseling training to 23 school teachers aiming at equipping the trained counselors with the counseling skills and empower them to diversify the context. "
            }
          ]
        }
      ]
    }
  },
  {
    TableName: "users",
    Item: {
      id: "2",
      email: "rob.cameron@fastmail.com",
      createdAt: "2019-08-09T13:29:27Z",
      notes: " ",
      responses: [
        {
          id: "4rdvi15b6k298w1lslg34rdh0934tklj",
          formId: "bv8u0Y",
          answers: [
            {
              questionId: "IUWgGhQA3d5t",
              text: "Rob Cameron"
            },
            {
              questionId: "F2NsnryEDre7",
              text: "Cameron Tech"
            },
            {
              questionId: "vyQF0KCqWuay",
              text: "Owner"
            },
            {
              questionId: "rzO4roXJIPzF",
              text: "https://camerontech.io"
            },
            {
              questionId: "P4PPcwnBSztV",
              text: "+7606725123"
            },
            {
              questionId: "NLWFHlRalA0H",
              text: "rob.cameron@fastmail.com"
            },
            {
              questionId: "l9Hf0HNHcpXp",
              text: "USA"
            },
            {
              questionId: "KjiMOBBtowrg",
              text: "Something goes here"
            },
            {
              questionId: "ljjLBQRXGtJ4",
              text: "Nothing"
            }
          ]
        }
      ]
    }
  }

]

users.forEach(user => {
  docClient.put(user, function (err, data) {
    if (err) {
      console.error("Unable to add form. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("PutItem succeeded: users");
    }
  })
})
