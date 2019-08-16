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
    const question = questions.find(q => q.id === answer.questionId)

    return question || { text: `QuestionId ${answer.questionId} not found` }
  }

  if (user && forms) {
    return(
      <div className="relative">
        <dl className="w-50-ns mt0 mb3 measure">
          {
            answers.map((answer, i) => (
              <div key={ i }>
                <dt className="f4 fw5 pwv-blue lh-title mb2">{ findQuestion(answer).text }</dt>
                <dd className="ma0 mb4 pwv-blue o-70 lh-copy nowrap truncate o-hidden">
                  <Linkify properties={{ target: "_blank" }}>
                    { textFormat(answer.text) }
                  </Linkify>
                </dd>
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
