import Card from "react-bootstrap/Card";
import { LinkContainer } from "react-router-bootstrap";

function BookCard({ book }) {
  let escapedBookId = book.id.replaceAll("/", "%2F");
  return (
    <div>
      <div className="BookCard">
        <Card>
          <Card.Header className="BookCardHeader">
            <Card.Img
              variant="top"
              src={`http://${process.env.REACT_APP_BACKEND_SERVER}:${process.env.REACT_APP_BACKEND_PORT}/page/${escapedBookId}?page=0`}
            />
          </Card.Header>
          <Card.Body>
            <LinkContainer to={`/book/${escapedBookId}`}>
              <Card.Link className="BookCardTitle">{book.name}</Card.Link>
            </LinkContainer>
            <Card.Subtitle>{book.page_count} Pages</Card.Subtitle>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default BookCard;
