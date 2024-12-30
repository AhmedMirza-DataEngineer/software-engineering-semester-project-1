import React, { useState, useEffect } from "react";
import axios from "axios";
import "./cssFiles/SpecficUser.css";
import { useParams, useNavigate } from "react-router-dom";

const SpecficContractor = (id) => {
  const { contractorId } = useParams();
  const navigate = useNavigate();

  const [myName, setMyName] = useState("");
  const [values, setValues] = useState({
    id: "",
    fullName: "",
    email: "",
    cnic: "",
    specialties: "",
    phoneNumber: "",
    password: "",
  });
  // const [projects, setProjects] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/client/Administrator/${id.id}/allContractors/${contractorId}`
        );
        console.log(response.data);
        if (response.status === 200 && response.data.contractorData) {
          const userData = response.data.contractorData[0];
          console.log(userData);
          setValues(
            {
              id: userData.contractorId,
              fullName: userData.contractorName,
              email: userData.contractorEmail,
              cnic: userData.contractorCNIC,
              specialties: userData.contractorSpecialties,
              phoneNumber: userData.contractorPhoneNo,
              password: userData.contractorPassword,
            },

            setMyName(response.data.contractorData[0].contractorName)
            // setProjects(response.data.projectDetails)
          );
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [id, contractorId]);

  const validateForm = () => {
    let isValid = true;

    // Validation for fullName (Alphabets only)
    if (!/^[a-zA-Z\s]+$/.test(values.fullName)) {
      alert("Full Name must contain only alphabets");
      isValid = false;
      return;
    }

    // Validation for cnic (Digits and 13 digits length)
    if (!/^\d{13}$/.test(values.cnic)) {
      alert("CNIC must be 13 digits");
      isValid = false;
      return;
    }

    // Validation for phoneNumber (Digits and 11 digits length)
    if (!/^\d{11}$/.test(values.phoneNumber)) {
      alert("Phone Number must be 11 digits");
      isValid = false;
      return;
    }

    // Validation for password (Minimum 8 and maximum 16 characters)
    if (!/^.{8,16}$/.test(values.password)) {
      alert("Password must be 8 to 16 characters");
      isValid = false;
      return;
    }

    // Validation for email (Valid email format)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(values.email)) {
      alert("Invalid email format");
      isValid = false;
      return;
    }

    return isValid;
  };
  const handleSaveChanges = async () => {
    if (validateForm()) {
      const confirmSave = window.confirm("Do you want to save the changes?");

      if (confirmSave) {
        try {
          const response = await axios.post(
            `http://localhost:5000/client/Administrator/${id.id}/allContractors/${contractorId}`,
            {
              name: values.fullName,
              email: values.email,
              cnic: values.cnic,
              specialties: values.specialties,
              phoneNo: values.phoneNumber,
              password: values.password,
            }
          );

          if (response.status === 201) {
            alert("Contractor data updated successfully");
            // Add any additional logic here after successful update
          } else {
            alert("Failed to update user data");
          }
        } catch (error) {
          alert("Error updating user data");
          console.error("Error updating contractor data:", error);
        }
      } else {
        alert("Changes not saved.");
      }
    }
  };
  const handleDeleteUser = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Contractor?"
    );

    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/client/Administrator/${id.id}/allContractors/${contractorId}`
        );

        if (response.status === 201) {
          alert("User deleted successfully");
          navigate(`/client/Administrator/${id.id}/allContractors`);
        } else {
          alert("Failed to delete user");
        }
      } catch (error) {
        alert("Error deleting user");
        console.error("Error deleting user:", error);
      }
    } else {
      alert("Contractors not deleted.");
    }
  };

  return (
    <>
      <div className="profilePage">
        <h3>{myName}</h3>
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
                value={values.fullName}
                onChange={(e) =>
                  setValues({ ...values, fullName: e.target.value })
                }
              />
            </div>
            <div className="profilePage-form-row">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="profilePage-1x2"
                name="email"
                value={values.email}
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
              />
            </div>
            <div className="profilePage-form-row">
              <label htmlFor="cnic">CNIC (13-digits without dashes)</label>
              <input
                type="text"
                id="profilePage-2x1"
                name="cnic"
                value={values.cnic}
                onChange={(e) => setValues({ ...values, cnic: e.target.value })}
              />
            </div>
            <div className="profilePage-form-row">
              <label htmlFor="phoneNummber">Phone Number</label>
              <input
                type="text"
                id="profilePage-2x2"
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={(e) =>
                  setValues({ ...values, phoneNumber: e.target.value })
                }
              />
            </div>
            <div className="profilePage-form-row">
              <label htmlFor="password">Password</label>
              <input
                type="text"
                id="profilePage-3x1"
                name="password"
                value={values.password}
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
              />
            </div>
            <div className="profilePage-form-row">
              <div className="profilePage-form-row-button">
                <button type="button" onClick={handleDeleteUser}>
                  DELETE USER
                </button>
              </div>
            </div>
          </div>
          <div className="profilePage-form-row">
            <label htmlFor="specialties">Specialties</label>
            <input
              type="text"
              id="profilePage-3x1"
              name="specialties"
              value={values.specialties}
              onChange={(e) =>
                setValues({ ...values, specialties: e.target.value })
              }
            />
          </div>
          <div className="profilePage-form-left-save">
            <button type="button" onClick={handleSaveChanges}>
              SAVE CHANGES
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpecficContractor;
