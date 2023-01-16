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

      <ToolBar barType="all" data={data} title={"All Libraries"} />
      {error ? (
        <>Error</>
      ) : isLoading ? (
        <>Loading Series</>
      ) : data ? (
        data.length > 0 ? (
          <article className="card-list">
            {data.map((series) => {
              return <SeriesCard series={series} />;
            })}
          </article>
        ) : (
          <>No Series Found</>
        )
      ) : null}
    </>
  );
}

export default Libraries;
