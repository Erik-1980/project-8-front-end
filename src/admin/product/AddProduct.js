import React, { useState } from "react";
import CategoryList from "./CategoryList";
import { fetchWithAuth } from '../../RefreshToken';

export default function AddProducts() {
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const token = localStorage.getItem("token");

  const handleAddProducts = async (event) => {
    event.preventDefault();
    if (!name || !model || !price || !quantity || !image) {
      alert("Please fill in all fields");
      return;
    }
    if(!categoryId){
      alert("Please select a category");
      return
    }
    const url = `http://localhost:5000/product`;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('model', model);
    formData.append('price', price);
    formData.append('quantity', quantity);
    formData.append('image', image);
    formData.append('description', description);
    formData.append('categoryId', categoryId);

    try {
      const response = await fetchWithAuth(url, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: token,
        },
      });
      
      const data = await response.json();
      if (data.error) {
        alert(data.error);
      } else {
        alert(data.message);
        setName("");
        setModel("");
        setPrice("");
        setQuantity("");
        setImage(null);
        setDescription("");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  return (
    <div className="get-user">
      <label htmlFor="category">Category:</label>
         <CategoryList onSelectCategory={setCategoryId} />
      <form onSubmit={handleAddProducts}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <label htmlFor="model">Model:</label>
        <input
          type="text"
          id="model"
          value={model}
          onChange={(event) => setModel(event.target.value)}
        />

        <label htmlFor="price">Price:</label>
        <input
          type="text"
          id="price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />

        <label htmlFor="quantity">Quantity:</label>
        <input
          type="text"
          id="quantity"
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
        />

        <label htmlFor="image">Image:</label>
        <input
          type="file"
          id="image"
          onChange={handleImageChange}
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}>
        </textarea>

        <button type="submit" disabled={!token}>
          Add Product
        </button>
      </form>
    </div>
  );
}
