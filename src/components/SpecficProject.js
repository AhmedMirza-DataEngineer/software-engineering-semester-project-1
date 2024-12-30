import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./cssFiles/SpecficProject.css";

const SpecficProject = (id, tableName) => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  // const [conAssignData, setConAssignData] = useState();
  const [values, setValues] = useState({
    projId: "",
    projectTitle: "",
    fullName: "",
    cost: "",
    startDate: "",
    allProgress: "",
    status: "",
    type: "",
    floors: "",
    area: "",
    completeDate: "",
    requestId: "",
    additionalInfo: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/client/${id.tableName}/${id.id}/allProjects/${projectId}`
        );

        const allData = response.data;

        if (response.status === 200) {
          const formatDate = (dateString) => {
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, "0");
            const day = date.getDate().toString().padStart(2, "0");
            return `${year}-${month}-${day}`;
          };
          setValues({
            projId: allData.projectData.projectId,
            projectTitle: allData.projectData.projectTitle,
            fullName: allData.userData.userName,
            cost: allData.projectData.projectCost,
            startDate: formatDate(allData.projectData.startDate),
            allProgress: allData.projectData.overAllProgress,
            status: allData.projectData.projectStatus,
            type: allData.projectData.projectType,
            floors: allData.projectData.projectFloors,
            area: allData.projectData.projectArea,
            completeDate: formatDate(allData.projectData.completeDate),
            requestId: allData.projectData.requestId,
            additionalInfo: allData.projectData.additionalInfo,
          });
          // setConAssignData(allData.conData);
        } else {
          console.error("Failed to fetch project data");
        }
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    fetchData();
  }, [projectId, id]);

  const handleSaveButton = async () => {
    // Check if any input field is non-empty
    const isAnyFieldNonEmpty = Object.values(values).some(
      (value) => value && value !== ""
    );

    if (isAnyFieldNonEmpty) {
      // Display confirmation message
      const shouldSave = window.confirm(
        "Are you sure you want to save changes?"
      );
      if (shouldSave) {
        // Perform save operation or navigate to the next step
        try {
          const response = await axios.post(
            `http://localhost:5000/client/${id.tableName}/${id.id}/allProjects/${projectId}`,
            {
              cost: values.cost,
              startDate: values.startDate,
              allProgress: values.allProgress,
              status: values.status,
              type: values.type,
              floors: values.floors,
              area: values.area,
              completeDate: values.completeDate,
              additionalInfo: values.additionalInfo,
            }
          );

          if (response.status === 201) {
            alert("Save Successfully");
          } else {
            console.error("Failed to save changes");
          }
        } catch (error) {
          console.error("Error saving changes:", error);
        }
      }
    } else {
      // Show an alert for an empty form
      alert("Empty form. Please fill in the details.");
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleDeleteButton = async () => {
    // Display confirmation message
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (shouldDelete) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/client/${id.tableName}/${id.id}/allProjects/${projectId}`
        );

        if (response.status === 201) {
          alert("Delete Successfully");
          // Navigate to the desired page after successful deletion
          navigate(`/client/${id.tableName}/${id.id}/allProjects`);
        } else {
          console.error("Failed to delete project");
        }
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  return (
    <>
      <div className="specfic-project-full-box">
        <div className="specfic-project-full-left">
          <div className="profilePage">
            <h3>{values.projectTitle}</h3>
          </div>
          <div className="Specfic-Project-container">
            <div className="profilePage-form-row">
              <label htmlFor="name">Owner Name</label>
              <input
                type="text"
                id="profilePage-1x1"
                name="name"
                value={values.fullName}
                readOnly
              />
            </div>
            <div className="profilePage-form-row">
              <label htmlFor="cost">Cost</label>
              <input
                type="text"
                id="profilePage-1x2"
                name="cost"
                value={values.cost}
                onChange={handleInputChange}
              />
            </div>
            <div className="profilePage-form-row">
              <label htmlFor="startDate">Start Date</label>
              <input
                type="date"
                id="profilePage-2x1"
                name="startDate"
                value={values.startDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="profilePage-form-row">
              <label htmlFor="progresss">OverAll Progress</label>
              <input
                type="number"
                min={0}
                max={100}
                id="profilePage-2x2"
                name="allProgress"
                value={values.allProgress}
                onChange={handleInputChange}
              />
            </div>
            <div className="profilePage-form-row" id="specfic-projects-select">
              <label htmlFor="status">Status</label>
              <select
                id="profilePage-3x1"
                name="status"
                value={values.status}
                onChange={handleInputChange}
              >
                <option value="Working">Working</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="profilePage-form-row" id="specfic-projects-select">
              <label htmlFor="type">Type</label>
              <select
                id="profilePage-3x1"
                name="type"
                value={values.type}
                onChange={handleInputChange}
              >
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>
            <div className="profilePage-form-row">
              <label htmlFor="floors">Floors</label>
              <input
                type="number"
                min={0}
                max={7}
                id="profilePage-3x1"
                name="floors"
                value={values.floors}
                onChange={handleInputChange}
              />
            </div>
            <div className="profilePage-form-row">
              <label htmlFor="area">Area</label>
              <input
                type="number"
                min={0}
                id="profilePage-3x1"
                name="area"
                value={values.area}
                onChange={handleInputChange}
              />
            </div>
            <div className="profilePage-form-row">
              <label htmlFor="completeDate">Complete Date (Expected)</label>
              <input
                type="date"
                id="profilePage-3x1"
                name="completeDate"
                value={values.completeDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="profilePage-form-row">
              <label htmlFor="requestId">Request Id</label>
              <input
                type="text"
                id="profilePage-3x1"
                name="requestId"
                value={values.requestId}
                readOnly
              />
            </div>
            <div className="profilePage-form-row">
              <label htmlFor="additionalInfo">Additional Information</label>
              <input
                type="text"
                id="profilePage-3x1"
                name="additionalInfo"
                value={values.additionalInfo}
                onChange={handleInputChange}
              />
            </div>
            <div className="profilePage-form-row">
              <div className="profilePage-form-row-button">
                <button onClick={handleDeleteButton}>DELETE PROJECT</button>
              </div>
            </div>
          </div>
          <div
            className="profilePage-form-row-button"
            id="specficProject-save-button"
          >
            <button onClick={handleSaveButton}>SAVE CHANGES</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpecficProject;
