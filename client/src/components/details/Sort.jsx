import React, { useState, useEffect } from 'react'
import "../../css/sort.css";

const Sort = ({ sortHandler }) => {
  const [state, setState] = useState(false)
  const [selected, setSelected] = useState('firstName')
  const toggle = () => {
    setState(!state)
  }

  useEffect(() => {
    sortHandler(selected, state)
  }, [selected, sortHandler, state])

  return (
    <div className="sort">
      <select
        name="sort"
        id="sort"
        onChange={(e) => setSelected(e.target.value)}
      >
        <option value="firstName">By First name</option>
        <option value="surname">By Surname</option>
      </select>

      <div className="asc">
        <div className="asc-caption">{state ? 'Ascending' : 'Descending'}</div>
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round" onClick={toggle}></span>
        </label>
      </div>
    </div>
  )
}

export default Sort
