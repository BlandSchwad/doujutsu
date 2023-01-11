import { Card, Container, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./BookCard.css";

function BookCard({ book }) {
  const escapedBookId = book.id.replaceAll("/", "%2F");
  const serverUrl = `http://${process.env.REACT_APP_BACKEND_SERVER}:${process.env.REACT_APP_BACKEND_PORT}`;
  return (
    <div className="BookCard">
      <Card bg="secondary" border="primary">
        <Col>
          <Row>
            <Card.Header className="BookCardHeader">
              <Card.Img
                variant="top"
                src={`${serverUrl}/page/${escapedBookId}?page=0`}
              />
            </Card.Header>
          </Row>
          <Row>
            <Card.Body>
              <LinkContainer to={`/book/${escapedBookId}`}>
                <Card.Link className="BookCardTitle">{book.name}</Card.Link>
              </LinkContainer>
            </Card.Body>
          </Row>
          <Row>
            <Card.Subtitle>{book.page_count} Pages</Card.Subtitle>
          </Row>
        </Col>
      </Card>
    </div>
  );
}

export default BookCard;
