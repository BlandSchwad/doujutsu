import { CardGroup, Row, Col, Container } from "react-bootstrap";

import SeriesCard from "./SeriesCard";
import { useGetAllSeriesQuery } from "./services/mangaserver";
import ToolBar from "./Toolbar";
import Bar2 from "./Bar2";

function Libraries() {
  const { data, error, isLoading } = useGetAllSeriesQuery();

  return (
    <>
      <Bar2 />
      <Container fluid>
        <Row>
          <ToolBar barType="all" data={data} title={"All Libraries"} />
        </Row>
        <Row>
          {error ? (
            <>Error</>
          ) : isLoading ? (
            <>LOADING</>
          ) : data ? (
            data.length > 0 ? (
              <CardGroup>
                {data.map((series) => {
                  return (
                    <Col key={series.id}>
                      <SeriesCard series={series} />
                    </Col>
                  );
                })}
              </CardGroup>
            ) : (
              <>No Series Found</>
            )
          ) : null}
        </Row>
      </Container>
    </>
  );
}

export default Libraries;
