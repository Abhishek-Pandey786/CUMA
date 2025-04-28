import React from "react";
import ReactDOM from "react-dom/client"; // React 18 API
import App from "./App";
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById("root")); // Create React Root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
