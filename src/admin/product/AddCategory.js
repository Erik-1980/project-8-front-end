import { useState } from "react";
import DeleteCategory from "./DeleteCategory";
import CategoryList from "./CategoryList";
import { fetchWithAuth } from '../../general/RefreshToken';
import MessageBox from "./MessageBox";

export default function AddCategory() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [showModalMessage, setShowModalMessage] = useState(false);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");
  const handleAddCategory = async (event) => {
    event.preventDefault();
    if (!name) {
      alert("Please fill in all required fields");
      return;
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
        setShowModalMessage(true);
        setMessage(data.error)
      } else {
        setShowModalMessage(true);
        setMessage(data.message)
        setName("");
        setDescription("");
        setCategoryId("");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleCancelDelete = () => {
    setShowModalMessage(false);
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
      {showModalMessage &&
        <MessageBox
          message={message}
          onCancel={handleCancelDelete}
        />
      }
    </div>
  );
}
