import React from "react";
// import axios from "axios";
import api from "./assets/api";
import { useParams } from "react-router-dom";
import { CardGroup } from "react-bootstrap";
import SeriesCard from "./SeriesCard";
import { useEffect, useState } from "react";

function Library() {
  const { library_id } = useParams();
  const [libraryData, setLibraryData] = useState({});
  const serverUrl = `http://${process.env.REACT_APP_BACKEND_SERVER}:${process.env.REACT_APP_BACKEND_PORT}`;
  useEffect(() => {
    api
      .get(`/library/${library_id}`)
      .then((response) => {
        setLibraryData(response.data);
      })
      .catch((err) => {
        return err;
      });
  }, [library_id]);

  let seriesCards = libraryData.children
    ? libraryData.children.map((series) => {
        return <SeriesCard key={series.id} series={series} />;
      })
    : [];

  return (
    <div id="LibraryView">
      <h1>Series in {libraryData.name}:</h1>
      {seriesCards ? <CardGroup> {seriesCards} </CardGroup> : `Loading`}
    </div>
  );
}

export default Library;
