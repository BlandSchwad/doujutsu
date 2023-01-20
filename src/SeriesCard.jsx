import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import "./SeriesCard.css";
import escapeId from "./assets/escapeId";
function SeriesCard({ series }) {
  const escapedSeriesId = escapeId(series.id);
  const serverUrl = `http://${process.env.REACT_APP_BACKEND_SERVER}:${process.env.REACT_APP_BACKEND_PORT}`;
  return (
    <LinkContainer to={`/series/${escapedSeriesId}`}>
      <article className="card">
        <header className="card-header">
          <img
            className="card-img"
            src={`${serverUrl}/page/${escapeId(series.books[0].id)}?page=0`}
          />
        </header>
        <footer className="card-footer">
          <p className="card-title">{series.name}</p>

          <p className="card-bookcount">
            {series.books?.length > 0 ? series.books.length : 0} Books
          </p>
        </footer>
      </article>
    </LinkContainer>
  );
}
export default SeriesCard;
