import axios from "axios";
import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";
import BookCard from "./BookCard";
import { Button, CardGroup } from "react-bootstrap";

function Series() {
  const { series_id } = useParams();

  let escapedSeriesId = series_id.replaceAll(`/`, `%2F`);

  const [seriesData, setSeriesData] = useState({});
  const deleteSeries = () => {
    axios
      .delete(
        `http://${process.env.REACT_APP_BACKEND_SERVER}:${process.env.REACT_APP_BACKEND_PORT}/series/${escapedSeriesId}`
      )
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    axios
      .get(
        `http://${process.env.REACT_APP_BACKEND_SERVER}:${process.env.REACT_APP_BACKEND_PORT}/series/${escapedSeriesId}`
      )
      .then((response) => {
        setSeriesData(response.data.seriesView);
      })
      .catch((err) => {
        return err;
      });
  }, [series_id]);

  return (
    <div id="series">
      <div id="SeriesBox">
        <img
          id="seriesThumb"
          src="https://user-images.githubusercontent.com/101482/29592647-40da86ca-875a-11e7-8bc3-941700b0a323.png"
          alt="The series thumbnail"
        />
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
          )}
          <Button
            onClick={() => {
              alert("SCANS!!!");
            }}
          >
            Scan
          </Button>{" "}
          <Button onClick={deleteSeries}>Delete</Button>
        </div>
      </div>
      <div className="BookList">
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
      </div>
    </div>
  );
}
export default Series;
