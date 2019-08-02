const RESPONSES = [
  {
    id: "abcd",
    email: "rob.cameron@fastmail.com",
    created_at: new Date(),
    answers: [
      { question: "Name", answer: "Rob Cameron" },
      { question: "Organization Name", answer: "Cameron Tech" },
      { question: "Countries your organization operates in", answer: "USA and Canada" },
      { question: "How would you describe what your organization does to an interested non-expert?", answer: "We make cool stuff" },
      { question: "What current family planning programming do you have? How does it fit within your overall programming?", answer: "Lorem ipsum dolor amet pitchfork literally craft beer salvia hot chicken. Hoodie master cleanse irony blog chicharrones helvetica pok pok, williamsburg 3 wolf moon mustache kale chips pitchfork edison bulb. Umami chillwave squid cred, trust fund schlitz pug etsy post-ironic retro chartreuse adaptogen coloring book snackwave. Yr la croix sriracha, banjo cred fixie cornhole hammock kickstarter chicharrones.\n\nJianbing la croix aesthetic ugh, raw denim typewriter pork belly coloring book food truck cray. Tumeric narwhal brooklyn, crucifix authentic chicharrones gluten-free mlkshk etsy hot chicken small batch ethical. Helvetica heirloom etsy knausgaard mlkshk. Chicharrones wayfarers authentic, cloud bread synth locavore banjo try-hard poke. Kickstarter raw denim scenester echo park sartorial iPhone, mumblecore locavore keffiyeh hoodie. YOLO tumeric affogato, gochujang banh mi selvage put a bird on it 90's next level swag normcore chia pok pok." }
    ]
  },
  {
    id: "efgh",
    email: "jack.cameron@icloud.com",
    created_at: new Date(),
    answers: [
      { question: "Name", answer: "Jack Cameron" },
      { question: "Organization Name", answer: "Transformers Inc." },
      { question: "Countries your organization operates in", answer: "USA and Canada" },
      { question: "How would you describe what your organization does to an interested non-expert?", answer: "Spend all dad's money on Transformers" },
      { question: "What current family planning programming do you have? How does it fit within your overall programming?", answer: "Lorem ipsum dolor amet pitchfork literally craft beer salvia hot chicken. Hoodie master cleanse irony blog chicharrones helvetica pok pok, williamsburg 3 wolf moon mustache kale chips pitchfork edison bulb. Umami chillwave squid cred, trust fund schlitz pug etsy post-ironic retro chartreuse adaptogen coloring book snackwave. Yr la croix sriracha, banjo cred fixie cornhole hammock kickstarter chicharrones.\n\nJianbing la croix aesthetic ugh, raw denim typewriter pork belly coloring book food truck cray. Tumeric narwhal brooklyn, crucifix authentic chicharrones gluten-free mlkshk etsy hot chicken small batch ethical. Helvetica heirloom etsy knausgaard mlkshk. Chicharrones wayfarers authentic, cloud bread synth locavore banjo try-hard poke. Kickstarter raw denim scenester echo park sartorial iPhone, mumblecore locavore keffiyeh hoodie. YOLO tumeric affogato, gochujang banh mi selvage put a bird on it 90's next level swag normcore chia pok pok." }
    ]
  }
]

exports.handler = (event, context, callback) => {
  setTimeout(() => {
    callback(null, {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(RESPONSES)
    });
  }, 500)
}
