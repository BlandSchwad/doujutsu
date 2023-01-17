import { Form, Button, FloatingLabel } from "react-bootstrap";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import TextInput from "./TextInput";

function Login() {
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
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
      })}
      onSubmit={async (values, { resetForm }) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {(formik) => (
        <section id="login-form">
          <h1>Login</h1>
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
            <Button onClick={formik.handleSubmit}>Login</Button>
          </Form>
          <a>Register</a>
        </section>
      )}
    </Formik>
  );
}
export default Login;
