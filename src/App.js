import React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import moment from "moment";
import md5 from "blueimp-md5/js/md5"
import './app.sass'

const RESPONSES = [
  {
    id: "abcd",
    email: "rob.cameron@fastmail.com",
    created_at: new Date(),
    answers: [
      ["Name", "Rob Cameron"],
      ["Favorite color?", "Red"]
    ]
  },
  {
    id: "efgh",
    email: "jack.cameron@fastmail.com",
    created_at: new Date(),
    answers: [
      ["Name", "Jack Cameron"],
      ["Favorite color?", "Blue"]
    ]
  },
  {
    id: "ijkl",
    email: "kate.cameron@fastmail.com",
    created_at: new Date(),
    answers: [
      ["Name", "Kate Cameron"],
      ["Favorite color?", "Green"]
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
              <Link to="/" className="no-underline blue">Typesponder</Link>
            </h1>
            <h3 className="mt1 mb0 f6 fw4 fr silver">{ responses.length } Responses</h3>
          </header>
          <main className="flex flex-wrap flex-auto-ns">
            <nav className="w-100 w-third-ns mb3 ph3 bb bn-ns b--moon-gray">
              <Responses list={ responses } />
            </nav>
            <section className="w-100 w-two-thirds-ns ph3">
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

class Detail extends React.Component {
  render() {
    const { answers } = this.props.response

    return(
      <dl className="mt0 mb3">
        {
          answers.map((qa, i) => (
            <div key={ i }>
              <dt className="fw6">{ qa[0] }</dt>
              <dd className="ma0 mb3">{ qa[1] }</dd>
            </div>
          ))
        }
      </dl>
    )
  }
}

class Responses extends React.Component {
  render() {
    const { list } = this.props

    return(
      <ul className="list ma0 pa0">
        {
          list.map(item =>
            <Row key={ item.id } id={item.id} name={item.name} email={item.email} createdAt={item.created_at} />
          )
        }
      </ul>
    )
  }
}

class Row extends React.Component {
  render() {
    const { id, email, created_at } = this.props
    const avatar = md5(email)

    return(
      <li className="mb3">
        <Link to={`/responses/${id}`} className="flex dim no-underline">
          <div className="w2-5 mr2">
            <img src={`https://gravatar.com/avatar/${avatar}`} alt="avatar" className="br-100" />
          </div>
          <div>
            <span className="db red">{ email }</span>
            <time className="f7 silver" dateTime={ moment(created_at).format() }>
              { moment(created_at).format('LLL') }
            </time>
          </div>
        </Link>
      </li>
    )
  }
}

export default App;
