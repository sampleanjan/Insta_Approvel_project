import React, { useState } from 'react';
import "../style/CustomerLogin.css"; 
import axios from 'axios';
const CustomerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async(e) => {
    e.preventDefault(); 
    const data = {
      email: email,
      password: password
    }
    const response = await axios.post(
      "http://localhost:8001/customer/login",
      data
    )
    console.log('Logging in with', email, password);  
    console.log('Logging in with', response);  
  };

  return (
    <div className="login-container">
      <h2>Customer Sign IN</h2>
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

        <button type="submit">sign in</button>
      </form>
    </div>
  );
};

export default CustomerLogin;
