import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./scss/index.scss";
import Spinner from "./components/Spinner";
import store from "./store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Suspense fallback={<Spinner />}>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </Suspense>
);
