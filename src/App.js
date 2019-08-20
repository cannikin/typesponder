import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./styles/app.sass"
import logo from "./images/logo.svg"
import moment from "moment"

import endpoints from "./endpoints"
import BlankSlate from "./components/BlankSlate"
import Responses from "./components/Responses"
import Detail from "./components/Detail"
import NewResults from "./components/NewResults"
import ResultCount from "./components/ResultCount"

export default function App() {

  const NEW_USER_INTERVAL_SECONDS = 60

  const [users, setUsers] = useState([])
  const [forms, setForms] = useState([])
  const [newResults, setNewResults] = useState(0)

  // gets all data for the app
  async function getData() {
    const response = await fetch(endpoints.getUsers)
    const json = await response.json()

    return json
  }

  // replaces a single user with `userData` and updates `users` state
  function updateUser(userData) {
    const updatedUsers = users.map(user => {
      if (userData.id === user.id) {
        return userData
      } else {
        return user
      }
    })

    setUsers(updatedUsers)
  }

  // sorts users based on createdAt date, descending
  function sortUsers(users) {
    return users.sort((a, b) => {
      if (moment(a.createdAt).unix() < moment(b.createdAt).unix()) {
        return 1
      } else {
        return -1
      }
    })
  }

  // counts number of responses for all users
  function responseCount(users) {
    return users.reduce((count, user) => count + user.responses.length, 0)
  }

  // gets data and populates state
  useEffect(() => {
    if (!users.length) {
      // eslint-disable-next-line no-inner-declarations
      async function get() {
        let json = await getData()
        setForms(json.forms)
        setUsers(sortUsers(json.users))
      }
      get()
    }
  })

  // periodically check for new responses and set `newResults` state if new data is available
  // used https://overreacted.io/making-setinterval-declarative-with-react-hooks/ for help
  useEffect(() => {
    let id = setInterval(async () => {
      if (users.length) {
        const response = await fetch(endpoints.responsesCount)
        const json = await response.json()
        const newResponsesCount = json.responsesCount - responseCount(users)

        if (newResponsesCount) {
          setNewResults(newResponsesCount)
        }
      }
    }, NEW_USER_INTERVAL_SECONDS * 1000)

    return () => clearInterval(id)
  })

  return (
    <Router>
      <div className="app sans-serif">
        <header className="App-header ph3 mb4 flex bb b--moon-gray">
          <h1 className="ma0 f4 w-third pv3">
            <img src={ logo } alt="logo" className="w2 v-mid mr2" />
            <Link to="/" className="no-underline pwv-blue">Typesponder</Link>
          </h1>
          <div className="w-third tc">
            <NewResults count={ newResults } />
          </div>
          <h3 className="mt1 mb0 f6 pv3 fw4 w-third tr silver">
            <ResultCount users={ users } count={ responseCount } />
          </h3>
        </header>
        <main className="flex flex-wrap flex-auto-ns">
          <nav className="w-100 w-25-ns mb3 ph3 bb bn-ns b--moon-gray">
            <Responses users={ users } forms={ forms } />
          </nav>
          <section className="w-100 w-75-ns ph3">
            <Route exact path="/" render={() => (
              <BlankSlate />
            )} />
            <Route path="/users/:id" render={({ match }) => (
              <Detail user={ users.find(r => r.id === parseInt(match.params.id)) } forms={ forms } onUserUpdate={ updateUser } />
            )} />
          </section>
        </main>
      </div>
    </Router>
  )
}
