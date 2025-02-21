import React, { useState } from "react";
import API from "../api";
import "../styles/Login.css"; // Import the CSS file

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    rePassword: "",
    secretQuestion: "",
    postalCode: "",
    city: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.rePassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      await API.post("/users/register", formData);
      alert("✅ Registration successful!");
    } catch (error) {
      console.error(
        "❌ Registration failed:",
        error.response?.data?.message || error.message
      );
    }
  };

  return (
    // <div className="register-container">
    //     <div className="register-box">
    //         <h2 className="register-title">SIGN UP</h2>
    //         <form onSubmit={handleSubmit}>
    //             <input type="text" name="username" placeholder="USERNAME" className="register-input" onChange={handleChange} required />
    //             <input type="email" name="email" placeholder="UNIVERSITY / COLLEGE EMAIL" className="register-input" onChange={handleChange} required />
    //             <input type="password" name="password" placeholder="PASSWORD" className="register-input" onChange={handleChange} required />
    //             <input type="password" name="rePassword" placeholder="RE-PASSWORD" className="register-input" onChange={handleChange} required />
    //             <input type="text" name="secretQuestion" placeholder="SECRET QUESTION" className="register-input" onChange={handleChange} required />
    //             <input type="text" name="postalCode" placeholder="POSTAL CODE" className="register-input" onChange={handleChange} required />
    //             <input type="text" name="city" placeholder="CITY" className="register-input" onChange={handleChange} required />
    //             <button type="submit" className="register-btn">CONFIRM</button>
    //         </form>
    //     </div>
    // </div>

    <div className="register-container">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form onSubmit={handleSubmit}>
        <h3>New Account ?</h3>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          id="username"
          onChange={handleChange}
          required
        />

        <label htmlFor="email">University / College Email</label>
        <input
          type="email"
          name="email"
          placeholder="University / College Email"
          id="email"
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
          required
        />

        <label htmlFor="rePassword">Re-Password</label>
        <input
          type="password"
          name="rePassword"
          placeholder="Re-Password"
          id="rePassword"
          onChange={handleChange}
          required
        />

        <label htmlFor="secretQuestion">Secret Question</label>
        <input
          type="text"
          name="secretQuestion"
          placeholder="Secret Question"
          id="secretQuestion"
          onChange={handleChange}
          required
        />

        <label htmlFor="postalCode">Postal Code</label>
        <input
          type="text"
          name="postalCode"
          placeholder="Postal Code"
          id="postalCode"
          onChange={handleChange}
          required
        />

        <label htmlFor="city">City</label>
        <input
          type="text"
          name="city"
          placeholder="City"
          id="city"
          onChange={handleChange}
          required
        />

        <button type="submit" className="register-btn">
          Confirm
        </button>
      </form>
    </div>
  );
};

export default Register;
