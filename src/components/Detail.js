import React from "react"
import Notes from "./Notes"

export default function Detail({ user, forms, onUserUpdate }) {
  function textFormat(text) {
    return String(text).split('\n').map((item, key) => {
      return <span key={key}>{item}<br/></span>
    })
  }

  function findQuestion(questions, answer) {
    return questions.find(q => q.id === answer.questionId)
  }

  if (user && forms) {
    const { id, notes } = user
    const answers = user.responses.map(r => r.answers)[0]
    const questions = forms.map(f => f.questions).flat()
    
    return(
      <div className="relative">
        <dl className="w-50-ns mt0 mb3 measure">
          {
            answers.map(answer => (
              <div key={ answer.questionId }>
                <dt className="f4 fw5 pwv-blue lh-title mb2">{ findQuestion(questions, answer).text }</dt>
                <dd className="ma0 mb4 pwv-blue o-70 lh-copy">{ textFormat(answer.text) }</dd>
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
