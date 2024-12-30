import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./cssFiles/DashTemplate.css";

const UserSpecficProject = (id) => {
  // const [conData, setConData] = useState([]);
  const [projects, setProjects] = useState([]);
  const { projectId } = useParams();

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/client/Users/${id.id}/projects/${projectId}`
        );
        // console.log(response);
        setProjects(response.data.data);
        // setConData(response.data.projData);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error as needed
      }
    };

    fetchData();
  }, [projectId, id]);
  return (
    <>
      <div className="userprojectsTable">
        <div className="projects-toggle-btns">
          <h4>Projects Detail</h4>
        </div>
      </div>
      <div className="user-projects-table-container">
        <table className="user-projects-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Start Date</th>
              <th>Type</th>
              <th>Cost</th>
              <th>Area</th>
              <th>Floors</th>
              <th>Progress %</th>
              <th>Complete Date</th>
            </tr>
          </thead>
          {projects.length > 0 ? (
            <tbody>
              {projects.map((project) => (
                <tr key={project.projectId}>
                  <td>{project.projectTitle}</td>
                  <td>{project.projectStatus}</td>
                  <td>{new Date(project.startDate).toLocaleDateString()}</td>
                  <td>{project.projectType}</td>
                  <td>{project.projectCost}</td>
                  <td>{project.projectArea}</td>
                  <td>{project.projectFloors}</td>
                  <td>{project.overAllProgress}</td>
                  <td>
                    {project.completeDate
                      ? new Date(project.completeDate).toLocaleDateString()
                      : ""}
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

export default UserSpecficProject;
