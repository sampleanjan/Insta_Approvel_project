import React, { useState, useEffect } from "react";
import "../style/Dashboard.css";
import AdminDashboard from "./AdminDashboard";
import CustomerDashboard from "./CustomerDashboard";
import axios from "axios";
import Nav from "./Nav";

const initialLoans = [
  {
    username: "john_doe",
    loanAmount: 5000,
    loanType: "Personal",
    status: "Pending",
  },
  {
    username: "jane_doe",
    loanAmount: 12000,
    loanType: "Car",
    status: "Pending",
  },
];

function Dashboard() {
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const customername = localStorage.getItem("customername");
    if (customername === "admin") {
      setUserType("admin");
    } else {
      setUserType("customer");
    }
  }, []);

  return (
    <div>
      <Nav />
      {userType === "admin" ? <AdminDashboard /> : <CustomerDashboard />}
    </div>
  );
}

export default Dashboard;