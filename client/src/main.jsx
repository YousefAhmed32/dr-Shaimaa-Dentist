import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/AuthContext";
import "@fontsource-variable/alexandria";
import "@fontsource-variable/manrope";
import "./styles/tokens.css";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider><App /></AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
