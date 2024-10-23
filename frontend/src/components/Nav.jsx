import React from "react";
import "../style/Nav.css";

const Nav = () => {
  const customername = localStorage.getItem("customername");
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>MyLogo</h1>
      </div>
      {customername ? (
        <div className="navbar-buttons">
          <button className="nav-button">
            <a href="">{customername}</a>
          </button>
          <button className="nav-button">
            <a href="/dashboard">Dashboard</a>{" "}
          </button>
          <button className="nav-button">
            <a href="/" onClick={() => localStorage.clear()}>
              logout
            </a>
          </button>
        </div>
      ) : (
        <div className="navbar-buttons">
          <button className="nav-button">
            <a href="/admin">Admin Login</a>
          </button>
          <button className="nav-button">
            <a href="/">Customer Login</a>{" "}
          </button>
          <button className="nav-button">
            <a href="/registration">Registration</a>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Nav;