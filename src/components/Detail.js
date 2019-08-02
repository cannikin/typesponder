import React from "react"
import Notes from "./Notes"

class Detail extends React.Component {
  textFormat(text) {
    return text.split('\n').map((item, key) => {
      return <span key={key}>{item}<br/></span>
    })
  }

  render() {
    try {
      const { answers, notes } = this.props.response

      return(
        <div className="flex">
          <dl className="w-50 mt0 mb3 measure">
            {
              answers.map((hash, i) => (
                <div key={ i }>
                  <dt className="f4 fw5 pwv-blue lh-title mb2">{ hash.question }</dt>
                  <dd className="ma0 mb4 pwv-blue o-70 lh-copy">{ this.textFormat(hash.answer) }</dd>
                </div>
              ))
            }
          </dl>
          <Notes notes={notes} />
        </div>
      )
    } catch(e) {
      return null
    }
  }
}

export default Detail
