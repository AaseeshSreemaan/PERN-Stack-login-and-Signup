import React from "react";
import { Link } from "react-router-dom";
import "./Pages.css";

const Home = ({ user }) => {
  return (
    <div className="home-container">
      <h1 className="home-title">
        {user ? `Welcome back, ${user.name || user.email}!` : "Welcome to PERN Auth"}
      </h1>

      <p className="home-text">
        {user
          ? "You are logged in. Use the navbar to log out."
          : "A simple PERN authentication demo. Sign up or log in to get started."}
      </p>

      {!user && (
        <div className="home-card">
          <p className="home-text">
            Get started by creating an account, or login if you already have one.
          </p>
          <div style={{ marginTop: "16px", display: "flex", gap: "12px" }}>
            <Link to="/signup" className="form-btn" style={{ width: "auto", padding: "10px 20px" }}>
              Signup
            </Link>
            <Link to="/login" className="form-btn" style={{ width: "auto", padding: "10px 20px", backgroundColor: "#6b7280" }}>
              Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;