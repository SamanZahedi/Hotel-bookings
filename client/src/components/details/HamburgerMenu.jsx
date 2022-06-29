import React, {useState} from 'react'
import Customers from '../details/Customers'
import Bookings from '../details/Bookings'
import Hotels from '../details/Hotels'
import '../../css/HamburgerMenu.css'

const HamburgerMenu = ({setDetail}) => {
  const [checkedMenu, setCheckedMenu] = useState(true);
  return (
    <div className="ham-main">
      <div className="main">
        <input type="checkbox" id="menuCheckbox" />
        <label id="burger" htmlFor="menuCheckbox">
          <div></div>
          <div></div>
          <div></div>
        </label>
        <nav id="ham-menu">
          <ul>
            <li
              id="liHotel"
              onClick={() => {
                setCheckedMenu(!checkedMenu);
                setDetail(<Hotels />);
              }}
            >
              Hotels
            </li>
            <li
              onClick={() => {
                setCheckedMenu(!checkedMenu);
                setDetail(<Customers />);
              }}
              >
              Customers
            </li>
            <li onClick={() => setDetail(<Bookings />)}>Bookings</li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default HamburgerMenu
