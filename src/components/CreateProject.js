import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateProject = (id) => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a GET request to your API endpoint
        const response = await axios.get(
          `http://localhost:5000/client/Administrator/${id.id}/createProject`
        ); // Replace with your actual API endpoint

        // Update the state with the fetched data
        setProjects(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);
  const handleRowClick = (projectId) => {
    navigate(`/client/Administrator/${id.id}/createProject/${projectId}`);
  };

  return (
    <>
      <div className="userprojectsTable">
        <h4>All Project Request</h4>
      </div>
      <div className="">
        <table className="user-projects-table assigncontractor-right casesensitve-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Floors</th>
              <th>Area</th>
              <th>Type</th>
              <th>Information</th>
              <th>Accept/Reject</th>
            </tr>
          </thead>
          {projects.length > 0 ? (
            <tbody>
              {projects.map((project) => (
                <tr
                  key={project.requestId}
                  onClick={() => handleRowClick(project.requestId)}
                >
                  <td>{project.projectTitle}</td>
                  <td>{project.projectFloors}</td>
                  <td>{project.projectArea}</td>
                  <td>{project.projectType}</td>
                  <td>{project.projectInformation}</td>
                  <td>
                    <button className="verify-contractor-button verify-contractor-button-accept">
                      Accept
                    </button>
                    <button className="verify-contractor-button verify-contractor-button-reject">
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan="6" className="projects-table-no-projects">
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

export default CreateProject;
