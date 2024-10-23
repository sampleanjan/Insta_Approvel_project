import React, { useState } from "react";
import "../style/CustomerLogin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
const CustomerLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    const response = await axios.post(
      "http://localhost:7007/customer/login",
      data
    );
    console.log("Logging in with", email, password);
    console.log("Logging in with", response);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("customerId", response.data.user.id);
    localStorage.setItem("customername", response.data.user.firstName);
    navigate("/dashboard");
  };

  return (
    <>
      <Nav />
      <div className="login-container">
        <h2>Customer Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <button id="name" type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default CustomerLogin;