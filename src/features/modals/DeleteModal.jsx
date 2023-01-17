import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDeleteLibraryMutation } from "../../services/mangaserver";
const DeleteModal = ({ type, info }) => {
  const [showModal, setShowModal] = useState(false);
  const [deleteLibrary] = useDeleteLibraryMutation();
  const handleHideModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <Modal show={showModal} onHide={handleHideModal}>
        <Modal.Header>Delete {type}</Modal.Header>
        <Modal.Body>{`Are you sure you want to delete ${info.name}?`}</Modal.Body>
        <Modal.Footer>
          <Button onClick={handleHideModal}>Cancel</Button>
          <Button
            onClick={() => {
              if (type === "Library") {
                deleteLibrary(info.id);
              }
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Button onClick={() => setShowModal(true)}>Delete</Button>
    </>
  );
};

export default DeleteModal;
