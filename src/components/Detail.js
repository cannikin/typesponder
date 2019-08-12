import React from "react"
import Linkify from "react-linkify"
import Notes from "./Notes"

export default function Detail({ user, forms, onUserUpdate }) {
  const { id, notes } = user || {}
  const answers = ((user || {}).responses || []).map(r => r.answers).flat()
  const questions = (forms || []).map(f => f.questions).flat()

  function textFormat(text) {
    return String(text).split('\n').map((item, key) => {
      return <span key={key}>{item}<br/></span>
    })
  }

  function findQuestion(answer) {
    return questions.find(q => q.id === answer.questionId)
  }

  if (user && forms) {
    return(
      <div className="relative">
        <dl className="w-50-ns mt0 mb3 measure">
          {
            answers.map((answer, i) => (
              <div key={ i }>
                <dt className="f4 fw5 pwv-blue lh-title mb2">{ findQuestion(answer).text }</dt>
                <Linkify properties={{ target: "_blank" }}><dd className="ma0 mb4 pwv-blue o-70 lh-copy">{ textFormat(answer.text) }</dd></Linkify>
              </div>
            ))
          }
        </dl>
        <Notes id={ id } notes={ notes } onUpdate={ onUserUpdate } />
      </div>
    )
  } else {
    return null
  }
}
