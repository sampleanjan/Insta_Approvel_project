import React from 'react';
import '../style/Nav.css';

const Nav = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>MyLogo</h1>
      </div>
      <div className="navbar-buttons">
        <button className="nav-button"><a href="/admin">Admin SignIn</a></button>
        <button className="nav-button"><a href="/">Customer SignIn</a> </button>
        <button className="nav-button"><a href="/registration">Sign Up</a></button>
      </div>
    </nav>
  );
};

export default Nav;
