import React from 'react'
import '../../css/HamburgerMenu.css'

const HamburgerMenu = () => {
  return (
    <div className="ham-main">
      <div className='main'>
        <input type="checkbox" id="menyAvPaa" />
        <label id="burger" for="menyAvPaa">
          <div></div>
          <div></div>
          <div></div>
        </label>
        <nav id="ham-menu">
          <div>Hotels</div>
          <div>Customers</div>
          <div>Bookings</div>
        </nav>
      </div>
      <main></main>
    </div>
  )
}

export default HamburgerMenu
