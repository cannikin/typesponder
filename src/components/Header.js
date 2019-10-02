import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import netlifyIdentity from "netlify-identity-widget";

import logo from "../images/logo.svg";
import { responseCount } from "../helpers";
import endpoints from "../endpoints";
import AuthButton from "./AuthButton";
import NewResults from "./NewResults";
import ResultCount from "./ResultCount";

export default function Header({ currentUser, setCurrentUser, users }) {
  const NEW_USERS_INTERVAL_SECONDS = 60;

  const [newResults, setNewResults] = useState(0);

  // periodically check for new responses and set `newResults` state if new data is available
  // used https://overreacted.io/making-setinterval-declarative-with-react-hooks/ for help
  useEffect(() => {
    let id = setInterval(async () => {
      if (users.length) {
        const response = await fetch(endpoints.responsesCount);
        const json = await response.json();
        const newResponsesCount = json.responsesCount - users.count;

        if (newResponsesCount) {
          setNewResults(newResponsesCount);
        }
      }
    }, NEW_USERS_INTERVAL_SECONDS * 1000);

    return () => clearInterval(id);
  });

  const netlifyAuth = {
    signin() {
      netlifyIdentity.open();
      netlifyIdentity.on("login", user => {
        setCurrentUser(user);
        netlifyIdentity.close();
      });
    },

    signout() {
      netlifyIdentity.logout();
      netlifyIdentity.on("logout", () => {
        setCurrentUser(null);
      });
    }
  };

  return (
    <header className="App-header ph3 mb4 flex bb b--moon-gray">
      <h1 className="ma0 f4 w-third pv3">
        <img src={logo} alt="logo" className="w2 v-mid mr2" />
        <Link to="/" className="no-underline pwv-blue">
          Typesponder
        </Link>
      </h1>
      <div className="w-third tc">
        <NewResults count={newResults} />
      </div>
      <div className="w-third tr">
        <h3 className="dib mt1 mb0 mr2 f6 pv3 fw4 tr silver">
          {currentUser ? <ResultCount users={users} count={responseCount} /> : ""}
        </h3>
        <AuthButton currentUser={currentUser} netlifyAuth={netlifyAuth} />
      </div>
    </header>
  );
}
