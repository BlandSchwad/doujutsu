import { useField } from "formik";
import { Form, FloatingLabel } from "react-bootstrap";
const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <FloatingLabel label={label}>
        <Form.Control
          className="text-input"
          {...field}
          {...props}
          isValid={meta.touched && !meta.error}
          isInvalid={meta.error}
        />
      </FloatingLabel>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

export default TextInput;
