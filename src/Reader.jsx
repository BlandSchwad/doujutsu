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
import HelpModal from "./features/modals/HelpModal";
function Reader() {
  const { book_id } = useParams();
  const escapedBookId = escapeId(book_id);
  const serverUrl = `http://${process.env.REACT_APP_BACKEND_SERVER}:${process.env.REACT_APP_BACKEND_PORT}`;

  const [show, setShow] = useState(false);

  const [cropMode, setCropMode] = useState(false);
  const [crop, setCrop] = useState({});
  const [activePage, setActivePage] = useState(0);
  const [translation, setTranslation] = useState("");
  const [bookData, setBookData] = useState({});
  // const [fullScreen, setFullScreen] = useState("false");

  const toggleFullScreen = () => {
    let fullScreenCheck = !(document.fullscreenElement === null);
    if (fullScreenCheck) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };
  useEffect(() => {
    api
      .get(`/book/${escapedBookId}`)
      .then((response) => {
        setBookData(response.data);
      })
      .catch((err) => {
        return err;
      });
  }, []);

  const handleClose = () => setShow(false);

  function sendCrop() {
    let postData = crop;
    let pageData = document.getElementById("pageImage");
    postData.res = [pageData.clientWidth, pageData.clientHeight];
    postData.id = book_id;
    postData.page = activePage;
    // postData.url = `${serverUrl}/page/${book_id}?page=${activePage}`;

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
    if (activePage === bookData.page_count) {
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
    <div
      onKeyDown={(e) => {
        if (e.key === "f") {
          toggleFullScreen();
        } else if (e.key === "ArrowLeft") {
          decrementActivePage();
        } else if (e.key === "ArrowRight") {
          incrementActivePage();
        }
      }}
      className="readerMenu"
      id="Reader"
      tabIndex={0}
    >
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
        {bookData.name ? bookData.name.slice(0, -4) : `Loading Book Title`}
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
          <Button onClick={toggleFullScreen}>
            <Icon.Fullscreen />
          </Button>
          <HelpModal />
          {/* <Button>
            <Icon.QuestionCircleFill />
          </Button> */}
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
            max={bookData.page_count}
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
              <img
                id="pageImage"
                alt="Current Page!"
                src={`${serverUrl}/page/${escapedBookId}?page=${activePage}`}
              />
            </ReactCrop>
          </div>
        ) : (
          <>
            <img
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
    </div>
  );
}

export default Reader;
