import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";


const path = "https://hotels-bookings.herokuapp.com/hotels";

const AddHotel = ({ allData, handleSet, loadData }) => {
  // const [toggle, setToggle] = useState(false);
  const [name, setName] = useState("");
  const [rooms, setRooms] = useState(0);
  const [postcode, setPostcode] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  const resetAddForm = () => {
    // setToggle(!toggle);
    setName("");
    setRooms(0);
    setPostcode("");
  };

  const handleSubmitEvent = (submitEvent) => {
    submitEvent.preventDefault();
    const newHotel = {
      name: name,
      rooms: rooms,
      postcode: postcode
    };
    axios.post(path, newHotel).then(() => loadData());
    console.log(newHotel);
    resetAddForm();
  };

  return (
    <>
      <button className="btn btn-add mr-auto" onClick={() => setShowAdd(true)}>
        Add Hotel
      </button>
      <form
        // className={toggle ? "d-flex" : "d-none"}
        onSubmit={handleSubmitEvent}
      >
        {/* <SearchYoutube searchHandler = {searchHandler}/>  */}
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="rooms">Rooms</label>
        <input
          type="Number"
          name="rooms"
          id="rooms"
          className="form-control"
          value={rooms}
          onChange={(e) => setRooms(Number(e.target.value))}
        />
        <label htmlFor="postcode">Postcode</label>
        <input
          type="text"
          name="postcode"
          id="postcode"
          className="form-control"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
        />
        <button type="submit" className="btn btn-primary d-block">
          Save
        </button>
      </form>
    </>
  );
};

export default AddHotel;
