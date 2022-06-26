import React from "react";
import Customers from "../details/Customers";
import Bookings from "../details/Bookings";
import "../../App.css";
import Hotels from "../details/Hotels";

function App() {
  return(
    <div>
     <Hotels />
     <Bookings />
     <Customers />
   </div>
  ) 
};

export default App;
