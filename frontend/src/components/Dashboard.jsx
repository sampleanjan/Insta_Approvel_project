import React, { useState, useEffect } from "react";
import "../style/Dashboard.css";
import AdminDashboard from "./AdminDashboard";
import CustomerDashboard from "./CustomerDashboard";
import Nav from "./Nav";

function Dashboard() {
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const customername = localStorage.getItem("customername");
    if (customername == "admin") {
      console.log("inside admin");
      setUserType("admin");
    } else {
      setUserType("customer");
    }
  }, []);

  return (
    <div>
      <Nav />
      {userType == "admin" ? <AdminDashboard /> : <CustomerDashboard />}
    </div>
  );
}

export default Dashboard;