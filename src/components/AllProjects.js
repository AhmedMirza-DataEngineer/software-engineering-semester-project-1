import React, { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./cssFiles/AllProjects.css";

const AllProjects = (id) => {
  const navigate = useNavigate();
  // const [toggle, setToggle] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async (id) => {
      try {
        const response = await axios.get(
          `http://localhost:5000/client/Administrator/${id}/allProjects`
        );

        setProjects(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error as needed
      }
    };

    fetchData();
  }, []);
  const handleRowClick = (projectId) => {
    navigate(`/client/Administrator/${id.id}/allProjects/${projectId}`);
  };
  return (
    <>
      <div className="userprojectsTable">
        <div className="projects-toggle-btns">
          <h4>All Projects</h4>
        </div>
      </div>
      <div className="user-projects-table-container">
        <table className="user-projects-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Start Date</th>
              <th>Type</th>
              <th>Status</th>
              <th>Progress %</th>
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

export default AllProjects;
