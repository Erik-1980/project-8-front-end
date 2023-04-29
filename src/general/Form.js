import { useState } from "react";
import MessageBox from "../admin/product/MessageBox";

const Form = () => {

  const [formAction, setFormAction] = useState("login");
  const [showModalMessage, setShowModalMessage] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");
    let url = formAction === "login" ? "http://localhost:5000/auth/login" : "http://localhost:5000/auth/register";
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (data.message){
        setShowModalMessage(true)
        setMessage(data.message)
      }
      if (formAction === "login" && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem('email', email);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleButtonClick = (action) => {
    setFormAction(action);
  };

  const handleCancel = () => {
    setShowModalMessage(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>{formAction === "login" ? "Login" : "Register"}</h2>
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" required />
        </label>
        <br />
        <button type="submit">{formAction === "login" ? "Login" : "Register"}</button>
      </form>
      <br />
      <button onClick={() => handleButtonClick("login")}>Login</button>
      <button onClick={() => handleButtonClick("register")}>Register</button>
      <br />
      {showModalMessage &&
        <MessageBox
          message={message}
          onCancel={handleCancel}
        />
      }
    </div>
  );
};

export default Form;
