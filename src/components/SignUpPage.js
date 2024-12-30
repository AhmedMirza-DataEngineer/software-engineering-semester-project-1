import React, { useState } from "react";
import "./cssFiles/SignUpPage.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUpPage = () => {
  const [activeButton, setActiveButton] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    cnic: "",
    phoneNumber: "",
    contractorSpecialties: "",
    password: "",
    confirmPassword: "",
  });

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  const handleSignupButton = async () => {
    // Validation checks
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.cnic ||
      !formData.phoneNumber ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (!activeButton && !formData.contractorSpecialties) {
      alert("Please fill in all fields.");
      return;
    }

    if (!/^[a-zA-Z ]+$/.test(formData.fullName)) {
      alert("Full Name must contain only alphabets and spaces.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!/^\d{13}$/.test(formData.cnic)) {
      alert("CNIC must be 13 digits.");
      return;
    }

    if (!/^\d{11}$/.test(formData.phoneNumber)) {
      alert("Phone Number must be 11 digits.");
      return;
    }

    // Additional validation for contractor specialties if needed

    if (formData.password.length < 8 || formData.password.length > 16) {
      alert("Password must be between 8 and 16 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    const isConfirmed = window.confirm(
      "Are you sure you want to send this request?"
    );
    if (isConfirmed) {
      try {
        const response = await axios.post("http://localhost:5000/signup", {
          fullName: formData.fullName,
          email: formData.email,
          cnic: formData.cnic,
          phoneNumber: formData.phoneNumber,
          contractorSpecialties: formData.contractorSpecialties,
          password: formData.password,
          tableName: activeButton ? "Users" : "Contractors",
        });
        alert(response.data.message);
        navigate("/login");
      } catch (error) {
        if (error.response) {
          alert(`Error during Signup: ${error.response.data.error}`);
        } else if (error.request) {
          alert("Error: No response received from the server");
        } else {
          alert(`Error: ${error.message}`);
        }
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="signup-page">
        <div className="signup-conatiner">
          <div className="signup-conatiner-left">
            <div className="signup-conatiner-left-inner">
              <h3>Welcome to SiteCraft Solution! 👋</h3>
              <p>Please create your account and start the adventure</p>
              <div className="conatiner-left-grid-1">
                <div>
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label>CNIC (without dashes)</label>
                  <input
                    type="text"
                    name="cnic"
                    value={formData.cnic}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label>Phone Number</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div
                className={
                  activeButton === false ? "signup-contractor" : "hidden"
                }
              >
                <label>
                  Specialities (Tiles expert, Paint contractor, Wooden work, or
                  etc)
                </label>
                <input
                  type="text"
                  name="contractorSpecialties"
                  value={formData.contractorSpecialties}
                  onChange={handleInputChange}
                />
              </div>
              <div className="conatiner-left-grid-2">
                <div>
                  <label type="password">Password (8-16 Alphanumeric)</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label type="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <button className="signup-page-btn" onClick={handleSignupButton}>
                SIGNUP
              </button>
            </div>
          </div>
          <div className="signup-conatiner-right">
            <h3>Choose your role:</h3>
            <div className="signup-right-buttons">
              <p>Are you a client looking for construction services?</p>
              <button
                onClick={() => handleButtonClick(true)}
                id={activeButton === true ? "active-btn" : ""}
              >
                CLIENT
              </button>
            </div>
            <h4>OR</h4>
            <div className="signup-right-buttons">
              <p>Are you a contractor offering your services?</p>
              <button
                id={activeButton === false ? "active-btn" : ""}
                onClick={() => handleButtonClick(false)}
              >
                CONTRACTOR
              </button>
            </div>
            <p>
              Already have an account?
              <br />
              <Link to="/login">
                <span className="login-link-style">Login!</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
