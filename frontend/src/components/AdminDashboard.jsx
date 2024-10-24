import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import axios from "axios";

const AdminDashboard = () => {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8292/dashboard/loans"
        );
        console.log(response);
        setLoans(response.data);
      } catch (error) {}
    };
    fetchLoans();
  }, []);

  const handleLoanAction = async (loanId, action, reason) => {
    try {
      
      if (action == "accept") {
        reason = reason ? reason : "reason not provided"; 
        console.log(reason);
        const response = await axios.post(
          `http://localhost:7008/approval/approve/${loanId}?reason=${reason}`
        );
        console.log(response);
        const updatedLoans = loans.map((loan) => {
          if (loan.loanId === loanId) {
            return { ...loan, loanStatus: "Approved" };
          }
          return loan;
        })
        setLoans(updatedLoans);
      }
      if(action == "reject"){
        reason = reason ? reason : "reason not provided"; 
        console.log(reason);
        const response = await axios.post(
          `http://localhost:7008/approval/reject/${loanId}?reason=${reason}`
        );
        console.log(response);
        const updatedLoans = loans.map((loan) => {
          if (loan.loanId === loanId) {
            return { ...loan, loanStatus: "Loan Rejected." };
          }
          return loan;
        })
        setLoans(updatedLoans);
      }
    } catch (error) {}
    
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <div>
        {loans.length > 0 ? (
          loans.map((loan, index) => (
            <div key={index} className="loan-card">
              <h4>Customer Id: {loan.customerId}</h4>
              <p>KYC: {loan.kyc}</p>
              <p>Description: {loan.loandescription}</p>
              <p>Loan Reason: {loan.reason}</p>
              <p>Amount: ${loan.loanAmount}</p>
              <p>Status: {loan.loanStatus}</p>

              {loan.loanStatus === "Pending" && (
                <div>
                  <button id="name"
                    onClick={() =>
                      handleLoanAction(loan.loanId, "accept", loan.reason)
                    }
                  >
                    Accept
                  </button>
                  <button id="name"
                    onClick={() =>
                      handleLoanAction(loan.loanId, "reject", loan.reason)
                    }
                  >
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