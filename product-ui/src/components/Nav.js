import React, { useContext } from "react";
import KeycloakContext from "../context/KeycloakContext";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

export default function Nav() {
  const keycloak = useContext(KeycloakContext);
  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ flexWrap: "wrap" }}>
        <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
          Full Stack App
        </Typography>
        <nav>
          <Link
            variant="button"
            color="text.primary"
            href="/products"
            sx={{ my: 1, mx: 1.5 }}
          >
            Products
          </Link>
          <Link
            variant="button"
            color="text.primary"
            href="/profile"
            sx={{ my: 1, mx: 1.5 }}
          >
            Profile
          </Link>
        </nav>

        {!keycloak.authenticated && (
          <Button
            onClick={() => keycloak.login()}
            variant="outlined"
            sx={{ my: 1, mx: 1.5 }}
          >
            Login
          </Button>
        )}

        {!!keycloak.authenticated && (
          <Button
            variant="outlined"
            sx={{ my: 1, mx: 1.5 }}
            onClick={() => keycloak.logout()}
          >
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
