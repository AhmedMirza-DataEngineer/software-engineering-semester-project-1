import React, { useState, useEffect } from "react";
import "./cssFiles/ProfilePage.css";
import axios from "axios";

const ProfilePage = ({ userData, tableName }) => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [myName, setMyName] = useState("");
  const [inputs, setInputs] = useState({
    userId: "",
    fullName: "",
    email: "",
    cnic: "",
    phoneNumber: "",
    password: "",
    newPassword: "",
    cPassword: "",
  });

  useEffect(() => {
    const columnMapping = {
      Users: {
        userId: "userId",
        fullName: "userName",
        email: "userEmail",
        cnic: "userCNIC",
        phoneNumber: "userPhoneNo",
        password: "userPassword",
      },
      Contractors: {
        userId: "contractorId",
        fullName: "contractorName",
        email: "contractorEmail",
        cnic: "contractorCNIC",
        phoneNumber: "contractorPhoneNumber",
        password: "contractorPassword",
      },
      Administrator: {
        userId: "adminId",
        fullName: "adminName",
        email: "adminEmail",
        cnic: "adminCNIC",
        phoneNumber: "adminPhoneNo",
        password: "adminPassword",
      },
    };
    // Update the input values when userData changes
    if (userData && tableName && columnMapping[tableName]) {
      const mappedColumns = columnMapping[tableName];

      setInputs({
        userId: userData[mappedColumns.userId] || "",
        fullName: userData[mappedColumns.fullName] || "",
        email: userData[mappedColumns.email] || "",
        cnic: userData[mappedColumns.cnic] || "",
        phoneNumber: userData[mappedColumns.phoneNumber] || "",
        password: "",
        newPassword: "",
        cPassword: "",
      });
      setMyName(userData[mappedColumns.fullName] || "");
    }
  }, [userData, tableName]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };
  const toggleChangePassword = () => {
    console.log(showChangePassword);
    setShowChangePassword(!showChangePassword);
    console.log(showChangePassword);
  };

  const handleSave = async () => {
    let flagSave = true;
    if (!inputs) {
      console.error("Inputs is undefined.");
      flagSave = false;
      return;
    }
    // Check if the password change section is not visible

    // Check for fullName, cnic, phoneNumber
    const fullNameRegex = /^[A-Za-z\s]+$/;
    const cnicRegex = /^\d{13}$/;
    const phoneNumberRegex = /^\d{11}$/;

    if (
      !inputs.fullName ||
      inputs.fullName.trim() === "" ||
      !fullNameRegex.test(inputs.fullName)
    ) {
      alert("Please enter a valid full name.");
      flagSave = false;
      return;
    }

    if (!inputs.cnic || !cnicRegex.test(inputs.cnic)) {
      alert("Please enter a valid CNIC (13 digits).");
      flagSave = false;
      return;
    }

    if (!inputs.phoneNumber || !phoneNumberRegex.test(inputs.phoneNumber)) {
      alert("Please enter a valid phone number (11 digits).");
      flagSave = false;
      return;
    }
    if (!inputs.password || inputs.password.trim() === "") {
      alert("Please enter a password.");
      flagSave = false;
      return;
    }
    const passwordRegex = /^[a-zA-Z0-9]{8,16}$/;
    if (inputs.password.trim() !== "" && !passwordRegex.test(inputs.password)) {
      alert("Password must be between 8 to 16 alphanumeric characters.");
      flagSave = false;
      return;
    }
    if (showChangePassword) {
      if (!inputs.newPassword || inputs.newPassword.trim() === "") {
        alert("Please enter a new password.");
        flagSave = false;
        return;
      }
      if (!inputs.cPassword || inputs.cPassword.trim() === "") {
        alert("Please confirm the new password.");
        flagSave = false;
        return;
      }
      if (inputs.newPassword !== inputs.cPassword) {
        alert("New password and confirm password must match.");
        flagSave = false;
        return;
      }
      const newPasswordRegex = /^[a-zA-Z0-9]{8,16}$/;
      if (!newPasswordRegex.test(inputs.newPassword)) {
        alert("New password must be between 8 to 16 alphanumeric characters.");
        flagSave = false;
        return;
      }
    }

    if (flagSave) {
      try {
        const response = await axios.post(
          `http://localhost:5000/client/${tableName}/${inputs.userId}`,
          {
            fullName: inputs.fullName,
            cnic: inputs.cnic,
            phoneNumber: inputs.phoneNumber,
            password: inputs.password,
            newPassword: inputs.newPassword,
            showChangePassword: showChangePassword,
          }
        );

        const updatedName = response.data.data;
        myName && myName !== updatedName && setMyName(updatedName);
        alert(response.data.message);
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Incorrect Password");
      }
    }
  };

  const initials =
    myName &&
    myName
      .split(" ")
      .map((word) => word[0].toUpperCase())
      .join("");

  return (
    <>
      <div className="profilePage">
        <h4>My Profile</h4>
      </div>
      <div className="profilePage-form-container">
        <div className="profilePage-form-left">
          <div className="profilePage-form-left-forms">
            <div className="profilePage-form-row">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="profilePage-1x1"
                name="fullName"
                value={inputs.fullName}
                onChange={handleInputChange}
              />
            </div>
            <div className="profilePage-form-row">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="profilePage-1x2"
                name="email"
                value={inputs.email}
                onChange={handleInputChange}
                disabled
              />
            </div>
            <div className="profilePage-form-row">
              <label htmlFor="cnic">CNIC (13-digits without dashes)</label>
              <input
                type="text"
                id="profilePage-2x1"
                name="cnic"
                value={inputs.cnic}
                onChange={handleInputChange}
                disabled
              />
            </div>
            <div className="profilePage-form-row">
              <label htmlFor="phoneNummber">Phone Number</label>
              <input
                type="text"
                id="profilePage-2x2"
                name="phoneNumber"
                value={inputs.phoneNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="profilePage-form-row">
              <label htmlFor="password">Old Password</label>
              <input
                type="password"
                id="profilePage-3x1"
                name="password"
                value={inputs.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="profilePage-form-row">
              <div className="profilePage-form-row-button">
                <button
                  id={showChangePassword ? "addClass" : ""}
                  type="button"
                  onClick={toggleChangePassword}
                >
                  CHANGE PASSWORD?
                </button>
              </div>
            </div>
          </div>
          {showChangePassword && (
            <div className="profilePage-form-changepass">
              <div className="profilePage-form-row">
                <label htmlFor="newPassword">
                  New Password (8-16 Alphanumeric)
                </label>
                <input
                  type="password"
                  id="profilePage-newPassword"
                  name="newPassword"
                  value={inputs.newPassword}
                  onChange={handleInputChange}
                />
              </div>
              <div className="profilePage-form-row">
                <label htmlFor="cPassword">Confirm Password</label>
                <input
                  type="password"
                  id="profilePage-cPassword"
                  name="cPassword"
                  value={inputs.cPassword}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          )}
          <div className="profilePage-form-left-save">
            <button type="button" onClick={handleSave}>
              SAVE
            </button>
          </div>
        </div>
        <div className="profilePage-form-right">
          <div className="right-content-circle">
            <div className="right-content-circle-characters">{initials}</div>
          </div>
          <div>
            <p>{myName}</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProfilePage;
