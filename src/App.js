import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './styles/app.sass'
import logo from './images/logo.svg'

import endpoints from './endpoints'
import BlankSlate from './components/BlankSlate'
import Responses from './components/Responses'
import Detail from './components/Detail'

export default function App() {

  const [responses, setResponses] = useState([])

  useEffect(() => {
    if (!responses.length) {
      fetch(endpoints.getResponses)
        .then(response => response.json())
        .then(json => setResponses(json))
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
          <h3 className="mt1 mb0 f6 fw4 fr silver">{ responses.length } Responses</h3>
        </header>
        <main className="flex flex-wrap flex-auto-ns">
          <nav className="w-100 w-25-ns mb3 ph3 bb bn-ns b--moon-gray">
            <Responses list={ responses } />
          </nav>
          <section className="w-100 w-75-ns ph3">
            <Route exact path="/" render={() => (
              <BlankSlate />
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
