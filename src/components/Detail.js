import React from "react"
import Notes from "./Notes"

export default function Detail({ forms, user }) {
  function textFormat(text) {
    return String(text).split('\n').map((item, key) => {
      return <span key={key}>{item}<br/></span>
    })
  }

  if (user) {
    const { note } = user
    const answers = user.responses.map(u => u.answers)[0]
    const questions = forms[0].questions

    return(
      <div className="relative">
        <dl className="w-50-ns mt0 mb3 measure">
          {
            answers.map((answer, i) => (
              <div key={ i }>
                <dt className="f4 fw5 pwv-blue lh-title mb2">{ questions[i].text }</dt>
                <dd className="ma0 mb4 pwv-blue o-70 lh-copy">{ textFormat(answer.text) }</dd>
              </div>
            ))
          }
        </dl>
        <Notes note={ note } />
      </div>
    )
  } else {
    return null
  }
}
