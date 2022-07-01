import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "var(--fifth-color)",
  },
};

const path = "https://hotels-bookings.herokuapp.com/hotels";


// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement("#yourAppElement");

const ModalForm = ({ formTitle, allData, handleSet, loadData }) => {
  const [name, setName] = useState("");
  const [rooms, setRooms] = useState(0);
  const [postcode, setPostcode] = useState("");
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleSubmitEvent = (submitEvent) => {
    submitEvent.preventDefault();
    const newHotel = {
      name: name,
      rooms: rooms,
      postcode: postcode,
    };
    axios.post(path, newHotel).then(() => loadData());
    console.log(newHotel);
    closeModal();
  };

  return (
    <>
      <button className="btn btn-add" onClick={openModal}>
        {formTitle}
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <img
          className="close"
          src="./assets/images/close.png"
          alt="close"
          title="Close"
          onClick={closeModal}
        />
        <h4>{formTitle}</h4>
        <form
          onSubmit={handleSubmitEvent}
        >
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
          <button type="submit" className="btn btn-primary d-block mt-4">
            Save
          </button>
        </form>
      </Modal>
    </>
  );
};

export default ModalForm;
