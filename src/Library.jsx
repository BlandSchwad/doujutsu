import React from "react";
import Bar from "./Bar";
import { useParams } from "react-router-dom";
import { CardGroup, Col, Container, Row } from "react-bootstrap";
import SeriesCard from "./SeriesCard";
import { useGetLibraryQuery } from "./services/mangaserver";

import ToolBar from "./Toolbar";

function Library() {
  const { library_id } = useParams();

  const { data, error, isLoading } = useGetLibraryQuery(library_id);

  return (
    <>
      <Bar />
      <ToolBar barType="library" data={data} />
      <Container fluid>
        {error ? (
          <>Error</>
        ) : isLoading ? (
          <>Loading</>
        ) : data ? (
          <article className="card-list">
            {data.children.map((series) => {
              return <SeriesCard series={series} key={series.id} />;
            })}
          </article>
        ) : null}
        <Row>{/* <ToolBar barType="library" data={libraryData} /> */}</Row>
      </Container>
    </>
  );
}

export default Library;
