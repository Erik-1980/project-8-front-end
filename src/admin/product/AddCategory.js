import React, { useState } from "react";
import DeleteCategory from "./DeleteCategory";
import CategoryList from "./CategoryList";
import { fetchWithAuth } from '../../RefreshToken'

export default function AddCategory() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const token = localStorage.getItem("token");
  const handleAddCategory = async (event) => {
    event.preventDefault();
    if (!name) {
      alert("Please fill in all required fields");
      return false;
    }
    const url = `http://localhost:5000/product/category`;
    try {
      const response = await fetchWithAuth(url, {
        method: "POST",
        body: JSON.stringify({ name, description }),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        }
      });
      const data = await response.json();
      if (data.error) {
        alert(data.error);
      } else {
        alert(data.message);
        setName("");
        setDescription("");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="get-user">
      <form onSubmit={handleAddCategory}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        ></textarea>

        <button type="submit" disabled={!token}>
          ADD CATEGORY
        </button>
      </form>
      <br />
      <CategoryList onSelectCategory={setCategoryId} />
      <DeleteCategory categoryId={categoryId}/> 
    </div>
  );
}
