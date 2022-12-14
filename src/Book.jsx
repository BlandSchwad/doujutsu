import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Row, Col, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import "./Book.css";
function Book() {
  const { book_id } = useParams();
  const [bookData, setBookData] = useState({});

  const escapedBookId = book_id.replaceAll("/", "%2F");
  const serverUrl = `http://${process.env.REACT_APP_BACKEND_SERVER}:${process.env.REACT_APP_BACKEND_PORT}`;

  useEffect(() => {
    axios
      .get(`${serverUrl}/book/${escapedBookId}`)
      .then((response) => {
        setBookData(response.data);
      })
      .catch((err) => {
        return err;
      });
  }, [book_id]);

  return (
    <Container fluid>
      <Row>
        <Col xs="auto">
          <div id="thumbOverlay">
            <Image
              id="bookThumb"
              src={`${serverUrl}/page/${escapedBookId}?page=0`}
              alt="book thumbnail"
              fluid
              thumbnail
            />
          </div>
        </Col>
        <Col xs={6}>
          {bookData.file_path ? (
            <div id="bookInfo">
              <p>{`${bookData.series_name} in ${bookData.library_name}`}</p>
              <p>{`${bookData.name}`}</p>
              <p>{`${bookData.page_count} pages`}</p>

              <LinkContainer to={`/read/${escapedBookId}`}>
                <Button>Read</Button>
              </LinkContainer>
            </div>
          ) : (
            "LOADING"
          )}
        </Col>
      </Row>
      <Row>
        <Col xs="auto">
          <p> Size </p>
          <p> Format </p>
          <p> File </p>
        </Col>
        <Col>
          <p>
            {bookData.file_size
              ? `${(bookData.file_size * 10e-7).toPrecision(4)} MB`
              : "Loading"}
          </p>
          <p>{bookData.name ? `${bookData.name.slice(-3)}` : `Loading`}</p>
          <p>
            {bookData.file_path
              ? `${bookData.file_path}/${bookData.name}`
              : `Loading`}
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default Book;
