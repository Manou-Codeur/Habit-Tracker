import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import FetchError from "./Components/errorBoundaries/fetchError";

ReactDOM.render(
  <React.StrictMode>
    <FetchError>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FetchError>
  </React.StrictMode>,
  document.getElementById("root")
);
