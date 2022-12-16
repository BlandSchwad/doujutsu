// import axios from "axios";
import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";
import BookCard from "./BookCard";
import { Button, CardGroup, Container, Row, Col, Image } from "react-bootstrap";
import escapeId from "./assets/escapeId";
import api from "./assets/api";
import "./Series.css";
function Series() {
  const { series_id } = useParams();

  const escapedSeriesId = escapeId(series_id);
  const serverUrl = `http://${process.env.REACT_APP_BACKEND_SERVER}:${process.env.REACT_APP_BACKEND_PORT}`;

  const [seriesData, setSeriesData] = useState({});
  const deleteSeries = () => {
    api.delete(`/series/${escapedSeriesId}`).catch((err) => {
      console.log(err);
    });
  };
  useEffect(() => {
    api
      .get(`/series/${escapedSeriesId}`)
      .then((response) => {
        setSeriesData(response.data[0]);
      })
      .catch((err) => {
        return err;
      });
  }, [series_id]);

  return (
    <Container fluid>
      <Row>
        <Col xs="auto">
          <Image
            id="seriesThumb"
            src={
              seriesData.books
                ? `${serverUrl}/page/${seriesData.books[0].id}?page=0`
                : `https://user-images.githubusercontent.com/101482/29592647-40da86ca-875a-11e7-8bc3-941700b0a323.png`
            }
            alt="The series thumbnail"
            thumbnail
          />
        </Col>
        <Col xs="auto">
          <div className="SeriesInfo">
            <h1>
              {seriesData.name
                ? `${seriesData.name} in ${seriesData.library_name}`
                : "Loading"}
            </h1>
            {seriesData.books ? (
              <h2> {seriesData.books.length} Books</h2>
            ) : (
              "Loading "
            )}{" "}
            <Button onClick={deleteSeries}>Delete</Button>
          </div>
        </Col>
      </Row>

      <Row>
        <div id="bookCardList">
          {seriesData.books ? (
            <CardGroup>
              {seriesData.books.map((book) => {
                return <BookCard key={book.id} book={book} />;
              })}{" "}
            </CardGroup>
          ) : (
            "Loading Books"
          )}
        </div>
      </Row>
    </Container>
  );
}
export default Series;
