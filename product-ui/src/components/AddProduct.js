import React, { useState, useEffect, useContext } from "react";
import api, { setAuthToken } from "../helpers/api";
import KeycloakContext from "../context/KeycloakContext";
import { Button, TextField, Paper, Snackbar, Alert } from "@mui/material";

const AddProductForm = () => {
  const keycloak = useContext(KeycloakContext);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    storeId: "",
    stock: "",
    createdBy: keycloak?.tokenParsed?.preferred_username,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await api.post("/api/products", product);

      if (response.data.statusCode === 201) {
        setSnackbarMessage("Product added successfully!");
        setSnackbarSeverity("success");
      }
    } catch (error) {
      console.error("Error creating products", error);
      setSnackbarMessage(
        `An error occurred while adding the product. Error: ${error.message}`
      );
      setSnackbarSeverity("error");
    } finally {
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    if (keycloak && keycloak?.token) {
      setAuthToken(keycloak?.token);
    }
  }, [keycloak]);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <h2>Add Product</h2>
      <Paper style={{ padding: "20px" }}>
        <form noValidate autoComplete="off">
          <TextField
            fullWidth
            margin="normal"
            label="Title"
            name="title"
            value={product.title}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            name="description"
            value={product.description}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Price"
            name="price"
            type="number"
            value={product.price}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Store ID"
            name="storeId"
            value={product.storeId}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Stock"
            name="stock"
            type="number"
            value={product.stock}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Created By"
            name="createdBy"
            value={product.createdBy}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            style={{ marginTop: "20px" }}
          >
            Add Product
          </Button>
        </form>
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default AddProductForm;
