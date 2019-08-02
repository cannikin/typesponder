import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './styles/app.sass'
import logo from './images/logo.svg'

import Responses from './components/Responses'
import Detail from './components/Detail'

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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { responses: RESPONSES }
  }

  render() {
    const { responses } = this.state

    return (
      <Router>
        <div className="app sans-serif">
          <header className="App-header ph3 pv3 mb4 cf bb b--moon-gray">
            <h1 className="ma0 f4 fl">
              <img src={ logo } alt="logo" className="w2 v-mid mr2" />
              <Link to="/" className="no-underline pwv-blue">Typesponder</Link>
            </h1>
            <h3 className="mt1 mb0 f6 fw4 fr silver">{ responses.length } Responses</h3>
          </header>
          <main className="flex flex-wrap flex-auto-ns">
            <nav className="w-100 w-25-ns mb3 ph3 bb bn-ns b--moon-gray">
              <Responses list={ responses } />
            </nav>
            <section className="w-100 w-75-ns ph3">
              <Route exact path="/" render={() => (
                <div>
                  Pick a response to get started
                </div>
              )} />
              <Route path="/responses/:id" render={({ match }) => (
                <Detail response={ responses.find(r => r.id === match.params.id) } />
              )} />
            </section>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
