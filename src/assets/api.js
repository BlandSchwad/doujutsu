import axios from "axios";

export default axios.create({
  baseURL: `http://${process.env.REACT_APP_BACKEND_SERVER}:${process.env.REACT_APP_BACKEND_PORT}`,
  timeout: 3000,
  timeoutErrorMessage: "Connection Timeout. Check server(s)",
});
