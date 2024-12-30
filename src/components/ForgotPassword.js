import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./cssFiles/ForgotPassword.css";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleChange = (e, setter) => {
    setter(e.target.value);
  };
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{11}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handlePasswordChange = async () => {
    try {
      // Check if all fields are filled
      if (!email || !phoneNumber || !newPassword || !confirmPassword) {
        alert("Please fill in all fields");
        return;
      }

      if (newPassword.length < 8 || newPassword.length > 16) {
        alert("Password must be between 8 and 16 characters");
        return;
      }
      // Perform client-side validations
      if (!isValidEmail(email)) {
        alert("Invalid email address", true);
        return;
      }

      if (!isValidPhoneNumber(phoneNumber)) {
        alert("Invalid phone number. It should contain 11 digits.", true);
        return;
      }

      if (newPassword !== confirmPassword) {
        alert("Password and confirm password do not match", true);
        return;
      }
      console.log(email, phoneNumber, newPassword);
      // Make API request
      const response = await axios.get(
        "http://localhost:5000/login/forgotPassword",
        {
          params: {
            email,
            phoneNumber,
            newPassword,
          },
        }
      );

      if (response.status === 200) {
        // Password change successful
        alert("Password changed successfully");
        navigate("/login");
      } else {
        // Handle error
        const errorData = await response.json();
        alert(`Password change failed: ${errorData.error}`, true);
      }
    } catch (error) {
      alert("An unexpected error occurred", true);
      console.error("An unexpected error occurred:", error);
    }
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="modal">
          <h2>Forgot Password?</h2>
          <p>You can reset your password here.</p>
          <div className="modal-container">
            <label>Registered Email</label>
            <input
              className="forgotPasswprd-inputs"
              type="email"
              value={email}
              onChange={(e) => handleChange(e, setEmail)}
            />
          </div>
          <div className="modal-container">
            <label>Registered Phone Number</label>
            <input
              className="forgotPasswprd-inputs"
              type="text"
              value={phoneNumber}
              onChange={(e) => handleChange(e, setPhoneNumber)}
            />
          </div>
          <div className="modal-container">
            <label>New Password (8-16 Alphanumeric)</label>
            <input
              className="forgotPasswprd-inputs"
              type="password"
              value={newPassword}
              onChange={(e) => handleChange(e, setNewPassword)}
            />
          </div>
          <div className="modal-container">
            <label>Confirm Password:</label>
            <input
              className="forgotPasswprd-inputs"
              type="password"
              value={confirmPassword}
              onChange={(e) => handleChange(e, setConfirmPassword)}
            />
          </div>
          <div className="forgotPassword-btn">
            <button onClick={handlePasswordChange}>CHANGE PASSWORD</button>
          </div>
          <Link to="/login" className="forgotPassword-cancel">
            Cancel
          </Link>
        </div>
      </div>
    </>
  );
};
export default ForgotPassword;
