import React from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";
import md5 from "blueimp-md5/js/md5"

export default function Row({ id, email, createdAt }) {
  function avatar(email) {
    return `https://gravatar.com/avatar/${md5(email)}`
  }

  return(
    <li className="mb1">
      <NavLink to={`/responses/${id}`} className="flex hover-bg-near-white no-underline pa2 br2" activeClassName="active bg-pwv-blue hover-bg-pwv-blue white">
        <div className="w2-5 mr2">
          <img src={avatar(email)} alt="avatar" className="br-100" />
        </div>
        <div>
          <span className="db pwv-red active-white">{ email }</span>
          <time className="f7 silver" dateTime={ moment(createdAt).format() }>
            { moment(createdAt).format('LLL') }
          </time>
        </div>
      </NavLink>
    </li>
  )
}
