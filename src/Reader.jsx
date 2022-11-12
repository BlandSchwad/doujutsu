import React from "react";
import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";

import { useParams, useLocation } from "react-router-dom";
import "./Reader.css";
import { ButtonGroup, Form, Offcanvas } from "react-bootstrap";
import { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { Alert } from "react-bootstrap";

import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import axios from "axios";

function Reader() {
  const { book_id } = useParams();
  const [show, setShow] = useState(false);

  const [cropMode, setCropMode] = useState(false);
  const [crop, setCrop] = useState({});
  const [Nupage, setNuPage] = useState(0);
  const [translation, setTranslation] = useState("");

  const handleClose = () => setShow(false);
  //const handleShow = () => setShow(true);

  function sendCrop() {
    let postData = crop;
    postData.res = document.getElementById("pageImage").clientWidth;
    postData.url = `http://localhost:45001/page/${book_id}?page=${Nupage}`;

    axios
      .post("http://localhost:45001/ocr", postData)
      .then((response) => {
        console.log(response.data);
        setTranslation(response.data);
        navigator.clipboard.writeText(response.data).then(() => {});
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  let query = useQuery(),
    queryPage = query.get("page");
  let page = parseInt(queryPage) || 0;
  console.log(page, queryPage);
  function incrementNuPage() {
    setNuPage(Nupage + 1);
  }

  function decrementNuPage() {
    setNuPage(Nupage - 1);
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
          <div>{Nupage} </div>
          <Form.Range
            value={Nupage}
            onChange={(event) => {
              setNuPage(parseInt(event.target.value));
              /*page = event.target.value*/
            }}
          />{" "}
          <Button>
            {" "}
            <Icon.SkipForwardFill />{" "}
          </Button>
        </Offcanvas.Body>
      </Offcanvas>

      <LinkContainer to={`/read/${book_id}`} search={`/page=${page - 1}`}>
        <div id="leftQuarter" className="pageQuarter" onClick={decrementNuPage}>
          {" "}
        </div>
      </LinkContainer>
      <div id="center">
        {cropMode ? (
          <div className="pageContainer">
            <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
              <img
                id="pageImage"
                alt="Current Page!"
                src={`http://localhost:45001/page/${book_id}?page=${Nupage}`}
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
              src={`http://localhost:45001/page/${book_id}?page=${Nupage}`}
            />
          </div>
        )}
      </div>
      <LinkContainer to={`/read/${book_id}`} search={`${page + 1}`}>
        <div
          id="rightQuarter"
          className="pageQuarter"
          onClick={incrementNuPage}
        >
          {" "}
        </div>
      </LinkContainer>
    </div>
  );
}

export default Reader;
