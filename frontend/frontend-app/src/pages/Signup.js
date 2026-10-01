import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Pages.css";

const Signup = ({ setUser }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    await axios.post("/api/auth/signup", form);
    // DON'T setUser here — the user is not logged in yet
    navigate("/login");
  } catch (err) {
    setError(err.response?.data?.message || "Registration failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="page-center">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2 className="form-title">Signup</h2>

        {error && <p className="form-error">{error}</p>}

        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="form-input"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-input"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-input"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="form-btn" disabled={loading}>
          {loading ? "Creating account..." : "Signup"}
        </button>

        <p className="form-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;