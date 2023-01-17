import {
  Form,
  Button,
  FloatingLabel,
  Modal,
  NavDropdown,
} from "react-bootstrap";
import React, { useState } from "react";
import { Formik, useField } from "formik";
import * as Yup from "yup";
import {
  useAddNewLibraryMutation,
  usePatchLibraryMutation,
} from "../../services/mangaserver";
import TextInput from "./TextInput";
// const TextInput = ({ label, ...props }) => {
//   const [field, meta] = useField(props);

//   return (
//     <>
//       <FloatingLabel label={label}>
//         <Form.Control className="text-input" {...field} {...props} />
//       </FloatingLabel>
//       {meta.touched && meta.error ? (
//         <div className="error">{meta.error}</div>
//       ) : null}
//     </>
//   );
// };
function LibraryForm({ type, info, nav }) {
  const [showModal, setShowModal] = useState(false);
  const [addNewLibrary, { isLoading }] = useAddNewLibraryMutation();
  const [patchLibrary] = usePatchLibraryMutation();
  return (
    <>
      <Formik
        initialValues={
          type === "add"
            ? {
                name: "",
                path: "",
              }
            : { name: info.name, path: info.path }
        }
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
        onSubmit={async (values, { resetForm }) => {
          if (type === "add") {
            try {
              await addNewLibrary({ name: values.name, path: values.path });
            } catch (err) {
              console.log(err);
            }
          } else if (type === "edit") {
            try {
              await patchLibrary({
                name: values.name,
                id: info.id,
                path: values.path,
              });
            } catch (err) {
              console.log(err);
            }
          }

          setShowModal(false);
          resetForm();
        }}
      >
        {(formik) => (
          <Modal
            show={showModal}
            onHide={() => {
              setShowModal(false);
              formik.resetForm();
            }}
          >
            <Modal.Header>
              {type === "add" ? "Add Library" : `Edit ${info.name}`}
            </Modal.Header>
            <Modal.Body>
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
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setShowModal(false);
                      formik.resetForm();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">
                    {type === "add" ? "Add" : "Edit"}
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal.Body>
          </Modal>
        )}
      </Formik>
      {nav === true ? (
        <NavDropdown.Item
          key="addLib"
          onClick={() => {
            setShowModal(true);
          }}
        >
          Add Library+
        </NavDropdown.Item>
      ) : (
        <Button
          onClick={() => {
            setShowModal(true);
          }}
        >
          {type === "add" ? "Add Library" : "Edit"}
        </Button>
      )}
    </>
  );
}

export default LibraryForm;
