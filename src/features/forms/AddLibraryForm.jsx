import { Form, Button, FloatingLabel, Modal } from "react-bootstrap";
import React, { useState } from "react";
import { Formik, useField } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { hide } from "../modals/modalSlice";
const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <FloatingLabel label={label}>
        <Form.Control className="text-input" {...field} {...props} />
      </FloatingLabel>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};
function AddLibraryForm() {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        name: "",
        path: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string()
          .min(3, "Must be at least 3 characters")
          .max(50, "Must be 50 characters or less")
          .required("Required"),
        path: Yup.string()
          .min(3, "Must be at least 3 characters")
          .max(50, "Must be 50 characters or less")
          .required("Required"),
      })}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {(formik) => (
        <Form onSubmit={formik.handleSubmit}>
          <TextInput
            label="Name"
            id="name"
            name="name"
            type="text"
            placeholder="Example Name"
          />

          <TextInput
            label="Path"
            id="path"
            name="path"
            type="text"
            placeholder="/example/path/goes/here"
          />
          <Button variant="secondary" onClick={() => dispatch(hide())}>
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </Form>
      )}
    </Formik>
  );
}

export default AddLibraryForm;
