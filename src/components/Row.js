import React from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";
import md5 from "blueimp-md5/js/md5"
import _ from 'lodash'

export default function Row({ id, email, createdAt, tags }) {

  function avatar(email) {
    return `https://gravatar.com/avatar/${md5(email)}`
  }

  return(
    <li className="mb1">
      <NavLink to={`/users/${id}`} className="db hover-bg-near-white no-underline pa2 br2" activeClassName="active bg-pwv-blue hover-bg-pwv-blue white">
        <div className="flex">
          <div className="w2-5 mr2">
            <img src={avatar(email)} alt="avatar" className="br-100" />
          </div>
          <div className="flex-auto">
            <span className="db pwv-red active-white truncate">{ email }</span>
            <time className="f7 silver" dateTime={ moment(createdAt).format() }>
              { moment(createdAt).format('LLL') }
            </time>
          </div>
        </div>
        <ul className="flex flex-wrap list ml2 f7 fw2">
          {
            tags.map((tag, i) =>
              <li key={ i }className="bg-pwv-red white mr1 mb1 ph2 pv1 br1">
                { _.startCase(tag) }
              </li>
            )
          }
        </ul>
      </NavLink>
    </li>
  )
}
