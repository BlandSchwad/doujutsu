import Card from "react-bootstrap/Card";
import React from "react";
import { LinkContainer } from "react-router-bootstrap";

function SeriesCard({ series }) {
  return (
    <div className="SeriesCard">
      <Card bg="secondary" border="primary">
        <Card.Header>
          <Card.Img
            variant="top"
            src="https://user-images.githubusercontent.com/101482/29592647-40da86ca-875a-11e7-8bc3-941700b0a323.png"
          />
        </Card.Header>
        <Card.Body>
          <div>
            <LinkContainer to={`/series/${series.id.replaceAll("/", "%2F")}`}>
              <Card.Link>
                <Card.Subtitle>
                  <p>{series.name} </p>
                </Card.Subtitle>
              </Card.Link>
            </LinkContainer>
          </div>
          Books: {series.book_count}
        </Card.Body>
      </Card>
    </div>
  );
}
export default SeriesCard;
