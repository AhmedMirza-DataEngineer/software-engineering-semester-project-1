import React, { useEffect, useState } from "react";
import "./cssFiles/AssignContractor.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AssignContractor = (id) => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [contractors, setContractors] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedContractor, setSelectedContractor] = useState(null);
  const [contractorWork, setContractorWork] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/client/Administrator/:id/assignContractor`
      );

      const { projectData, contractorData } = response.data;
      setProjects(projectData);
      setContractors(contractorData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Fetch projects and contractors data from your API
    fetchData();
  }, []);

  const handleProjectSelection = (project) => {
    setSelectedProject(project);
  };

  const handleContractorSelection = (contractor) => {
    setSelectedContractor(contractor);
  };

  const handleAssignContractor = async () => {
    // Check if any input field is empty

    if (!selectedProject) {
      return alert("Project is not selected.");
    }
    if (!selectedContractor) {
      return alert("Contractor is not selected.");
    }
    if (!contractorWork) {
      return alert("Contractor Work is not Describe.");
    }
    const isConfirm = window.confirm("Want to Assign?");
    if (!isConfirm) {
      return;
    }
    // Extract required values
    const projectId = selectedProject.projectId;
    const contractorId = selectedContractor.contractorId;
    const contractorAssignArray = selectedProject.contractorAssign
      ? selectedProject.contractorAssign.split(",")
      : [];
    contractorAssignArray.push(contractorId);
    const updatedContractorAssign = contractorAssignArray.join(",");
    // console.log(projectId, contractorId, updatedContractorAssign);
    // Perform API call
    try {
      const response = await axios.post(
        "http://localhost:5000/client/Administrator/:id/assignContractor",
        {
          projId: projectId,
          conAssign: updatedContractorAssign,
          conId: contractorId,
          contractorWork: contractorWork,
        }
      );

      if (response.status === 201) {
        alert("Contractor assigned successfully!");
        fetchData();
        // You may want to update state or perform other actions on success
      } else {
        console.error("Failed to assign contractor");
      }
    } catch (error) {
      console.error("Error assigning contractor:", error);
    }
  };
  const handleRowClick = () => {
    navigate(`/client/Administrator/${id.id}/completedWork`);
  };
  return (
    <>
      <div
        className="user-projects-table-container"
        id="assignProject-container"
      >
        <div>
          <h4>Projects</h4>
          <div className="scrollable-table-container">
            <table className="user-projects-table assigncontractor-left">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Information</th>
                </tr>
              </thead>
              <tbody>
                {projects &&
                  projects.map((project) => (
                    <tr
                      key={project.projectId}
                      onClick={() => handleProjectSelection(project)}
                    >
                      <td>{project.projectTitle}</td>
                      <td>{project.additionalInfo}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h4>Contractors</h4>
          <div className="scrollable-table-container">
            <table className="user-projects-table assigncontractor-right">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Specialties</th>
                </tr>
              </thead>
              <tbody>
                {contractors &&
                  contractors.map((contractor) => (
                    <tr
                      key={contractor.contractorId}
                      onClick={() => handleContractorSelection(contractor)}
                    >
                      <td>{contractor.contractorName}</td>
                      <td>{contractor.contractorSpecialties}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="horizontal-line"></div>
      <div className="userprojectsTable">
        <h4>Assign Contractor</h4>
      </div>
      <div className="assign-contractor-container">
        <div className="assign-contractor-fields">
          <label htmlFor="title">Project Title</label>
          <input
            type="text"
            value={selectedProject?.projectTitle || ""}
            readOnly
          />
        </div>
        <div className="assign-contractor-fields">
          <label htmlFor="name">Contractor Name</label>
          <input
            type="text"
            value={selectedContractor?.contractorName || ""}
            readOnly
          />
        </div>
        <div className="assign-contractor-fields">
          <label htmlFor="info">Information</label>
          <input
            type="text"
            value={selectedProject?.additionalInfo || ""}
            readOnly
          />
        </div>
        <div className="assign-contractor-fields">
          <label htmlFor="specialties">Specialties</label>
          <input
            type="text"
            value={selectedContractor?.contractorSpecialties || ""}
            readOnly
          />
        </div>
        <div className="assign-contractor-fields ">
          <label htmlFor="workInfo">Contractor Work</label>
          <input
            type="text"
            value={contractorWork}
            onChange={(e) => setContractorWork(e.target.value)}
          />
        </div>
        <div className="assign-contractor-fields ">
          <div className="assign-contractor-fields-button work-completed-contractor">
            <button type="button" onClick={handleRowClick}>
              UNASSIGN CONTRACTOR
            </button>
          </div>
        </div>
        <div className="assign-contractor-fields assign-contractor-fields-button">
          <div className="assign-contractor-fields-button">
            <button type="button" onClick={handleAssignContractor}>
              ASSIGN CONTRACTOR
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssignContractor;
