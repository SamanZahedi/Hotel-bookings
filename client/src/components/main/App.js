import React, { useState } from 'react'
import Customers from '../details/Customers'
import Bookings from '../details/Bookings'
import '../../App.css'
import Hotels from '../details/Hotels';

function App() {
  const [activePage, setActivePage] = useState(Customers)
  return (
    <>
      <div className="App">
        <h2>Hotel bookings</h2>
        <button
          onClick={() => {
            setActivePage(Customers)
          }}
        >
          Customers
        </button>
        <button
          onClick={() => {
            setActivePage(Hotels)
          }}
        >
          Hotels
        </button>
        <button
          onClick={() => {
            setActivePage(Bookings)
          }}
        >
          Bookings
        </button>
      </div>
      <div>{activePage}</div>
    </>
  )
}

export default App
