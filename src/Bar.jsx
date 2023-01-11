import {
  Button,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  Container,
  Offcanvas,
  Col,
  Row,
  Modal,
} from "react-bootstrap";
import brandLogo from "./assets/brand.png";
import { LinkContainer } from "react-router-bootstrap";
import { useGetLibrariesQuery } from "./services/mangaserver";
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

      <Navbar bg="primary" expand="false">
        <Container fluid>
          <Navbar.Offcanvas
            expand="lg"
            placement="start"
            scroll={true}
            backdrop={false}
          >
            <Offcanvas.Header closeButton={true}>
              <LinkContainer to="/">
                <Navbar.Brand color="primary" href="#">
                  <img alt="dojutsu logo" src={brandLogo} width="55" /> Doujutsu
                </Navbar.Brand>
              </LinkContainer>
            </Offcanvas.Header>
            <Nav className="BarLinks">
              <LinkContainer to={"/crud"}>
                <Nav.Link>Menu</Nav.Link>
              </LinkContainer>
              <LinkContainer to={"/"}>
                <Nav.Link as="ul">
                  Libs
                  {data.libraries
                    ? data.libraries.map((library) => {
                        return (
                          <LinkContainer
                            key={`${library.id}link`}
                            to={`/library/${library.id}`}
                          >
                            <Nav.Item as="li">{library.name}</Nav.Item>
                          </LinkContainer>
                        );
                      })
                    : `Loading`}
                </Nav.Link>
              </LinkContainer>
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
            </Nav>
          </Navbar.Offcanvas>

          <Col xs={1}>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`} />
          </Col>
          <Col xs={11}>
            <Form>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              {/* <Button variant="outline-secondary">Search</Button> */}
            </Form>
          </Col>
        </Container>
      </Navbar>
    </>
  );
}

export default Bar;
