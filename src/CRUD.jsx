// import axios from "axios";
import api from "./assets/api";
import { useEffect, useState } from "react";
import { Button, Modal, Form, FloatingLabel, CardGroup } from "react-bootstrap";
import SeriesCard from "./SeriesCard";
import Bar2 from "./Bar2";
import {
  useAddNewLibraryMutation,
  useDeleteLibraryMutation,
  useGetAllLibrariesQuery,
  usePatchLibraryMutation,
} from "./services/mangaserver";

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
  const [addNewLibrary, { isLoading }] = useAddNewLibraryMutation();
  const [patchLibrary] = usePatchLibraryMutation();
  const { data, error, loadingLibraries } = useGetAllLibrariesQuery();
  const [deleteLibrary, response] = useDeleteLibraryMutation();
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

  const handleNewEditSubmit = async (event) => {
    event.preventDefault();
    if (addValidated === false) {
      event.stopPropagation();
    }

    try {
      await patchLibrary({
        id: editLibrary.id,
        name: editName,
        path: editDirectory,
      });
      handleHideEditModal();
    } catch (err) {
      console.log(err);
    }
  };
  const handleNewAddSubmit = async (event) => {
    event.preventDefault();
    if (addValidated === false) {
      event.stopPropagation();
    }

    try {
      await addNewLibrary({ name: inputName, path: inputDirectory });
      handleHideAddModal();
      setAddValidated(false);
    } catch (err) {
      console.log(err);
    }
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
              onSubmit={handleNewAddSubmit}
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
          <Modal.Header closeButton>Edit Library</Modal.Header>
          <Modal.Body className="mb">
            <Form
              noValidate
              validated={editValidated}
              onChange={(e) => {
                setEditValidated(
                  document.getElementById("EditLibraryName").checkValidity() &&
                    document
                      .getElementById("EditLibraryDirectory")
                      .checkValidity()
                );
              }}
              onSubmit={handleNewEditSubmit}
              // onSubmit={handlEditSubmit}
            >
              <Form.Group>
                <FloatingLabel label={"Name"}>
                  <Form.Control
                    id="EditLibraryName"
                    type="text"
                    placeholder="Name"
                    onChange={(e) => setEditName(e.target.value)}
                    defaultValue={editLibrary.name}
                    required
                  />
                </FloatingLabel>
                <FloatingLabel label={"Root Folder"}>
                  <Form.Control
                    id="EditLibraryDirectory"
                    onChange={(e) => setEditDirectory(e.target.value)}
                    type="text"
                    placeholder="Directory"
                    defaultValue={editLibrary.file_path}
                    required
                  />
                </FloatingLabel>
              </Form.Group>
              <Button type="submit"> Edit </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
      <Bar2 />
      {error ? (
        <>ERROR</>
      ) : loadingLibraries ? (
        <>LOADING</>
      ) : data ? (
        <>
          <h1>Libraries </h1>
          {data.map((library) => {
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
                    deleteLibrary(library.id);
                    // api.delete(`/library/${library.id}`).then(() => {
                    //   getLibraries();
                    // });
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
                    api.get(`/library/scan/${library.id}`).then(() => {
                      getLibraries();
                    });
                  }}
                >
                  Scan
                </Button>
              </div>
            );
          })}{" "}
        </>
      ) : null}

      <Button onClick={handleShowAddModal}>Add Library</Button>
    </div>
  );
}

export default Crud;
