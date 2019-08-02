import React from "react"
import endpoints from "../endpoints"

class Notes extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      saving: false
    }
  }

  onSubmit = (event) => {
    const formData = {}

    this.setState({ saving: true })

    Array.from(event.target.elements).forEach(element => {
      if (element.name) {
        formData[element.name] = element.value
      }
    })

    fetch(endpoints.save, {
      method: 'post',
      body: JSON.stringify(formData)
    })
      .then(response => ( response.json() ))
      .then(data => {
        this.setState({ saving: false })
      })

    event.preventDefault()
  }

  render() {
    const { id, notes } = this.props
    const { saving } = this.state

    return(
      <form className="w-50 pl3" action={endpoints.save} method="POST" onSubmit={ this.onSubmit }>
        <input type="hidden" name="id" value={ id } />
        <textarea name="notes" className="w-100 h5 f6 br3 pa3 b--moon-gray mb2" placeholder="Notes" defaultValue={notes || ""} />
        <button type="submit" className={ `db f5 fw5 bg-pwv-red pv3 w4 white bn br2 center pointer ${ saving ? "o-70" : "" }` } disabled={ saving ? true : false }>
          {
            saving
            ? "Saving..."
            : "Save"
          }
        </button>
      </form>
    )
  }
}

export default Notes
