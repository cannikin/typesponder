import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles/app.sass";

import { getData, sortUsers } from "./helpers";
import Header from "./components/Header";
import Main from "./components/Main";

export default function App() {
  const [users, setUsers] = useState([]);
  const [forms, setForms] = useState([]);
  const [currentUser, setCurrentUser] = useState(localStorage.getItem("gotrue.user"));

  // replaces a single user with `userData` and updates `users` state
  function updateUser(userData) {
    const updatedUsers = users.map(user => {
      if (userData.id === user.id) {
        return userData;
      } else {
        return user;
      }
    });

    setUsers(updatedUsers);
  }

  // gets data and populates state
  useEffect(() => {
    if (!users.length) {
      // eslint-disable-next-line no-inner-declarations
      async function get() {
        let json = await getData();
        setForms(json.forms);
        setUsers(sortUsers(json.users));
      }
      get();
    }
  });

  return (
    <Router>
      <div className="app sans-serif">
        <Header currentUser={currentUser} setCurrentUser={setCurrentUser} users={users} />
        <Main currentUser={currentUser} users={users} forms={forms} updateUser={updateUser} />
      </div>
    </Router>
  );
}
