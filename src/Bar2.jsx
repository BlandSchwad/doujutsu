import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Offcanvas,
  Col,
  Form,
} from "react-bootstrap";
import brandLogo from "./assets/brand.png";
import { LinkContainer } from "react-router-bootstrap";
import { useGetAllLibrariesQuery } from "./services/mangaserver";

function Bar2() {
  const { data, error, isLoading } = useGetAllLibrariesQuery();

  return (
    <Navbar bg="primary" expand="lg">
      <Container fluid>
        <Col xs={1}>
          <LinkContainer to="/">
            <Navbar.Brand color="primary" href="/">
              <img alt="dojutsu logo" src={brandLogo} width="50" />
            </Navbar.Brand>
          </LinkContainer>
        </Col>

        <Navbar.Offcanvas
          expand="lg"
          placement="start"
          scroll={true}
          backdrop={false}
        >
          <Offcanvas.Header closeButton={true}>
            <LinkContainer to="/">
              <Navbar.Brand color="primary" href="/">
                <img alt="dojutsu logo" src={brandLogo} width="55" /> Doujutsu
              </Navbar.Brand>
            </LinkContainer>
          </Offcanvas.Header>
          <Nav className="BarLinks">
            <LinkContainer to={"/crud"}>
              <Nav.Link>Menu</Nav.Link>
            </LinkContainer>

            <NavDropdown title="Libraries">
              <LinkContainer to={"/"}>
                <NavDropdown.Item key="allLibs">All</NavDropdown.Item>
              </LinkContainer>
              {error ? (
                <>Error Fetching Libraries</>
              ) : isLoading ? (
                <>Loading</>
              ) : data ? (
                <>
                  {data.map((library) => {
                    return (
                      <div key={library.id}>
                        <LinkContainer to={`/library/${library.id}`}>
                          <NavDropdown.Item>{library.name}</NavDropdown.Item>
                        </LinkContainer>
                      </div>
                    );
                  })}
                </>
              ) : null}

              <NavDropdown.Item key="addLib">Add Library+</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Offcanvas>

        <Col xs={1}>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${false}`} />
        </Col>
        <Col xs={10}>
          <Form>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
          </Form>
        </Col>
      </Container>
    </Navbar>
  );
}

export default Bar2;