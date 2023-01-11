import { Card, Container, Row, Col } from "react-bootstrap";
import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import "./SeriesCard.css";
import escapeId from "./assets/escapeId";
function SeriesCard({ series }) {
  const escapedSeriesId = escapeId(series.id);
  const serverUrl = `http://${process.env.REACT_APP_BACKEND_SERVER}:${process.env.REACT_APP_BACKEND_PORT}`;

  return (
    <div className="SeriesCard">
      <Card bg="secondary" border="primary">
        <Col>
          <Row>
            <Card.Header>
              <Card.Img
                variant="top"
                src={
                  series.books.length > 0
                    ? `${serverUrl}/page/${escapeId(series.books[0].id)}?page=0`
                    : "https://static.wikia.nocookie.net/villains/images/9/9f/Dr._Robotnik_%28AOSTH%292.png"
                }
              />
            </Card.Header>
          </Row>
          <Row>
            <Card.Body>
              <LinkContainer to={`/series/${series.id.replaceAll("/", "%2F")}`}>
                <Card.Link>{series.name}</Card.Link>
              </LinkContainer>
            </Card.Body>
          </Row>
          <Row>
            <Card.Subtitle>
              {" "}
              Books: {series.books ? series.books.length : ` loading!`}
            </Card.Subtitle>
          </Row>
        </Col>
      </Card>
    </div>
  );
}
export default SeriesCard;
