import React from "react"

export default function NewResults({ count }) {

  if (count) {
    return (
      <h3 className="dib fw2 f6 pv2 ph4 white bg-pwv-red v-mid br4">
        {count} new response(s), refresh to see!
      </h3>
    )
  } else {
    return null
  }
}
