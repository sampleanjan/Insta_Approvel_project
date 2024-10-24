import React, { useState } from "react";
import "../style/AdminLogin.css";
import axios from "axios";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";
const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    };
    console.log(data)
    const response = await axios.post(
      "http://localhost:7007/admin/login",
      data
    );
    console.log(response);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("customername", username);
    console.log("Logging in with", username, password, response);
    navigate("/dashboard");
  };

  return (
    <>
      <Nav />
      <div className="login-container">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="string"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your Username"
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

export default AdminLogin;