import React, { useState, useEffect } from "react";
import "./cssFiles/ProjectsTable.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ProjectsTable = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const { tableName, id } = useParams();

  useEffect(() => {
    if (tableName === "Users") {
      const apiUrl = `http://localhost:5000/client/Users/${id}/projects`;
      axios
        .get(apiUrl)
        .then((response) => {
          setProjects(response.data.projects);
        })
        .catch((error) => {
          console.error("Error fetching projects:", error);
        });
    } else if (tableName === "Contractors") {
      const apiUrl = `http://localhost:5000/client/Contractors/${id}/projects`;
      axios
        .get(apiUrl)
        .then((response) => {
          setProjects(response.data.projects);
        })
        .catch((error) => {
          console.error("Error fetching projects:", error);
        });
    }
  }, [tableName, id]);
  const handleRowClick = (projectId) => {
    navigate(`/client/Users/${id}/projects/${projectId}`);
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
              <th>Title</th>
              <th>Start Date</th>
              <th>Type</th>
              <th>Status</th>
              <th>Progress</th>
            </tr>
          </thead>
          {projects.length > 0 ? (
            <tbody>
              {projects.map((project) => (
                <tr
                  key={project.projectId}
                  onClick={() => handleRowClick(project.projectId)}
                >
                  <td>{project.projectTitle}</td>
                  <td>{new Date(project.startDate).toLocaleDateString()}</td>
                  <td>{project.projectType}</td>
                  <td>{project.projectStatus}</td>
                  <td>{project.overAllProgress}</td>
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
export default ProjectsTable;
