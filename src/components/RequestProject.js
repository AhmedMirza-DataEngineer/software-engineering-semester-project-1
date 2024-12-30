import React, { useState } from "react";
import "./cssFiles/RequestProject.css";
import axios from "axios";

const RequestProject = (id) => {
  const userId = id.id;

  const [constructionSelected, setConstructionSelected] = useState(false);
  const [commercialSelected, setCommercialSelected] = useState(true);
  const [residentialSelected, setResidentialSelected] = useState(false);
  const [formData, setFormData] = useState({
    projectTitle: "",
    floors: "",
    area: "",
    location: "",
    additionalInfo: "",
  });

  const handleConstructionClick = () => {
    setConstructionSelected(true);
    setCommercialSelected(false); // Reset other selections
    setResidentialSelected(false);
  };

  const handleCommercialClick = () => {
    setCommercialSelected(true);
    setResidentialSelected(false);
  };

  const handleResidentialClick = () => {
    setResidentialSelected(true);
    setCommercialSelected(false);
  };

  const handleRenovationClick = () => {
    setConstructionSelected(false);
    setCommercialSelected(false);
    setResidentialSelected(false);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSendRequest = async () => {
    // Check each input separately
    if (!formData.projectTitle) {
      alert("Project Title field is empty");
    } else if (!formData.floors) {
      alert("Floors field is empty");
    } else if (!formData.area) {
      alert("Area field is empty");
    } else if (!formData.location) {
      alert("Location field is empty");
    } else if (!formData.additionalInfo) {
      alert("Additional Information field is empty");
    } else {
      // All fields are filled, perform your submit action
    }
    let projectTypeSend;
    if (constructionSelected) {
      if (commercialSelected) {
        projectTypeSend = true;
      } else if (residentialSelected) {
        projectTypeSend = false;
      } else {
        return alert("Select Contruction type");
      }
    }
    const projectInformation = `${formData.additionalInfo} ^ ${formData.location}`;
    const obj = {
      projectTitle: formData.projectTitle,
      projectFloors: formData.floors,
      projectArea: formData.area,
      projectInformation: projectInformation,
      projectType: projectTypeSend ? "Commercial" : "Residential",
    };
    const isConfirmed = window.confirm(
      "Are you sure you want to send this request?"
    );
    if (isConfirmed) {
      try {
        const response = await axios.post(
          `http://localhost:5000/client/Users/${userId}/requestProject`,
          {
            obj,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 201) {
          alert("Request Sent Successfully");
        } else {
          alert(`Error: ${response.data.error}`);
        }
      } catch (error) {
        console.error("Error sending request:", error);
        alert("Error sending request. Please try again later.");
      }
    }
  };

  return (
    <>
      <div className="request-project">
        <h4>Project Request</h4>
        <div className="request-project-inner-flex">
          <div className="request-project-left">
            <div className="request-project-inputs">
              <label>Project Title</label>
              <input
                name="projectTitle"
                value={formData.projectTitle}
                onChange={handleInputChange}
                type="text"
              ></input>
            </div>
            <div className="request-project-inputs">
              <label>Floors</label>
              <input
                type="number"
                min="1"
                max="7"
                name="floors"
                value={formData.floors}
                onChange={handleInputChange}
              ></input>
            </div>
            <div className="request-project-inputs">
              <label>Area (Marla)</label>
              <input
                type="number"
                min="3"
                name="area"
                value={formData.area}
                onChange={handleInputChange}
              ></input>
            </div>
            <div className="request-project-inputs">
              <label>Location</label>
              <input
                name="location"
                type="text"
                value={formData.location}
                onChange={handleInputChange}
              ></input>
            </div>
            <div className="request-project-inputs">
              <label>Additional Information</label>
              <input
                type="text"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleInputChange}
              ></input>
            </div>
          </div>
          <div className="request-project-right">
            <p>Choose new construction or renovations</p>
            <div className="request-project-right-all-btns">
              <div className="request-project-right-con-rev-btns">
                <button
                  id={constructionSelected ? "activ-btns" : ""}
                  onClick={handleConstructionClick}
                >
                  CONSTRUCTION
                </button>
                {constructionSelected && (
                  <>
                    <p>
                      Choose Commercial
                      <br />
                      Building OR
                      <br />
                      Residential House
                    </p>
                    <div>
                      <button
                        id={commercialSelected ? "activ-btns" : ""}
                        onClick={handleCommercialClick}
                      >
                        COMMERCIAL
                      </button>
                    </div>
                    <p>OR</p>
                    <div>
                      <button
                        id={residentialSelected ? "activ-btns" : ""}
                        onClick={handleResidentialClick}
                      >
                        RESIDENTIAL
                      </button>
                    </div>
                  </>
                )}
              </div>
              <p>OR</p>
              <div>
                <button
                  id={!constructionSelected ? "activ-btns" : ""}
                  className="renovation-button"
                  onClick={handleRenovationClick}
                >
                  RENOVATION
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="request-project-button">
          <button onClick={handleSendRequest}>SEND REQUEST</button>
        </div>
      </div>
    </>
  );
};
export default RequestProject;
