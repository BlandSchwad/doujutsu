import { Modal, Button } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggle } from "./modalSlice";

const HelpModal = () => {
  const showHelp = useSelector((state) => state.modal.showHelp);
  const dispatch = useDispatch();
  const menuSections = [
    {
      header: "Reader Navigation",
      items: [
        ["← ", "previous page"],
        ["→", "next page"],
        ["Home", "first page"],
        ["End", "last page"],
      ],
    },
    {
      header: "Settings",
      items: [
        ["f", "fullscreen"],
        ["m", "toggle toolbars"],
        ["i", "toggle crop mode"],
      ],
    },
  ];

  return (
    <>
      <Modal
        centered
        size="lg"
        show={showHelp}
        onHide={() => {
          dispatch(toggle("help"));
        }}
      >
        <Modal.Header closeButton />
        <Modal.Title></Modal.Title>

        <Modal.Body className="help-body">
          {menuSections.map((menuSection) => {
            return (
              <section className="help-section">
                <header className="help-header">
                  <h5>{menuSection.header}</h5>
                </header>
                {menuSection.items.map((item) => {
                  return (
                    <article className="help-item">
                      <p className="help-key">{item[0]}</p>
                      <p className="help-desc">{item[1]}</p>
                    </article>
                  );
                })}
              </section>
            );
          })}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default HelpModal;
