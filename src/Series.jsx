import axios from "axios";
import React, { useEffect, useState } from "react";
import { CardGroup } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import BookCard from "./BookCard";
import { Button } from "react-bootstrap";

function Series() {
  const { series_id } = useParams();
  const [seriesData, setSeriesData] = useState({});
  const deleteSeries = () => {
    console.log("N");
    axios.delete(`http://localhost:45001/series/${series_id}`).catch((err) => {
      console.log(err);
    });
  };
  useEffect(() => {
    axios.get(`http://localhost:45001/series/${series_id}`).then((response) => {
      setSeriesData(response.data);
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
            {seriesData.seriesInfo
              ? `${seriesData.seriesInfo.name} in ${seriesData.seriesInfo.library_name}`
              : "Loading"}
          </h1>
          {seriesData.seriesInfo ? (
            <h2> {seriesData.seriesInfo.book_count} Books</h2>
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
          {seriesData.bookList ? (
            <CardGroup>
              {seriesData.bookList.map((Book) => {
                return <BookCard key={Book.id} Book={Book} />;
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
