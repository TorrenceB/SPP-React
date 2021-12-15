import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import appTheme from "./assets/themes/app-theme";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
