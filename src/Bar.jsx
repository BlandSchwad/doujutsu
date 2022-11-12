import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import brandLogo from "./assets/brand.png";
import { LinkContainer } from "react-router-bootstrap";
import { Modal } from "react-bootstrap";
import { useState } from "react";

function Bar({ data }) {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>Add Library!</Modal.Header>
        <Form.Group>
          <Form.Control type="text" placeholder="Name" />
          <Form.Control
            type="file"
            placeholder="Select Directory"
            webkitdirectory
            directory
            multiple
          />
        </Form.Group>
      </Modal>

      <Navbar bg="primary">
        <LinkContainer to="/crud">
          <Navbar.Brand color="primary" href="#">
            <img alt="dojutsu logo" src={brandLogo} width="45" /> Doujutsu
          </Navbar.Brand>
        </LinkContainer>
        <Nav className="BarLinks">
          <NavDropdown title="Libraries">
            <LinkContainer to={"/"}>
              <NavDropdown.Item key="allLibs">All</NavDropdown.Item>
            </LinkContainer>
            {data.libraries
              ? data.libraries.map((library) => {
                  return (
                    <LinkContainer
                      key={`${library.id}link`}
                      to={`/library/${library.id}`}
                    >
                      <NavDropdown.Item>{library.name}</NavDropdown.Item>
                    </LinkContainer>
                  );
                })
              : `Loading`}

            <NavDropdown.Item onClick={handleShowModal} key="addLib">
              Add Library+
            </NavDropdown.Item>
          </NavDropdown>

          <Nav.Link href="#menu">Menu</Nav.Link>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-secondary">Search</Button>
          </Form>
        </Nav>
      </Navbar>
    </>
  );
}

export default Bar;
