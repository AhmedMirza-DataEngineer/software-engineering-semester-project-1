import React, { useState, useEffect } from "react";
import axios from "axios";

const CheckRequest = ({ id }) => {
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/client/Users/${id}/checkRequest`,
          {
            id,
          }
        );

        if (response.status === 200) {
          setRequests(response.data.results);
        } else {
          console.error(`Error: ${response.data.error}`);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchData();
  }, [id]);
  const getProjectStatus = (status) => {
    if (status === 0) {
      return "Rejected";
    } else if (status === 1) {
      return "Accepted";
    } else {
      return "Pending";
    }
  };
  return (
    <>
      <div className="userprojectsTable">
        <h4>Requests</h4>
      </div>
      <div className="user-projects-table-container">
        <table className="user-projects-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Floors</th>
              <th>Area</th>
              <th>Type</th>
              <th>Status</th>
            </tr>
          </thead>
          {requests.length > 0 ? (
            <tbody>
              {requests.map((request) => (
                <tr key={request.id}>
                  <td>{request.projectTitle}</td>
                  <td>{request.projectFloors}</td>
                  <td>{request.projectArea}</td>
                  <td>{request.projectType}</td>
                  <td>{getProjectStatus(request.projectStatus)}</td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan="5" className="projects-table-no-projects">
                  No Requests Yet
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </>
  );
};
export default CheckRequest;
