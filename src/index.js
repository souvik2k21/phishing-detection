import React from "react";
import ReactDOM from "react-dom";
import "./index.css"; // You can keep your custom CSS import if you have one.
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
