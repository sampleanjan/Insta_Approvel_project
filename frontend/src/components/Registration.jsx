import React, { useState } from "react";
import "../style/Registrtion.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav from "./Nav";
const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerId: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    loanIds: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.password !== formData.confirmPassword ||     
      formData.password.length < 8 ||                       
      !/[!@ $ &]/.test(formData.password) ||   
      !/[0-9]/.test(formData.password)                       
    ) {
      alert(
        "Password must be at least 8 characters long, contain at least one number, one special character, and passwords must match. Please try again."
      );
    }
    
    const formattedLoanIds = formData.loanIds.split(",").map((id) => id.trim());
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
      loanIds: customerData.loanIds,
    };
    const response = await axios.post(
      "http://localhost:7007/customer/register",
      data
    );
    console.log("Customer Data:", response);
    navigate("/");
  };

  return (
    <>
      <Nav />
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
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
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
              
            />
          </div>

          <button id="name" type="submit">Registration</button>
        </form>
      </div>
    </>
  );
};

export default Registration;