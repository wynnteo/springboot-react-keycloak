import React, { useContext } from "react";
import KeycloakContext from "../context/KeycloakContext";

function PrivateRoute({ children }) {
  const keycloak = useContext(KeycloakContext);

  const Login = () => {
    keycloak.login();
  };

  return keycloak.authenticated ? children : <Login />;
}

export default PrivateRoute;
