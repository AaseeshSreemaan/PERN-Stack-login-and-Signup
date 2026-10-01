import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
    } catch (err) {
      // ignore
    }
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          PERN Auth
        </Link>

        <div className="navbar-links">
          {user ? (
            <>
              <span className="navbar-welcome">
                Hi, {user.name || user.email}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="navbar-btn navbar-btn-logout"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">
                Login
              </Link>
              <Link to="/signup" className="navbar-btn">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;