import React from "react";
import Row from "./Row";
import RowLoading from "./RowLoading";

export default function Responses({ forms, users }) {

  function formTags(responses) {
    return (
      responses.map(response => forms.find(f => f.id === response.formId))
        .filter(f => f)
        .map(form => form.tag)
    )
  }

  if (!users.length) {
    return <RowLoading />
  }

  return (
    <ul className="list ma0 pa0">
      {
        users.map(user =>
          <Row
            key={ user.id }
            id={ user.id }
            email={ user.email }
            createdAt={ user.createdAt }
            tags={ [formTags(user.responses)] }
          />
        )
      }
    </ul>
  )

}
