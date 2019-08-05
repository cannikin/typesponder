import React, { useState } from "react"
import endpoints from "../endpoints"

export default function Notes({id, notes}) {
  const [saving, setSaving] = useState(false)
  const [input, setInput] = useState(notes)
  const [prevId, setPrevId] = useState(id)

  // component won't re-render when changing responses so it always shows the notes from the first
  // picked response. force the input value to change here when the ID changes
  if (id !== prevId) {
    setInput(notes)
    setPrevId(id)
  }

  function formData(form) {
    let formData = {}

    Array.from(form.elements).forEach(element => {
      if (element.name) {
        formData[element.name] = element.value
      }
    })

    return formData
  }

  function saveButtonLabel() {
    return saving ? "Saving..." : "Save"
  }

  function saveButtonClass() {
    return saving ? "o-70" : ""
  }

  function onChange(event) {
    setInput(event.target.value)
  }

  function onSubmit(event) {
    setSaving(true)

    fetch(endpoints.save, {
      method: 'post',
      body: JSON.stringify(formData(event.target))
    }).then(() => setSaving(false))

    event.preventDefault()
  }

  return(
    <form className="w-50 pl3" action={endpoints.save} method="POST" onSubmit={ onSubmit }>
      <input type="hidden" name="id" value={ id } />
      <textarea
        name="notes"
        className="w-100 h5 f6 br3 pa3 b--moon-gray mb2"
        placeholder="Notes"
        value={ input || '' }
        onChange={ onChange } />
      <button
        type="submit"
        className={ `db f5 fw5 bg-pwv-red pv3 w4 white bn br2 center pointer ${ saveButtonClass() }` }
        disabled={ saving }>
        { saveButtonLabel() }
      </button>
    </form>
  )
}
