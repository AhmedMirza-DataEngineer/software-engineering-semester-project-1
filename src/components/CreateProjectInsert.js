import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./cssFiles/RequestProject.css";

const CreateProjectInsert = (id) => {
  const { requestId } = useParams();

  const [requestData, setRequestData] = useState({
    userId: "",
    projectTitle: "",
    floors: 1,
    area: 3,
    cost: "1 Million",
    type: "",
    additionalInfo: "",
  });

  useEffect(() => {
    const fetchProjectRequestData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/client/Administrator/${id.id}/createProject/${requestId}`
        );

        const projectRequestData = response.data.data[0];

        // Update the state with the fetched data
        setRequestData({
          userId: projectRequestData.userId || "",
          projectTitle: projectRequestData.projectTitle || "",
          floors: projectRequestData.projectFloors || 1,
          area: projectRequestData.projectArea || 3,
          type: projectRequestData.projectType || "",
          additionalInfo: projectRequestData.projectInformation || "",
          cost: projectRequestData.projectCost || "",
        });
      } catch (error) {
        console.error("Error fetching project request data:", error);
      }
    };
    // Call the fetch function
    fetchProjectRequestData();
  }, [id, requestId]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRequestData({
      ...requestData,
      [name]: value,
    });
  };

  const handleSendRequest = async () => {
    // Check if any input is non-empty
    const isEmptyField = Object.values(requestData).some(
      (value) => value === ""
    );
    if (isEmptyField) {
      // Show alert for empty fields
      alert("Please fill all fields.");
      return; // Do not proceed if any field is empty
    }
    const userConfirmed = window.confirm(
      "Are you sure you want to send the request?"
    );

    if (userConfirmed) {
      try {
        console.log(requestData);
        // Add logic to send the updated requestData to your server
        const response = await axios.post(
          `http://localhost:5000/client/Administrator/${id.id}/createProject/${requestId}`,
          requestData
        );

        if (response.status === 200) {
          // Show success alert
          alert("Project created successfully!");
          // Handle other success actions if needed
        } else {
          // Handle other status codes if needed
          console.error("Unexpected status code:", response.status);
        }
      } catch (error) {
        console.error("Error sending project request:", error);
        alert("An error occurred. Please try again later.");
      }
    } else {
      // Handle case when user cancels the confirmation
      console.log("Request not sent.");
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
                type="text"
                value={requestData.projectTitle}
                onChange={handleInputChange}
              ></input>
            </div>
            <div className="request-project-inputs">
              <label>Floors</label>
              <input
                value={requestData.floors}
                onChange={handleInputChange}
                type="number"
                min="1"
                max="7"
                name="floors"
              ></input>
            </div>
            <div className="request-project-inputs">
              <label>Area (Marla)</label>
              <input
                type="number"
                min="3"
                name="area"
                value={requestData.area}
                onChange={handleInputChange}
              ></input>
            </div>

            <div className="request-project-inputs">
              <label>Cost</label>
              <input
                name="cost"
                type="text"
                value={requestData.cost}
                onChange={handleInputChange}
              ></input>
            </div>
            <div className="request-project-inputs">
              <label>Type</label>
              <input
                name="type"
                type="text"
                value={requestData.type}
                onChange={handleInputChange}
              ></input>
            </div>

            <div className="request-project-inputs">
              <label>Additional Information</label>
              <input
                type="text"
                name="additionalInfo"
                value={requestData.additionalInfo}
                onChange={handleInputChange}
              ></input>
            </div>
          </div>
        </div>
        <div className="request-project-button cerateprojectbutton">
          <button onClick={handleSendRequest}>SEND REQUEST</button>
        </div>
      </div>
    </>
  );
};

export default CreateProjectInsert;
