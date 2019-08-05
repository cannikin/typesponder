import React from "react";
import Row from "./Row";

export default function Responses({ list }) {
  if (list.length) {
    return(
      <ul className="list ma0 pa0">
        {
          list.map(item =>
            <Row key={ item.id } id={item.id} name={item.name} email={item.email} createdAt={item.created_at} />
          )
        }
      </ul>
    )
  } else {
    return(
      <p>Loading...</p>
    )
  }
}
