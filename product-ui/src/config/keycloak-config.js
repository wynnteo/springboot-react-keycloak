import { config } from "./config";
import Keycloak from "keycloak-js";

const keycloakConfig = {
  url: `${config.url.KEYCLOAK_BASE_URL}`,
  realm: `${config.KEYCLOAK_REALM}`,
  clientId: `${config.KEYCLOAK_CLIENT_ID}`,
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;
