import { CardGroup } from "react-bootstrap";
import { useEffect, useState } from "react";
// import axios from "axios";
import SeriesCard from "./SeriesCard";
import api from "./assets/api";
function Libraries() {
  const [libraryViewData, setLibraryViewData] = useState([]);
  const serverUrl = `http://${process.env.REACT_APP_BACKEND_SERVER}:${process.env.REACT_APP_BACKEND_PORT}`;
  useEffect(() => {
    api
      .get(`/libraries`)
      .then((response) => {
        setLibraryViewData(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        return err;
      });
  }, [setLibraryViewData]);

  return (
    <>
      <h1>All Libraries: </h1>
      {libraryViewData
        ? libraryViewData.map((library) => {
            return (
              <div className="libraryView" key={library.name}>
                {/* <h2 className="libraryName"> {library.name}:</h2> */}
                <CardGroup>
                  {library.children.map((series) => {
                    return <SeriesCard key={series.id} series={series} />;
                  })}{" "}
                </CardGroup>
              </div>
            );
          })
        : "No Libraries Found"}{" "}
    </>
  );
}

export default Libraries;
