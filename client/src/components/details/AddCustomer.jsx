import React, { useState } from 'react'
import axios from 'axios'
const path = 'https://hotels-bookings.herokuapp.com/'

const AddCustomer = ({ allData, handleSet, loadData }) => {
  const [toggle, setToggle] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [surname, setSurname] = useState('')

  const handleAdd = () => {
    setToggle(!toggle)
  }

  const resetAddForm = () => {
    setToggle(!toggle)
    setFirstName('')
    setSurname('')
  }

  const handleSubmitEvent = (submitEvent) => {
    submitEvent.preventDefault()
      const newCustomer = {
        firstName: firstName,
        surname: surname,
      }
      axios.post(path, newCustomer).then(() => loadData())
      resetAddForm()
    }

  return (
    <>
      <button className="btn btn-primary mr-auto" onClick={handleAdd}>
        Add Customer
      </button>
      <form
        className={toggle ? 'display-flex' : 'display-none'}
        onSubmit={handleSubmitEvent}
      >
          {/* <SearchYoutube searchHandler = {searchHandler}/>  */}
          <label htmlFor="title">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            className="form-control"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label htmlFor="url">Surname</label>
          <input
            type="text"
            name="Surname"
            id="Surname"
            className="form-control"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
          <button type="submit" className="btn btn-primary d-block">
            Save
          </button>
      </form>
    </>
  )
}

export default AddCustomer
