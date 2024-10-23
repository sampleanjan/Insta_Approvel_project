import React, { useEffect, useState } from "react";
import axios from "axios";

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
        setLoans(response.data); 
        console.log(loans)
      } catch (error) {
        console.log(error);
      }
    };
    fetchLoans();
  }, []);

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

  return (
    <div>
      <h2>Customer Dashboard</h2>

      <form onSubmit={applyForLoan}>
        <label>
          Loan Amount:
          <input
            type="number"
            value={loanDetails.loanAmount}
            onChange={(e) =>
              setLoanDetails({ ...loanDetails, loanAmount: e.target.value })
            }
            required
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
            style={{ marginRight: "50px" }}
            required
          />
        </label>
        <button id="name" type="submit">Apply for Loan</button>
      </form>

      <h3>Your Loans</h3>
      <div>
        {loans
          .filter((loan) => loan.customerId == localStorage.getItem("customerId"))
          .map((loan, index) => (
            <div key={index} className="loan-card">
              <h4>Loan Description: {loan.loandescription}</h4>
              <p>Amount: ${loan.loanAmount}</p>
              <p>Status: {loan.loanStatus}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CustomerDashboard;