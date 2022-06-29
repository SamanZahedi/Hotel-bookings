import React, {useState} from 'react'
import Customers from '../details/Customers'
import Bookings from '../details/Bookings'
import Hotels from '../details/Hotels'
import '../../css/HamburgerMenu.css'

const HamburgerMenu = ({setDetail}) => {
  const [checked, setChecked] = useState(false)
  return (
    <div className="ham-main">
      <div className="main">
        <input type="checkbox" id="menyAvPaa" />
        <label id="burger" for="menyAvPaa">
          <div></div>
          <div></div>
          <div></div>
        </label>
        <nav id="ham-menu">
        <ul>
          <li onClick={() => {
            setDetail(<Hotels />)
            setChecked(!checked)
          }
            }>Hotels</li>
          <li onClick={() => setDetail(<Customers />)}>Customers</li>
          <li onClick={() => setDetail(<Bookings />)}>Bookings</li>
        </ul>
        </nav>
      </div>
      <main></main>
    </div>
  )
}

export default HamburgerMenu
