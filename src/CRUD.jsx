import axios from "axios";

import { useEffect, useState } from "react";
import { Button, Modal, Form, FloatingLabel, CardGroup } from "react-bootstrap";
import SeriesCard from "./SeriesCard";

function Crud() {
  const [libraries, setLibraries] = useState([]);
  const [series, setSeries] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [inputDirectory, setInputDirectory] = useState("");
  const [inputName, setInputName] = useState("");
  const [addValidated, setAddValidated] = useState(false);
  const [editLibrary, setEditLibrary] = useState({});
  const [editName, setEditName] = useState("");
  const [editDirectory, setEditDirectory] = useState("");
  const [editValidated, setEditValidated] = useState(false);
  const serverUrl = `http://${process.env.REACT_APP_BACKEND_SERVER}:${process.env.REACT_APP_BACKEND_PORT}`;

  const handleHideAddModal = () => {
    setShowAddModal(false);
    setInputDirectory("");
    setInputName("");
  };

  const handleShowAddModal = () => setShowAddModal(true);

  const handleShowEditModal = () => setShowEditModal(true);

  const handleHideEditModal = () => {
    setShowEditModal(false);
    setEditLibrary({});
    setEditName("");
    setEditDirectory("");
  };

  function getLibraries() {
    axios
      .get(`${serverUrl}/libraries`)
      .then((result) => {
        console.log(result.data);
        setLibraries(result.data);
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  function getSeries(library_id) {
    axios
      .get(`${serverUrl}/library/${library_id}`)
      .then((result) => {
        console.log(result.data);
        setSeries(result.data);
        return result.data;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  function addLibrary() {
    if (addValidated) {
      axios
        .post(`${serverUrl}/library`, {
          name: inputName,
          path: inputDirectory,
        })
        .then((result) => {
          console.log(result.data);
          handleHideAddModal();
          getLibraries();
          setAddValidated(false);
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
    }
  }

  function putLibrary() {
    if (editValidated) {
      axios
        .put(`${serverUrl}/library/${editLibrary.id}`, {
          name: editName,
          path: editDirectory,
        })
        .then((result) => {
          console.log(result.data);
          handleHideEditModal();
          getLibraries();
        })
        .catch((err) => {
          console.log(err);
          return err;
        });
    }
  }

  const handleAddSubmit = (event) => {
    event.preventDefault();

    if (addValidated === false) {
      event.stopPropagation();
    }
    setAddValidated(true);
    addLibrary();
  };

  const handlEditSubmit = (event) => {
    event.preventDefault();
    if (editValidated === false) {
      event.stopPropagation();
    }
    setEditValidated(true);
    putLibrary();
  };

  return (
    <div>
      <>
        <Modal
          id="addLibraryModal"
          className="LibraryModal"
          show={showAddModal}
          onHide={handleHideAddModal}
        >
          <Modal.Header className="modal-header" closeButton>
            Add Library
          </Modal.Header>
          <Modal.Body id="addModalBody">
            <Form
              className="ModalForm"
              noValidate
              onChange={(e) =>
                setAddValidated(
                  document.getElementById("AddLibraryName").checkValidity() &&
                    document
                      .getElementById("AddLibraryDirectory")
                      .checkValidity()
                )
              }
              validated={addValidated}
              onSubmit={handleAddSubmit}
            >
              <FloatingLabel label={`Name`}>
                <Form.Control
                  id="AddLibraryName"
                  required
                  onChange={(e) => {
                    setInputName(e.target.value);
                  }}
                  type="text"
                  placeholder="Name"
                />
                <Form.Control.Feedback type="invalid">
                  Name your library!
                </Form.Control.Feedback>
              </FloatingLabel>
              <FloatingLabel label={`Directory`}>
                <Form.Control
                  id="AddLibraryDirectory"
                  onChange={(e) => {
                    setInputDirectory(e.target.value);
                  }}
                  required
                  type="text"
                  placeholder="Enter Directory"
                />
                <Form.Control.Feedback type="invalid">
                  Input a directory string. Syntax: /path/to/library
                </Form.Control.Feedback>
              </FloatingLabel>

              <Button type="submit">Add</Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>

      <>
        <Modal
          id="editLibraryModal"
          className="LibraryModal"
          show={showEditModal}
          onHide={handleHideEditModal}
        >
          <Modal.Header closeButton>Edit Library {editLibrary.id}</Modal.Header>
          <Modal.Body className="mb">
            <Form
              noValidate達哉
              validated={editValidated}
              onChange={(e) => {
                setEditValidated(
                  document.getElementById("EditLibraryName").checkValidity() &&
                    document
                      .getElementById("EditLibraryDirectory")
                      .checkValidity()
                );
              }}
              onSubmit={handlEditSubmit}
            >
              <Form.Group>
                <FloatingLabel label={editLibrary.name}>
                  <Form.Control
                    id="EditLibraryName"
                    type="text"
                    placeholder="Name"
                    onChange={(e) => setEditName(e.target.value)}
                    required
                  />
                </FloatingLabel>
                <FloatingLabel label={editLibrary.file_path}>
                  <Form.Control
                    id="EditLibraryDirectory"
                    onChange={(e) => setEditDirectory(e.target.value)}
                    type="text"
                    placeholder="Directory"
                    required
                  />
                </FloatingLabel>
              </Form.Group>
              <Button type="submit"> Edit </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>

      {libraries.length > 0 && (
        <div id="libList">
          <h1>Libraries </h1>

          {libraries.map((library) => {
            return (
              <div key={library.id} className="libraryView">
                <ul>
                  {library.name}
                  <li>ID: {library.id} </li>
                  <li>
                    Created:{" "}
                    {new Date(parseInt(library.created_date)).toString()}
                  </li>
                  <li>
                    Last Modified:{" "}
                    {new Date(parseInt(library.last_modified_date)).toString()}
                  </li>
                  <li>Path: {library.file_path} </li>
                </ul>
                {/* <p>Last Modified: {new Date(library.last_modified_date).toString()}</p> */}
                <Button
                  onClick={() => {
                    axios
                      .delete(`${serverUrl}/library/${library.id}`)
                      .then(() => {
                        getLibraries();
                      });
                  }}
                >
                  Delete
                </Button>{" "}
                <Button
                  onClick={() => {
                    setEditLibrary(library);
                    handleShowEditModal();
                  }}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => {
                    axios
                      .get(`${serverUrl}/library/scan/${library.id}`)
                      .then(() => {
                        getLibraries();
                      });
                  }}
                >
                  Scan
                </Button>
                {/* <Button
                  onClick={() => {
                    getSeries(library.id);
                  }}
                >
                  {library.children.length > 0 ? `Refresh` : `Get Series`}
                </Button>
                <div id="seriesList"></div>
                <div id="scardgroup">
                  {library.children.length > 0 && (
                    <CardGroup>
                      {library.children.map((s) => {
                        return <SeriesCard key={s.id} series={s} />;
                      })}
                    </CardGroup>
                  )}{" "}
                </div> */}
              </div>
            );
          })}
        </div>
      )}

      <Button onClick={getLibraries}>
        {libraries.length > 0 ? `Refresh` : `Get Libraries`}
      </Button>
      <Button onClick={handleShowAddModal}>Add Library</Button>
    </div>
  );
}

export default Crud;
