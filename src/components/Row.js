import React from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";
import md5 from "blueimp-md5/js/md5";

export default function Row({ id, email, createdAt, tags, hasNotes }) {
  function avatar(email) {
    return `https://gravatar.com/avatar/${md5(email)}`;
  }

  return (
    <li className="mb1 relative">
      <NavLink
        to={`/users/${id}`}
        className="db hover-bg-near-white no-underline pa2 br2 pwv-blue"
        activeClassName="active bg-pwv-blue hover-bg-pwv-blue white">
        <div className="">
          <span className="db pwv-red active-white truncate" style={{ width: "250px" }}>
            {email}
          </span>
          <time className="f7 silver" dateTime={moment(createdAt).format()}>
            {moment(createdAt).format("LLL")}
          </time>
        </div>
        <ul className="flex flex-wrap list pl0 mr2 f7 fw2 mt1">
          {tags.map((tag, i) => (
            <li key={i} className="bg-pwv-red white mr1 mb1 ph2 pv1 br1">
              {tag}
            </li>
          ))}
        </ul>
        {hasNotes ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="absolute top-0 right-0 mt2 mr2 w1 h1"
            style={{ fill: "currentColor" }}>
            <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17l-.59.59-.58.58V4h16v12zM6 12h2v2H6zm0-3h2v2H6zm0-3h2v2H6zm4 6h5v2h-5zm0-3h8v2h-8zm0-3h8v2h-8z" />
          </svg>
        ) : (
          ""
        )}
      </NavLink>
    </li>
  );
}
