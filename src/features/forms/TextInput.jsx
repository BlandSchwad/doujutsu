import { useField } from "formik";
import { Form, FloatingLabel } from "react-bootstrap";
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

export default TextInput;
