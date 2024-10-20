import React, { useState } from 'react';
import "../style/Registrtion.css"
import axios from 'axios';
const Registration = () => {
  
  const [formData, setFormData] = useState({
    customerId: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    loanIds: '',
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    const formattedLoanIds = formData.loanIds.split(',').map(id => id.trim());
    const customerData = {
      ...formData,
      loanIds: formattedLoanIds,
    };
    const data = {
      id: customerData.customerId,
      firstName: customerData.firstName,
      lastName: customerData.lastName,
      email: customerData.email,
      password: customerData.password,
      loanIds: customerData.loanIds
    }
    const response = await axios.post(
      "http://localhost:7007/customer/register",
      data
    )
    console.log('Customer Data:', response); 
  };

  return (
    <div className="registration-form">
      <h2>Customer Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Customer ID:</label>
          <input
            type="number"
            name="customerId"
            value={formData.customerId}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="string"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="string"
            name="confirmPassword"
            value={formData.confmirmPassword}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label>Loan IDs (comma-separated):</label>
          <input
            type="text"
            name="loanIds"
            value={formData.loanIds}
            onChange={handleInputChange}
            placeholder="e.g. 101, 102, 103"
            required
          />
        </div>

        <button type="submit">sign up</button>
      </form>
    </div>
  );
};

export default Registration;