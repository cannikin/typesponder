import React from "react";
import Row from "./Row";
import RowLoading from "./RowLoading";

export default function Responses({ users, forms }) {

  if (!users.length) {
    return <RowLoading />
  }

  return(
    <ul className="list ma0 pa0">
      {
        users.map(item =>
          <Row
            key={ users.id }
            email={ users.email }
            createdAt={ users.createdAt }
            tags={ [] }
          />
        )
      }
    </ul>
  )

}
