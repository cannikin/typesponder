import React from "react";
import Row from "./Row";

class Responses extends React.Component {
  render() {
    const { list } = this.props

    return(
      <ul className="list ma0 pa0">
        {
          list.map(item =>
            <Row key={ item.id } id={item.id} name={item.name} email={item.email} createdAt={item.created_at} />
          )
        }
      </ul>
    )
  }
}

export default Responses
