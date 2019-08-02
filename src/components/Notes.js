import React from "react"
import endpoints from "../endpoints"

class Notes extends React.Component {
  static getDerivedStateFromProps(props, currentState) {
    if (props.id !== currentState.id) {
      return {
        saving: currentState.saving,
        id: props.id,
        input: props.notes
      }
    } else {
      return null
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      saving: false,
      id: props.id,
      input: props.notes
    }
  }

  formData(form) {
    let formData = {}

    Array.from(form.elements).forEach(element => {
      if (element.name) {
        formData[element.name] = element.value
      }
    })

    return formData
  }

  saveButtonLabel() {
    return this.state.saving ? "Saving..." : "Save"
  }

  saveButtonClass() {
    return this.state.saving ? "o-70" : ""
  }

  onChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onSubmit = (event) => {
    this.setState({ saving: true })

    fetch(endpoints.save, {
      method: 'post',
      body: JSON.stringify(this.formData(event.target))
    })
    .then(() => this.setState({ saving: false }))

    event.preventDefault()
  }

  render() {
    const { id, saving, input } = this.state

    return(
      <form className="w-50 pl3" action={endpoints.save} method="POST" onSubmit={ this.onSubmit }>
        <input type="hidden" name="id" value={ id } />
        <textarea
          name="notes"
          className="w-100 h5 f6 br3 pa3 b--moon-gray mb2"
          placeholder="Notes"
          value={ input || '' }
          onChange={ this.onChange } />
        <button
          type="submit"
          className={ `db f5 fw5 bg-pwv-red pv3 w4 white bn br2 center pointer ${ this.buttonClass }` }
          disabled={ saving }>
          { this.saveButtonLabel() }
        </button>
      </form>
    )
  }
}

export default Notes
