import React, { useState } from "react";
import { Route } from "react-router-dom";
import moment from "moment";

import BlankSlate from "./BlankSlate";
import Filter from "./Filter";
import Responses from "./Responses";
import Detail from "./Detail";

// sorts users based on createdAt date, descending
const sortUsers = users => {
  return users.sort((a, b) => {
    if (moment(a.createdAt).unix() < moment(b.createdAt).unix()) {
      return 1;
    } else {
      return -1;
    }
  });
};

const filterUsers = (users, filter) => {
  if (filter === "") {
    return sortUsers(users);
  }

  return sortUsers(
    users.filter(user => {
      return user.responses.find(response => {
        return response.formId === filter;
      });
    })
  );
};

export default function Main({ currentUser, users, forms, updateUser }) {
  const [formFilter, setFormFilter] = useState("");

  if (currentUser) {
    return (
      <main className="flex flex-wrap flex-auto-ns">
        <div className="w-100 w-25-ns">
          <Filter forms={forms} formFilter={formFilter} setFormFilter={setFormFilter} />
          <nav className="mb3 ph3 bb bn-ns b--moon-gray no-print">
            <Responses
              users={filterUsers(users, formFilter)}
              forms={forms}
              usersLoaded={users.length > 0}
            />
          </nav>
        </div>
        <section className="w-100 w-75-ns ph3">
          <Route exact path="/" component={BlankSlate} />
          <Route
            path="/users/:id"
            render={({ match }) => (
              <Detail
                user={filterUsers(users, formFilter).find(r => r.id === parseInt(match.params.id))}
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
