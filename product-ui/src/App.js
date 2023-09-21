import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Container from "@mui/material/Container";
import PrivateRoute from "./route/PrivateRoute";
import UserProfile from "./components/UserProfile";
import Home from "./components/Home";
import Nav from "./components/Nav";
import ProductList from "./components/Products";
import AddProductForm from "./components/AddProduct";

const App = () => {
  return (
    <>
      <Nav />
      <Container maxWidth="md" component="main">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/products"
              element={
                <PrivateRoute>
                  <ProductList />
                </PrivateRoute>
              }
            />
            <Route
              path="/products/add"
              element={
                <PrivateRoute>
                  <AddProductForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <UserProfile />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </Container>
    </>
  );
};

export default App;
