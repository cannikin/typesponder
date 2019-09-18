import React from "react";
import { Route } from "react-router-dom";

import BlankSlate from "./BlankSlate";
import Responses from "./Responses";
import Detail from "./Detail";

export default function Main({ currentUser, users, forms, updateUser }) {
  if (currentUser) {
    return (
      <main className="flex flex-wrap flex-auto-ns">
        <nav className="w-100 w-25-ns mb3 ph3 bb bn-ns b--moon-gray no-print">
          <Responses users={users} forms={forms} />
        </nav>
        <section className="w-100 w-75-ns ph3">
          <Route exact path="/" component={BlankSlate} />
          <Route
            path="/users/:id"
            render={({ match }) => (
              <Detail
                user={users.find(r => r.id === parseInt(match.params.id))}
                forms={forms}
                onUserUpdate={updateUser}
              />
            )}
          />
        </section>
      </main>
    );
  } else {
    return <p className="tc">Sign in above to continue</p>;
  }
}
