import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import md5 from "blueimp-md5/js/md5"

class Row extends React.Component {
  avatar(email) {
    return `https://gravatar.com/avatar/${md5(email)}`
  }

  render() {
    const { id, email, created_at } = this.props

    return(
      <li className="mb3">
        <Link to={`/responses/${id}`} className="flex dim no-underline">
          <div className="w2-5 mr2">
            <img src={this.avatar(email)} alt="avatar" className="br-100" />
          </div>
          <div>
            <span className="db red">{ email }</span>
            <time className="f7 silver" dateTime={ moment(created_at).format() }>
              { moment(created_at).format('LLL') }
            </time>
          </div>
        </Link>
      </li>
    )
  }
}

export default Row
