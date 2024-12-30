import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import "./cssFiles/LoginPage.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // Function to validate the form inputs
  const validateForm = () => {
    let errors = {};
    let isValid = true;

    // Email validation
    if (!email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(email)) {
      errors.email = "Invalid email address";
      isValid = false;
    }

    // Password validation
    if (!password.trim()) {
      errors.password = "Password is required";
      isValid = false;
    } else if (password.length < 8 || password.length > 16) {
      errors.password = "Password must be between 8 and 16 characters";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const validateEmail = (email) => {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Simulating a login request
      try {
        // Simulating API call for login
        const response = await axios.post("http://localhost:5000/login", {
          email,
          password,
        });

        // const data = response.data;

        if (response.data) {
          if (response.data.message) {
            setShowMessage(true);
            setMessage(response.data.message);
            const { tableName, userId, contractorId, adminId } =
              response.data.user;

            setTimeout(() => {
              setShowMessage(false);
              setMessage("");
              if (tableName === "Users") {
                navigate(`/client/${tableName}/${userId}`);
              } else if (
                tableName === "Contractors" &&
                response.data.user.contractorVerifed === 0
              ) {
                navigate(`/client/${tableName}/${contractorId}`);
                localStorage.setItem(
                  "isContractorUnverified",
                  JSON.stringify(true)
                );
              } else if (tableName === "Contractors") {
                navigate(`/client/${tableName}/${contractorId}`);
              } else if (tableName === "Administrator") {
                navigate(`/client/${tableName}/${adminId}`);
              }
            }, 1500);
          } else if (response.data.error) {
            setShowMessage(true);
            setMessage(response.data.error);

            setTimeout(() => {
              setShowMessage(false);
              setMessage("");
            }, 5000);
          }
        } else {
          console.error("Unexpected response format:", response);
          setShowMessage(true);
          setMessage("An error occurred");
        }
      } catch (error) {
        console.error("Error:", error);
        setShowMessage(true);
        setMessage("Incorrect Email and Password");
      }
    }
  };
  useEffect(() => {
    if (showMessage && message) {
      const timeoutId = setTimeout(() => {
        setShowMessage(false);
        setMessage("");
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [showMessage, message]);

  return (
    <div>
      <div className="login-page" id="hero">
        <div className="login-left-section">
          <h1>Login</h1>
          <div className="login-left-p-link">
            <p>Don't have an account?</p>
            <Link className="login-link-style" to="/signup">
              Create your account
            </Link>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="login-textareas">
              <label htmlFor="login-email">Email</label>
              <input
                type="email"
                id="login-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />{" "}
              {errors.email && (
                <div className="error-message">{errors.email}</div>
              )}
            </div>
            <div className="login-textareas">
              <label htmlFor="login-password">Password</label>
              <div className="password-icon-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="login-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {showPassword ? (
                  <FaEyeSlash
                    className="eye-icon"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <FaEye
                    className="eye-icon"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>{" "}
              {errors.password && (
                <div className="error-message">{errors.password}</div>
              )}
            </div>
            <div className="login-forgetPassword-container">
              <Link className="login-forgetPassword" to="/login/forgotPassword">
                Forgot Password?
              </Link>
            </div>
            <button className="loginPage-btn" type="submit">
              LOGIN
            </button>
          </form>
        </div>
        <div className="login-right-section">
          <div className="login-right-inner">
            <h1>
              Welcome
              <br />
              Back.
            </h1>
            <p>
              We're thrilled to see you again. Your journey
              <br /> continues here. Enter your credentials
              <br /> and let the adventure unfold!
            </p>
          </div>
        </div>
      </div>{" "}
      {showMessage && (
        <div className="top-message">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};
export default LoginPage;
