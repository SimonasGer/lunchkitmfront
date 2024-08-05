// src/components/MainPage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const MainPage = () => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    // Fetch dishes from the server
    axios
      .get("/api/dishes")
      .then((response) => {
        setDishes(response.data);
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
          <div className="col-lg-4 col-md-6 mb-4" key={dish._id}>
            <div className="card h-100">
              <img className="card-img-top" src={dish.image} alt={dish.name} />
              <div className="card-body">
                <h4 className="card-title">{dish.name}</h4>
                <p className="card-text">{dish.description}</p>
              </div>
              <div className="card-footer">
                <small className="text-muted">Price: ${dish.price}</small>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center my-4">
        <Link to="/addDish" className="btn btn-primary">
          Add Meal
        </Link>
      </div>
    </div>
  );
};

export default MainPage;
