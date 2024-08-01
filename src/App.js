import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div>
        <h1>Dienos Pietus</h1> {/* Header placeholder i guess */}
        <Routes>
          <Route
            path="/"
            element={<Navigate to={isAuthenticated ? "/logout" : "/login"} />}
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={<Login onLogin={() => setIsAuthenticated(true)} />}
          />
          <Route
            path="/logout"
            element={
              isAuthenticated ? (
                <Logout onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
                <Route
            path="/addDish"
            element={
              isAuthenticated ? (
                <AddDishForm/>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
