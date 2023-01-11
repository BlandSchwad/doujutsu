// import axios from "axios";
import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";
import BookCard from "./BookCard";
import {
  Button,
  CardGroup,
  Container,
  Row,
  Col,
  Image,
  Card,
} from "react-bootstrap";
import escapeId from "./assets/escapeId";
import api from "./assets/api";
import "./Series.css";
import { useGetSeriesQuery } from "./services/mangaserver";
import ToolBar from "./Toolbar";
import Bar2 from "./Bar2";

function Series() {
  const { series_id } = useParams();

  const escapedSeriesId = escapeId(series_id);
  const { data, error, isLoading } = useGetSeriesQuery(escapedSeriesId);
  const serverUrl = `http://${process.env.REACT_APP_BACKEND_SERVER}:${process.env.REACT_APP_BACKEND_PORT}`;

  const deleteSeries = () => {
    api.delete(`/series/${escapedSeriesId}`).catch((err) => {
      console.log(err);
    });
  };

  return (
    <>
      <Bar2 />
      <Container fluid>
        {error ? (
          <>Error</>
        ) : isLoading ? (
          <>Loading</>
        ) : data ? (
          <>
            {" "}
            <Row>
              <ToolBar barType="series" data={data[0]} />
            </Row>
            <Row>
              <Col xs={4}>
                <Image
                  id="seriesThumb"
                  src={`${serverUrl}/page/${data[0].books[0].id}?page=0`}
                  alt="The series thumbnail"
                  thumbnail
                />
              </Col>
              <Col xs="auto">
                <Col>
                  <>
                    <h1>{data[0].name}</h1>
                    <h2> {data[0].books.length} Books</h2>
                  </>
                </Col>
              </Col>
            </Row>
            <Row>
              <CardGroup>
                {data[0].books.map((book) => {
                  return (
                    <Col key={book.id}>
                      <BookCard book={book} />
                    </Col>
                  );
                })}
              </CardGroup>
            </Row>
          </>
        ) : null}
      </Container>
    </>
  );
}
export default Series;
