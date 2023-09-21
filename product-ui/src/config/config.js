const dev = {
  url: {
    KEYCLOAK_BASE_URL: "http://localhost:8080",
    API_BASE_URL: "http://localhost:8081",
  },
  KEYCLOAK_REALM: "FullStackApp",
  KEYCLOAK_CLIENT_ID: "fullstack-react-client",
};

const prod = {
  url: {
    KEYCLOAK_BASE_URL: "http://localhost:8080",
    API_BASE_URL: "http://localhost:8081",
  },
  KEYCLOAK_REALM: "FullStackApp",
  KEYCLOAK_CLIENT_ID: "fullstack-react-client",
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;
