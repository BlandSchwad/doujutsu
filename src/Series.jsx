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
import Bar from "./Bar";

function Series() {
  const { series_id } = useParams();

  const escapedSeriesId = escapeId(series_id);
  const { data, error, isLoading } = useGetSeriesQuery(escapedSeriesId);
  const serverUrl = `http://${process.env.REACT_APP_BACKEND_SERVER}:${process.env.REACT_APP_BACKEND_PORT}`;

  return (
    <>
      <Bar />
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
              <article className="card-list">
                {data[0].books.map((book) => {
                  return <BookCard book={book} key={book.id} />;
                })}
              </article>
            </Row>
          </>
        ) : null}
      </Container>
    </>
  );
}
export default Series;
