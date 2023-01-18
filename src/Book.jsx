import { Button, Container, Row, Col, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import "./Book.css";
import { useGetBookQuery } from "./services/mangaserver";
import ToolBar from "./Toolbar";
import Bar from "./Bar";
import escapeId from "./assets/escapeId";
function Book() {
  const { book_id } = useParams();
  const escapedBookId = escapeId(book_id);
  const { data, error, isLoading } = useGetBookQuery(escapedBookId);
  const serverUrl = `http://${process.env.REACT_APP_BACKEND_SERVER}:${process.env.REACT_APP_BACKEND_PORT}`;

  return (
    <>
      {" "}
      <Bar />
      <Container fluid>
        {error ? (
          <>Error</>
        ) : isLoading ? (
          <>Loading</>
        ) : data ? (
          <>
            <Row>
              <ToolBar barType="book" data={data} />
            </Row>
            <Row>
              <Col xs="auto">
                <Image
                  id="bookThumb"
                  src={`${serverUrl}/page/${escapedBookId}?page=0`}
                  alt="book thumbnail"
                  thumbnail
                />
              </Col>
              <Col xs={6}>
                <p>{`${data.series_name} in ${data.library_name}`}</p>
                <p>{`${data.name}`}</p>
                <p>{`${data.page_count} pages`}</p>

                <LinkContainer to={`/read/${escapedBookId}`}>
                  <Button>Read</Button>
                </LinkContainer>
              </Col>
            </Row>
            <Row>
              <Col xs="auto">
                <p> Size </p>
                <p> Format </p>
                <p> File </p>
              </Col>
              <Col>
                <p>{`${(data.file_size * 10e-7).toPrecision(4)} MB`}</p>
                <p>{data.name.slice(-3)}</p>
                <p>{`${data.file_path}/${data.name}`} </p>
              </Col>
            </Row>
          </>
        ) : null}
      </Container>
    </>
  );
}

export default Book;
