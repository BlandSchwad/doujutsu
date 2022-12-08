import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

function Book() {
  const { book_id } = useParams();
  const [bookData, setBookData] = useState({});

  let escapedBookId = book_id.replaceAll("/", "%2F");
  useEffect(() => {
    axios
      .get(
        `http://${process.env.REACT_APP_BACKEND_SERVER}:${process.env.REACT_APP_BACKEND_PORT}/book/${escapedBookId}`
      )
      .then((response) => {
        setBookData(response.data);
      })
      .catch((err) => {
        return err;
      });
  }, [book_id]);

  return (
    <div id="bookView">
      <img
        id="bookThumb"
        src={`http://${process.env.REACT_APP_BACKEND_SERVER}:${process.env.REACT_APP_BACKEND_PORT}/page/${escapedBookId}?page=0`}
        alt="The book thumbnail"
      />
      {bookData.file_path ? (
        <div id="bookInfo">
          <p>{`${bookData.series_name} in ${bookData.library_name}`}</p>
          <p>{`${bookData.name}`}</p>

          <LinkContainer to={`/read/${escapedBookId}`}>
            <Button>Read</Button>
          </LinkContainer>

          <p>{`${bookData.page_count} pages`}</p>
          <p>Size: {`${(bookData.file_size * 10e-7).toPrecision(4)} MB`}</p>
          <p>Category: {`${bookData.name.slice(-4)}`}</p>
          <p>File: {`${bookData.file_path}/${bookData.name}`}</p>
        </div>
      ) : (
        "LOADING"
      )}
    </div>
  );
}

export default Book;
