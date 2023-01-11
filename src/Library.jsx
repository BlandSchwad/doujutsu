import React from "react";
// import axios from "axios";
import Bar2 from "./Bar2";
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
      <Bar2 />
      <ToolBar barType="library" data={data} />
      <Container fluid>
        {error ? (
          <>Error</>
        ) : isLoading ? (
          <>Loading</>
        ) : data ? (
          <>
            <Row>
              <CardGroup>
                {data.children.map((series) => {
                  return (
                    <Col key={series.id}>
                      {" "}
                      <SeriesCard series={series} />{" "}
                    </Col>
                  );
                })}
              </CardGroup>
            </Row>
          </>
        ) : null}
        <Row>{/* <ToolBar barType="library" data={libraryData} /> */}</Row>
      </Container>
    </>
  );
}

export default Library;
