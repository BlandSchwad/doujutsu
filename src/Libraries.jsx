import { CardGroup } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import SeriesCard from "./SeriesCard";

function Libraries() {
  const [libraryViewData, setLibraryViewData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:45001/libraries`)
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
      <h1>All Titles: </h1>
      {libraryViewData
        ? libraryViewData.map((library) => {
            return (
              <div className="libraryView" key={library.name}>
                <h2 className="libraryName"> {library.name}:</h2>
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
