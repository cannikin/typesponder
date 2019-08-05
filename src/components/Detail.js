import React from "react"
import Notes from "./Notes"

export default function Detail({ response }) {
  function textFormat(text) {
    return text.split('\n').map((item, key) => {
      return <span key={key}>{item}<br/></span>
    })
  }

  if (response) {
    const { id, answers, notes } = response

    return(
      <div className="flex">
        <dl className="w-50 mt0 mb3 measure">
          {
            answers.map((hash, i) => (
              <div key={ i }>
                <dt className="f4 fw5 pwv-blue lh-title mb2">{ hash.question }</dt>
                <dd className="ma0 mb4 pwv-blue o-70 lh-copy">{ textFormat(hash.answer) }</dd>
              </div>
            ))
          }
        </dl>
        <Notes id={ id } notes={ notes } />
      </div>
    )
  } else {
    return null
  }
}
