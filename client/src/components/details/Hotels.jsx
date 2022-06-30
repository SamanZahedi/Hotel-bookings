import React, { useEffect, useState } from "react";
import axios from "axios";
import AddHotel from "./AddHotel";
import Search from "./Search";
import Sort from "./Sort";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [reload, setReload] = useState(true);
  const [allHotels, setAllHotels] = useState([]);

  const loadData = () => {
    axios.get("https://hotels-bookings.herokuapp.com/hotels").then((res) => {
      setAllHotels(res.data);
      setHotels(res.data);
    });
  };

  // const loadData = () => {
  //   axios.get("http://localhost:3005/hotels").then((res) => {
  //     console.log(res.data)
  //     setHotels(res.data)
  //   })
  // }

  useEffect(() => {
    loadData();
  }, []);

  const deleteHandler = (id) => {
    console.log(id);
    axios
      .delete(`https://hotels-bookings.herokuapp.com/hotels/${id}`)
      .then(() => {
        loadData();
      });
  };

  useEffect(() => {
    setReload(false);
  }, [reload]);

  return (
    <>
      <nav>
        <AddHotel hotels={hotels} loadData={loadData} />
        <Search allData={allHotels} setData={setHotels} />
        <Sort setReload={setReload} setData={setHotels} data={hotels} />
      </nav>
      <div className="content">
        {hotels.map((hotel) => (
          <div key={hotel.id} className="card-row">
            <div key={hotel.id}>
              <h3>Hotel name:</h3>
              <span>{hotel.name}</span>
            </div>
            <div>
              <h4>Postcode: {hotel.postcode}</h4>
              <h5>Number of rooms: {hotel.rooms}</h5>
            </div>
            <div>
              <button
                className="btn btn-danger"
                onClick={() => deleteHandler(hotel.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Hotels;
