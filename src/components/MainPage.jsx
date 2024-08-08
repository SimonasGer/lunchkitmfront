// src/components/MainPage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Dishes from "./Dishes";

const MainPage = () => {
  const [dishes, setDishes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found in localStorage.");
      setError("No token found. Please log in.");
      return;
    }

    axios
      .get("http://localhost:8080/dishes", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        setDishes(response.data.data.dishes);
      })
      .catch((error) => {
        console.error("There was an error fetching the dishes!", error);
      });
  }, []);


  return (
    <div className="container">
      <h1 className="my-4">Food Ads</h1>
      <div className="row">
        {dishes.map((dish) => (
          <Dishes image={dish.image} name={dish.name} description={dish.description} price={dish.price} id={dish._id}/>
        ))}
      </div>
      <div className="text-center my-4">
        <Link to="/addDish" className="btn btn-primary">Add dish</Link>
      </div>
    </div>
  );
};

export default MainPage;
