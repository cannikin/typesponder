import React from "react";
import Row from "./Row";
import RowLoading from "./RowLoading";

export default function Responses({ users, forms, usersLoaded }) {
  function formTags(responses) {
    return responses
      .map(response => forms.find(f => f.id === response.formId))
      .filter(f => f)
      .map(form => form.tag)
      .flat();
  }

  if (!users.length) {
    if (usersLoaded) {
      return <p className="moon-gray tc">No users matched your filter</p>;
    } else {
      return <RowLoading />;
    }
  }

  return (
    <ul className="list ma0 pa0">
      {users.map(user => (
        <Row
          key={user.id}
          id={user.id}
          email={user.email}
          createdAt={user.createdAt}
          tags={formTags(user.responses)}
        />
      ))}
    </ul>
  );
}
