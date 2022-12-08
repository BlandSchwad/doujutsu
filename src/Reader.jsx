import axios from "axios";
import {
  Alert,
  ButtonGroup,
  Form,
  Offcanvas,
  Button,
  ToggleButton,
} from "react-bootstrap";
import { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useParams, useLocation } from "react-router-dom";
import * as Icon from "react-bootstrap-icons";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import "./Reader.css";

function Reader() {
  const { book_id } = useParams();
  const [show, setShow] = useState(false);

  const [cropMode, setCropMode] = useState(false);
  const [crop, setCrop] = useState({});
  const [activePage, setactivePage] = useState(0);
  const [translation, setTranslation] = useState("");

  const handleClose = () => setShow(false);

  function sendCrop() {
    let postData = crop;
    postData.res = document.getElementById("pageImage").clientWidth;
    postData.url = `http://${process.env.REACT_APP_BACKEND_SERVER}:${process.env.REACT_APP_BACKEND_PORT}/page/${book_id}?page=${activePage}`;

    axios
      .post(
        `http://${process.env.REACT_APP_BACKEND_SERVER}:${process.env.REACT_APP_BACKEND_PORT}/ocr`,
        postData
      )
      .then((response) => {
        console.log(response.data);
        setTranslation(response.data);
        navigator.clipboard.writeText(response.data).then(() => {});
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function incrementactivePage() {
    setactivePage(activePage + 1);
  }

  function decrementactivePage() {
    if (activePage === 0) {
      return;
    } else {
      setactivePage(activePage - 1);
    }
  }
  return (
    <div className="readerMenu" id="Reader">
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
        Book Title
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
            value={activePage}
            onChange={(event) => {
              setactivePage(parseInt(event.target.value));
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
        onClick={decrementactivePage}
      >
        {" "}
      </div>

      <div id="center">
        {cropMode ? (
          <div className="pageContainer">
            <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
              <img
                id="pageImage"
                alt="Current Page!"
                src={`http://${process.env.REACT_APP_BACKEND_SERVER}:${
                  process.env.REACT_APP_BACKEND_PORT
                }/page/${book_id.replaceAll("/", "%2F")}?page=${activePage}`}
              />
            </ReactCrop>
          </div>
        ) : (
          <div>
            <img
              onClick={() => {
                setShow(!show);
              }}
              id="pageImage"
              alt="Current Page!"
              src={`http://${process.env.REACT_APP_BACKEND_SERVER}:${
                process.env.REACT_APP_BACKEND_PORT
              }/page/${book_id.replaceAll("/", "%2F")}?page=${activePage}`}
            />
          </div>
        )}
      </div>

      <div
        id="rightQuarter"
        className="pageQuarter"
        onClick={incrementactivePage}
      >
        {" "}
      </div>
    </div>
  );
}

export default Reader;
