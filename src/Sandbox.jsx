import {
  Alert,
  ButtonGroup,
  Form,
  Offcanvas,
  Button,
  ToggleButton,
  Image,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useParams, useLocation } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import "./Reader.css";
import escapeId from "./assets/escapeId";
import api from "./assets/api";
import { useGetBookQuery } from "./services/mangaserver";

function Reader() {
  const book_id = "t26XJqmaeZE5pLFq2Kjja8CyXAo=";
  const escapedBookId = escapeId(book_id);
  const serverUrl = `http://${process.env.REACT_APP_BACKEND_SERVER}:${process.env.REACT_APP_BACKEND_PORT}`;

  const [show, setShow] = useState(false);

  const [cropMode, setCropMode] = useState(false);
  const [crop, setCrop] = useState({});
  const [activePage, setActivePage] = useState(0);
  const [translation, setTranslation] = useState("");
  s;
  const { data, error, isLoading } = useGetBookQuery(escapedBookId);

  const handleClose = () => setShow(false);

  function sendCrop() {
    let postData = crop;
    let pageData = document.getElementById("pageImage");
    postData.res = [pageData.clientWidth, pageData.clientHeight];
    postData.url = `${serverUrl}/page/${book_id}?page=${activePage}`;

    api
      .post(`/ocr`, postData)
      .then((response) => {
        console.log(response.data);
        setTranslation(response.data);
        navigator.clipboard.writeText(response.data).then(() => {});
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function incrementActivePage() {
    if (activePage === data.page_count) {
      return;
    } else {
      setActivePage(activePage + 1);
    }
  }

  function decrementActivePage() {
    if (activePage === 0) {
      return;
    } else {
      setActivePage(activePage - 1);
    }
  }

  return (
    <div className="readerMenu" id="Reader">
      {error ? (
        <>ERROR</>
      ) : isLoading ? (
        <>LOADING </>
      ) : data ? (
        <>
          {
            <>
              <Offcanvas
                id="topMenu"
                show={show}
                onHide={handleClose}
                placement={"top"}
                scroll={true}
                backdrop={false}
              >
                <LinkContainer to={`/book/${book_id}`}>
                  <div>
                    <Button>
                      <Icon.ArrowLeft />
                    </Button>
                  </div>
                </LinkContainer>
                {data.name ? data.name.slice(0, -4) : `Loading Book Title`}
                <Button onClick={sendCrop}>
                  <Icon.Send />
                </Button>
                <div>
                  {translation !== "" ? (
                    <Alert variant="primary"> {translation} </Alert>
                  ) : null}
                </div>
                <ToggleButton
                  id="toggle-check"
                  type="checkbox"
                  variant={cropMode ? "primary" : "outline-primary"}
                  checked={cropMode}
                  onChange={(e) => {
                    setCropMode(!cropMode);
                  }}
                >
                  <Icon.EyeFill />
                </ToggleButton>
                <ButtonGroup id="bGroup">
                  <Button>
                    <Icon.Fullscreen />
                  </Button>
                  <Button>
                    <Icon.QuestionCircleFill />
                  </Button>
                  <Button>
                    <Icon.GearFill />
                  </Button>
                </ButtonGroup>
              </Offcanvas>

              <Offcanvas
                className="readerMenu"
                id="bottomMenu"
                show={show}
                onHide={handleClose}
                placement={"bottom"}
                scroll={true}
                backdrop={false}
              >
                <Offcanvas.Body className="ocb">
                  <Button>
                    <Icon.SkipBackwardFill />{" "}
                  </Button>
                  <div>{activePage} </div>
                  <Form.Range
                    min={0}
                    max={data.page_count}
                    value={activePage}
                    onChange={(event) => {
                      setActivePage(parseInt(event.target.value));
                    }}
                  />{" "}
                  <Button>
                    {" "}
                    <Icon.SkipForwardFill />{" "}
                  </Button>
                </Offcanvas.Body>
              </Offcanvas>

              <div
                id="leftQuarter"
                className="pageQuarter"
                onClick={decrementActivePage}
              >
                {" "}
              </div>

              <div id="center">
                {cropMode ? (
                  <div>
                    <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
                      <Image
                        id="pageImage"
                        alt="Current Page!"
                        src={`${serverUrl}/page/${escapedBookId}?page=${activePage}`}
                      />
                    </ReactCrop>
                  </div>
                ) : (
                  <>
                    <Image
                      onClick={() => {
                        setShow(!show);
                      }}
                      id="pageImage"
                      alt="Current Page!"
                      src={`${serverUrl}/page/${escapedBookId}?page=${activePage}`}
                    />
                  </>
                )}
              </div>

              <div
                id="rightQuarter"
                className="pageQuarter"
                onClick={incrementActivePage}
              >
                {" "}
              </div>
            </>
          }
        </>
      ) : null}
    </div>
  );
}

export default Reader;
