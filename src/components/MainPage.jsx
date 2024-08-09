// src/components/MainPage.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Dishes from "./Dishes";

const MainPage = () => {
  const [dishes, setDishes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [day, setDay] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("token");

    const getDishes = () => {
        axios.get(`http://localhost:8080/dishes?${search}${day}`, {
            headers: {
                Authorization: `Bearer ${token}`
          }
        })
        .then((res) => {
            setDishes(res.data.data.dishes)
            setLoading(false)
        })
        .catch((err) => {
            console.error(err)
            setLoading(false)
        })
  }

  if (loading)(
    getDishes()
  )

  }, [loading]);

  const handleSearch = (e) => {
    e.preventDefault()
    const search = e.target.search.value
    const day = e.target.day.value
    
    if (search.length > 0){
        setSearch(`title=${search}`)
    } else {
        setSearch("")
    }
    if (day.length > 0){
      setDay(`day=${day}`)
  } else {
      setDay("")
  }
    setLoading(true)
  }


  return (
    <>
    <form onSubmit={handleSearch}>
            <input type="text" name="search" id="search" placeholder="dish title"/>
            <label htmlFor="day">Choose a day dish is served</label>
            <select name="day" id="day">  
                <option value="">Any day</option>   
                <option value="1">Monday</option>
                <option value="2">Tuesday</option>
                <option value="3">Wednesday</option>
                <option value="4">Thursday</option>
                <option value="5">Friday</option>
                <option value="6">Saturday</option>
                <option value="7">Sunday</option>
            </select>
            <button type="submit">Search</button>
    </form>
    <div className="container">
      <h1 className="my-4">Food Ads</h1>
      <div className="row">
        {dishes.map((dish) => (
          <Dishes image={dish.image} name={dish.title} description={dish.description} price={dish.price} id={dish._id}/>
        ))}
      </div>
      <div className="text-center my-4">
        <Link to="/addDish" className="btn btn-primary">Add dish</Link>
      </div>
    </div>
    </>
  );
};

export default MainPage;
