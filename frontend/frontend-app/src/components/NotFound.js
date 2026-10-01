import React from "react";
import { Link } from "react-router-dom";
import "../pages/Pages.css";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <h1 className="notfound-code">404</h1>
      <p className="notfound-text">Page not found</p>
      <Link to="/" className="notfound-link">
        Go back home
      </Link>
    </div>
  );
};

export default NotFound;