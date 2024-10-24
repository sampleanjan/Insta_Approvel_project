import React, { useState, useEffect } from "react";
import Nav from "./Nav";
const AdminDashboard = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await fetch("http://localhost:8292/dashboard/loans");
        console.log(response)
      } catch (error) {
        
      }
    }
    const savedLoans = JSON.parse(localStorage.getItem("loans")) || [];
    setLoans(savedLoans);
  }, []);
  
  const handleLoanAction = (index, action) => {
    const updatedLoans = [...loans];
    updatedLoans[index].status = action === "accept" ? "Accepted" : "Rejected";
    setLoans(updatedLoans);
    localStorage.setItem("loans", JSON.stringify(updatedLoans));
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <div>
        {loans.length > 0 ? (
          loans.map((loan, index) => (
            <div key={index} className="loan-card">
              <h4>User: {loan.username}</h4>
              <p>Loan Type: {loan.loanType}</p>
              <p>Amount: ${loan.loanAmount}</p>
              <p>Status: {loan.status}</p>
              {loan.status === "Pending" && (
                <div>
                  <button onClick={() => handleLoanAction(index, "accept")}>
                    Accept
                  </button>
                  <button onClick={() => handleLoanAction(index, "reject")}>
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No loans available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;