import React, { useState } from "react"
import endpoints from "../endpoints"

export default function Notes({ note }) {
  const [saving, setSaving] = useState(false)
  const [input, setInput] = useState(note.text)
  const [prevId, setPrevId] = useState(note.id)

  // component won't re-render when changing responses so it always shows the notes from the first
  // picked response. force the input value to change here when the ID changes
  if (note.id !== prevId) {
    setInput(note.text)
    setPrevId(note.id)
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
    const body = formData(event.target)
    setSaving(true)

    console.info(body)

    fetch(endpoints.saveNote, {
      method: 'post',
      body: JSON.stringify(body)
    }).then(() => setSaving(false))

    event.preventDefault()
  }

  return(
    <form className="w-third-ns mt5-ns pl3-ns fixed-ns top-2 right-2" action={endpoints.saveNote} method="POST" onSubmit={ onSubmit }>
      <input type="hidden" name="id" value={ note.id } />
      <textarea
        name="text"
        className="w-100 h5 f6 br3 pa3 b--moon-gray mb2"
        placeholder="Notes"
        value={ input || '' }
        onChange={ onChange } />
      <button
        type="submit"
        className={ `db f5 fw5 bg-pwv-red pv3 w4 white bn br2 center pointer mb3 ${ saveButtonClass() }` }
        disabled={ saving }>
        { saveButtonLabel() }
      </button>
    </form>
  )
}
