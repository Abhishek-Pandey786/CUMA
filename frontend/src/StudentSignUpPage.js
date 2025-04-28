import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";
import "./StudentSignUpPage.css";

function StudentSignUpPage() {
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { fullName, email, password } = formData;
    if (!fullName) return "Full Name is required!";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid Email Address!";
    if (!password || password.length < 6) return "Password must be at least 6 characters!";
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
    } else {
      setError("");
      setSuccess(true);
    }
  };

  return (
    <motion.div
      className="student-signup-page"
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="signup-container">
        <h1>Student Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>

        {error && (
          <motion.div
            className="error-modal"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p>{error}</p>
          </motion.div>
        )}

        {success && (
          <motion.div
            className="success-modal"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2>Success!</h2>
            <p>You have successfully signed up as a student.</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default StudentSignUpPage;
