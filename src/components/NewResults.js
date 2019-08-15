import React from "react"

export default function NewResults({ show }) {

  if (show) {
    return (
      <h3 className="dib fw2 f6 pv2 ph4 white bg-pwv-red v-mid br4">
        New responses, refresh to see!
      </h3>
    )
  } else {
    return null
  }
}
