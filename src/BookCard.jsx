import { Card, Container, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./BookCard.css";
import escapeId from "./assets/escapeId";
function BookCard({ book }) {
  const escapedBookId = escapeId(book.id);
  const serverUrl = `http://${process.env.REACT_APP_BACKEND_SERVER}:${process.env.REACT_APP_BACKEND_PORT}`;
  return (
    <LinkContainer to={`/book/${escapedBookId}`}>
      <article className="card">
        <header className="card-header">
          <img
            className="card-img"
            src={`${serverUrl}/page/${escapedBookId}?page=0`}
          />
        </header>
        <footer className="card-footer">
          <p className="card-title">{book.name}</p>
          <p className="card-pagecount">{book.page_count} pages</p>
        </footer>
      </article>
    </LinkContainer>
  );
}

export default BookCard;
