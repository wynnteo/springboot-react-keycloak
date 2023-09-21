import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import keycloak from "./config/keycloak-config";
import KeycloakContext from "./context/KeycloakContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
keycloak
  .init({ onLoad: "check-sso", checkLoginIframe: false })
  .then((authenticated) => {
    console.log(authenticated);
    root.render(
      <React.StrictMode>
        <KeycloakContext.Provider value={keycloak}>
          <App />
        </KeycloakContext.Provider>
      </React.StrictMode>
    );
  });

reportWebVitals();
