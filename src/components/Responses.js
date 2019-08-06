import React from "react";
import Row from "./Row";
import RowLoading from "./RowLoading";

export default function Responses({ list }) {

  if (!list.length) {
    return <RowLoading />
  }

  return(
    <ul className="list ma0 pa0">
      {
        list.map(item =>
          <Row
            key={ item.id }
            id={ item.id }
            email={ item.email }
            createdAt={ item.createdAt }
            tags={ item.tags }
          />
        )
      }
    </ul>
  )

}
