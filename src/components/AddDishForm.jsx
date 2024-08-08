import React, { useState } from 'react';
import axios from "axios";

const AddDishForm = () => {
  const [dish, setDish] = useState({
    title: '',
    day: "",
    description: '',
    price: '',
    image: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setDish({
       ...dish,
        [e.target.name]: e.target.value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const token = localStorage.getItem("token");
      if(!token){
        throw new Error("User not authentificated");
      }
      const response = await axios.post("http://localhost:8080/dishes", dish, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    console.log('Dish added:', response.data);
    setDish({ name: '', description: '', price: '', image: '' });
  } catch(error){
    console.error(error);
    setError(error.response ? error.response.data.message : "Error adding dish")
  }}


  return (
    <div className="container w-100 mt-4 d-flex flex-column">
      <h2 className='align-self-center'>Add New Dish</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="formDishName" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="formDishName"
            placeholder="Enter dish name"
            name="title"
            value={dish.title}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="formDishDay" className="form-label">Week day</label>
          <input
            type="text"
            className="form-control"
            id="formDishDay"
            placeholder="Enter the day which you serve 1-7"
            name="day"
            value={dish.day}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="formDishDescription" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="formDishDescription"
            rows="3"
            placeholder="Enter dish description"
            name="description"
            value={dish.description}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="formDishPrice" className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            id="formDishPrice"
            placeholder="Enter dish price"
            name="price"
            value={dish.price}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="formDishImage" className="form-label">Image URL</label>
          <input
            type="text"
            className="form-control"
            id="formDishImage"
            placeholder="Enter image URL"
            name="image"
            value={dish.image}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">Add Dish</button>
      </form>
    </div>
  );
};

export default AddDishForm;