import TextInput from "./TextInput";
import { Formik } from "formik";
import * as Yup from "yup";
import React, from "react";
import { Form, Button } from "react-bootstrap";
function Register() {
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={Yup.object({
        username: Yup.string()
          .min(3, "Username must be at least 3 characters")
          .max(20, "Username must be 20 characters or less")
          .required("Enter your username"),
        password: Yup.string()
          .min(10, "Password must be at least 10 characters")
          .max(50, "Password must be 50 characters or less ")
          .required("Enter your password"),
        confirmPassword: Yup.string().oneOf(
          [Yup.ref("password"), null],
          "Passwords do not match"
        ),
      })}
      onSubmit={async (values, { resetForm }) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {(formik) => (
        <section id="login-form">
          <h1>Register</h1>
          <Form onSubmit={formik.handleSubmit}>
            <TextInput
              label="Username"
              id="username"
              name="username"
              type="text"
            />
            <TextInput
              label="Password"
              id="password"
              name="password"
              type="password"
            />
            <TextInput
              label="Confirm Password"
              id="confirm-password"
              name="confirmPassword"
              type="password"
            />
            <Button onClick={formik.handleSubmit}>Register</Button>
          </Form>
        </section>
      )}
    </Formik>
  );
}

export default Register;
