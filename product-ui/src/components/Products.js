import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api, { setAuthToken } from "../helpers/api";
import KeycloakContext from "../context/KeycloakContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";

const ProductList = () => {
  const keycloak = useContext(KeycloakContext);
  const [products, setProducts] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const navigate = useNavigate();

  useEffect(() => {
    if (keycloak && keycloak?.token) {
      setAuthToken(keycloak?.token);
      getProducts();
    }
  }, [keycloak]);

  const getProducts = async () => {
    try {
      const response = await api.get("/api/products");
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleEdit = (productId) => {
    // Handle the edit logic here
    console.log("Editing product with ID:", productId);
  };

  const handleDelete = async (productId) => {
    console.log("Deleting product with ID:", productId);
    try {
      const response = await api.delete(`/api/products/${productId}`);
      if (response.data.statusCode === 204) {
        setSnackbarMessage("Product deleted successfully!");
        setSnackbarSeverity("success");
      }

      getProducts();
    } catch (error) {
      console.error("Error fetching products:", error);
      setSnackbarMessage(
        `An error occurred while deleting the product. Error: ${error.message}`
      );
      setSnackbarSeverity("error");
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleAdd = () => {
    navigate("/products/add");
    console.log("Adding a new product");
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div>
      <h2>Products</h2>
      <Button variant="contained" color="primary" onClick={handleAdd}>
        Add New Product
      </Button>
      <Paper elevation={3} style={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEdit(product.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDelete(product.id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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

export default ProductList;
