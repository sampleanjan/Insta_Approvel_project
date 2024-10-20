import React, { useState } from 'react';
import "../style/AdminLogin.css"; 
import axios from 'axios';
const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async(e) => {
    e.preventDefault(); 
    const data = {
      username: username,
      password: password
    }
    const response = await axios.post(
      "http://localhost:7007/admin/login",
      data
    )
    console.log('Logging in with', username, password, response);  
  };

  return (
    <div className="login-container">
      <h2>Admin Sign IN</h2>
      <form onSubmit={handleLogin}>
        
        <div className="form-group">
          <label htmlFor="username">Email</label>
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

        <button type="submit">sign in</button>
      </form>
    </div>
  );
};

export default AdminLogin;
