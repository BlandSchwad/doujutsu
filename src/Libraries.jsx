import { CardGroup, Row, Col, Container } from "react-bootstrap";

import SeriesCard from "./SeriesCard";
import { useGetAllSeriesQuery } from "./services/mangaserver";
import ToolBar from "./Toolbar";
import Bar from "./Bar";

function Libraries() {
  const { data, error, isLoading } = useGetAllSeriesQuery();

  return (
    <>
      <Bar />

      <ToolBar barType="all" data={data} title={"All Libraries"} />
      <section>
        {error ? (
          <>Error</>
        ) : isLoading ? (
          <>Loading Series</>
        ) : data ? (
          data.length > 0 ? (
            <section className="card-list">
              {data.map((series) => {
                return <SeriesCard series={series} key={series.id} />;
              })}
            </section>
          ) : (
            <>No Series Found</>
          )
        ) : null}
      </section>
    </>
  );
}

export default Libraries;
