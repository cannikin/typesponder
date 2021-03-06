import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles/app.sass";

import Header from "./components/Header";
import Main from "./components/Main";

const getUsers = async () => {
  let endpointRoot = "/.netlify/functions/get-users",
    endpoint = endpointRoot,
    done = false,
    lastUser = null,
    response,
    json,
    users = [];

  // keep getting results until dynamoDB says there are no more
  while (!done) {
    if (lastUser) {
      endpoint = `${endpointRoot}?lastUser=${lastUser}`;
    }
    response = await fetch(endpoint);
    json = await response.json();
    users = users.concat(json.users);

    if (json.lastUser) {
      lastUser = json.lastUser.id;
    } else {
      done = true;
    }
  }

  return users;
};

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

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/.netlify/functions/get-forms");
      const json = await response.json();
      setForms(json.forms);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setUsers(await getUsers());
    };
    fetchData();
  }, []);

  return (
    <Router>
      <div className="app sans-serif">
        <Header currentUser={currentUser} setCurrentUser={setCurrentUser} users={users} />
        <Main currentUser={currentUser} users={users} forms={forms} updateUser={updateUser} />
      </div>
    </Router>
  );
}
