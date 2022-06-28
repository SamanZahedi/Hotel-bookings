import React, {useState} from "react";
import Customers from "../details/Customers";
import Bookings from "../details/Bookings";
import "../../App.css";
import Hotels from "../details/Hotels";

function App() {
  const [detail, setDetail] = useState(<Customers/>)
  return(
    <div>

    <nav className="main-menu">
      <ul>
       <li onClick={()=> setDetail(<Hotels/>)}>Hotels</li>
      <li onClick={()=> setDetail(<Customers/>)}>Customers</li>
      <li onClick={()=> setDetail(<Bookings/>)}>Bookings</li>
      </ul>
   </nav>
   <main>
      {detail}
   </main>
    </div>
  ) 
};

export default App;
