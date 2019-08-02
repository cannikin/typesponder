import React from "react";

class Detail extends React.Component {
  textFormat(text) {
    return text.split('\n').map((item, key) => {
      return <span key={key}>{item}<br/></span>
    })
  }

  render() {
    try {
      const { answers } = this.props.response

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
          <form className="w-50 pl3" method="post">
            <textarea className="w-100 h5 f6 pa3 b--moon-gray mb2" placeholder="Notes" />
            <button type="submit" className="db f5 fw5 bg-pwv-red pv3 w4 white bn br2 center">Save</button>
          </form>
        </div>
      )
    } catch(e) {
      return null
    }
  }
}

export default Detail
