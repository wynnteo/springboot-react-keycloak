import React, { useContext } from "react";
import KeycloakContext from "../context/KeycloakContext";

const UserProfile = () => {
  const keycloak = useContext(KeycloakContext);

  const tokenInfo = keycloak?.tokenParsed;
  return (
    <div>
      <h2>User Profile</h2>
      <ul>
        {Object.entries(tokenInfo).map(([key, value]) => (
          <li key={key}>
            <strong>{key}:</strong>{" "}
            {typeof value === "object" ? JSON.stringify(value) : value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;
