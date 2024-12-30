import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ContractorProject = (id) => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [conWork, setConWork] = useState([]);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/client/Contractors/${id.id}/contractorProjects`
        );
        console.log(response.data.data.conData);
        const allData = response.data.data.data;
        // Assuming the response.data.data is an array of projects
        setProjects(allData);
        setConWork(response.data.data.conData[0]);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [id]);
  const handleRowClick = (projectId) => {
    navigate(`/client/Contractors/${id.id}/contractorProjects/${projectId}`);
  };

  return (
    <>
      <div className="userprojectsTable">
        <h4>Projects</h4>
      </div>
      <div className="user-projects-table-container">
        <table className="user-projects-table">
          <thead>
            <tr>
              <th>Project Title</th>
              <th>Start Date</th>
              <th>Contractor Work</th>
              <th>Progress</th>
              <th>Project Information</th>
              <th>Upload Progress</th>
            </tr>
          </thead>
          {projects.length > 0 ? (
            <tbody>
              {projects.map((project) => (
                <tr key={project.projectId}>
                  <td>{project.projectTitle}</td>
                  <td>{new Date(project.startDate).toLocaleDateString()}</td>
                  <td>{conWork.contractorWork}</td>
                  <td>{project.overAllProgress}</td>
                  <td>{project.additionalInfo}</td>
                  <td>
                    <button
                      onClick={() => handleRowClick(project.projectId)}
                      className="unassigncontractor verify-contractor-button verify-contractor-button-accept"
                    >
                      UPLOAD
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan="5" className="projects-table-no-projects">
                  No Projects
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </>
  );
};

export default ContractorProject;
