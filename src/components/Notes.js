import React from "react"

class Notes extends React.Component {
  render() {
    const { notes } = this.props

    return(
      <form className="w-50 pl3" name="notes" method="POST" netlify>
        <textarea name="notes" className="w-100 h5 f6 pa3 b--moon-gray mb2" placeholder="Notes" defaultValue={notes || ""} />
        <button type="submit" className="db f5 fw5 bg-pwv-red pv3 w4 white bn br2 center">Save</button>
      </form>
    )
  }
}

export default Notes
