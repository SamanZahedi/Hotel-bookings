import React, { useEffect, useState } from "react";
import axios from "axios";

const Hotels = () => {
 const [hotels, setHotels] = useState([]);
 useEffect(()=> {
 axios
    .get("https://hotels-bookings.herokuapp.com/hotels")
    .then((res) => setHotels(res.data));
 },[]) 
  return (
    <div>
      {hotels.map((hotel) => (
        <div key={hotel.id}>
          <div>
            <h3>Hotel name: </h3>
 <span>{hotel.name}</span>
          </div>
          <div>
            <h4>Postcode: {hotel.postcode}</h4>
            <h5>Number of rooms: {hotel.rooms}</h5>
          </div>
        </div>
      ))}
    </div>
  );
};






export default Hotels;
