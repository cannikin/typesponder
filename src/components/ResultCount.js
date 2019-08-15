import React from "react"

export default function ResultCount({ users, count }) {

  if (users.length) {
    return (
      <>
        { users.length } Users, { count(users) } Responses
      </>
    )
  } else {
    return (
      <>
        Loading...
      </>
    )
  } 
}
