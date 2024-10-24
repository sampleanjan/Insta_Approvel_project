import React, { useEffect, useState } from "react";
import axios, { toFormData } from "axios";
import "../style/CustomerDashboard.css"; 
const CustomerDashboard = () => {
  const [loans, setLoans] = useState([]);
  const [loanDetails, setLoanDetails] = useState({
    loanAmount: "",
    loandescription: "",
    reason: "",
  });

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8292/dashboard/loans/" +
            localStorage.getItem("customerId")
        );
        console.log(response);
        setLoans(response.data);
        console.log(loans);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLoans();
  }, []);
  const registLoan = async (data, requestType) => {
    try {
      if (requestType === "post") {
      }
      if (requestType === "put") {
        return response;
      }
    } catch (error) {
      return error;
    }
  };

  const applyForLoan = async (e) => {
    e.preventDefault();
    const username = localStorage.getItem("username") || "default_user";
    try {
      const data = {
        loanAmount: loanDetails.loanAmount,
        loandescription: loanDetails.loandescription,
        loanStatus: "Pending",
        reason: loanDetails.reason,
        customerId: localStorage.getItem("customerId"),
      };
      const response = await axios.post(
        "http://localhost:8292/dashboard/apply",
        data
      );
      console.log(response);

      const newLoan = { ...data, status: "Pending" };
      setLoans([...loans, newLoan]);
    } catch (error) {
      console.log(error);
    }

    setLoanDetails({ loanAmount: "", loandescription: "", reason: "" });
  };
  const handleKYCSubmit = async (e, loanId) => {
    e.preventDefault();
    console.log(e.target[0].value);
    console.log(loanId)
    try {
      const data = {
        loanId: loanId,
        customerId: localStorage.getItem("customerId"),
        idProof: e.target[0].value,
        addressProof: e.target[1].value,
      };
      const response = await axios.post(
        "http://localhost:7008/kyc/addOrUpdate",
        data
      );
      if (response.status === 200) {
        const findLoan = loans.filter((loan) => loan.loanId === loanId);
        findLoan[0].kyc = "Completed";
        const response = await axios.put(
          "http://localhost:8292/dashboard/loans/update/" + loanId,
          findLoan[0]
        );
        if (response) {
          const updatedLoans = loans.map((loan) =>
            loan.loanId === loanId ? { ...loan, kyc: "Completed" } : loan
          );
          setLoans(updatedLoans);
        }
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Customer Dashboard</h2>
      
      <form className="loan-form" onSubmit={applyForLoan}>
        <label>
          Loan Amount:
          <input
            type="number"
            value={loanDetails.loanAmount}
            onChange={(e) =>
              setLoanDetails({ ...loanDetails, loanAmount: e.target.value })
            }
            required
            className="form-input"
          />
        </label>
        <label>
          Loan Description:
          <input
            type="text"
            value={loanDetails.loandescription}
            onChange={(e) =>
              setLoanDetails({
                ...loanDetails,
                loandescription: e.target.value,
              })
            }
            required
            className="form-input"
          />
        </label>
        <label>
          Reason:
          <input
            type="text"
            value={loanDetails.reason}
            onChange={(e) =>
              setLoanDetails({ ...loanDetails, reason: e.target.value })
            }
            required
            className="form-input"
          />
        </label>
        <button id="name" type="submit" className="submit-button">
          Apply for Loan
        </button>
      </form>

      <h3 className="loans-title">Your Loans</h3>
      <div className="loan-list">
        {loans
          .filter((loan) => loan.customerId == localStorage.getItem("customerId"))
          .map((loan, index) => (
            <div key={index} className="loan-card">
              <h4 className="loan-card-title">Loan Description: {loan.loandescription}</h4>
              <p className="loan-card-detail">Amount: ${loan.loanAmount}</p>
              <p className="loan-card-detail">Status: {loan.loanStatus}</p>
              {loan.kyc === "Pending" ? (
                <div>
                  <h5>KYC Pending - Complete Your Verification</h5>
                  <form onSubmit={(e) => handleKYCSubmit(e, loan.loanId)}>
                    <div>
                      <label htmlFor="idProof">ID Proof Card Number:</label>
                      <input
                        type="text"
                        id="idProof"
                        name="idProof"
                        placeholder="Enter ID Proof Card Number"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="addressProof">
                        Address Proof Card Number:
                      </label>
                      <input
                        type="text"
                        id="addressProof"
                        name="addressProof"
                        placeholder="Enter Address Proof Card Number"
                        required
                      />
                    </div>
                    <button type="submit">Submit KYC</button>
                  </form>
                </div>
              ) : (
                <p>Kyc: {loan.kyc}</p>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};  

export default CustomerDashboard;
