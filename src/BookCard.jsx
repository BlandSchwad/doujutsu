import Card from "react-bootstrap/Card";
import { LinkContainer } from "react-router-bootstrap";
import "./BookCard.css";

function BookCard({ book }) {
  const escapedBookId = book.id.replaceAll("/", "%2F");
  const serverUrl = `http://${process.env.REACT_APP_BACKEND_SERVER}:${process.env.REACT_APP_BACKEND_PORT}`;
  return (
    <div className="BookCard">
      <Card bg="secondary" border="primary">
        <Card.Header className="BookCardHeader">
          <Card.Img
            fluid
            variant="top"
            src={`${serverUrl}/page/${escapedBookId}?page=0`}
          />
        </Card.Header>
        <Card.Body>
          <LinkContainer to={`/book/${escapedBookId}`}>
            <Card.Link className="BookCardTitle">{book.name}</Card.Link>
          </LinkContainer>
        </Card.Body>
        <Card.Subtitle>{book.page_count} Pages</Card.Subtitle>
      </Card>
    </div>
  );
}

export default BookCard;
