// src/App.js
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Logout from "./components/Logout";
import AddDishForm from "./components/AddDishForm";
import MainPage from "./components/MainPage";
import { Link } from "react-router-dom";

function App() {

  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  return (
    <Router>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <h1>
              <Link to="/" className="text-decoration-none">Dienos Pietus</Link>
            </h1>
          </div>
        </div>
        <div className="row justify-content-center mt-3">
          <div className="col-md-6 text-center btn-primary">
            <Logout />
          </div>
        </div>
        <Routes>
          <Route
            path="/"
            element={<MainPage />}
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={<Login/>}
          />
          <Route
            path="/logout"
            element={"/login"}
          />
          <Route
            path="/addDish"
            element={<AddDishForm/>}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
