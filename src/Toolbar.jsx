import React from "react";
import * as Icon from "react-bootstrap-icons";
import {
  Col,
  Row,
  Container,
  Button,
  DropdownButton,
  Dropdown,
  ButtonGroup,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./Toolbar.css";
import escapeId from "./assets/escapeId";

function ToolBar(props) {
  let title =
    props.barType === "all"
      ? "All Libraries"
      : props.data
      ? props.data.name
      : "Loading";

  let backArrow = () => {
    let parentType;
    if (props.barType === "series") {
      parentType = "library";
      parentId = escapeId(props.data.library_id);
    } else if (props.barType === "book") {
      parentType = "series";
      parentId = escapeId(props.data.series_id);
    } else {
      parentType = null;
    }

    return (
      <LinkContainer to={`/${parentType}/${parentId}`}>
        <Button>
          <Icon.ArrowLeft />
        </Button>
      </LinkContainer>
    );
  };

  let threeDot = () => {
    let customToggle = React.forwardRef(({ children, onClick }, ref) => (
      <a
        href=""
        ref={ref}
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
      >
        {children}
      </a>
    ));

    return (
      <div>
        <Dropdown>
          <Dropdown.Toggle as={customToggle}>
            <Button>
              <Icon.ThreeDotsVertical />
            </Button>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>Scan</Dropdown.Item>
            <Dropdown.Item>Edit</Dropdown.Item>
            <Dropdown.Item>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  };

  let itemCount = () => {
    if (props.barType === "library") {
      return props.data ? props.data.children.length : "Loading";
    } else if (props.barType === "series") {
      return props.data.book_count;
    } else if (props.barType === "all") {
      return props.data ? props.data.length : `Loading`;
    } else {
      return null;
    }
  };

  return (
    <Container id="toolbar" fluid>
      <Row>
        <Col>
          <div className="toolbar-button-group">
            {props.barType === "series" || props.barType === "book"
              ? backArrow()
              : null}
            {props.barType !== "all" ? (
              <>
                <Button>
                  <Icon.Pencil />
                </Button>
                <Button>
                  <Icon.Trash />
                </Button>
              </>
            ) : null}
          </div>
        </Col>

        <Col>
          <div className="title">{title}</div>
        </Col>
        <Col>{itemCount != null ? <div>{itemCount()}</div> : null}</Col>
      </Row>
    </Container>
  );
}

export default ToolBar;
