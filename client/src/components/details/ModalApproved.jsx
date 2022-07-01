import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "var(--sixth-color)",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)

function ModalApproved({ deleteHandler, id }) {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal(approvalState) {
    setIsOpen(false);
    console.log("inside", approvalState, id);
    deleteHandler(id, approvalState);
  }

  return (
    <div>
      <button className="btn btn-danger" onClick={openModal}>
        Delete
      </button>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h4>Alert</h4>
        <h6 className="mt-4 mb-4">Are you sure to delete hotel Abbasi? </h6>
        <div className="d-flex flex-row justify-content-end">
          <button
            className="btn btn-secondary mr-2"
            onClick={() => closeModal(true)}
          >
            Yes
          </button>
          <button
            className="btn btn-secondary "
            onClick={() => closeModal(false)}
          >
            No
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default ModalApproved;
