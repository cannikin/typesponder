import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./styles/app.sass"
import logo from "./images/logo.svg"
import moment from "moment"

import endpoints from "./endpoints"
import BlankSlate from "./components/BlankSlate"
import Responses from "./components/Responses"
import Detail from "./components/Detail"

export default function App() {

  const [users, setUsers] = useState([])
  const [forms, setForms] = useState([])

  function updateUser(data) {
    const updatedUsers = users.map(user => {
      if (data.id === user.id) {
        return data
      } else {
        return user
      }
    })

    setUsers(updatedUsers)
  }

  function sortUsers(users) {
    return users.sort((a, b) => {
      if (moment(a.createdAt).unix() < moment(b.createdAt).unix()) {
        return 1
      } else {
        return -1
      }
    })
  }

  useEffect(() => {
    if (!users.length) {
      fetch(endpoints.getUsers)
        .then(response => response.json())
        .then(json => {
          setForms(json.forms)
          setUsers(sortUsers(json.users))
        })
        .catch()
    }
  })

  return (
    <Router>
      <div className="app sans-serif">
        <header className="App-header ph3 pv3 mb4 cf bb b--moon-gray">
          <h1 className="ma0 f4 fl">
            <img src={ logo } alt="logo" className="w2 v-mid mr2" />
            <Link to="/" className="no-underline pwv-blue">Typesponder</Link>
          </h1>
          <h3 className="mt1 mb0 f6 fw4 fr silver">{ users.length } Responses</h3>
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
  );
}
