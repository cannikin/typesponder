var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
  accessKeyId: 'KEY',
  secretAccessKey: 'SECRET', 
  region: "us-west-2",
  endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var forms = [
  {
    TableName: "forms",
    Item: {
      id: "bv8u0Y",
      name: "Introduction questionIdnaire",
      tag: "Intro",
      questionIds: [
        {
          id: "IUWgGhQA3d5t",
          type: "short_text",
          text: "Your name"
        },
        {
          id: "F2NsnryEDre7",
          type: "short_text",
          text: "Organization name"
        },
        {
          id: "vyQF0KCqWuay",
          type: "short_text",
          text: "Your position in the organization"
        },
        {
          id: "rzO4roXJIPzF",
          type: "website",
          text: "Organization website (if applicable)"
        },
        {
          id: "NLWFHlRalA0H",
          type: "email",
          text: "Your email address"
        },
        {
          id: "P4PPcwnBSztV",
          type: "phone_number",
          text: "Your phone number"
        },
        {
          id: "l9Hf0HNHcpXp",
          type: "long_text",
          text: "Countries your organization operates in"
        },
        {
          id: "KjiMOBBtowrg",
          type: "long_text",
          text: "How would you describe what your organization does to an interested non-expert?"
        },
        {
          id: "ljjLBQRXGtJ4",
          type: "long_text",
          text: "What current family planning programming do you have? How does it fit within your overall programming?"
        }
      ]
    }
  }
]

forms.forEach(form => {
  docClient.put(forms, function (err, data) {
    if (err) {
      console.error("Unable to add form. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("PutItem succeeded: forms");
    }
  })
})


var users = [
  {
    TableName: "users",
    Item: {
      id: "1",
      email: "nderitudavid@gmail.com",
      createdAt: "2019-08-08T13:29:27Z",
      responses: [
        {
          id: "4rdvi15b6k298w1lslg34rdh0934tklk",
          formId: "bv8u0Y",
          answers: [
            {
              questionId: "IUWgGhQA3d5t",
              answer: "David Nderitu"
            },
            {
              questionId: "F2NsnryEDre7",
              answer: "Imarisha CBO"
            },
            {
              questionId: "vyQF0KCqWuay",
              answer: "Executive Director"
            },
            {
              questionId: "rzO4roXJIPzF",
              answer: "https://www.imarisha.org"
            },
            {
              questionId: "P4PPcwnBSztV",
              answer: "+254723935597"
            },
            {
              questionId: "NLWFHlRalA0H",
              answer: "nderitudavid@gmail.com"
            },
            {
              questionId: "l9Hf0HNHcpXp",
              answer: "Kenya"
            },
            {
              questionId: "KjiMOBBtowrg",
              answer: "Imarisha is a Kiswahili word meaning to make better.  We envision empowered Kenya communities driving sustainable development while our mission is to facilitate adoption of innovative practices and approaches among marginalized communities for sustainable development."
            },
            {
              questionId: "ljjLBQRXGtJ4",
              answer: "Imarisha CBO is currently running a project whose goal is to have Sexual and Reproductive Health (SRH) and other livelihoods needs of adolescents living with HIV/AIDS addressed in Nyeri County in Kenya. The project acknowledges that discussion of SRH issues between parents/guardians and adolescents face myriad socio-cultural challenges. The project takes note of the rising number of HIV positive adolescents and the inadequate programming for them which may trigger increased HIV infections in Kenya if the issue is not addressed. We are equipping adolescents living with requisite skills to champion for adolescents living with HIV health and other livelihoods needs. We are empowering and encouraging HIV-positive young people to freely discuss the SRH issues not only with parents/ guardians but also with other service providers by strengthening support groups and peer groups for HIV positive adolescents. The project has trained 22 champions on peer education, leadership and management and advocacy. Additionally, the project has conducted Systemic Child Counseling training to 23 school teachers aiming at equipping the trained counselors with the counseling skills and empower them to diversify the context. "
            }
          ]
        }
      ]
    }
  }
]

users.forEach(user => {
  docClient.put(forms, function (err, data) {
    if (err) {
      console.error("Unable to add form. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log("PutItem succeeded: users");
    }
  })
})
