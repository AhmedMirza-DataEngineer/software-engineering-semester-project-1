import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UploadProgress = () => {
  const { id, projectId } = useParams();
  const [formData, setFormData] = useState({
    progressInfo: "",
    progress: 0,
    status: "Working",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const validateFormData = () => {
    const { progress, progressInfo } = formData;

    // Check if progress is a positive number between 0 and 100
    if (isNaN(progress) || progress < 0 || progress > 100) {
      alert("Progress must be a positive number between 0 and 100");
      return false;
    }

    // Check if progressInfo is not empty
    if (!progressInfo.trim()) {
      alert("Progress Info cannot be empty");
      return false;
    }

    return true;
  };

  const handleUploadButtonClick = async () => {
    if (!validateFormData()) {
      return;
    }
    const { progressInfo, progress, status } = formData;

    try {
      const response = await axios.post(
        `http://localhost:5000/client/Contractors/${id}/contractorProjects/${projectId}`,
        {
          progressInfo,
          progressPer: progress,
          progressStatus: status,
        }
      );

      if (response.status === 200) {
        alert("Progress Uploaded successful");
        setFormData({
          progressInfo: "",
          progress: 0,
          status: "Working",
        });
      }
    } catch (error) {
      console.error("Error uploading progress:", error);
      // Handle error as needed
    }
  };
  return (
    <>
      <div className="request-project">
        <h4>Project Request</h4>
        <div className="request-project-inner-flex">
          <div className="request-project-left">
            <div
              className="request-project-inputs"
              id="specfic-projects-select"
            >
              <label>Status</label>
              <select
                name="status"
                onChange={handleInputChange}
                value={formData.status}
              >
                <option value="Working">Working</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="request-project-inputs">
              <label>Progress %</label>
              <input
                type="number"
                min="0"
                max="100"
                name="progress"
                onChange={handleInputChange}
                value={formData.progress}
              ></input>
            </div>
            <div className="request-project-inputs">
              <label>Progress Info</label>
              <input
                name="progressInfo"
                type="text"
                onChange={handleInputChange}
                value={formData.progressInfo}
              ></input>
            </div>
          </div>
        </div>
        <div className="request-project-button uploadprogressbutton">
          <button onClick={handleUploadButtonClick}>UPLOAD</button>
        </div>
      </div>
    </>
  );
};

export default UploadProgress;
