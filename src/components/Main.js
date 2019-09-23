import React, { useState } from "react";
import { Route } from "react-router-dom";

import BlankSlate from "./BlankSlate";
import Filter from "./Filter";
import Responses from "./Responses";
import Detail from "./Detail";

export default function Main({ currentUser, users, forms, updateUser }) {
  const [formFilter, setFormFilter] = useState("");

  function filteredUsers() {
    if (formFilter === "") {
      return users;
    }

    return users.filter(user => {
      return user.responses.find(response => {
        return response.formId === formFilter;
      });
    });
  }

  if (currentUser) {
    return (
      <main className="flex flex-wrap flex-auto-ns">
        <div className="w-100 w-25-ns">
          <Filter forms={forms} formFilter={formFilter} setFormFilter={setFormFilter} />
          <nav className="mb3 ph3 bb bn-ns b--moon-gray no-print">
            <Responses users={filteredUsers()} forms={forms} usersLoaded={users.length > 0} />
          </nav>
        </div>
        <section className="w-100 w-75-ns ph3">
          <Route exact path="/" component={BlankSlate} />
          <Route
            path="/users/:id"
            render={({ match }) => (
              <Detail
                user={filteredUsers().find(r => r.id === parseInt(match.params.id))}
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
